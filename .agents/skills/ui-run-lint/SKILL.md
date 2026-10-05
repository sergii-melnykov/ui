---
name: ui-run-lint
description: |
  Run ESLint for @me1a/ui (npm run lint) and fix issues in source files. Use when the user picks Run lint
  or asks to lint the project or fix ESLint errors. Never rewrite eslint.config.mjs, tsconfig.eslint.json,
  or .eslintignore unless the user explicitly asks to change ESLint setup.
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

- **Do not modify ESLint tooling:** `eslint.config.mjs`, `tsconfig.eslint.json`, `.eslintignore`. Fix code under lint scope instead.
- Do not disable rules broadly in config or add repo-wide eslint-disable comments without user approval.
- CI runs the same command in [`.github/workflows/ci.yml`](../../../.github/workflows/ci.yml).
