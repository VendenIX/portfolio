# Decisions

Dated log, most recent at the bottom. A replaced decision stays, marked « replaced by ».
Tags (to choose a task's context): `stack`, `content`, `design`, `assets`, `git`, `ci`, `agents`.

---

### D-001 · 2026-08-07 · Jekyll + al-folio instead of React · `stack`
The portfolio moved from a Create React App site to Jekyll on the al-folio theme (MIT): content
in Markdown / YAML / BibTeX, no JS components, local development through Docker only. Theme code
(`_layouts/`, `_includes/`, `_sass/`) is al-folio's, patched with care. Source: commit 6187bb65,
`README.md`.

### D-002 · 2026-10-15 · Agents never commit nor publish · `git` `agents`
Agents work in the shared tree on `main` and never run `git commit`, `git push`, create a branch
or trigger a workflow: a push to `main` publishes the site, so every publication is the owner's
act. The owner reviews each step, then commits (directly or through a `fix/…` branch merged into
`main`, see their local `commands.txt`). Source: owner, rule carried over from SynthPed (its D-008).

### D-003 · 2026-10-15 · Lightweight agent system in the repository · `agents`
Same architecture as SynthPed, scaled down to a static site: rules in `AGENTS.md`, roles in
`.claude/agents/` (implementer, reviewer, content-reviewer, worker), orchestration through the
`/objective` skill, task graph `docs/tasks/graph.yaml` checked by `tools/tasks.py`, memory in
`docs/memory/`, reviews in `docs/reviews/`. Not carried over: experimenter and researcher roles
(no experiments nor licence research here), machine split, CPU limiter. Gate = production build
in Docker (`tools/build.sh`) + internal reference check (`tools/check_site.py`). Source: owner
request 2026-10-15; `docs/agents/orchestration.md`.

### D-004 · 2026-10-15 · Context budget of agents · `agents`
Cost of a session grows with the square of its turns: atomic delegation to workers, budgets
(implementer 80 turns, reviewer 40, content-reviewer 30, worker 15), fixes by a fresh agent, at
most 2 sub-agents at once, Sonnet for workers and content reviews. Source: SynthPed D-024 / D-030
(measured there); `docs/agents/context-cost.md`.

### D-005 · 2026-10-15 · Languages · `content` `agents`
Site content in English (the carousel captions were translated from French for that reason,
commit 6bcbfb0e). Code, documentation, memory, reviews and task graph in English; messages to
the owner in French. Source: owner, SynthPed D-031.

### D-006 · 2026-08-09 · Production output must be W3C-valid · `design`
The theme's output was cleaned of every W3C validation error (commit 37021283); a change must
not reintroduce one. Checked on a real production build (`tools/build.sh`), not on the dev
server. Source: commits 37021283, aadbcefa, 9b3ae636.

### D-007 · 2026-08-08 · Sober, academic tone; the CV carousel is an easter egg · `content` `design`
Audience: CIFRE PhD supervisors and research teams. Sixteen rotating CV renderings by default
read as less serious: the profile photo looks static until clicked, then cycles with captions.
Visible playful features stay opt-in. Source: owner feedback, commit 9f91130f.

### D-008 · 2026-08-08 · Images compressed before commit · `assets`
Heavy assets are optimised before they enter the repository (carousel 7.3 MB -> 2.9 MB:
`gifsicle -O3 --lossy=40 --colors 256` for GIFs, palette quantisation for flat PNGs, JPEG
quality 82), each result checked at full size for banding. Source: commit 1151fa12.

### D-009 · 2026-10-15 · One `portfolio` command for the owner's routine · `ci` `git`
The GitHub Pages source is GitHub Actions: every push to `main` deploys (runs of 2026-08-08 and
2026-10-08 checked on the Actions API). Instead of the manual branch / merge / push sequence,
`tools/portfolio` (linked into `~/.local/bin`) offers `dev`, `build`, `shots`, `publish` and
`status`; `publish` builds and checks locally, commits, pushes `main` and follows the workflow run
through the public GitHub API (no `gh` CLI needed). Agents never run `publish` (D-002). Source:
owner request 2026-10-15.
