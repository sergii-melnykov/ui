---
name: ui-verify-component
description: |
  Verify @me1a/ui changes for one component — run npm run verify once, browser-check Storybook
  (ui-browser-verify-story), fix source failures, record results in pipeline.md. Use when the user
  picks Verify component or as pipeline phase 5. Does not run vitest unless the user explicitly asked.
disable-model-invocation: true
---

# Verify component — @me1a/ui

Implements the **Finish protocol** in **`ui-project`** (verify section).

## Load first

1. **`ui-project`** — lint tooling boundaries, tests paused policy.
2. **`ui-browser-verify-story`** — built-in browser Storybook checks (required when `*.stories.tsx` exists).

## Prerequisites

- Handoff file: `src/components/{layer}/{name}/{name}.pipeline.md` (optional but preferred for fix scope).

## Workflow

1. Read `.pipeline.md` **Implementation**, **Tests**, and **Story** sections for files likely touched.
2. From repository root:

   ```bash
   npm run verify
   ```

   (`lint` + format check + `typecheck:all` per `package.json`.)

3. On failure, fix **source, stories, and tests** in scope — not ESLint/Prettier config or ignore files unless the user explicitly asked to change tooling.
4. Re-run **`npm run verify`** until clean or report unfixable blockers.
5. Do **not** run `npm run lint`, `npm run format`, or `npm run typecheck:all` separately if verify already passed.
6. Run **`npm run verify` in the foreground** with no output pipes (`| tail`, `| head`, …) and no background (`&`). Cursor hooks enforce this for lint/verify-style commands.
7. When **`*.stories.tsx`** exists for the component, follow **`ui-browser-verify-story`** end-to-end (start Storybook if needed, snapshot Default + DesignSpec when present). Fix rendering/story issues and re-check until pass or **blocked**.
8. Do **not** run `npm test`, `npx vitest`, or **Run tests** unless the user explicitly asked.

## Pre-PR (document only)

In **Verify** section of `.pipeline.md`, note that CI also runs (not run by default here):

- `npm run validate:tokens`
- `npm run build`
- `npm run build-storybook`

Tests remain skipped in CI during redesign unless policy changes.

## Record in `.pipeline.md` **Verify**

- ISO timestamp
- `npm run verify`: pass | fail
- **Browser (Storybook)**: pass | fail | skipped (no stories) | blocked — per **`ui-browser-verify-story`**
- Blockers (if any)
- Pre-PR checklist: not run | user requested (list commands run)

## Notes

- Ad-hoc **Run lint / prettier / typecheck / tests** agents remain for non-pipeline work.
