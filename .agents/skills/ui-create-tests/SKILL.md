---
name: ui-create-tests
description: |
  Create or update Vitest + React Testing Library tests for @me1a/ui (*.test.tsx).
  Use when the user picks Create tests or pipeline phase 3. Does not run vitest unless
  the user explicitly asks (tests paused during redesign).
disable-model-invocation: true
---

# Create tests — @me1a/ui

## Load first

1. **`react-testing`** — Vitest, RTL, userEvent, canonical Button tests.
2. **`ui-project`** — colocation and atomic layout.

## Prerequisites

- Component implementation exists at `component-name.tsx` in the target folder.
- Pipeline: read **Implementation** in `component-name.pipeline.md`.

## Workflow

1. Read the component API and behavior (variants, events, disabled/loading).
2. Create or update **`component-name.test.tsx`** colocated in the same directory.
3. Cover: render, important variants/states, user interactions, callbacks with `vi.fn()` where relevant.
4. Prefer `getByRole` / accessible queries; use patterns from **Button** and existing rhf tests for forms.
5. **Running tests:** do **not** run `npm test` or `npx vitest` unless the user explicitly asked. Record the intended command in `.pipeline.md` **Tests** when using the pipeline, e.g. `npx vitest run src/components/atoms/foo/foo.test.tsx`.

## Avoid

- Trivial “renders without crashing” only tests.
- Snapshot-only tests unless requested.
- Rewriting `eslint.config.mjs`, `tsconfig.eslint.json`, or Prettier config/ignore files to silence test lint — fix tests or ask the user (`ui-project` → Lint & Prettier tooling).

## Finish

- Do **not** run `npm run verify` — **Verify component** or pipeline phase 5 handles that.
