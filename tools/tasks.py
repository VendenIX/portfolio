"""Task graph of the portfolio (`docs/tasks/graph.yaml`): checks, ready tasks, parallel
batches, targeted context of a task, validation gates.

The YAML file is the only source; this tool reads it and writes it only to record the result of
a validation (`verify`). Protocol: `docs/agents/orchestration.md`. Needs PyYAML only.

Usage:
  python3 tools/tasks.py check              # schema, dependencies, cycles, closing rules
  python3 tools/tasks.py status [--all]     # overview per objective
  python3 tools/tasks.py ready              # ready tasks, in batches without a shared file
  python3 tools/tasks.py layers             # graph levels (what can move in parallel)
  python3 tools/tasks.py context <id>       # targeted brief for the task's agent
  python3 tools/tasks.py verify <id>        # run the task's validation, record the gate
  python3 tools/tasks.py fresh <id>         # does the last gate cover the current tree?
"""

from __future__ import annotations

import argparse
import contextlib
import datetime as dt
import hashlib
import os
import platform
import re
import subprocess
import sys
import tempfile
from collections.abc import Callable, Iterator
from dataclasses import MISSING, dataclass, field, fields, is_dataclass
from pathlib import Path
from typing import Any

import yaml

ROOT = Path(__file__).resolve().parents[1]
GRAPH = ROOT / "docs" / "tasks" / "graph.yaml"
MEMORY = ROOT / "docs" / "memory"
GATES = ROOT / "out" / "gates"

STATUSES = ("todo", "in_progress", "review", "done", "failed", "blocked", "dropped")
AGENTS = ("orchestrator", "implementer", "reviewer", "content-reviewer", "worker", "human")
OUTCOMES = ("success", "failure", "replan", "abandoned")
VERDICTS = ("accept", "changes", "reject")
OBJECTIVE_STATUSES = ("active", "done", "paused", "dropped")
OPEN = {"todo", "in_progress", "review", "failed", "blocked"}
REF = re.compile(r"^(D|P)-\d{3}$")
MAX_REF_CHARS = 4000            # longer excerpts are cut: the context stays targeted
MAX_PARALLEL = 2                # simultaneous sub-agents at most (D-004)
NEEDS_FILES = {"implementer"}


class GraphError(ValueError):
    pass


# --- schema (dataclasses + explicit checks: no dependency besides PyYAML) ---------------------

@dataclass
class Attempt:
    """One attempt: who, when, which outcome and why (observability)."""

    date: str
    agent: str
    outcome: str
    summary: str


@dataclass
class Review:
    file: str                                   # report in docs/reviews/
    verdict: str


@dataclass
class Gate:
    """Validation result recorded by `verify`. `commands` (hash of the commands) makes a gate
    stale when the commands change; `tree` (hash of `git diff HEAD` + untracked files) says
    which state of the repository it covered."""

    date: str
    passed: bool
    log: str                                    # full log (out/gates/, outside git)
    failed: list[str] = field(default_factory=list)
    commands: str = ""
    tree: str = ""
    host: str = ""


@dataclass
class Task:
    id: str
    objective: str
    title: str
    goal: str
    agent: str
    description: str = ""
    scope: str = ""                             # area of the site (content, theme, ci, ...)
    priority: int = 2                           # 1 = high
    status: str = "todo"
    depends_on: list[str] = field(default_factory=list)
    success: list[str] = field(default_factory=list)
    failure: list[str] = field(default_factory=list)
    files: list[str] = field(default_factory=list)
    context: list[str] = field(default_factory=list)    # D-NNN, P-NNN, path[#heading]
    validation: list[str] = field(default_factory=list)  # shell commands, from the root
    review_required: bool = False
    max_attempts: int = 2
    attempts: list[Attempt] = field(default_factory=list)
    reviews: list[Review] = field(default_factory=list)
    gates: list[Gate] = field(default_factory=list)
    results: str = ""
    handoff: str = ""                           # what the next tasks must know


@dataclass
class Objective:
    id: str
    goal: str
    status: str = "active"
    success: list[str] = field(default_factory=list)
    stop: list[str] = field(default_factory=list)   # stop conditions without success


@dataclass
class Graph:
    objectives: list[Objective]
    tasks: list[Task]

    def task(self, task_id: str) -> Task:
        for t in self.tasks:
            if t.id == task_id:
                return t
        raise KeyError(f"unknown task: {task_id}")


def _build(cls: type, data: Any, where: str) -> Any:
    if not isinstance(data, dict):
        raise GraphError(f"{where}: expected a mapping")
    known = {f.name for f in fields(cls)}
    if extra := set(data) - known:
        raise GraphError(f"{where}: unknown field(s) {sorted(extra)}")
    kwargs = dict(data)
    for k in ("date",):
        if k in kwargs and isinstance(kwargs[k], (dt.date, dt.datetime)):
            kwargs[k] = kwargs[k].isoformat()
    try:
        return cls(**kwargs)
    except TypeError as e:
        raise GraphError(f"{where}: {e}") from None


def _validate(g: Graph) -> None:
    def one_of(value: Any, allowed: tuple[str, ...], where: str) -> None:
        if value not in allowed:
            raise GraphError(f"{where}: « {value} » not in {allowed}")

    for o in g.objectives:
        one_of(o.status, OBJECTIVE_STATUSES, f"objective {o.id}")
    for t in g.tasks:
        if not re.fullmatch(r"[a-z0-9][a-z0-9-]*", t.id):
            raise GraphError(f"task {t.id}: id in lowercase letters, digits and dashes")
        one_of(t.agent, AGENTS, f"{t.id}.agent")
        one_of(t.status, STATUSES, f"{t.id}.status")
        if t.priority not in (1, 2, 3):
            raise GraphError(f"{t.id}.priority: 1, 2 or 3")
        if not 1 <= t.max_attempts <= 5:
            raise GraphError(f"{t.id}.max_attempts: between 1 and 5")
        for a in t.attempts:
            one_of(a.agent, AGENTS, f"{t.id}.attempts.agent")
            one_of(a.outcome, OUTCOMES, f"{t.id}.attempts.outcome")
        for r in t.reviews:
            one_of(r.verdict, VERDICTS, f"{t.id}.reviews.verdict")


def load(path: Path = GRAPH) -> Graph:
    raw = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    if extra := set(raw) - {"version", "objectives", "tasks"}:
        raise GraphError(f"unknown top-level key(s) {sorted(extra)}")
    objectives = [_build(Objective, o, f"objective #{i}")
                  for i, o in enumerate(raw.get("objectives") or [])]
    tasks = []
    for i, t in enumerate(raw.get("tasks") or []):
        where = f"task {t.get('id', f'#{i}') if isinstance(t, dict) else f'#{i}'}"
        task = _build(Task, t, where)
        task.attempts = [_build(Attempt, a, f"{where}.attempts") for a in task.attempts]
        task.reviews = [_build(Review, r, f"{where}.reviews") for r in task.reviews]
        task.gates = [_build(Gate, x, f"{where}.gates") for x in task.gates]
        tasks.append(task)
    graph = Graph(objectives, tasks)
    _validate(graph)
    return graph


def _dump(obj: Any) -> dict[str, Any]:
    """Dataclass -> plain data; optional fields left at their default value are omitted."""
    out: dict[str, Any] = {}
    for f in fields(obj):
        value = getattr(obj, f.name)
        if f.default_factory is not MISSING:
            if value == f.default_factory():
                continue
        elif f.default is not MISSING and value == f.default:
            continue
        out[f.name] = [_dump(v) if is_dataclass(v) else v for v in value] \
            if isinstance(value, list) else value
    return out


def save(graph: Graph, path: Path = GRAPH) -> None:
    data = {"version": 1, "objectives": [_dump(o) for o in graph.objectives],
            "tasks": [_dump(t) for t in graph.tasks]}
    path.write_text(yaml.safe_dump(data, sort_keys=False, allow_unicode=True, width=100),
                    encoding="utf-8")


# --- checks ------------------------------------------------------------------------------------

def _cycle(graph: Graph) -> list[str]:
    deps = {t.id: t.depends_on for t in graph.tasks}
    state: dict[str, int] = {}
    stack: list[str] = []

    def visit(n: str) -> list[str]:
        state[n] = 1
        stack.append(n)
        for d in deps.get(n, []):
            if state.get(d) == 1:
                return [*stack[stack.index(d):], d]
            if d in deps and d not in state and (c := visit(d)):
                return c
        stack.pop()
        state[n] = 2
        return []

    for n in deps:
        if n not in state and (c := visit(n)):
            return c
    return []


def _memory_file(ref: str) -> Path:
    return MEMORY / ("decisions.md" if ref.startswith("D-") else "pitfalls.md")


def _ref_exists(ref: str) -> bool:
    if REF.match(ref):
        return f"### {ref} " in _memory_file(ref).read_text(encoding="utf-8")
    path, _, title = ref.partition("#")
    if not (ROOT / path).is_file():
        return False
    return not title or _heading((ROOT / path).read_text(encoding="utf-8"), title) is not None


def _heading(text: str, title: str) -> re.Match[str] | None:
    """Markdown heading starting with `title`, after an optional numbering (« 3.2 »)."""
    return re.search(rf"^#+ +(?:[\d.]+ +)?{re.escape(title)}", text, re.M | re.I)


def commands_sha(commands: list[str]) -> str:
    return hashlib.sha256("\n".join(commands).encode()).hexdigest()[:12]


def tree_fingerprint() -> str:
    """Hash of the repository state: tracked changes and untracked files, excluding the
    orchestration's own writes (graph, reviews), which change at every gate."""
    skip = [":(exclude)docs/tasks", ":(exclude)docs/reviews"]
    try:
        diff = subprocess.run(["git", "diff", "HEAD", "--", ".", *skip], cwd=ROOT,
                              capture_output=True, check=True).stdout
        names = subprocess.run(["git", "ls-files", "--others", "--exclude-standard", "-z", "--",
                                ".", *skip], cwd=ROOT, capture_output=True, check=True).stdout
    except (OSError, subprocess.CalledProcessError):
        return ""
    h = hashlib.sha256(diff)
    for name in sorted(n for n in names.decode().split("\0") if n):
        h.update(name.encode())
        with contextlib.suppress(OSError):
            h.update(hashlib.sha256((ROOT / name).read_bytes()).digest())
    return h.hexdigest()[:12]


def _failures(t: Task) -> int:
    """Failures since the last replan (a replan resets the count)."""
    n = 0
    for a in t.attempts:
        n = 0 if a.outcome == "replan" else n + (a.outcome == "failure")
    return n


def check(graph: Graph) -> list[str]:
    """Blocking errors of the graph; an empty list = healthy graph."""
    errors: list[str] = []
    ids = [t.id for t in graph.tasks]
    oids = [o.id for o in graph.objectives]
    objectives = set(oids)
    active = {o.id for o in graph.objectives if o.status == "active"}
    errors += [f"duplicate task id: {i}" for i in sorted({i for i in ids if ids.count(i) > 1})]
    errors += [f"duplicate objective: {i}" for i in sorted({i for i in oids if oids.count(i) > 1})]
    known = set(ids)
    by_id = {t.id: t for t in graph.tasks}
    for o in graph.objectives:
        if o.status == "done" and any(t.objective == o.id and t.status in OPEN
                                      for t in graph.tasks):
            errors.append(f"objective {o.id} done with open tasks")
    for t in graph.tasks:
        where = f"{t.id}:"
        if t.objective not in objectives:
            errors.append(f"{where} unknown objective « {t.objective} »")
        errors += [f"{where} unknown dependency « {d} »" for d in t.depends_on if d not in known]
        errors += [f"{where} reference not found « {r} »" for r in t.context
                   if not _ref_exists(r)]
        errors += [f"{where} review report missing or outside docs/reviews/ « {r.file} »"
                   for r in t.reviews
                   if not (r.file.startswith("docs/reviews/") and (ROOT / r.file).is_file())]
        if t.agent in NEEDS_FILES and not t.files and t.objective in active:
            errors.append(f"{where} no `files` declared (required for parallel batches)")
        replans = sum(a.outcome == "replan" for a in t.attempts)
        if replans > 1 and t.status in OPEN:
            errors.append(f"{where} {replans} replans: only one allowed (owner decides)")
        failures = _failures(t)
        if failures >= t.max_attempts and t.status not in ("blocked", "dropped", "done"):
            errors.append(f"{where} {failures} failures for {t.max_attempts} allowed attempts: "
                          "set « blocked » (owner decides) or replan")
        if t.status in ("in_progress", "review") and t.objective not in active:
            errors.append(f"{where} in progress in an inactive objective")
        if t.status == "done" or (t.status in ("in_progress", "review") and t.agent != "human"):
            # a started task needs its dependencies produced (at least in review);
            # a finished task needs them finished
            allowed = {"done"} if t.status == "done" else {"done", "review"}
            for d in t.depends_on:
                if d in known and by_id[d].status not in allowed:
                    errors.append(f"{where} {t.status} while « {d} » is {by_id[d].status}")
        if t.status in OPEN and t.objective in active:
            for d in t.depends_on:
                dep = by_id.get(d)
                if dep and dep.status != "done" and (dep.status == "dropped"
                                                      or dep.objective not in active):
                    errors.append(f"{where} depends on « {d} », which will not be finished "
                                  f"({dep.status}, objective {dep.objective})")
        if t.status == "done":
            if not t.results.strip():
                errors.append(f"{where} done without results")
            if t.validation:
                last = t.gates[-1] if t.gates else None
                if not (last and last.passed):
                    errors.append(f"{where} done without a passed gate (tools/tasks.py verify)")
                elif last.commands != commands_sha(t.validation):
                    errors.append(f"{where} stale gate: the validation commands changed since")
            if t.review_required and not (t.reviews and t.reviews[-1].verdict == "accept"):
                errors.append(f"{where} done without an accepted review")
        if t.status == "failed" and not t.attempts:
            errors.append(f"{where} failed without a recorded attempt")
    if cycle := _cycle(graph):
        errors.append("dependency cycle: " + " -> ".join(cycle))
    return errors


# --- scheduling --------------------------------------------------------------------------------

def ready(graph: Graph) -> list[Task]:
    """Todo tasks whose dependencies are all done, by priority."""
    done = {t.id for t in graph.tasks if t.status == "done"}
    active = {o.id for o in graph.objectives if o.status == "active"}
    out = [t for t in graph.tasks
           if t.status == "todo" and t.objective in active and set(t.depends_on) <= done]
    return sorted(out, key=lambda t: (t.priority, t.id))


def _overlap(a: Task, b: Task) -> bool:
    """Two tasks clash when they write a same file or folder (prefix). A task without
    declared files clashes with every task (caution)."""
    if not a.files or not b.files:
        return True
    xs = [os.path.normpath(f) for f in a.files]
    ys = [os.path.normpath(f) for f in b.files]
    return any(x == y or x.startswith(y + os.sep) or y.startswith(x + os.sep)
               for x in xs for y in ys)


def busy(graph: Graph, tasks: list[Task]) -> tuple[list[Task], list[tuple[Task, Task]]]:
    """Split ready tasks into free ones and waiting ones: a task sharing a file with a task
    already running (`in_progress`, `review`) waits for it."""
    running = [t for t in graph.tasks if t.status in ("in_progress", "review")]
    free: list[Task] = []
    waiting: list[tuple[Task, Task]] = []
    for t in tasks:
        clash = next((r for r in running if r.agent != "human" and _overlap(t, r)), None)
        if clash is None or t.agent == "human":
            free.append(t)
        else:
            waiting.append((t, clash))
    return free, waiting


def batches(tasks: list[Task]) -> list[list[Task]]:
    """Parallel batches: no pair shares a file, at most MAX_PARALLEL tasks. Human tasks are
    never delegated: each forms its own batch."""
    out: list[list[Task]] = []
    for t in tasks:
        for lot in out:
            if (t.agent != "human" and len(lot) < MAX_PARALLEL
                    and all(u.agent != "human" and not _overlap(t, u) for u in lot)):
                lot.append(t)
                break
        else:
            out.append([t])
    return out


def layers(graph: Graph) -> list[list[str]]:
    """Topological levels of the open tasks of active objectives."""
    active = {o.id for o in graph.objectives if o.status == "active"}
    done = {t.id for t in graph.tasks if t.status == "done"}
    open_ids = {t.id for t in graph.tasks if t.status in OPEN and t.objective in active}
    deps = {t.id: [d for d in t.depends_on if d not in done] for t in graph.tasks
            if t.id in open_ids}
    out: list[list[str]] = []
    placed: set[str] = set()
    while len(placed) < len(deps):
        level = sorted(n for n, ds in deps.items() if n not in placed and set(ds) <= placed)
        if not level:
            break                                   # cycle: reported by check
        out.append(level)
        placed |= set(level)
    return out


# --- targeted context --------------------------------------------------------------------------

def _section(text: str, start: int) -> str:
    """From the heading at `start` to the next heading of the same or a higher level."""
    line_end = text.find("\n", start)
    level = len(text[start:line_end]) - len(text[start:line_end].lstrip("#"))
    m = re.compile(rf"^#{{1,{level}}} ", re.M).search(text, line_end + 1)
    return text[start:m.start() if m else len(text)].strip()


def resolve(ref: str) -> str:
    """Text of a reference: decision or pitfall entry, document section (`path#heading`) or
    whole document, cut beyond the limit."""
    if REF.match(ref):
        full = _memory_file(ref).read_text(encoding="utf-8")
        text = _section(full, full.index(f"### {ref} "))
    else:
        path, _, title = ref.partition("#")
        full = (ROOT / path).read_text(encoding="utf-8")
        text = full
        if title:
            m = _heading(full, title)
            text = _section(full, m.start()) if m else full
    if len(text) > MAX_REF_CHARS:
        text = text[:MAX_REF_CHARS] + f"\n[… cut: read {ref.split('#')[0]} if needed]"
    return text


def context(graph: Graph, task_id: str) -> str:
    """Brief of an agent: its task, what its dependencies hand over, the references chosen for
    this task. Nothing else (not the whole documentation)."""
    t = graph.task(task_id)
    objective = next(o for o in graph.objectives if o.id == t.objective)
    lines = [f"# Task `{t.id}`: {t.title}", "",
             f"Objective ({objective.id}): {objective.goal}", "",
             f"**Goal**: {t.goal}", ""]
    if t.description:
        lines += [t.description.strip(), ""]
    meta = [f"agent: {t.agent}"] + ([f"scope: {t.scope}"] if t.scope else [])
    lines += ["- " + " · ".join(meta)]

    def bullets(title: str, items: list[str]) -> None:
        if items:
            lines.extend(["", f"## {title}", "", *[f"- {i}" for i in items]])

    bullets("Success criteria", t.success)
    bullets("Failure criteria (stop and report)", t.failure)
    bullets("Files (the only files to modify)", t.files)
    bullets("Validation (must pass: `tools/tasks.py verify` will run it again)",
            [f"`{c}`" for c in t.validation])
    deps = [graph.task(d) for d in t.depends_on]
    if any(d.handoff or d.results for d in deps):
        lines += ["", "## Handed over by previous tasks"]
        for d in deps:
            if d.handoff or d.results:
                lines += ["", f"### `{d.id}` ({d.status})", "", (d.handoff or d.results).strip()]
    if t.attempts:
        lines += ["", "## Previous attempts (do not repeat them)", ""]
        lines += [f"- {a.date} · {a.agent} · {a.outcome}: {a.summary}" for a in t.attempts]
    if t.reviews:
        lines += ["", "## Previous reviews", ""]
        lines += [f"- {r.file}: {r.verdict}" for r in t.reviews]
    if t.context:
        lines += ["", "## References chosen for this task"]
        for ref in t.context:
            lines += ["", resolve(ref)] if REF.match(ref) else ["", f"### {ref}", "", resolve(ref)]
    lines += ["", "## Always", "",
              "- Common rules: `AGENTS.md`; project state: `docs/memory/state.md`.",
              "- No `git commit` / `git push` / branch (D-002): the owner commits and deploys.",
              "- End with the output format of your role (`.claude/agents/<role>.md`)."]
    return "\n".join(lines) + "\n"


# --- validation --------------------------------------------------------------------------------

def verify(graph: Graph, task_id: str, timeout_s: int = 1800,
           gates_dir: Path | None = None) -> Gate:
    """Run the task's validation commands from the root and keep the log."""
    t = graph.task(task_id)
    if not t.validation:
        raise SystemExit(f"{task_id}: no validation command defined")
    gates_dir = gates_dir or GATES
    gates_dir.mkdir(parents=True, exist_ok=True)
    now = dt.datetime.now()
    log = gates_dir / f"{task_id}-{now:%Y%m%d-%H%M%S-%f}.log"
    tree = tree_fingerprint()                   # validated state: taken before the commands
    failed: list[str] = []
    with log.open("w", encoding="utf-8") as f:
        for cmd in t.validation:
            f.write(f"$ {cmd}\n")
            f.flush()
            try:
                code = subprocess.run(["bash", "-c", cmd], cwd=ROOT, stdout=f,
                                      stderr=subprocess.STDOUT, timeout=timeout_s,
                                      check=False).returncode
            except subprocess.TimeoutExpired:
                code = -1
                f.write(f"[timeout: {timeout_s} s]\n")
            f.write(f"[exit {code}]\n\n")
            f.flush()
            print(f"{'ok  ' if code == 0 else 'FAIL'}  {cmd}")
            if code != 0:
                failed.append(cmd)
    rel = log.relative_to(ROOT) if log.is_relative_to(ROOT) else log
    return Gate(date=now.replace(microsecond=0).isoformat(), passed=not failed, log=str(rel),
                failed=failed, commands=commands_sha(t.validation), tree=tree,
                host=platform.node())


@contextlib.contextmanager
def _locked(path: Path) -> Iterator[None]:
    """Exclusive lock next to the graph (POSIX); without fcntl, no lock."""
    try:
        import fcntl
    except ImportError:
        yield
        return
    with path.with_suffix(path.suffix + ".lock").open("w") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        try:
            yield
        finally:
            fcntl.flock(lock, fcntl.LOCK_UN)


def update(path: Path, change: Callable[[Graph], None]) -> Graph:
    """Re-read the graph under lock, apply `change`, write atomically: an edit made during a
    long validation is not overwritten."""
    with _locked(path):
        graph = load(path)
        change(graph)
        fd, tmp = tempfile.mkstemp(dir=path.parent, suffix=".tmp")
        os.close(fd)
        save(graph, Path(tmp))
        os.chmod(tmp, path.stat().st_mode & 0o777)     # mkstemp creates 0600
        os.replace(tmp, path)
    return graph


# --- display -----------------------------------------------------------------------------------

def status_text(graph: Graph, show_all: bool = False) -> str:
    lines: list[str] = []
    for o in graph.objectives:
        if o.status != "active" and not show_all:
            continue
        tasks = [t for t in graph.tasks if t.objective == o.id]
        counts = {s: sum(t.status == s for t in tasks) for s in STATUSES}
        summary = ", ".join(f"{n} {s}" for s, n in counts.items() if n)
        lines += [f"\n[{o.status}] {o.id}: {o.goal}", f"  {summary or 'no task'}"]
        for t in sorted(tasks, key=lambda t: (t.status == "done", t.priority, t.id)):
            if t.status in ("done", "dropped") and not show_all:
                continue
            deps = f"  <- {', '.join(t.depends_on)}" if t.depends_on else ""
            lines.append(f"  {t.status:<11} p{t.priority} {t.id:<26} {t.agent:<16} "
                         f"{t.title}{deps}")
    return "\n".join(lines).lstrip("\n")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0] if __doc__ else None)
    parser.add_argument("--graph", type=Path, default=GRAPH)
    sub = parser.add_subparsers(dest="cmd", required=True)
    sub.add_parser("check")
    p = sub.add_parser("status")
    p.add_argument("--all", action="store_true", help="include done tasks and inactive objectives")
    sub.add_parser("ready")
    sub.add_parser("layers")
    p = sub.add_parser("context")
    p.add_argument("id")
    p = sub.add_parser("fresh", help="does the last gate cover the current tree?")
    p.add_argument("id")
    p = sub.add_parser("verify")
    p.add_argument("id")
    p.add_argument("--timeout", type=int, default=1800, help="seconds per command")
    args = parser.parse_args(argv)

    try:
        graph = load(args.graph)
    except GraphError as e:
        print(f"- invalid graph: {e}")
        return 1
    if args.cmd == "check":
        errors = check(graph)
        for e in errors:
            print(f"- {e}")
        print(f"{len(graph.tasks)} task(s), {len(errors)} error(s)")
        return 1 if errors else 0
    if args.cmd == "status":
        print(status_text(graph, args.all))
    elif args.cmd == "ready":
        free, waiting = busy(graph, ready(graph))
        running = [t for t in graph.tasks if t.status in ("in_progress", "review")]
        if running:
            print("running: " + ", ".join(t.id for t in running))
        lots = batches(free)
        if not lots:
            print("no ready task")
        for i, lot in enumerate(lots, 1):
            print(f"batch {i} (parallel):")
            for t in lot:
                print(f"  p{t.priority} {t.id:<26} {t.agent:<16} {t.title}")
        for t, clash in waiting:
            print(f"waits for {clash.id} (shared files): {t.id}")
    elif args.cmd == "layers":
        for i, level in enumerate(layers(graph)):
            print(f"level {i}: {', '.join(level)}")
    elif args.cmd == "context":
        print(context(graph, args.id), end="")
    elif args.cmd == "fresh":
        task = graph.task(args.id)
        last = task.gates[-1] if task.gates else None
        current = tree_fingerprint()
        ok = bool(last and last.passed and last.tree == current)
        seen = last.tree if last else "-"
        print("gate up to date" if ok else f"gate to re-run (gate {seen}, current tree {current})")
        return 0 if ok else 1
    elif args.cmd == "verify":
        graph_path = args.graph.resolve()
        gates_dir = GATES if graph_path == GRAPH else graph_path.parent / "gates"
        gate = verify(graph, args.id, args.timeout, gates_dir)
        update(args.graph, lambda g: g.task(args.id).gates.append(gate))
        print(f"{'gate passed' if gate.passed else 'GATE FAILED'}; log: {gate.log}")
        return 0 if gate.passed else 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
