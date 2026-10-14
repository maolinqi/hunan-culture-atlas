#!/bin/sh
set -eu
PROJECT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
if [ ! -x "$PROJECT_DIR/.venv/bin/python" ]; then
  python3 -m venv "$PROJECT_DIR/.venv"
fi
mkdir -p "$PROJECT_DIR/.runtime"
printf '项目环境已就绪。运行 ./start_all.sh 启动。\n'
