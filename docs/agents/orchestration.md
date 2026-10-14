# Agent orchestration

How an objective becomes work that is done, reviewed, validated and remembered. The orchestrator
is the main Claude Code session (`/objective` command, `.claude/skills/objective/SKILL.md`); the
other roles are sub-agents defined in `.claude/agents/`. Decision: D-003. Adapted from the
SynthPed project (same owner), scaled down to a static site.

```
objective
  -> planning: tasks and dependencies in docs/tasks/graph.yaml         (orchestrator)
  -> ready tasks, parallel batches: tools/tasks.py ready
  -> targeted brief: tools/tasks.py context <id>
  -> production: implementer                                           (sub-agent)
  -> gate: tools/tasks.py verify <id> -> out/gates/                    (script, not an agent)
  -> adversarial review: reviewer | content-reviewer -> docs/reviews/<id>-<n>.md
  -> memory: graph.yaml, state.md, decision / pitfall
  -> next: next task | new attempt | replan | stop
  -> objective reached: stop; the owner checks, commits and pushes (push to main = publish)
```

## Roles

| Role | Responsibility | Reads | Writes | Output |
| --- | --- | --- | --- | --- |
| orchestrator (main session) | plan, delegate, judge results, run gates, keep memory, replan | what it needs | `graph.yaml`, `docs/memory/`, `docs/reviews/`, small fast-lane changes | stop summary |
| `implementer` | one task (content, theme, config, CI, tooling) with its docs | its brief, `AGENTS.md`, `state.md`, its files | the task's files, `out/work/<id>/` | implementer report |
| `reviewer` | find why theme / layout / CI work is wrong | brief, diff, files, screenshots | nothing (read-only) | verdict and defects |
| `content-reviewer` (Sonnet) | check facts, tone and English of written content | brief, diff, sources (`cv.yml`, `papers.bib`) | nothing (read-only) | verdict and defects |
| `worker` (Sonnet) | answer ONE question (visual check, build + site check, a measurement) in ≤ 15 turns | the question and its paths | `out/work/<task>/` only | a few lines, fixed format |
| owner (`human`) | decisions, visual judgement, facts about themself, commits and deployment | — | — | approval |

No planner, architect, tester or memory agent: the orchestrator plans, `AGENTS.md` holds the
rules, a script validates, closing a task keeps the memory.

## Orchestrator protocol

1. **Read the state**: `docs/memory/state.md`, `python3 tools/tasks.py status`, `check`. Review
   tasks left `in_progress`, `review` or `failed` by an interrupted session (`git status` tells
   what was really produced): resume, set back to `todo`, or close.
2. **Plan** (new objective or replan): split into tasks that fit one agent session, each with a
   goal, **checkable** success criteria, failure criteria, files, context references and
   validation commands. Default validation of any task touching the site:
   `tools/build.sh` then `python3 tools/check_site.py`. Run `check`.
3. **Choose**: `ready`. A batch = tasks without a shared file: they may run in parallel (2
   sub-agents at most, D-004). `human` tasks are asked to the owner, never simulated (facts about
   the owner, visual taste, deployment settings).
4. **Delegate**: set `in_progress`, give the sub-agent the output of `context <id>` (and nothing
   beyond what it points to). Role not found (created during the session): `general-purpose`
   told to read `.claude/agents/<role>.md` first. The orchestrator may do a small task itself;
   the review stays with a distinct agent.
5. **Judge the report**: status, files really modified (`git status`), screenshots produced. A
   « done » report without a gate seen is worth nothing.
6. **Gate**: `python3 tools/tasks.py verify <id>` (cheap and objective: no point reviewing work
   that does not build). Only a passed gate with the task's current commands allows `done`;
   after a fix, run `verify` again.
7. **Review** if `review_required`: `reviewer` for theme / layout / CI / tooling, `content-reviewer`
   for text; give it the brief, the diff (including `graph.yaml`) and the screenshot paths. Save
   the report as `docs/reviews/<id>-<n>.md` and add the `reviews` entry. `changes`: fixes, new
   gate, new review (2 rounds at most). Fixes after a review go to a **fresh** agent (review
   file, handoff, file list), never to the original agent resumed. After an `accept`, the
   orchestrator may apply the reviewer's suggestions itself only for a faithful copy within the
   task's `files`, noted in `attempts`.
8. **Close**: `attempts` (outcome, summary), `results`, `handoff`; then the memory according to
   `docs/memory/README.md` (persist only what will serve); `check`.
9. **Continue or stop** (below).

## Fast lane

A text fix, a CV or publication update, a configuration value or a documentation change without
new logic (≈ 20 lines) is done directly by the orchestrator: search what it touches first
(`grep -rn` in `_pages/`, `_includes/`, `_data/`, `docs/`), then the build and the site check,
screenshots if anything visible moved, and the summary to the owner. No sub-agent nor reviewer:
the owner's review is enough. After each commit of the owner, suggest a fresh session (`/clear`):
the memory is in the repository and the context cost grows with the session's length
(`docs/agents/context-cost.md`). Every stop summary gives, below the proposed commit message, the
`/objective …` command to copy for the fresh session: remaining tasks in order, decisions already
taken by the owner, review files to follow.

## Limits and stop conditions

| Situation | Action |
| --- | --- |
| gate or review failed | new attempt with the cause in the brief (`attempts` are part of it) |
| review `reject`, or approach obviously wrong | **replan**: revise the breakdown or approach, attempt `replan` with the reason (resets the failure count, once per task) |
| `max_attempts` failures (2 by default) since the last replan | `blocked`: owner decides |
| 2 review rounds without `accept` | `blocked`: owner decides |
| failure criterion of the task reached | stop the task, report, replan or `blocked` |
| `stop` condition of the objective | stop the objective, ask the owner |
| decision that belongs to the owner (a fact about them, tone, visible design default, anything that goes public) | stop and ask, never choose for them |
| **objective reached** (its `success` criteria checked) | **stop**: summary, files modified, screenshots to look at, proposed commit message; the owner commits and pushes (D-002) |

No endless loop: at most 2 attempts per task, 2 review rounds, 2 simultaneous sub-agents (D-004);
beyond, the owner decides. **Pace**: stop after a few tasks so the owner can review and commit.

**Before/after at every visual stop**: build the site before the change (`git archive HEAD`
into a temporary folder, then `tools/build.sh <dir>`) and after, take the same pages with
`tools/screenshot.sh out/work/<task>/before|after <pages>`, and give the owner the paths. The
owner can also run `docker compose up` and look live.

## Parallelism

Sub-agents of a same batch work in the same working tree (no worktree: without commits, merging
a worktree back costs more than it saves). The guarantee is the `files` field: two tasks of a
batch share no file. Only writes are declared: a task that **reads** what another one modifies
(a review, for instance) goes through `depends_on`. Each agent builds into its own folder
(`out/work/<task>/site`). A task that discovers it must touch a file outside its list stops and
says so. Only one Docker build at a time.

## Atomic delegation (context cost, D-004)

A session re-reads its whole context at every turn: its cost grows with the square of the number
of turns (`docs/agents/context-cost.md`). Noise (screenshots, build logs, trials) therefore goes
into short calls with a fresh context, and only their answer comes back.

- **Worker**: launched by the orchestrator for a single question, with the useful paths and an
  `out/work/<task>/` folder. One level only: a sub-agent does not launch sub-agents.
- **Worker requests**: a role that needs to look at more than 3 images or run a long check lists
  it under « Worker requests » in its report (question, paths, expected format) and hands back.
  The orchestrator launches the workers, then resumes the role with the answers (`SendMessage`).
- **Before a visual review**, the orchestrator may run the visual check as a worker and hand its
  verdict to the reviewer, which stays text-only.

## Sub-agent context

A sub-agent receives `context <id>`: goal, criteria, files, validation, what its dependencies
hand over (`handoff`), its previous attempts and reviews, and only the chosen references (`D-`,
`P-`, document sections). It also reads `AGENTS.md` and `state.md`. It does not read the whole
documentation: if information is missing, the task must be completed.

## Observability: where to see what

| Question | Where |
| --- | --- |
| what is going on, what is waiting? | `python3 tools/tasks.py status` |
| why was this task redone or replanned? | the task's `attempts` |
| what did the reviewer say? | `docs/reviews/` and the task's `reviews` |
| did the gate really pass? | the task's `gates` and the log in `out/gates/`; `tools/tasks.py fresh <id>`: does it cover the current tree? |
| why this choice? | `docs/memory/decisions.md` |
| has this already bitten us? | `docs/memory/pitfalls.md` |
