---
name: ui-create-component
description: |
  Create or add a UI component in @me1a/ui — shadcn add, atomic folder scaffold,
  types and index exports. Use when the user picks Create component or pipeline phase 2.
  With pipeline handoff, implement from Research only; standalone runs may still search shadcn.
disable-model-invocation: true
---

# Create component — @me1a/ui

## Load first

1. Read **`ui-project`** — atomic folders, file layout, conventions.
2. Read **`shadcn`** — CLI, styling rules, composition.

## Handoff (pipeline phase 2)

When `component-name.pipeline.md` exists in the component folder:

1. Read the **Research** section and follow its build checklist.
2. Do **not** repeat full Figma/registry discovery — use recorded shadcn add command and API notes.
3. Update **Implementation** when done (files touched, exports, deviations from shadcn default).

## Workflow

1. **Clarify** (standalone only) component name, layer (`atoms` | `organisms` | `rhf`), and shadcn registry fit. Pipeline runs should already have **Inputs** in `.pipeline.md`.
2. **Registry** — run `npx shadcn@latest add <name>` when Research or search says so. Use project runner from `package.json`.
3. **Post-install** — follow shadcn skill post-add review (paths, `components.json`, styling rules).
4. **Scaffold** — ensure directory matches:

   ```
   component-name/
   ├── component-name.tsx
   ├── component-name.types.ts   # if props are non-trivial
   ├── index.ts                  # export component + types
   ```

   Use [`src/components/atoms/button/`](../../../src/components/atoms/button/) as the template for `index.ts` and file split.

5. **Boundaries** — atoms must not import organisms or rhf. Organisms compose atoms. RHF wraps atoms with react-hook-form.
6. **Stories / tests** — defer to **Create story** / **Create tests** or the component pipeline. Standalone: do not add `*.test.tsx` unless the user asks.

## Finish

- Do **not** run `npm run verify` mid-task — use pipeline phase 5 or **Verify component** when done.
- When **`*.stories.tsx`** already exists (same session or prior phase), run **`ui-browser-verify-story`** before reporting done, unless pipeline phase 5 will run next in the same orchestrated run.
- If lint/format fail while editing, fix component code only — never rewrite ESLint/Prettier config or ignore files (`ui-project` → Lint & Prettier tooling).
