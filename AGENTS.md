# AGENTS.md: common rules

Every agent reads this file, then `docs/memory/state.md` (state, priorities), then what its task
points to: decisions (`docs/memory/decisions.md`) and pitfalls (`docs/memory/pitfalls.md`) of the
subject. Project memory: `docs/memory/README.md`; tasks: `docs/tasks/graph.yaml`; how agents
work together: `docs/agents/orchestration.md`.

**What this repository is**

Romain Andres's personal academic portfolio, live at <https://vendenix.github.io/portfolio/>.
Jekyll on the al-folio theme (MIT). Audience: research labs, CIFRE PhD supervisors, recruiters
in AI for medical imaging. Tone: sober and academic (D-007).

**Stack**

- Jekyll (Ruby) + Liquid templates + SCSS; no Node/React. Content in Markdown, YAML and BibTeX.
- Local development through Docker only (`docker compose up`, <http://localhost:8080/portfolio/>);
  no local Ruby required.
- Deployment: GitHub Actions (`.github/workflows/main.yml`) on push to `main` → GitHub Pages;
  the owner publishes with `portfolio publish` (`tools/portfolio`, D-009).
- Agent tooling: Python 3 standard library + PyYAML (`tools/`), nothing else.

**Where content lives** (see also `README.md`)

| What | Where |
| --- | --- |
| project write-up | `_posts/YYYY-MM-DD-slug.md`, images in `assets/img/projects/<slug>/` |
| bio, profile photo, CV carousel | `_pages/about.md` (front matter `profile.carousel`), `assets/img/cv_carousel/` |
| CV | `_data/cv.yml`; PDF in `assets/pdf/` (`cv_pdf:` in `_pages/cv.md`) |
| publications | `_bibliography/papers.bib` (`preview`, `abbr`, `selected` are al-folio fields) |
| theme | `_layouts/`, `_includes/`, `_sass/`, `assets/js/` (al-folio code, modified with care) |
| site configuration | `_config.yml` (changing it restarts the dev server) |

**Content rules**

- Facts about the owner (dates, employers, co-authors, results, status) come from the owner or an
  existing source in the repository (`_data/cv.yml`, `papers.bib`, the CV PDF), never invented.
  A fact that cannot be sourced is asked, not guessed.
- Site content is in English (D-005); co-author names exactly as in the publication.
- No private data beyond what the owner already publishes (contact email of `_config.yml`, no
  phone number, no home address).
- Third-party images, fonts or code: licence compatible with publication, credited.

**Theme and HTML rules**

- Production output must stay W3C-valid HTML (P-005, P-006): no invalid attribute values,
  `<img>` always with `src`, no `defer` on `<link>`.
- Images: compress before committing (D-008); animated GIFs bypass the responsive `.webp`
  pipeline (P-001); a sizing that relied on HTML attributes moves to CSS (P-006).
- Mobile first: every layout change is checked at phone width (≈ 375 px) and desktop.
- Light and dark themes both checked for any colour or style change.
- Prefer the smallest change in the al-folio code; note why in the commit when the theme is
  patched, so a future theme update can be merged.

**Git and deployment**

- **No agent runs `git commit`, `git push`, creates a branch or triggers a workflow** (D-002).
  The owner reviews each step, commits and pushes: a push to `main` publishes the site. Agents
  may run `portfolio build`, `status` and `shots`, never `portfolio publish`.
- No destructive git command in the shared tree: never `git stash`, `git checkout -- <file>`,
  `git reset`, `git restore` (P-007). Compare with HEAD through `git show HEAD:<path>`.
- A task is finished only when its validation passes (`python3 tools/tasks.py verify <id>`): the
  production build (`tools/build.sh`) and the site check (`tools/check_site.py`).
- A visual change provides before/after screenshots (desktop + phone, light + dark when
  relevant) in `out/work/<task>/`, looked at by a distinct agent (`.claude/agents/reviewer.md`).

**Language (D-005)**

- Code, comments, documentation, memory, reviews and task graph in English.
- Messages to the owner in French.

**Context budget (D-004)**

- A session re-reads its whole context at every turn: cost grows with the square of the number
  of turns. Budgets: implementer 80 turns, reviewer 40, content-reviewer 30, worker 15; beyond,
  hand over and report partially.
- At most 2 sub-agents at once; fixes after a review go to a fresh agent; cheaper model
  (Sonnet) for workers, content reviews and mechanical tasks (`docs/agents/context-cost.md`).

**Commands**

```bash
docker compose up                       # dev server, http://localhost:8080/portfolio/
portfolio build                         # production build (as the CI) + site check
tools/build.sh                          # production build only -> out/site/
python3 tools/check_site.py             # broken internal links / images in out/site/
python3 tools/tasks.py check            # task graph health
python3 tools/tasks.py status           # what is going on
```
