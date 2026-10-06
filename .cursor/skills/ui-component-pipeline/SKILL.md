---
name: ui-component-pipeline
description: |
  Run the full @me1a/ui per-component pipeline in order — research (shadcn + Figma), build,
  tests, story (+ design-spec), verify (+ Storybook browser check). Use when the user picks Component pipeline (full),
  asks to redesign a component end-to-end, or says "run the component pipeline for X".
disable-model-invocation: true
---

# Component pipeline (full) — @me1a/ui

Orchestrates **one component per run** through five phases. Each phase updates the handoff file; phase 5 runs **`npm run verify` once** and **`ui-browser-verify-story`** when stories exist (see Finish protocol).

## Load first

1. **`ui-project`** — layout, agents, finish protocol.
2. Phase skills as needed (listed per step below).

## Inputs (parse from user message)

| Field                | Required | Notes                                                                                                                                                          |
| -------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Component name       | yes      | kebab-case folder name (e.g. `progress`, `alert-dialog`)                                                                                                       |
| Layer                | yes      | `atoms` \| `organisms` \| `rhf`                                                                                                                                |
| Figma URL            | no       | If omitted, research agent searches design system by name                                                                                                      |
| Catalog display name | no       | Human name in [`components-catalog-data.ts`](../../../src/components/pages/components-catalog/components-catalog-data.ts) if different from PascalCase default |

## Handoff file

Create or update at:

`src/components/{layer}/{component-name}/{component-name}.pipeline.md`

Use this skeleton on first run:

```markdown
# Pipeline: {component-name}

## Inputs

- Layer:
- Figma URL:
- Catalog name:

## Research

<!-- ui-research-shadcn-figma -->

## Implementation

<!-- ui-create-component -->

## Tests

<!-- ui-create-tests -->

## Story

<!-- ui-create-story -->

## Verify

<!-- ui-verify-component + ui-browser-verify-story -->
```

After each phase, fill that section; do not delete prior sections.

## Sequential phases (strict order)

Do **not** skip ahead. Do **not** run `npm run verify` until phase 5.

### Phase 1 — Research

- Load skill **`ui-research-shadcn-figma`** and follow it fully.
- Optional: spawn Task subagent with prompt from [agents/01-research.md](agents/01-research.md) plus repo path, component path, and `.pipeline.md` path.
- **Gate:** **Research** section must contain a build checklist (shadcn add command or “custom”, variants/states, a11y). If neither shadcn nor Figma yields spec, stop and ask the user.

### Phase 2 — Build

- Load **`ui-create-component`**. Implement from **Research** only (no duplicate registry/Figma discovery).
- Subagent prompt: [agents/02-build.md](agents/02-build.md).
- **Gate:** `component-name.tsx` and `index.ts` exist; **Implementation** section updated.

### Phase 3 — Tests

- Load **`ui-create-tests`**. Author `*.test.tsx`; do **not** run vitest unless the user explicitly asked.
- Subagent prompt: [agents/03-tests.md](agents/03-tests.md).
- **Gate:** **Tests** section lists scenarios and the intended `npx vitest run …` command.

### Phase 4 — Story

- Load **`ui-create-story`**. Include design-spec when Figma/catalog expects it.
- Subagent prompt: [agents/04-story.md](agents/04-story.md).
- **Gate:** `*.stories.tsx` exists; **Story** section updated.

### Phase 5 — Verify

- Load **`ui-verify-component`** and **`ui-browser-verify-story`** (Finish protocol + Storybook in built-in browser).
- Subagent prompt: [agents/05-verify.md](agents/05-verify.md).
- **Gate:** **Verify** records clean `npm run verify`, **Browser (Storybook)** pass or documented blockers (including MCP blocked).

## Finish protocol

Same rules as **`ui-project`** → Finish protocol (verify). Phase 5 / **Verify component** runs **`npm run verify` once** and **browser Storybook smoke test** when `*.stories.tsx` exists; phases 1–4 do not. No automatic verify on every agent turn — only this pipeline step or when the user picks **Verify component**.

## Subagent spawning (optional)

When using Task tool:

- `subagent_type`: `generalPurpose`
- `model`: `inherit`
- Include: absolute repo root, `layer`, `component-name`, full path to `.pipeline.md`, and “Read and follow skill `<name>` first.”

Phases 1–4 may run inline in one chat if context allows; still update `.pipeline.md` after each phase.

## Export surface

If the component is new, ensure [`src/components/atoms/index.ts`](../../../src/components/atoms/index.ts) (or organisms/rhf barrel) exports it when that is the project convention for the layer.
