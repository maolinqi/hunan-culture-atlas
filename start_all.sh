#!/bin/sh
set -eu
PROJECT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PREVIEW_PORT=${XIANG_ATLAS_PORT:-8789}
PID_FILE="$PROJECT_DIR/.runtime/server.pid"
if [ ! -x "$PROJECT_DIR/.venv/bin/python" ]; then
  printf '请先运行 ./setup.sh 初始化项目环境。\n' >&2
  exit 1
fi
mkdir -p "$PROJECT_DIR/.runtime"
if [ -f "$PID_FILE" ]; then
  PREVIEW_PID=$(cat "$PID_FILE")
  PREVIEW_COMMAND=$(ps -p "$PREVIEW_PID" -o command= 2>/dev/null || true)
  case "$PREVIEW_COMMAND" in
    *"$PROJECT_DIR/server.py"*)
      printf '项目已经运行。\n'
      cat "$PROJECT_DIR/.runtime/server.url"
      exit 0;;
  esac
fi
nohup "$PROJECT_DIR/.venv/bin/python" "$PROJECT_DIR/server.py" --port "$PREVIEW_PORT" > "$PROJECT_DIR/.runtime/server.log" 2>&1 < /dev/null &
PREVIEW_PID=$!
printf '%s\n' "$PREVIEW_PID" > "$PID_FILE"
sleep 0.4
if ! kill -0 "$PREVIEW_PID" 2>/dev/null; then
  cat "$PROJECT_DIR/.runtime/server.log" >&2
  rm -f "$PID_FILE"
  exit 1
fi
printf 'http://127.0.0.1:%s\n' "$PREVIEW_PORT" > "$PROJECT_DIR/.runtime/server.url"
cat "$PROJECT_DIR/.runtime/server.url"
