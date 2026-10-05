---
name: ui-run-typecheck
description: |
  Run TypeScript typecheck for @me1a/ui (tsc and native tsc). Use when the user picks Run typecheck
  or asks to fix type errors in the library.
disable-model-invocation: true
---

# Run typecheck — @me1a/ui

## Commands

From repository root, run both (matches CI):

```bash
npm run typecheck       # tsc --noEmit
npm run typecheck:fast  # native tsc --noEmit -p tsconfig.native.json
```

## Workflow

1. Run **typecheck**; fix reported errors in scope of the task.
2. Run **typecheck:fast**; fix any additional native-check failures.
3. Re-run until both pass.

## Notes

- Prefer proper types over `@ts-expect-error` unless unavoidable and documented.
- **`tsconfig.eslint.json` is for ESLint only** — do not edit it for typecheck fixes; it is lint tooling (`ui-project` → Lint & Prettier tooling).
