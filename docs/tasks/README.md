# Task graph

`graph.yaml` is the single source of objectives and of current or upcoming tasks.
`tools/tasks.py` reads and checks it; it writes it only to record a gate (`verify`). Protocol:
`docs/agents/orchestration.md`.

```bash
python3 tools/tasks.py status            # overview (--all: with finished tasks)
python3 tools/tasks.py ready             # ready tasks, in parallel batches
python3 tools/tasks.py layers            # graph levels
python3 tools/tasks.py context <id>      # targeted brief for an agent
python3 tools/tasks.py verify <id>       # gate, log in out/gates/
python3 tools/tasks.py fresh <id>        # does the last gate cover the current tree?
python3 tools/tasks.py check             # run after every edit of the file
```

## Objective

`id`, `goal`, `status` (`active`, `paused`, `done`, `dropped`), `success` (overall criteria),
`stop` (stop conditions without success). Only tasks of active objectives are offered by `ready`.

## Task

| Field | Role |
| --- | --- |
| `id` | lowercase and dashes, never reused |
| `objective`, `title`, `goal`, `description` | what and why |
| `agent` | `implementer`, `reviewer`, `content-reviewer`, `worker`, `orchestrator` or `human` |
| `scope` | area of the site: `content`, `theme`, `config`, `ci`, `tooling`… |
| `priority` | 1 high, 2 normal, 3 low |
| `status` | see below |
| `depends_on` | tasks to finish first |
| `success`, `failure` | success criteria; failure criteria that require stopping and reporting |
| `files` | files or folders the task modifies; two tasks sharing a file never go in the same batch |
| `context` | references given to the agent: `D-NNN`, `P-NNN`, `path` or `path#start of a heading` |
| `validation` | shell commands run from the root by `verify` (default for the site: `tools/build.sh` then `python3 tools/check_site.py`) |
| `review_required` | an accepted review is required before `done` |
| `max_attempts` | failures allowed before blocking (2 by default) |
| `attempts` | history: date, agent, outcome (`success`, `failure`, `replan`, `abandoned`), summary |
| `reviews` | review reports (`docs/reviews/…`) and verdict (`accept`, `changes`, `reject`) |
| `gates` | results of `verify` (written by the tool) |
| `results` | what was produced |
| `handoff` | what the next tasks must know (included in their context) |

## States and rules enforced by `check`

`todo` -> `in_progress` -> (`review`) -> `done`; or `failed` (new attempt), `blocked` (owner
decision awaited), `dropped` (abandoned, reason in `attempts`).

- `done` requires `results`, finished dependencies, a last passed gate with the current
  commands if the task has some, and a last `accept` review (report in `docs/reviews/`) if
  `review_required`. **A task is not finished because an agent says so.**
- As many failures as `max_attempts` since the last `replan`: `blocked`, or replan (once).
- A started task has its dependencies produced (`review` or `done`); no task in progress in an
  inactive objective; a `done` objective has no open task.
- An open task does not depend on a dropped task or on a paused objective.
- An `implementer` task of an active objective declares its `files`; `ready` forms batches of 2
  tasks at most without a shared file.
- No cycle, no unknown dependency, reference (file and heading) or report; no duplicate id.

## Writing the file

The format is the one of `yaml.safe_dump`, without comments: `verify` re-reads the file under a
lock right before writing (an edit made during a long build is not lost), then rewrites it
atomically. A gate keeps the hash of its commands (`commands`: a gate whose commands changed is
stale) and of the tree state (`tree`). `gates` is written only by `verify`; `reviews` only by the
orchestrator, with the reviewer's report saved in `docs/reviews/`. Quote any value containing
« : » (otherwise YAML reads a key), then run `check`.
