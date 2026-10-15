# Project state

Updated 2026-10-15. Short by principle (60 lines at most): details are in the linked files.

## In one sentence

Personal academic portfolio (Jekyll, al-folio), migrated from React on 2026-08-07 (D-001),
online at <https://vendenix.github.io/portfolio/>; content is up to date as of the CV update of
2026-10-15.

## By area

| Area | State |
| --- | --- |
| About page | bio rewritten 2026-08-07 (contract at Centre François Baclesse over, looking for a CIFRE PhD / research engineer position); CV carousel as a click-to-reveal easter egg (D-007) |
| CV | `_data/cv.yml` + PDF `assets/pdf/cv_romain_andres_data_scientist.pdf`, updated 2026-10-15 (XAI paper published in JIIM, online 2026-10-13, DOI link, code link VendenIX only) |
| Projects | 7 posts in `_posts/` (2021 → 2025) |
| Publications | `_bibliography/papers.bib` (NeuroImage 2025 co-first author; XAI glioblastoma first author, JIIM 2026, online 2026-10-13, doi 10.1007/s10278-026-02381-5); the project post follows the published paper |
| Theme | al-folio, W3C-clean production output since 2026-08-09 (P-005, P-006) |
| CI / deployment | every push to `main` deploys (`.github/workflows/main.yml`, checked on the Actions history 2026-10-15); owner's routine: `portfolio publish` (D-009) |
| Agent system | set up 2026-10-15 (D-003): roles, task graph, memory, gates (`tools/`) |

## Next steps

Objective `jiim-publication` done (2026-10-15): site and CV PDF switched to the published JIIM
article (the owner regenerates the PDF outside the repository; replaced 2026-10-15).

## Environment

- Linux PC; Docker with the image `amirpourmand/al-folio:latest`; gems cached in the Docker
  volume `portfolio_bundle` (created by `tools/build.sh`).
- `python3` + PyYAML for `tools/tasks.py`; `google-chrome` for `tools/screenshot.sh`.
- The CV carousel images are generated outside this repository
  (`diffusion_pp_animation/src/cv_carousel.py`, `face_morph.py`).
