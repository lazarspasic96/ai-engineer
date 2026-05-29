#!/usr/bin/env bash
# Lists English MDX articles that do not yet have a Serbian counterpart.
# Output: one path per line, relative to the repo root.
#
# Usage: list-untranslated.sh [repo-root]
set -euo pipefail

ROOT="${1:-$(pwd)}"
EN_DIR="$ROOT/content/docs/en"
SR_DIR="$ROOT/content/docs/sr"

if [[ ! -d "$EN_DIR" ]]; then
  echo "ERROR: $EN_DIR not found. Run from the repo root or pass it as the first arg." >&2
  exit 1
fi

find "$EN_DIR" -name '*.mdx' -type f | while read -r en_file; do
  rel="${en_file#$EN_DIR/}"
  sr_file="$SR_DIR/$rel"
  if [[ ! -f "$sr_file" ]]; then
    echo "content/docs/en/$rel"
  fi
done
