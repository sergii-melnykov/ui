#!/usr/bin/env bash
# On agent stop / session end, terminate orphan lint-verify shells under workspace roots.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/common.sh
source "$SCRIPT_DIR/lib/common.sh"

read_hook_input

for root in $(jq -r '.workspace_roots[]?' <<<"$HOOK_INPUT"); do
  [[ -d "$root" ]] || continue
  cleanup_orphans_for_root "$root"
  reg="$(registry_file "$root")"
  if [[ -f "$reg" ]]; then
    jq -c \
      --arg ts "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
      --arg event "$HOOK_EVENT" \
      '{event:$event,cleaned_at:$ts,status:"cleanup"}' \
      <<<"{}" >>"$reg"
  fi
done

exit 0
