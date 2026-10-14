# Known pitfalls

What already cost time. Format: symptom, cause, fix, where. Read before touching the area, and
when something fails.

## Images

### P-001 · Responsive `.webp` variants missing online · `ci` `assets`
Symptom: broken `<picture><source>` images on the live site, fine locally. Cause: GitHub's
`ubuntu-latest` moved to 24.04 without ImageMagick, so `jekyll-imagemagick` silently skipped the
`-480/-800/-1400.webp` variants. Fix: ImageMagick installed explicitly in
`.github/workflows/main.yml`. Also: animated GIFs are excluded from `imagemagick.input_formats`
(frames resized independently give a garbled still); they are served as-is. Source: commit
649c2fd7, `_config.yml`.

### P-002 · Image broken until refresh on cold loads · `design`
Cause: the `onerror` fallback of `_includes/figure.liquid` used a page-wide jQuery selector, not
yet loaded on a cold load. Fix: vanilla JS scoped to the current `<picture>`. Do not reintroduce
a jQuery dependency in inline handlers. Source: commit 649c2fd7.

## Build and local environment

### P-003 · Root-owned `_site/`, `.jekyll-cache/`, `Gemfile.lock` · `stack`
The dev container writes them as root: a plain `rm -rf` fails. Clean through the container
(`README.md`) and build with `tools/build.sh`, which mounts the repository read-only and writes
to `out/` as the current user. Note: the container image ships without the gems; they are
installed at start (`bin/entry_point.sh` deletes `Gemfile.lock`) or cached in the
`portfolio_bundle` volume by `tools/build.sh`.

### P-004 · `docker-compose` fails with a Python `distutils` traceback · `stack`
The standalone v1 binary is broken on recent Python: use the plugin `docker compose` (no
hyphen). Changing `_config.yml` restarts the whole Jekyll process (≈ 10–15 s). Source: `README.md`.

## HTML validity

### P-005 · `jekyll-minifier` injects its own charset meta · `design`
It adds `<meta http-equiv="Content-Type" … charset=UTF-8>` to every page whatever the
configuration, and it cannot be disabled from `_config.yml` (loaded through the Gemfile's
`jekyll_plugins` group): never add a second charset declaration. Other W3C traps fixed once:
`defer` on `<link>`, `media="none"` (use `not all`), `<div>` inside `<progress>`, `<img>`
without `src` (lazy frames get a 1×1 data-URI GIF), heading levels skipped. Source: commits
37021283, aadbcefa.

### P-006 · A W3C fix silently removed the only sizing of `.preview` images · `design`
Removing `width="100%" height="auto"` from `figure.liquid` was fine for `img-fluid` / `card-img*`
callers (sized by Bootstrap CSS) but broke the publication thumbnails: the `.preview` class was
empty, so those attributes were their only sizing. Fix: real CSS on `.preview`. Lesson: when
patching a shared include, `grep -rn` every caller and look at each page. Source: commit 9b3ae636.

## Agents

### P-007 · Destructive git commands in a shared tree · `git` `agents`
Several agents (and the owner) work in the same uncommitted tree: `git stash`, `git checkout --`,
`git reset`, `git restore` destroy someone else's work. Compare with HEAD through
`git show HEAD:<path>` or `git archive HEAD | tar -x -C <tmp>`. Source: SynthPed P-027.

### P-008 · Jekyll publishes every file it does not exclude · `stack` `agents`
Markdown under `docs/` would become public pages, and `tools/`, `AGENTS.md`, `CLAUDE.md`,
`out/` would be copied into the site. They are listed in `exclude` of `_config.yml` (dot folders
such as `.claude/` are skipped by Jekyll anyway). Any new internal folder goes there too;
the gate of `agentic-setup` checks it. Local builds would also publish untracked files such as
the owner's `commands.txt` (gitignored, hence absent from the CI build): excluded as well.
