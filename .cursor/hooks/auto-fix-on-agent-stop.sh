#!/usr/bin/env bash
# Run Prettier and ESLint --fix on files the agent edited this session (on stop / sessionEnd).

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/common.sh
source "$SCRIPT_DIR/lib/common.sh"

read_hook_input

auto_fix_for_root() {
  local root="$1"
  local list
  list="$(edited_files_list "$root")"
  [[ -f "$list" ]] || return 0

  mapfile -t rel_paths <"$list"
  rm -f "$list"
  [[ ${#rel_paths[@]} -gt 0 ]] || return 0

  local prettier_files=()
  local eslint_files=()
  local rel abs

  for rel in "${rel_paths[@]}"; do
    [[ -n "$rel" ]] || continue
    should_skip_auto_fix_path "$rel" && continue
    abs="$root/$rel"
    [[ -f "$abs" ]] || continue
    if is_prettier_fix_target "$rel"; then
      prettier_files+=("$rel")
    fi
    if is_eslint_fix_target "$rel"; then
      eslint_files+=("$rel")
    fi
  done

  [[ ${#prettier_files[@]} -gt 0 || ${#eslint_files[@]} -gt 0 ]] || return 0

  if [[ ! -x "$root/node_modules/.bin/prettier" ]]; then
    return 0
  fi

  (
    cd "$root"
    if [[ ${#prettier_files[@]} -gt 0 ]]; then
      ./node_modules/.bin/prettier --write --ignore-path .prettierignore "${prettier_files[@]}" >/dev/null 2>&1 || true
    fi
    if [[ ${#eslint_files[@]} -gt 0 && -x ./node_modules/.bin/eslint ]]; then
      ./node_modules/.bin/eslint --fix --max-warnings 0 "${eslint_files[@]}" >/dev/null 2>&1 || true
    fi
  )
}

while IFS= read -r root; do
  [[ -n "$root" ]] || continue
  auto_fix_for_root "$root"
done < <(jq -r '.workspace_roots[]?' <<<"$HOOK_INPUT")

exit 0
