---
name: ui-create-component
description: |
  Create or add a UI component in @me1a/ui — shadcn registry search/add, atomic folder scaffold,
  types and index exports. Use when the user picks Create component or asks to add a new component
  to the library. Does not replace Create story / Create tests agents unless user asks in same turn.
disable-model-invocation: true
---

# Create component — @me1a/ui

## Load first

1. Read **`ui-project`** — atomic folders, file layout, conventions.
2. Read **`shadcn`** — CLI, styling rules, composition.

## Workflow

1. **Clarify** component name, layer (`atoms` | `organisms` | `rhf`), and whether it exists in shadcn registries.
2. **Registry** — run `npx shadcn@latest search` and `npx shadcn@latest add <name>` when a match fits. Use project runner from `package.json`.
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
6. **Stories** — offer **Create story** when appropriate. **Tests are deferred** during the component redesign; do not add or fix `*.test.tsx` unless the user explicitly asks for that component.

## Finish

- Run **Run typecheck** or `npm run typecheck` if types/export surface changed materially.
- Remind: full verify runs on agent stop via project hook (lint, format, typecheck, test).
