---
layout: post
title: "Fractal Flowers Generator — L-System / DOL-System (2D/3D)"
description: A from-scratch fractal flora generator built on Lindenmayer systems, written in Java without any external procedural-generation library.
tags: java swing javafx procedural-generation l-system
categories: student-project
thumbnail: assets/img/projects/project3/p1.png
giscus_comments: false
date: 2021-06-01
featured: false
---

This was my first substantial programming project, and the one that got me hooked on software design and 3D engines.

The goal: generate plausible-looking flora — flowers, branching stems, leaves — procedurally, using **Lindenmayer systems (L-systems / DOL-systems)** rather than hand-modeled assets. An L-system rewrites a starting symbol through a set of production rules over successive generations; interpreting the resulting string as turtle-graphics instructions produces fractal, self-similar branching structures that look organic almost for free.

{% include figure.liquid path="assets/img/projects/project3/p1.png" class="img-fluid rounded z-depth-1" %}

### What I built

- A 2D renderer (Java Swing) that interprets L-system grammars into turtle-graphics fractal shapes.
- An early-stage 3D engine (JavaFX) to extend the same grammars into three dimensions — the harder and still work-in-progress part of the project.
- The rule engine and string-rewriting logic entirely from scratch, with no external procedural-generation library.

{% include figure.liquid path="assets/img/projects/project3/p2.png" class="img-fluid rounded z-depth-1" %}

### What I learned

This project was also my introduction to object-oriented programming in Java, and to thinking in terms of modular, extensible code structures rather than one-off scripts. Devising the grammar/rewriting algorithm myself — instead of relying on an existing library — was the most rewarding part: it forced me to actually understand *why* L-systems produce fractal structures, not just how to call an API that does it.

<div class="row">
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/projects/project3/p3.png" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/projects/project3/p4.png" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

**Stack:** Java, Swing, JavaFX.
**Code:** [github.com/VendenIX/Generateur-de-flore-video-ludique](https://github.com/VendenIX/Generateur-de-flore-video-ludique)
**Demo video:** [youtube.com/embed/SIk_-tes1vU](https://www.youtube.com/embed/SIk_-tes1vU)
