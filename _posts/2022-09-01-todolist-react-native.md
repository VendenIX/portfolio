---
layout: post
title: "Todolist App — React Native with a GraphQL REST/CRUD API"
description: A React Native to-do list app and my first hands-on project with React, component-based architecture, and talking to a database through a GraphQL API.
tags: react-native graphql node.js mobile
categories: student-project
thumbnail: assets/img/projects/project2/p1.png
giscus_comments: false
date: 2022-09-01
featured: false
---

My first foray into the React ecosystem. A simple premise — a to-do list mobile app — but it was the project where the core ideas of React actually clicked: component-based architecture, unidirectional data flow, and how a UI re-renders from state rather than being manually mutated.

{% include figure.liquid path="assets/img/projects/project2/p1.png" class="img-fluid rounded z-depth-1" %}

### What I built

- A **React Native** front-end for creating, completing, and deleting tasks.
- A **Node.js + GraphQL** backend exposing CRUD operations, backed by a database — my first time wiring a mobile app to persistent storage rather than local state.
- Full round-trip data flow: mutations from the app, queries to refresh the list, and error handling around the API calls.

<div class="row">
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/projects/project2/p3.png" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/projects/project2/p4.png" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

### Why it mattered

Small in scope, but foundational: it's the project that taught me to reason about REST/GraphQL APIs and CRUD operations, and gave me enough React fluency to later work as a front-end developer at Atlas Music (Assas Lab Incubator, Paris) and on the medical-imaging interfaces described in later posts.

**Stack:** React Native, GraphQL, Node.js.
**Code:** [github.com/VendenIX/Todolist-react-native](https://github.com/VendenIX/Todolist-react-native)
**Demo video:** [youtube.com/embed/tkCRqmgGa4Q](https://www.youtube.com/embed/tkCRqmgGa4Q)
