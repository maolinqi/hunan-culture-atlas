#!/usr/bin/env python3
"""Project-local static preview server. No third-party dependencies."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
import functools


class PreviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8789)
    args = parser.parse_args()
    directory = Path(__file__).resolve().parent / "dist"
    server = ThreadingHTTPServer(("127.0.0.1", args.port), functools.partial(PreviewHandler, directory=str(directory)))
    print(f"Local: http://127.0.0.1:{args.port}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
