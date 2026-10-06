#!/usr/bin/env bash
# Shared helpers for @me1a/ui Cursor agent shell hooks.

set -euo pipefail

read_hook_input() {
  HOOK_INPUT="$(cat)"
  HOOK_EVENT="$(jq -r '.hook_event_name // empty' <<<"$HOOK_INPUT")"
  SESSION_ID="$(jq -r '.session_id // .conversation_id // "unknown"' <<<"$HOOK_INPUT")"
}

state_dir() {
  local root="${1:-.}"
  printf '%s/.cursor/hooks/state' "$root"
}

registry_file() {
  printf '%s/shell-registry-%s.jsonl' "$(state_dir "$1")" "$SESSION_ID"
}

ensure_state_dir() {
  mkdir -p "$(state_dir "$1")"
}

is_under_root() {
  local path="$1"
  local root="$2"
  [[ "$path" == "$root" || "$path" == "$root/"* ]]
}

# Agent shells often reparent to systemd --user when the Cursor session ends.
is_orphan_agent_process() {
  local pid="$1"
  local depth=0
  while [[ -n "$pid" && "$pid" -gt 1 && "$depth" -lt 32 ]]; do
    local cmd
    cmd="$(ps -o cmd= -p "$pid" 2>/dev/null || true)"
    if [[ "$cmd" == *"systemd --user"* ]]; then
      return 0
    fi
    if [[ "$cmd" == *"cursor"* && "$cmd" == *"extglob"* && "$cmd" == *"dump_bash_state"* ]]; then
      return 0
    fi
    if [[ "$cmd" == *"sshd"* ]] || [[ "$cmd" == *"gnome-terminal"* ]] || [[ "$cmd" == *"konsole"* ]] || [[ "$cmd" == *"pty"* ]]; then
      return 1
    fi
    pid="$(ps -o ppid= -p "$pid" 2>/dev/null | tr -d ' ' || true)"
    depth=$((depth + 1))
  done
  return 1
}

kill_process_tree() {
  local pid="$1"
  local signal="${2:-TERM}"
  local child
  for child in $(pgrep -P "$pid" 2>/dev/null || true); do
    kill_process_tree "$child" "$signal"
  done
  kill "-$signal" "$pid" 2>/dev/null || true
}

matches_long_running_job() {
  local command="$1"
  [[ "$command" =~ npm[[:space:]]+run[[:space:]]+(lint|verify|format|typecheck|test|build|storybook|dev|typecheck:all|test:watch) ]] \
    || [[ "$command" =~ node_modules/\.bin/(eslint|vitest|tsc|tsdown|storybook) ]] \
    || [[ "$command" =~ (^|[[:space:]])(eslint|vitest|tsc|tsdown|storybook)[[:space:]] ]]
}

command_uses_output_truncation_pipe() {
  local command="$1"
  [[ "$command" == *"|"* ]] && [[ "$command" =~ \|[[:space:]]*(tail|head|tee|grep|rg|sed|awk)([[:space:]]|$) ]]
}

command_runs_in_background() {
  local command="$1"
  if printf '%s' "$command" | grep -Eq '(^|[[:space:]])nohup[[:space:]]|[[:space:]]&[[:space:]]*$'; then
    return 0
  fi
  return 1
}

cleanup_orphans_for_root() {
  local root="$1"
  local pid cwd cmd

  for pid in $(pgrep -f 'node_modules/\.bin/eslint' 2>/dev/null || true); do
    cwd="$(readlink "/proc/$pid/cwd" 2>/dev/null || true)"
    [[ -n "$cwd" ]] || continue
    is_under_root "$cwd" "$root" || continue
    is_orphan_agent_process "$pid" || continue
    kill_process_tree "$pid" TERM
  done

  for pid in $(pgrep -f 'npm run (lint|verify|typecheck|test|format)' 2>/dev/null || true); do
    cwd="$(readlink "/proc/$pid/cwd" 2>/dev/null || true)"
    [[ -n "$cwd" ]] || continue
    is_under_root "$cwd" "$root" || continue
    is_orphan_agent_process "$pid" || continue
    kill_process_tree "$pid" TERM
  done

  for pid in $(pgrep -x tail 2>/dev/null || true); do
    cwd="$(readlink "/proc/$pid/cwd" 2>/dev/null || true)"
    [[ -n "$cwd" ]] || continue
    is_under_root "$cwd" "$root" || continue
    cmd="$(ps -o cmd= -p "$pid" 2>/dev/null || true)"
    [[ "$cmd" =~ tail[[:space:]]+-[0-9]+ ]] || continue
    is_orphan_agent_process "$pid" || continue
    kill -TERM "$pid" 2>/dev/null || true
  done
}
