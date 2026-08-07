---
layout: post
title: "AI vs. AI — Virus Infection Battle with Minimax / Alpha-Beta Pruning"
description: A two-player board game where two AI agents fight it out using Minimax and Alpha-Beta Pruning at configurable search depths, visualizing how search depth shapes strategy.
tags: java artificial-intelligence minimax alpha-beta-pruning game-theory
categories: student-project
thumbnail: assets/img/projects/project4/p1.png
giscus_comments: false
date: 2022-06-01
featured: false
---

"Virus Infection Battle" pits two AI agents against each other on a 7×7 grid, each using **Minimax with Alpha-Beta Pruning** at a configurable search depth. The interesting part isn't the game itself — it's watching how search depth changes an agent's behavior, and visualizing the number of nodes explored and iterations run by each algorithm as the depth increases.

{% include figure.liquid path="assets/img/projects/project4/p1.png" class="img-fluid rounded z-depth-1" %}

### Rules

Two players, Red and Blue, start with two tokens each on a 7×7 grid (Blue moves first). On a turn, a player can:

- **Clone** a token to an adjacent empty cell, or
- **Jump** a token two cells away, passing over other tokens.

Any opponent token adjacent to a cloned or jumped-to cell flips to the active player's color. If a player has no legal move, they pass. The game ends when a player has no tokens left, both players pass consecutively, or a board state repeats — the winner is whoever has more tokens.

{% include figure.liquid path="assets/img/projects/project4/p2.gif" class="img-fluid rounded z-depth-1" %}

### Why it was interesting

Implementing Minimax and Alpha-Beta Pruning from first principles — rather than using a game-AI library — made the classic trade-off between search depth and computation cost tangible: deeper search produces visibly smarter play, but the explored-node count grows fast enough that pruning stops being optional.

**Stack:** Java, custom Minimax/Alpha-Beta implementation.
**Code:** [github.com/VendenIX/JeuInfection](https://github.com/VendenIX/JeuInfection)
**Demo video:** [youtube.com/embed/oQxr1ursKIU](https://www.youtube.com/embed/oQxr1ursKIU)
