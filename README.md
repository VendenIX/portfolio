# Romain Andres — Portfolio

Personal academic/research portfolio, built with [Jekyll](https://jekyllrb.com/) on the [al-folio](https://github.com/alshedivat/al-folio) theme (MIT licensed). Live at **[vendenix.github.io/portfolio](https://vendenix.github.io/portfolio/)**.

## Stack

Jekyll (Ruby) + Liquid templates + SCSS. No Node/React involved — content lives in Markdown/YAML/BibTeX, not JS components. Local development runs entirely through Docker, no Ruby install required.

## Running locally

```bash
docker compose up
```

Then open **http://localhost:8080/portfolio/**. The first start installs the Ruby gems inside the container (~15–30s); subsequent starts are faster. The site auto-rebuilds on file changes (a few seconds), except `_config.yml`, which restarts the whole Jekyll process (~10–15s).

Stop with `Ctrl+C`, then:

```bash
docker compose down
```

If `docker-compose` (the standalone binary) errors out with a Python `distutils` traceback, use `docker compose` (the plugin, no hyphen) instead — that's what's used throughout this repo.

### Cleaning build artifacts

The container writes `_site/`, `.jekyll-cache/`, `.sass-cache/`, and `Gemfile.lock` as `root`, so a plain `rm -rf` from the host may fail with a permission error. If that happens:

```bash
docker run --rm -v "$(pwd)":/srv/jekyll -w /srv/jekyll amirpourmand/al-folio:latest \
  rm -rf _site .jekyll-cache .sass-cache Gemfile.lock
```

(All of these are gitignored — this is only about keeping the working directory tidy.)

## Adding / editing content

| What | Where | Notes |
|---|---|---|
| New project write-up | `_posts/YYYY-MM-DD-slug.md` | One file per project. Copy an existing post as a template (front matter: `title`, `description`, `date`, `tags`, `categories`, `thumbnail`). Images go in `assets/img/projects/<slug>/`. |
| Bio / home page | `_pages/about.md` | Front matter controls the profile photo/subtitle; body is free Markdown. |
| CV | `_data/cv.yml` | Structured Education/Experience/Skills blocks — no HTML to touch. |
| CV PDF download | `assets/pdf/` | Replace the file, then update `cv_pdf:` in `_pages/cv.md` if the filename changes. |
| Publications | `_bibliography/papers.bib` | Standard BibTeX; extra fields like `preview`, `abbr`, `selected` are al-folio-specific. |
| Nav pages (cv/publications/projects) | `_pages/*.md` | Front matter only (`title`, `nav_order`, `description`) — avoid touching the Liquid body unless you mean to. |

## Deployment

`.github/workflows/main.yml` (GitHub Actions → Pages) is in place but **not yet active** — the repo's GitHub Pages source is still set to "Deploy from a branch" (`gh-pages`), left over from the previous React version. To go live with this version: merge into `main`, then switch **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.

## License

The theme (layouts, includes, SCSS, plugins) is [al-folio](https://github.com/alshedivat/al-folio), MIT licensed — see `LICENSE`. All content (bio, CV, projects, publications) is Romain Andres's own.
