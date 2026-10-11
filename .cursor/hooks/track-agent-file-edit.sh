#!/usr/bin/env bash
# Record agent-edited paths for lint/prettier auto-fix on agent stop.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/common.sh
source "$SCRIPT_DIR/lib/common.sh"

read_hook_input

file_path="$(jq -r '.file_path // empty' <<<"$HOOK_INPUT")"
if [[ -z "$file_path" ]]; then
  exit 0
fi

while IFS= read -r root; do
  [[ -n "$root" ]] || continue
  rel="$(resolve_path_under_root "$file_path" "$root")"
  [[ -n "$rel" ]] || continue
  record_edited_file "$root" "$rel"
done < <(jq -r '.workspace_roots[]?' <<<"$HOOK_INPUT")

exit 0
