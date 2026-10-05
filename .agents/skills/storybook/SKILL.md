---
name: storybook
description: |
  Storybook CSF 3 stories for @me1a/ui. Use whenever adding or editing *.stories.tsx,
  Storybook argTypes/decorators, .storybook/ config, autodocs, or running storybook locally.
  Also use when the user asks for a story, docs page, or visual examples for a component.
---

# Storybook — @me1a/ui

Storybook 10 with `@storybook/react-vite`. Stories are colocated with components as `component-name.stories.tsx`.

## Canonical example

Follow [`src/components/atoms/button/button.stories.tsx`](../../../src/components/atoms/button/button.stories.tsx):

- Import `Meta` and `StoryObj` from `@storybook/react-vite`
- `title` uses atomic prefix: `Atoms/`, `Organisms/`, or `RHF/` matching folder under `src/components/`
- `parameters.layout: "centered"` for single controls; use `"fullscreen"` or `"padded"` when the component needs it
- `tags: ["autodocs"]` for generated docs
- `argTypes` with `control: "select"` (or appropriate control) for enum-like props
- Export `Default` and variant stories via `args`

## File placement

```
src/components/<atoms|organisms|rhf>/component-name/
├── component-name.stories.tsx
```

Do not create stories in unrelated directories. One stories file per component folder.

## Title convention

| Folder | Storybook title prefix |
|--------|------------------------|
| `src/components/atoms/` | `Atoms/ComponentName` |
| `src/components/organisms/` | `Organisms/ComponentName` |
| `src/components/rhf/` | `RHF/ComponentName` |

Use PascalCase in the title segment after the prefix (e.g. `Atoms/Button`).

## Commands

```bash
npm run storybook          # dev server on port 6006
npm run build-storybook    # static build (CI uses this)
```

## Rules

1. Import the component from `./component-name` (same folder), not deep barrel paths unless the component already exports that way.
2. Prefer `args` over inline JSX in stories when showcasing prop variants.
3. Do not duplicate full component implementations in stories — compose the real export.
4. For form/RHF components, wrap with minimal providers only if the component requires context (check sibling stories in `rhf/`).
5. After adding stories, run `npm run build-storybook` if you changed meta/parameters that affect the docs build.
6. When ESLint flags story files, fix the story/source — do not edit `eslint.config.mjs`, `tsconfig.eslint.json`, or ignore files (see **`ui-project`** → Lint & Prettier tooling).

## Config

Project Storybook config lives under `.storybook/` (see `main.ts` for framework and addons). Do not add new config files unless the user asks for global decorators or addons.
