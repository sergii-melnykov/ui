---
name: ui-run-lint
description: |
  Run ESLint for @me1a/ui (npm run lint) and fix issues. Use when the user picks Run lint
  or asks to lint the project or fix ESLint errors.
disable-model-invocation: true
---

# Run lint — @me1a/ui

## Command

From repository root:

```bash
npm run lint
```

(`eslint . --max-warnings 0`)

## Workflow

1. Run lint and capture output.
2. Fix violations in **files you changed** unless the user asks for a repo-wide lint fix.
3. Re-run until clean or report unfixable blockers.

## Notes

- Do not disable rules broadly without user approval.
- CI runs the same command in [`.github/workflows/ci.yml`](../../../.github/workflows/ci.yml).
