---
layout: post
title: "Explainability and Clinical Trust of Deep Learning in Glioblastoma Treatment Response"
description: A multi-layered XAI pipeline — Grad-CAM, LRP, LIME, linear probing, and causal activation patching — auditing a ResNet-51q model predicting glioblastoma treatment response, and uncovering a spurious shortcut behind its predictions.
tags: explainable-ai deep-learning medical-imaging oncology interpretability
categories: research-internship
thumbnail: assets/img/projects/project6/saliency_evolution_simple_true_positive.gif
giscus_comments: false
date: 2025-08-01
featured: true
---

Deep learning models can predict treatment response in glioblastoma from MRI with strong accuracy — but clinicians won't trust a black box, and they shouldn't. As a **Research and Development Intern in Explainability** at the Centre François Baclesse (03/03/2025–01/08/2025), I built a comprehensive auditing framework to find out *why* one such model was actually making its predictions, and whether that reasoning was clinically sound.

{% include figure.liquid path="assets/img/projects/project6/saliency_evolution_simple_true_positive.gif" class="img-fluid rounded z-depth-1" caption="Evolution of the model's saliency map on a true-positive case." %}

### The pipeline

A multi-layered XAI audit of a **ResNet-51q** model trained to predict long- vs. short-survival treatment response:

- **Grad-CAM** and **LRP** for pixel/region-level saliency.
- **LIME** for local, model-agnostic explanations.
- **Linear probing** to test what information is linearly decodable from intermediate representations.
- **Causal activation patching** to test, interventionally, which activations the prediction actually depends on — not just which ones correlate with it.

### What we found

The audit uncovered that the model was relying on an unexpected heuristic: a **proxy for surgical resection status**. Instead of anchoring its long- vs. short-survival predictions on tumoral features, the model had learned to detect the surgical site itself and use *that* as its main signal. This finding was confirmed through targeted ablation studies and high-resolution saliency maps, and the overall framework was validated in a multi-reader, multi-case clinical study — exactly the kind of shortcut-learning failure mode that makes explainability essential before deploying models like this clinically.

### Outcome

This work is written up as a first-author manuscript, currently under review: *"Explainability and Clinical Trust of Deep Learning in Glioblastoma Treatment Efficacy Prediction: A Comprehensive Framework"* (Andres, R., Moreau, N., Dessoude, L., Le Henaff, L., Missohou, F., Stefan, D., Desmonts, A., Herault, R., & Corroyer-Dulmont, A., 2025). See the [publications page]({{ '/publications/' | relative_url }}) for the full reference.

**Stack:** Python, PyTorch, Grad-CAM, LRP, LIME, linear probing, causal activation patching.
**Code:** [github.com/VendenIX/GBM-Treatment-Response-XAI](https://github.com/VendenIX/GBM-Treatment-Response-XAI)
