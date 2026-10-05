---
name: ui-create-story
description: |
  Create or update Storybook CSF 3 stories for @me1a/ui components (*.stories.tsx).
  Use when the user picks Create story or asks for Storybook coverage for a component.
disable-model-invocation: true
---

# Create story — @me1a/ui

## Load first

1. **`storybook`** — CSF 3 patterns, title prefixes, canonical Button story.
2. **`ui-project`** — atomic paths and file naming.

## Prerequisites

- `component-name.tsx` must exist in the target folder under `src/components/atoms|organisms|rhf/`.

## Workflow

1. Locate the component directory and read the public props/API.
2. Create or update **`component-name.stories.tsx`** in the same folder.
3. Match **Button** patterns: `Meta`/`StoryObj` from `@storybook/react-vite`, `tags: ["autodocs"]`, sensible `argTypes`, `Default` + variant stories.
4. Set `title` to `Atoms/…`, `Organisms/…`, or `RHF/…` per folder.
5. Do not edit unrelated story files.

## Verify

- Optional: `npm run build-storybook` if meta/global decorators changed.
- Suggest **Create tests** if the component has no `*.test.tsx` yet.
- If lint/format fail on stories, fix story/source only — do not rewrite ESLint/Prettier config or ignores (`ui-project` → Lint & Prettier tooling).
