---
layout: post
title: "MetIA — Deploying a Deep Learning Interface for Brain Metastases Segmentation"
description: Deployment and optimization of a UNETR-based deep learning pipeline for automatic brain lesion segmentation on MRI, integrated into the OHIF Viewer at Centre François Baclesse.
tags: deep-learning medical-imaging ohif unetr flask mlops
categories: research-internship
thumbnail: assets/img/projects/project1/screenPicture.gif
giscus_comments: false
date: 2024-06-01
featured: true
---

In radiotherapy treatment planning, clinicians manually contour the brain lesions to be treated on MRI — a slow, repetitive task. A deep learning model developed during an earlier Master's project at IDM Caen offered a way to automate this delineation; my job was to take that model out of the lab and into clinical practice.

As a **Research and Development Intern — Medical AI** at the Centre François Baclesse (27/05/2024–05/07/2024), under the supervision of Dr. Corroyer-Dulmont (Head of AI and Medical Imaging Engineer at CFB), I built the visualization interface and API around the model and got it running on the center's infrastructure.

{% include figure.liquid path="assets/img/projects/project1/screenPicture.gif" class="img-fluid rounded z-depth-1" %}

### What I did

- Deployed, finalized, and optimized an interface based on the **OHIF Viewer** and its API on the center's Windows environments — the ML Ops side of shipping a deep learning solution into a clinical workflow.
- Optimized the deep learning model to reduce its computational cost.
- Retrained the model on a new dataset.
- Built the API layer (Flask) connecting the OHIF front-end to the segmentation model.

<div class="row">
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/projects/project1/unetr2.drawio.png" class="img-fluid rounded z-depth-1" caption="UNETR architecture used for segmentation." %}
  </div>
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/projects/project1/zoomIn.gif" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

### Skills strengthened

Working with DICOM and NIfTI-format MRI/CT data end-to-end, understanding a complex neural architecture (UNETR) well enough to retrain and optimize it, and adapting a research prototype to a clinical, multi-OS deployment environment.

### Published outcome

This work fed directly into a peer-reviewed publication: I'm co-first author on *["Development and routine implementation of a deep learning algorithm for automatic brain metastases segmentation on MRI for RANO-BM criteria follow-up"](https://doi.org/10.1016/j.neuroimage.2025.121002)*, published in **NeuroImage**, Volume 306 (2025). See the [publications page]({{ '/publications/' | relative_url }}) for the full reference.

**Stack:** Python, Flask, OHIF Viewer, DicomWeb, PyTorch, UNETR.
**Code:** [github.com/VendenIX/BrainMetaSegmentatorUI-Front](https://github.com/VendenIX/BrainMetaSegmentatorUI-Front)
**Demo video:** [youtube.com/embed/WYHO6ywtnE4](https://www.youtube.com/embed/WYHO6ywtnE4)
