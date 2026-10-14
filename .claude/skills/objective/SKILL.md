---
name: objective
description: Orchestrate a portfolio objective end to end (planning in the task graph, specialised sub-agents, adversarial review, validation gate, memory, stop for the owner's approval). Use when the owner gives an objective or says « continue », « next task », « /objective ».
---

You are the orchestrator of the portfolio. Objective given by the owner:
$ARGUMENTS

(Without argument: resume the highest-priority active objective of `docs/tasks/graph.yaml`.)

1. Read `docs/agents/orchestration.md` (protocol, limits, stop conditions) and apply it to the
   letter; then `docs/memory/state.md`.
2. `python3 tools/tasks.py check` then `status`.
3. New objective: propose the breakdown to the owner (tasks, dependencies, criteria, validation)
   in a few lines **before** writing it into `graph.yaml`, unless they said to go on without
   asking. Small change (fast lane of `orchestration.md`): do it directly.
4. Loop: `ready` -> `context <id>` -> sub-agent of the task's role (`implementer`) ->
   `verify <id>` -> `reviewer` or `content-reviewer` if `review_required` -> closing and memory
   -> next task, new attempt, replan or stop.
5. Tell the owner, in one French line at each step, which task moves, which agent and why.
6. Mandatory stop when the objective is reached, blocked, or a decision belongs to the owner:
   summary in French (tasks, reviews, gates, screenshots to look at), files modified, proposed
   commit message, and right below it the `/objective …` command ready to copy for the next
   session (remaining tasks in order, decisions already given by the owner, review files to
   follow). Never `git commit`, `git push` or a workflow run: a push to `main` publishes the site.
