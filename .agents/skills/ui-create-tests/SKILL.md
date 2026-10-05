---
name: ui-create-tests
description: |
  Create or update Vitest + React Testing Library tests for @me1a/ui (*.test.tsx).
  Use when the user picks Create tests or asks for unit tests for a component.
disable-model-invocation: true
---

# Create tests — @me1a/ui

## Load first

1. **`react-testing`** — Vitest, RTL, userEvent, canonical Button tests.
2. **`ui-project`** — colocation and atomic layout.

## Prerequisites

- Component implementation exists at `component-name.tsx` in the target folder.

## Workflow

1. Read the component API and behavior (variants, events, disabled/loading).
2. Create or update **`component-name.test.tsx`** colocated in the same directory.
3. Cover: render, important variants/states, user interactions, callbacks with `vi.fn()` where relevant.
4. Prefer `getByRole` / accessible queries; use patterns from **Button** and existing rhf tests for forms.
5. Run **`npx vitest run path/to/component-name.test.tsx`** or **`npm test`** before finishing.

## Avoid

- Trivial “renders without crashing” only tests.
- Snapshot-only tests unless requested.
