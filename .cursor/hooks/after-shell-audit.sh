#!/usr/bin/env bash
# Mark tracked shell commands as finished after normal execution.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/common.sh
source "$SCRIPT_DIR/lib/common.sh"

read_hook_input

command="$(jq -r '.command // empty' <<<"$HOOK_INPUT")"
duration="$(jq -r '.duration // 0' <<<"$HOOK_INPUT")"

for root in $(jq -r '.workspace_roots[]?' <<<"$HOOK_INPUT"); do
  reg="$(registry_file "$root")"
  [[ -f "$reg" ]] || continue
  if [[ -n "$command" ]]; then
    jq -c \
      --arg cmd "$command" \
      --arg ts "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
      --argjson dur "$duration" \
      '{command:$cmd,finished_at:$ts,duration_ms:$dur,status:"finished"}' \
      <<<"{}" >>"$reg"
  fi
done

exit 0
