"""Check a built site (output of tools/build.sh) for broken internal references.

Every `src`, `href`, `srcset` and `poster` of every HTML page that points inside the site
(`/portfolio/...` or a relative path) must resolve to a file of the build. External links are
not fetched (no network in validation). Standard library only.

Usage:
  python3 tools/check_site.py [site_dir]      # default: out/site
"""

from __future__ import annotations

import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
BASEURL = "/portfolio"
ATTRS = {"src", "href", "srcset", "poster", "data-src"}
SKIP_SCHEMES = ("http:", "https:", "mailto:", "tel:", "data:", "javascript:", "#", "//")


class _Refs(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.refs: list[tuple[str, str, int]] = []      # (tag, url, line)

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for name, value in attrs:
            if name not in ATTRS or not value:
                continue
            urls = [part.strip().split()[0] for part in value.split(",") if part.strip()] \
                if name == "srcset" else [value.strip()]
            line = self.getpos()[0]
            self.refs += [(tag, u, line) for u in urls if u]


def _target(site: Path, page: Path, url: str) -> Path | None:
    """File a URL points to inside the build, or None when it is not internal."""
    if url.startswith(SKIP_SCHEMES) or "{{" in url or "{%" in url:
        return None
    path = unquote(urlsplit(url).path)
    if not path:
        return None
    if path.startswith("/"):
        if not path.startswith(BASEURL + "/") and path != BASEURL:
            return site / "__outside_baseurl__" / path.lstrip("/")
        path = path[len(BASEURL):]
        target = site / path.lstrip("/")
    else:
        target = page.parent / path
    if path.endswith("/") or target.is_dir():
        target = target / "index.html"
    return target


def check(site: Path) -> list[str]:
    errors: list[str] = []
    pages = sorted(site.rglob("*.html"))
    if not pages:
        return [f"no HTML page in {site} (run tools/build.sh first)"]
    for page in pages:
        parser = _Refs()
        parser.feed(page.read_text(encoding="utf-8", errors="replace"))
        for tag, url, line in parser.refs:
            target = _target(site, page, url)
            if target is None or target.exists() or target.with_suffix(".html").exists():
                continue
            errors.append(f"{page.relative_to(site)}:{line} <{tag}> {url}")
    return errors


def main(argv: list[str] | None = None) -> int:
    args = sys.argv[1:] if argv is None else argv
    site = Path(args[0]) if args else ROOT / "out" / "site"
    errors = check(site)
    for e in errors:
        print(f"- broken: {e}")
    print(f"{len(errors)} broken internal reference(s) in {site}")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
