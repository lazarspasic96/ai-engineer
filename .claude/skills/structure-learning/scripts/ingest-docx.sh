#!/usr/bin/env bash
# Convert a .docx (e.g. a Google Doc exported as Microsoft Word) to Markdown,
# extracting embedded images as real files instead of base64.
#
# Usage:  ingest-docx.sh <input.docx> [staging-dir]
#
# Output: <staging-dir>/<name>.md         — Markdown with image links
#         <staging-dir>/media/...         — extracted image files
#
# The staging dir is a scratch area. The skill relocates images into
# public/images/docs/<section>/ only after placement is approved.
set -euo pipefail

if ! command -v pandoc >/dev/null 2>&1; then
  echo "ERROR: pandoc is not installed. Run: brew install pandoc" >&2
  exit 1
fi

input="${1:?Usage: ingest-docx.sh <input.docx> [staging-dir]}"
if [[ "${input##*.}" != "docx" ]]; then
  echo "ERROR: expected a .docx file. Google's native Markdown export embeds" >&2
  echo "       images as broken base64 — export the doc as Microsoft Word (.docx) instead." >&2
  exit 1
fi
if [[ ! -f "$input" ]]; then
  echo "ERROR: file not found: $input" >&2
  exit 1
fi

name="$(basename "$input" .docx)"
staging="${2:-$(mktemp -d -t structure-learning-XXXX)}"
mkdir -p "$staging"
out_md="$staging/$name.md"

pandoc "$input" -t gfm -o "$out_md" --extract-media="$staging/media" --wrap=none

echo "Markdown: $out_md"
echo "Images:"
if find "$staging/media" -type f 2>/dev/null | grep -q .; then
  find "$staging/media" -type f | sort
else
  echo "  (none — document had no embedded images)"
fi
