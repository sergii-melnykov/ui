#!/usr/bin/env bash
# Cursor stop hook: suggest a full verify pass before the agent declares done.
set -euo pipefail

cat <<'EOF'
{
  "followup_message": "Before finishing, run project verification in this order from the repo root and fix any failures:\n1. npm run lint\n2. npm run format\n3. npm run typecheck\n4. npm run typecheck:fast\n\n(Unit tests are paused during per-component redesign — do not run npm test unless the user asks.)\n\nYou can invoke the Run lint / Run prettier / Run typecheck agents. Before opening a PR, CI runs validate:tokens, build, and build-storybook (tests skipped for now)."
}
EOF

exit 0
