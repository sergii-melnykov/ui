---
name: ui-research-shadcn-figma
description: |
  Research a @me1a/ui component against shadcn registries and Figma (URL or design-system search).
  Writes the Research section of component-name.pipeline.md. Use when the user picks Research component
  or as pipeline phase 1. Does not implement *.tsx — research and handoff only.
disable-model-invocation: true
---

# Research component (shadcn + Figma) — @me1a/ui

## Load first

1. **`ui-project`** — atomic paths, catalog, MCP config in [`.cursor/mcp.json`](../../../.cursor/mcp.json).
2. **`shadcn`** — CLI, styling, post-add expectations.
3. **Figma** — load **`figma-design-to-code`** before `get_design_context`; load **`figma-use`** before `search_design_system` / `use_figma`.

## Prerequisites

- Component **layer** (`atoms` | `organisms` | `rhf`) and **kebab-case** folder name.
- Handoff path: `src/components/{layer}/{name}/{name}.pipeline.md` (create from pipeline skeleton if missing).

## Workflow

### 1. Inputs

Fill **Inputs** in `.pipeline.md`: layer, optional Figma URL, catalog display name (PascalCase / spaced name used in [`components-catalog-data.ts`](../../../src/components/pages/components-catalog/components-catalog-data.ts)).

### 2. shadcn registry

Prefer **shadcn MCP** (project [`.cursor/mcp.json`](../../../.cursor/mcp.json)):

- `search_items_in_registries` / `view_items_in_registries`
- `get_add_command_for_items` for the chosen item

CLI fallback from repo root:

```bash
npx shadcn@latest search <query>
npx shadcn@latest docs <component>
```

Record in **Research**:

- Registry match (yes/no, item id)
- Suggested `npx shadcn@latest add …` command or **custom** if no fit
- API notes (variants, subcomponents, Radix deps)

### 3. Figma

**If URL provided:** parse `fileKey` and `node-id` (convert `-` to `:` in node id). Call Figma MCP `get_design_context` (after `figma-design-to-code` skill). Capture variants, states, spacing, typography tokens, anatomy.

**If no URL:** call `search_design_system` with component/catalog name. Record best-matching file/node; run `get_design_context` when a node is identified.

If neither URL nor search yields a spec, state that explicitly and list what build must assume.

### 4. Repo context

- Read existing folder under `src/components/{layer}/{name}/` if present.
- Cross-check [`components-catalog-data.ts`](../../../src/components/pages/components-catalog/components-catalog-data.ts) for catalog name in `ALL_COMPONENTS` (links auto-resolve from Storybook index).

### 5. Build checklist (required)

End **Research** with an actionable checklist for **ui-create-component**:

- Install path (shadcn add vs manual)
- Variants / sizes / states to implement
- a11y roles and keyboard behavior
- Token/class expectations (semantic Tailwind only)
- Design-spec story needed (yes/no) for catalog parity

## Out of scope

- Editing `*.tsx`, `*.stories.tsx`, or `*.test.tsx`
- Running `npm run verify`, `shadcn add`, or tests

## Finish

- **Research** section complete with build checklist.
- Suggest **Create component** or continue **Component pipeline (full)** phase 2.
