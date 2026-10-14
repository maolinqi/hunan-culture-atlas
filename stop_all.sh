#!/bin/sh
set -eu
PROJECT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PID_FILE="$PROJECT_DIR/.runtime/server.pid"
if [ ! -f "$PID_FILE" ]; then printf '项目未运行。\n'; exit 0; fi
PREVIEW_PID=$(cat "$PID_FILE")
PREVIEW_COMMAND=$(ps -p "$PREVIEW_PID" -o command= 2>/dev/null || true)
case "$PREVIEW_COMMAND" in
  *"$PROJECT_DIR/server.py"*) kill "$PREVIEW_PID" 2>/dev/null || true;;
  '') ;;
  *) printf '进程不属于本项目，未操作。\n' >&2; exit 1;;
esac
rm -f "$PID_FILE" "$PROJECT_DIR/.runtime/server.url"
printf '本项目预览已停止。\n'
