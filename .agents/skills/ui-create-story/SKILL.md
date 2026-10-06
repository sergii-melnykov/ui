---
name: ui-create-story
description: |
  Create or update Storybook CSF 3 stories for @me1a/ui components (*.stories.tsx).
  Use when the user picks Create story or pipeline phase 4. Supports design-spec pages
  and components-catalog curation (ALL_COMPONENTS / previews / rare story overrides).
disable-model-invocation: true
---

# Create story — @me1a/ui

## Load first

1. **`storybook`** — CSF 3 patterns, title prefixes, canonical Button story.
2. **`ui-project`** — atomic paths and file naming.

## Prerequisites

- `component-name.tsx` must exist in the target folder under `src/components/atoms|organisms|rhf/`.
- Pipeline: read `component-name.pipeline.md` (**Research** / **Inputs**) for catalog and Figma doc-page expectations.

## Workflow

1. Locate the component directory and read the public props/API.
2. Create or update **`component-name.stories.tsx`** in the same folder.
3. Match **Button** patterns: `Meta`/`StoryObj` from `@storybook/react-vite`, `tags: ["autodocs"]`, sensible `argTypes`, `Default` + variant stories.
4. Set `title` to `Atoms/…`, `Organisms/…`, or `RHF/…` per folder.
5. Do not edit unrelated story files.

## Design spec (Figma doc page)

When Research or the catalog expects a Figma documentation layout:

1. Add **`component-name-design-spec.tsx`** (Storybook-only; not exported from the package). Mirror [`badge-design-spec.tsx`](../../../src/components/atoms/badge/badge-design-spec.tsx).
2. Add a **`DesignSpec`** story in `*.stories.tsx`:

   ```tsx
   export const DesignSpec: Story = {
     render: () => <ComponentDesignSpec />,
     parameters: {
       layout: "fullscreen",
       docs: { disable: true }
     }
   }
   ```

   See [`badge.stories.tsx`](../../../src/components/atoms/badge/badge.stories.tsx).

3. Catalog links are resolved from Storybook **`index.json`** (prefers `DesignSpec`, then `Default`). Only update [`components-catalog-data.ts`](../../../src/components/pages/components-catalog/components-catalog-data.ts) when the Figma list needs a new **`ALL_COMPONENTS`** name, or add a rare override in [`components-catalog-story-index.ts`](../../../src/components/pages/components-catalog/components-catalog-story-index.ts) (`CATALOG_NAME_TO_STORY_TITLE`, `CATALOG_STORY_ID_OVERRIDES`).

## Pipeline handoff

Update **Story** in `component-name.pipeline.md`: story titles, DesignSpec yes/no. No manual story id map unless an override is required.

## Verify

- Do **not** run `npm run verify` here — use **Verify component** or pipeline phase 5.
- After stories are saved, run **`ui-browser-verify-story`** automatically (Storybook + built-in browser) unless the user asked to skip browser checks.
- Optional: `npm run build-storybook` only if the user asked for full CI parity or global Storybook config changed.
- If lint/format fail on stories, fix story/source only — do not rewrite ESLint/Prettier config or ignores (`ui-project` → Lint & Prettier tooling).
