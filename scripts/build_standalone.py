#!/usr/bin/env python3
"""Bundle the canonical frontend into a single offline HTML file."""
from pathlib import Path


def main():
    root = Path(__file__).resolve().parents[1]
    frontend = root / "dist"
    html = (frontend / "index.html").read_text(encoding="utf-8")
    html = html.replace('class="brand" href="./"', 'class="brand" href="#"')
    html = html.replace(
        '<link rel="stylesheet" href="style.css">',
        "<style>\n" + (frontend / "style.css").read_text(encoding="utf-8") + "\n</style>",
    )
    for name in ("i18n.js", "app.js"):
        html = html.replace(
            f'<script src="{name}"></script>',
            "<script>\n" + (frontend / name).read_text(encoding="utf-8") + "\n</script>",
        )
    output = root / "standalone.html"
    output.write_text(html, encoding="utf-8")
    print(output)


if __name__ == "__main__":
    main()
