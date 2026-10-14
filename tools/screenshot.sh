#!/usr/bin/env bash
# Screenshots of built pages (output of tools/build.sh), desktop and phone, light and dark:
#   tools/screenshot.sh <out_dir> [page ...]       # pages relative to the site, default: "" (home)
#   tools/screenshot.sh out/work/my-task/after "" cv/ publications/ blog/
# Env: SITE (built site, default out/site), PORT (default: a free one), CHROME (default
# google-chrome).
# Writes <out_dir>/<page>-<desktop|phone>-<light|dark>.png. The site is served locally under
# /portfolio/ (same baseurl as production), so links and assets resolve as online.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
out="${1:?usage: tools/screenshot.sh <out_dir> [page ...]}"; shift
pages=("$@"); [ ${#pages[@]} -eq 0 ] && pages=("")
site="$(realpath "${SITE:-$root/out/site}")"
port="${PORT:-$(python3 -c 'import socket; s=socket.socket(); s.bind(("127.0.0.1", 0)); print(s.getsockname()[1])')}"
chrome="${CHROME:-google-chrome}"
[ -f "$site/index.html" ] || { echo "no build in $site: run tools/build.sh first" >&2; exit 1; }

serve="$(mktemp -d)"
ln -s "$site" "$serve/portfolio"
python3 -m http.server "$port" --bind 127.0.0.1 --directory "$serve" >/dev/null 2>&1 &
server=$!
trap 'kill $server 2>/dev/null || true; rm -rf "$serve"' EXIT
for _ in $(seq 20); do
  curl -sf -o /dev/null "http://127.0.0.1:$port/portfolio/" && break; sleep 0.25
done
curl -sf -o /dev/null "http://127.0.0.1:$port/portfolio/" \
  || { echo "local server did not start on port $port" >&2; exit 1; }
mkdir -p "$out"

for page in "${pages[@]}"; do
  name="$(echo "${page:-home}" | tr '/' '_' | sed 's/_$//')"
  for device in "desktop 1280,900" "phone 375,812"; do
    set -- $device
    for scheme in light dark; do
      # explicit both ways: without a flag, Chrome follows the desktop theme
      flags=(--blink-settings=preferredColorScheme=1)
      [ "$scheme" = dark ] && flags=(--force-dark-mode --blink-settings=preferredColorScheme=0)
      "$chrome" --headless=new --disable-gpu --hide-scrollbars --no-first-run \
        --user-data-dir="$serve/profile-$scheme" "${flags[@]}" \
        --window-size="$2" --virtual-time-budget=4000 \
        --screenshot="$(realpath -m "$out/$name-$1-$scheme.png")" \
        "http://127.0.0.1:$port/portfolio/$page" >/dev/null 2>&1
    done
  done
  echo "$out/$name-{desktop,phone}-{light,dark}.png"
done
