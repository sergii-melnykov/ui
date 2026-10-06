#!/usr/bin/env bash
# Block shell patterns that leave orphan lint/verify processes (e.g. npm run lint | tail -5).

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/common.sh
source "$SCRIPT_DIR/lib/common.sh"

read_hook_input

command="$(jq -r '.command // empty' <<<"$HOOK_INPUT")"
cwd="$(jq -r '.cwd // empty' <<<"$HOOK_INPUT")"

if [[ -z "$command" ]]; then
  echo '{ "permission": "allow" }'
  exit 0
fi

if matches_long_running_job "$command" && command_uses_output_truncation_pipe "$command"; then
  jq -n \
    --arg msg "Do not pipe long-running npm/eslint commands through tail, head, tee, or grep. Run the command directly (e.g. npm run lint) so the shell waits and processes exit cleanly." \
    '{ permission: "deny", user_message: $msg, agent_message: $msg }'
  exit 0
fi

if matches_long_running_job "$command" && command_runs_in_background "$command"; then
  jq -n \
    --arg msg "Do not background lint, verify, test, or build commands with & or nohup. Run them in the foreground and wait for exit." \
    '{ permission: "deny", user_message: $msg, agent_message: $msg }'
  exit 0
fi

if [[ -n "$cwd" ]]; then
  ensure_state_dir "$cwd"
  jq -c \
    --arg cmd "$command" \
    --arg cwd "$cwd" \
    --arg ts "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
    '{command:$cmd,cwd:$cwd,started_at:$ts,status:"started"}' \
    <<<"{}" >>"$(registry_file "$cwd")"
fi

echo '{ "permission": "allow" }'
exit 0
