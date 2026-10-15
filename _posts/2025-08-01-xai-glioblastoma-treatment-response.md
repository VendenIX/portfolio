---
layout: post
title: "Explainability and Clinical Trust of Deep Learning in Glioblastoma Treatment Efficacy Prediction"
description: A multi-layered XAI audit (Grad-CAM, LRP, LIME, input ablation, linear probing) of a ResNet-51q model predicting glioblastoma overall survival, revealing a high-intensity heuristic, with a multi-reader clinical study of its explanations.
tags: explainable-ai deep-learning medical-imaging oncology interpretability
categories: research-internship
thumbnail: assets/img/projects/project6/saliency_evolution_simple_true_positive.gif
giscus_comments: false
date: 2025-08-01
featured: true
---

Deep learning models can predict glioblastoma overall survival from post-operative MRI, but high accuracy can mask reliance on shortcuts. As a **Research and Development Intern in Explainability** at the Centre François Baclesse (03/03/2025–01/08/2025), I worked on a framework to audit *why* such a model makes its predictions, and whether its explanations help clinicians.

{% include figure.liquid path="assets/img/projects/project6/saliency_evolution_simple_true_positive.gif" class="img-fluid rounded z-depth-1" caption="Evolution of the model's saliency map on a true-positive case." %}

### The pipeline

The audited model is a **ResNet-51q** developed in a previous study, which classifies a single post-operative, pre-radiotherapy T1-Gd axial slice as short-term (≤ 332 days) or long-term (> 332 days) overall survival, with a reported test AUC of 0.89. The model was audited, not retrained, on its held-out test cohort. The audit asks three questions:

- **Where does the model look?** Grad-CAM, Layer-wise Relevance Propagation (LRP) and LIME, benchmarked on five quantitative criteria.
- **At what depth does the class become decodable?** Linear probes trained on the intermediate representations of each stage.
- **Is the candidate feature required?** Targeted input ablation of anatomical regions and of the brightest pixels.

A fourth step evaluates the explanations with clinicians: a multi-reader, multi-case study (37 patients, 4 readers, 3 phases, 444 observations: expert alone, expert + AI, expert + AI + XAI heatmaps).

### What we found

The audit revealed a **high-intensity heuristic**. Hyper-intense pixels at the skull periphery, particularly in areas corresponding to the surgical site, anchored "Long-Term" predictions, while in their absence the model defaulted to "Short-Term" based on tumour enhancement. Masking the brightest 5% of pixels reduced the AUC from 0.89 to 0.642, a larger drop than removing the whole tumour (0.826), and linear probing showed class separability (AUC 0.70) already after the initial stem block. One plausible interpretation, which the study could not establish, is that the model recovers the extent of resection from the post-operative image; confirming it would require cohorts stratified by surgical extent.

In the reader study, compared with expert reading alone, accuracy improved with the AI score (OR 1.336, p < 0.05) and with the heatmaps added (OR 1.598, p < 0.01), without a significant increase in confidence (p = 0.561). The average accuracy gain of the heatmaps over the AI score alone was not statistically significant (p = 0.081), but they were associated with a change in how experts used the AI score (interaction p < 0.01) and with fewer patients wrongly called long-term survivors.

During the internship I also explored causal activation patching on the network's internal activations; this exploratory work is not part of the published paper.

### Outcome

Published in *Journal of Imaging Informatics in Medicine* (2026, published online 13 October 2026, open access): *"Explainability and Clinical Trust of Deep Learning in Glioblastoma Treatment Efficacy Prediction: A Comprehensive Framework"*, Romain Andres, Noémie N Moreau, Loïse Dessoude, Loïc Le Henaff, Fernand Missohou, Dinu Stefan, Alexis Desmonts, Romain Herault, Aurélien Corroyer-Dulmont. [doi:10.1007/s10278-026-02381-5](https://doi.org/10.1007/s10278-026-02381-5). See the [publications page]({{ '/publications/' | relative_url }}) for the full reference.

**Stack:** Python, PyTorch, Grad-CAM, LRP, LIME, input ablation, linear probing, GEE.
**Code:** [github.com/VendenIX/GBM-Treatment-Response-XAI](https://github.com/VendenIX/GBM-Treatment-Response-XAI)
