# Context cost of agents and atomic delegation

Rules carried over from the SynthPed project (same owner), where they were measured on several
thousand sub-agent turns (its decisions D-024 and D-030). Decision here: D-004.

## 1. The mechanism: a session re-reads everything, at every turn

A model has no memory between two turns: the conversation is its only state. At every turn it
re-reads its whole context from the cache: brief, files read, command outputs, images, its own
answers. Cached reads are about 10 times cheaper than fresh ones, but everything that entered the
context is paid again until the end of the session.

If the context grows by g tokens per turn, a session of n turns re-reads about **g · n² / 2**
tokens: cost grows with the square of the number of turns. A 200-turn session costs about 4
times a 100-turn one.

What SynthPed measured: images cost mostly indirectly (to get one useful screenshot, an agent
builds, crops, looks, retries, and all of it stays in the context); visual checks are
nevertheless indispensable (bugs passed every automatic check); documentary memory is a
negligible share (no RAG needed).

## 2. The strategy: atomic delegation (a call stack)

Like a recursive function call: each call has its own frame, returns a value, and its frame
disappears. The caller sees only the return value.

```
parent agent (small context: plan + references)
   │  « look at these 3 phone screenshots: does the CV overflow? »
   ▼
worker (fresh context: 1 question + 3 images) … 10 turns …
   │
   ▼
return: 3 lines in a fixed format   ← only this text enters the parent's context
```

The parent keeps **references** (paths, `P-NNN`, `D-NNN`, `out/work/…`), not contents.

| Good target (small input, much noise, short output) | Bad target |
| --- | --- |
| visual check: screenshots in, verdict out | understanding the theme to modify it |
| « build, run the site check, return the broken refs » | a change spanning several linked files |
| « weigh these images / pages, return the table » | debugging a problem not yet understood |

## 3. Rules in force

1. **Worker** (`.claude/agents/worker.md`): one question, ≤ 15 turns, no change to the
   repository, a few lines in a fixed format; heavy outputs in `out/work/<task>/`.
2. **Delegated visual checks**: a reviewer or implementer that needs more than 3 images asks a
   worker, through the orchestrator.
3. **Crops rather than boards**: an image is downscaled to ≈ 1.15 Mpx before reading; a crop of
   the useful area at full resolution shows more for the same cost.
4. **Look late**: an image seen at turn 20 of a 200-turn session is re-read 180 times.
5. **Short outputs**: `| tail -n 20`; never print a whole file when a line is enough.
6. **Do not redo**: a reviewer reuses the implementer's builds and screenshots (`out/work/`).
7. **Bounded sessions**: implementer 80 turns, reviewer 40, content-reviewer 30, worker 15;
   beyond, handoff and partial report.
8. **Fixes after a review** go to a fresh agent (review file + handoff + file list), never to the
   long-context original agent resumed.
9. **Model per task**: the session's model for design and theme code; Sonnet for workers,
   content reviews and mechanical tasks (fixed in the agent definitions of `worker` and
   `content-reviewer`; pass `model` in the call for other mechanical tasks).
10. **At most 2 sub-agents at once**; one orchestration session per batch of tasks, then
    `/clear` (or `/compact`) after the owner commits.
