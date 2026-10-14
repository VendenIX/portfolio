#!/usr/bin/env bash
# Production build of the site, as the CI does it, without touching the working tree:
#   tools/build.sh [out_dir]          # default: out/site
# The repository is mounted read-only and copied inside the container; gems are cached in the
# Docker volume `portfolio_bundle` (first run: network + a few minutes, then ~1 min). The output
# is owned by the current user (no root-owned _site/ or .jekyll-cache/, P-003).
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
out="$(realpath -m "${1:-$root/out/site}")"
mkdir -p "$out"
docker run --rm \
  -v "$root":/src:ro -v portfolio_bundle:/usr/local/bundle -v "$out":/site \
  -e JEKYLL_ENV=production \
  amirpourmand/al-folio:latest bash -c '
    set -e
    mkdir /work && cd /src
    tar --exclude=./.git --exclude=./_site --exclude=./.jekyll-cache --exclude=./.sass-cache \
        --exclude=./out -cf - . | tar -xf - -C /work
    cd /work
    bundle install --quiet
    rm -rf /site/* && bundle exec jekyll build --baseurl /portfolio -d /site 2>&1 \
      | grep -v "Filtering out legacy" ; status=${PIPESTATUS[0]}
    chown -R '"$(id -u):$(id -g)"' /site
    exit "$status"'
echo "built: $out"
