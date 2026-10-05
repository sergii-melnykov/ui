---
name: ui-run-tests
description: |
  Run Vitest tests for @me1a/ui (npm test). Use when the user picks Run tests or asks to run
  unit tests or fix failing tests.
disable-model-invocation: true
---

# Run tests — @me1a/ui

## Commands

From repository root:

```bash
npm test   # vitest run
```

Single file when the user names a component:

```bash
npx vitest run src/components/atoms/button/button.test.tsx
```

Watch mode only if the user asks:

```bash
npm run test:watch
```

## Workflow

1. Run the appropriate command.
2. If failures occur, fix tests or implementation per user intent; re-run until green.
3. Load **`react-testing`** when writing or debugging test code.

## Notes

- **Paused:** CI and default agent verify flows skip Vitest while components are redesigned. Run tests only when the user is updating a specific component’s coverage.
- Re-enable the Test job in [`.github/workflows/ci.yml`](../../../.github/workflows/ci.yml) when the suite is green again.
