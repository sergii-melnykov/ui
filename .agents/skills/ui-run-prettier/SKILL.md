---
name: ui-run-prettier
description: |
  Run Prettier for @me1a/ui — format:fix then format check. Use when the user picks Run prettier
  or asks to format/fix formatting in the repo. Never rewrite .prettierrc, .prettierignore, or
  change ignore-path/npm scripts unless the user explicitly asks to change Prettier setup.
disable-model-invocation: true
---

# Run prettier — @me1a/ui

## Commands

From repository root, in order:

```bash
npm run format:fix   # prettier --write . --ignore-path .gitignore
npm run format       # prettier --check . --ignore-path .gitignore
```

## Workflow

1. Run **format:fix** to apply writes.
2. Run **format** to confirm check passes.
3. When the user scoped work to specific paths, you may run prettier on those paths only first; finish with full **format** check unless they explicitly want a partial check.

## Notes

- **Do not modify Prettier tooling:** `.prettierrc`, `.prettierignore`. Run Prettier on source files; do not relax ignores or options to make check pass.
- CI does not currently run Prettier; local check still keeps the tree consistent before PR.
