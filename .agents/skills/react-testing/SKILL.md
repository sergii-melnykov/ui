---
name: react-testing
description: |
  Vitest and React Testing Library tests for @me1a/ui. Use for *.test.tsx, unit tests,
  mocking, user interactions, accessibility queries, or fixing failing tests.
  Trigger even if the user says "add tests" or "test this component" without naming Vitest.
---

# React Testing — @me1a/ui

Vitest with `@testing-library/react`, `@testing-library/user-event`, and `@testing-library/jest-dom` (see [`src/test/setup.ts`](../../../src/test/setup.ts)).

## Canonical example

Follow [`src/components/atoms/button/button.test.tsx`](../../../src/components/atoms/button/button.test.tsx):

- `describe` block named after the component
- `render` + queries by role/label (`getByRole`, `getByText`) — prefer accessible queries
- `userEvent` for clicks and keyboard
- `vi` from `vitest` for mocks
- `rerender` for prop/variant sweeps when class or behavior changes per variant
- Assert stable Tailwind/semantic classes only when they encode contract (variants, sizes)

## File placement

```
src/components/<atoms|organisms|rhf>/component-name/
├── component-name.test.tsx
```

Colocate tests with the component. Do not put tests in a separate top-level `tests/` tree for components.

## Commands

```bash
npm test                              # vitest run (all)
npm run test:watch                    # watch mode
npx vitest run path/to/file.test.tsx  # single file
```

## What to test

1. **Renders** — component mounts with default props; critical content is in the document.
2. **Variants / states** — prop changes affect DOM or ARIA as expected (use `rerender` where helpful).
3. **Interactions** — clicks, typing, disabled/loading behavior with `userEvent`.
4. **Callbacks** — `onClick` / `onChange` fired with `vi.fn()` when relevant.

Avoid tests that only assert the component exists without behavior. Avoid snapshot-only tests unless the user explicitly wants them.

## Rules

1. Import the component under test from `./component-name`.
2. Use `screen` from `@testing-library/react` after `render`.
3. `ResizeObserver` is mocked globally in setup — do not re-mock unless a test needs custom behavior.
4. For async UI, use `findBy*` or `waitFor` from Testing Library.
5. After writing or changing tests, run the single file or full `npm test` before finishing.

## RHF components

For `src/components/rhf/`, wrap with `Form` / `FormProvider` patterns used in existing rhf tests (see [`src/components/rhf/form/form.test.tsx`](../../../src/components/rhf/form/form.test.tsx)). Load `react-hook-form` skill for subscription/performance patterns if tests become flaky or slow.
