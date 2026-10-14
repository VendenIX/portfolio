# Project memory

Memory shared by every agent and every machine: it lives in the repository, not in `~/.claude/`
(specific to one machine, hence lost from one computer to another).

| File | Content | When to read it |
| --- | --- | --- |
| `state.md` | current state, priorities, next steps, environment | **always**, first (short) |
| `decisions.md` | dated decisions (context, decision, consequences, source) | when a task touches the subject (tags) |
| `pitfalls.md` | errors and traps already met: symptom, cause, fix | before touching the area, and when something fails |
| `../tasks/graph.yaml` | current and upcoming tasks, dependencies, attempts | orchestrator; an agent receives only its task |
| `../reviews/` | reviewers' reports | when resuming a reviewed task |

Elsewhere, unchanged:

- `AGENTS.md`: common rules; the law of the repository.
- `README.md`: how to run the site and where each kind of content lives.
- `docs/agents/`: how the agents work together (`orchestration.md`, `context-cost.md`).
- Commit messages: the detailed history of each change (`git log`).

## Persistence rule (avoid noise)

Write only what will serve a future agent:

- a **decision** of the owner, or a trade-off that constrains what follows -> `decisions.md`;
- a **bug** whose cause was not obvious, or a trap that can come back -> `pitfalls.md`;
- a change of **state** (step finished, priority changed) -> `state.md` and `graph.yaml`.

Do not write: implementation details (the code and git keep them), what only matters to the
current session, a repeat of another file (link to it).

## Update when closing a task (orchestrator)

1. `graph.yaml`: status, results, handoff to next tasks, attempt.
2. `state.md`: only if the overall state or the next steps change.
3. New decision or pitfall: one entry, with the date and the source.
4. Stay short: `state.md` fits in 60 lines; an entry fits in a few lines.

## Identifiers

Decisions `D-NNN`, pitfalls `P-NNN`, tasks in lowercase with dashes (`cv-mobile-dates`). An
identifier is never reused; a replaced decision stays, with « replaced by D-NNN ».
