# Reviews

One file per review round, written by the orchestrator from the reviewer's report:
`<task id>-<n>.md` (`n` = round, from 1), or `<task id>-owner.md` for the owner's verdict.
Referenced from the task's `reviews` in `docs/tasks/graph.yaml` (`tools/tasks.py check` verifies
the file exists). Formats: `.claude/agents/reviewer.md`, `.claude/agents/content-reviewer.md`.
