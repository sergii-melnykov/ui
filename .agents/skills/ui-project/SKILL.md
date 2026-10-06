---
name: ui-project
description: |
  Describes the @me1a/ui library project structure, conventions, and skill routing.
  Use this skill when working on the UI component library — adding, modifying, or debugging
  components, following atomic design, or applying project conventions. This skill tells you
  which other skill to load for your specific task. When working with this project, ALWAYS
  load and use the `shadcn` skill for component management, CLI operations, styling guidance,
  and all shadcn/ui-related tasks. Also triggers on: "add a component", "fix styling",
  "create a form", "build a page layout", "update the theme", "change the preset",
  "optimize form performance", "debug a rendering issue", "refactor a component",
  "add validation", "work with server actions". Agents must not rewrite ESLint/Prettier config or
  ignore files when fixing lint/format unless the user explicitly requests tooling changes.
---

# @me1a/ui Project — Skill Router & Conventions

This skill describes the `@me1a/ui` library project — a Next.js UI component library built with shadcn/ui, Tailwind CSS, and React Hook Form.

## Your First Priority: Route to the Right Skill

**Do NOT attempt to handle tasks directly.** This project has specialized skills for each concern. Your job is to identify what the user needs and route to the correct skill. Read this entire document first, then load the appropriate skill.

**Always load the `shadcn` skill** when working with components — it provides the CLI commands, styling rules, composition patterns, and component docs needed for shadcn/ui projects.

---

## Skill Routing Matrix

| If the user asks about...                                                                                                            | Load this skill first         | Why                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | -------------------------------------------------------------------------------------------------- |
| Adding/installing components, CLI commands, component composition, presets, theming, icons, shadcn styling in this design system     | `shadcn`                      | The shadcn skill has all CLI commands, critical styling rules, component docs, and project context |
| `*.test.tsx`, Vitest, React Testing Library, mocking, accessibility in unit tests                                                      | `react-testing`               | Behavior-focused RTL patterns with Vitest (this repo's test runner)                                |
| `*.stories.tsx`, Storybook, CSF 3, argTypes, decorators, `.storybook/` config                                                        | `storybook`                   | CSF 3.0 stories and Storybook configuration aligned with this project                              |
| Tailwind v4 utilities, `@theme`, v3→v4 migration, config edge cases (then shadcn for semantic tokens)                                  | `tailwind-4-docs`             | Official Tailwind v4 doc snapshot and migration guidance; see also `docs/V4_THEME.md`              |
| Building forms, form validation, react-hook-form patterns, performance optimization for forms, useForm, useFieldArray, useController | `react-hook-form`             | Comprehensive 45-rule guide for RHF v7+                                                            |
| Next.js file conventions, RSC boundaries, async APIs, metadata, error handling, route handlers                                       | `next-best-practices`         | Next.js 15+ best practices including async APIs and RSC                                            |
| Next.js 16 cache components, PPR, `use cache` directive, cacheLife, cacheTag                                                         | `next-cache-components`       | Cache Components and Partial Prerendering                                                          |
| Component architecture, compound components, React 19 APIs, refactoring boolean props                                                | `vercel-composition-patterns` | Composition patterns for flexible component APIs                                                   |
| React/Next.js performance, bundle optimization, re-render optimization, server-side performance, waterfall elimination               | `vercel-react-best-practices` | 70 performance rules from Vercel Engineering                                                       |
| Verifying UI in the browser, Storybook interactions, DOM/layout checks, visual parity after Figma                                    | `ui-browser-verify-story`     | Storybook on :6006 via `cursor-ide-browser` MCP (pipeline phase 5 / after stories)                 |
| Creating or modifying skills in this project                                                                                         | `skill-creator`               | Skill creation and iteration workflow                                                              |

### How to Route

1. **Identify the user's primary concern** from the matrix above.
2. **Load the corresponding skill** by reading its `SKILL.md`.
3. **Follow that skill's instructions** to complete the task.
4. **If the task spans multiple concerns** (e.g., "add a component with stories and tests"), load `shadcn` first, then `storybook` and `react-testing` as needed; for forms add `react-hook-form`.

---

## Project Overview

```
@me1a/ui — published as npm package
├── src/
│   ├── components/
│   │   ├── atoms/       → Atomic design: basic components (Button, Input, Dialog, Table, etc.)
│   │   ├── organisms/   → Complex composed components (Sidebar, Drawer, DropdownMenu)
│   │   └── rhf/         → React Hook Form wrappers (Form shell + FormInput, FormCheckbox, …; mirrors atom names)
│   ├── hooks/           → Custom hooks (useMobile, useToast)
│   ├── utils/           → Utilities (cn helper)
│   ├── types/           → Shared TypeScript types
│   └── styles/          → Global CSS (Tailwind + CSS variables)
├── components.json      → shadcn/ui configuration
├── package.json         → Dependencies: next, react 19, react-hook-form, tailwindcss, zod
└── storybook/           → Component documentation via Storybook
```

### Key Technologies

| Technology             | Why                                              | Relevant Skill                                               |
| ---------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| **Next.js 15+**        | Framework peer dependency                        | `next-best-practices`, `next-cache-components`               |
| **React 19**           | UI library peer dependency                       | `vercel-react-best-practices`, `vercel-composition-patterns` |
| **shadcn/ui**          | Component system (radix primitives + Tailwind)   | `shadcn`                                                     |
| **Tailwind CSS v4**    | Utility-first CSS (`globals.css` + `@theme inline`) | `tailwind-4-docs`, `shadcn` (rules/styling.md), `docs/V4_THEME.md` |
| **react-hook-form v7** | Form state management and validation             | `react-hook-form`                                            |
| **Zod**                | Schema validation for forms                      | `react-hook-form` (via validation patterns)                  |
| **Vitest + RTL**       | Unit tests colocated as `*.test.tsx`             | `react-testing`                                              |
| **Storybook 9**        | CSF 3 stories and component docs                 | `storybook`                                                  |
| **TypeScript**         | Typed components                                 | none needed                                                  |

### Component Organization (Atomic Design)

This project follows **atomic design** principles:

- **`atoms/`** — Basic, reusable components that can't be broken down further. Examples: `Button`, `Input`, `Dialog`, `Table`, `Checkbox`, `Switch`, `Select`, `Label`, `Breadcrumb`, `Pagination`, `Separator`, `Skeleton`, `Tooltip`, `Toast`, `Command`, `Collapsible`, `Popover`, `Resizable`, `ScrollArea`, `Textarea`, `Container`, `Stack`, `Typography`, `PageLoader`, `DndInput`, `Sheet`.
- **`organisms/`** — Complex composites of atoms and molecules. Examples: `Sidebar`, `Drawer`, `DropdownMenu`.
- **`rhf/`** — React Hook Form field wrappers named after the underlying atom (`FormInput`, `FormCheckbox`, …). Package subpaths: `@me1a/ui/rhf/input`, `@me1a/ui/rhf/select`, etc. Shell: `Form`, `FormField`, … in `@me1a/ui/rhf/form`.

#### Rules for Atomic Design

- **Atoms must not import organisms or rhf components.** Keep dependencies uni-directional (atoms → organisms → rhf is invalid).
- **Organisms compose atoms** — they import and arrange multiple atomic components.
- **RHF components wrap atoms** with react-hook-form's `useController`. They always re-export or compose an underlying atom.
- **Each component has its own directory** with the structure: `component-name/component-name.tsx`, `component-name.types.ts`, `component-name.test.tsx`, `component-name.stories.tsx`, `index.ts`.
- **Do not create new component directories** unless the user explicitly asks for a new component. Always check existing ones first.

### Component File Structure

Every component follows this convention:

```
component-name/
├── component-name.tsx         → Component implementation
├── component-name.types.ts    → TypeScript props/type definitions
├── component-name.test.tsx    → Vitest unit tests
├── component-name.stories.tsx → Storybook stories
└── index.ts                   → Public re-exports
```

### Styling Conventions

- **Tailwind CSS v4** with `@import "tailwindcss"`, `@custom-variant dark`, `@theme inline`, and a slim `tailwind.config.js` (content + container only).
- **OKLCH CSS variables** in `src/styles/globals.css` (`:root` / `.dark`); Figma snapshot in `tokens/figma-mode.json`, applied via `npm run sync:tokens`; see `docs/V4_THEME.md`.
- Sidebar surface token: `--sidebar` (not `--sidebar-background`).
- **`cn()` utility** from `src/utils/cn.ts` for conditional class merging (wraps `clsx` + `tailwind-merge`).
- **Semantic color tokens** (`bg-primary`, `text-muted-foreground`) — never raw colors like `bg-blue-500`.
- **For full styling rules**, load the `shadcn` skill and see `rules/styling.md`.

### Form Conventions

- **React Hook Form** for form state management.
- **Zod** for schema validation (used with `@hookform/resolvers`).
- **RHF wrapper components** in `src/components/rhf/` bridge shadcn/ui inputs with react-hook-form.
- **For full form rules**, load the `react-hook-form` skill.

### Build & Test Scripts

From `package.json`:

```bash
npm run build        # tsup — bundle the library
npm run dev          # tsup --watch — dev mode
npm run test         # vitest — run unit tests
npm run storybook    # Storybook dev server on port 6006
npm run verify       # lint + format + typecheck:all (preferred before PR / at end of task)
npm run lint         # ESLint with max-warnings 0
npm run format       # prettier --check
npm run typecheck    # tsc --noEmit
npm run typecheck:all # tsc + native tsc (TS7 migration)
```

---

## Workflow: Common Tasks

### Adding a New Component

1. Load the `shadcn` skill.
2. Run `npx shadcn@latest search` to find if it exists in a registry.
3. Run `npx shadcn@latest add <component>` to install it.
4. Follow the shadcn skill's workflow for post-install review.
5. Load `storybook` and `react-testing` when adding or updating `*.stories.tsx` and `*.test.tsx`.

### Building a Form

1. Load the `shadcn` skill — use `FieldGroup`/`Field`/`InputGroup` for form layout.
2. For form data/validation logic, use existing wrappers in `src/components/rhf/` (e.g., `FormInput`, `FormCheckbox`, `FormSelect`).
3. For wiring forms with validation, load `react-hook-form` skill.
4. For complex validation, use Zod schemas with `@hookform/resolvers/zod`.

### Debugging a Component

1. Load the `shadcn` skill.
2. Run `npx shadcn@latest docs <component>` and fetch the docs to verify correct API usage.
3. Load `react-testing` and check `test.tsx` files for test patterns.
4. Run `npm run test` to see if existing tests pass.
5. For visual or interaction bugs, load **`ui-browser-verify-story`** and verify in Cursor's built-in browser against Storybook (`npm run storybook` → `http://localhost:6006`): snapshot, reproduce, screenshot.

### Styling Changes

1. Load the `shadcn` skill — it contains project Tailwind/styling rules.
2. For Tailwind v4 utilities, `@theme`, or migration questions, load `tailwind-4-docs` and `docs/V4_THEME.md`.
3. Check `rules/styling.md` for semantic colors, spacing conventions, and dark mode.
4. Edit `src/styles/globals.css` for CSS variable changes (never create new CSS files).

### Performance Optimization

1. Load `vercel-react-best-practices` for general React/Next.js perf.
2. Load `react-hook-form` for form-specific perf (subscriptions, re-renders).
3. Load `next-best-practices` for server-side data fetching patterns.

---

## Lint & Prettier tooling (do not rewrite)

When fixing lint or format failures — or when running **Run lint** / **Run prettier** agents — **change application source only**. Do **not** edit ESLint or Prettier configuration or ignore files unless the user **explicitly** asks to change tooling setup.

**Protected paths (hands off by default):**

- [`eslint.config.mjs`](../../../eslint.config.mjs)
- [`tsconfig.eslint.json`](../../../tsconfig.eslint.json) (typed ESLint program only)
- `.eslintignore` (if present)
- [`.prettierrc`](../../../.prettierrc)
- [`.prettierignore`](../../../.prettierignore)

Fix violations in `src/`, stories, tests, and other linted sources. If a rule blocks progress, report it and ask the user — do not weaken config, add broad disables, or delete ignore entries without approval.

---

## Critical Project Rules

1. **Always load `shadcn` skill before working with any component.** It provides CLI commands, styling rules, and composition patterns that are essential for this project.
2. **Never guess component APIs.** Run `npx shadcn@latest docs <component>` and fetch the documentation URLs.
3. **Use existing RHF wrappers** for forms — don't directly wire react-hook-form to shadcn inputs unless no wrapper exists.
4. **Respect atomic design boundaries.** Don't import organisms into atoms, or rhf into organisms.
5. **One component per directory** with the standard file structure (tsx, types.ts, test.tsx, stories.tsx, index.ts).
6. **No raw color values.** Always use semantic Tailwind tokens or CSS variables.
7. **Do not run lint/format/typecheck during multi-phase work** unless debugging a specific failure or using **Verify component** / pipeline phase 5. **Vitest is paused** during the per-component redesign — do not block work on `*.test.tsx` until a component is redesigned and tests are rewritten.
8. **Do not rewrite lint or Prettier configs or ignore files** — see [Lint & Prettier tooling](#lint--prettier-tooling-do-not-rewrite) above.

### Tests (paused during redesign)

Existing `*.test.tsx` files may be out of date. CI **does not run `npm test`** until coverage is restored component-by-component. Use Storybook for visual checks; run **Run tests** or `npm test` only when the user asks.

### Finish protocol (verify)

When an agent should confirm the repo is clean (pipeline phase 5, **Verify component**, or user request), from repo root run **`npm run verify` once**. When the component has **`*.stories.tsx`**, also run **`ui-browser-verify-story`** (Storybook + built-in browser smoke test). Fix failures in **source only** — do not rewrite ESLint/Prettier config or ignore files unless the user asked. Do not re-run lint, format, or typecheck separately if verify already passed. Do not run vitest unless the user asked. **Pre-PR (optional):** CI also runs `validate:tokens`, `build`, and `build-storybook`.

Run verify/lint/test **in the foreground** (no `| tail` / `| head`, no trailing `&`). Project [`.cursor/hooks.json`](../../../.cursor/hooks.json) blocks risky agent shell patterns and cleans up orphan lint processes on agent **stop** / **sessionEnd**.

## Project agents (invokable)

These agents use `disable-model-invocation: true` — pick them from the Cursor agent list for an explicit workflow. They load the skills below as needed.

| Agent | Skill path | Use when |
| ----- | ---------- | -------- |
| **Component pipeline (full)** | `.cursor/skills/ui-component-pipeline` | One component end-to-end: research → build → tests → story → verify |
| **Research component (shadcn + Figma)** | `ui-research-shadcn-figma` | Phase 1 or standalone registry + Figma research |
| **Create component** | `ui-create-component` | Phase 2 or standalone scaffold/implement |
| **Create tests** | `ui-create-tests` | Phase 3 or standalone `*.test.tsx` (author only; vitest when user asks) |
| **Create story** | `ui-create-story` | Phase 4 or standalone stories + optional design-spec |
| **Verify component** | `ui-verify-component` | Phase 5 or standalone `npm run verify` + Storybook browser check + fix loop |
| **Browser verify story** | `ui-browser-verify-story` | Storybook smoke test in built-in browser (also embedded in Verify component) |
| **Run lint** | `ui-run-lint` | ESLint only |
| **Run prettier** | `ui-run-prettier` | Format fix + check |
| **Run typecheck** | `ui-run-typecheck` | `typecheck:all` (or individual tsc scripts when debugging) |
| **Run tests** | `ui-run-tests` | Vitest (only when user wants tests executed) |

For day-to-day chat, skills such as `shadcn`, `storybook`, and `react-testing` still auto-trigger from descriptions. Use agents when the task should follow one fixed playbook end-to-end.

### Per-component pipeline

**Orchestrator:** **Component pipeline (full)** — one component per run.

**Order:** Research → Create component → Create tests → Create story → Verify component.

**Handoff file (single source of truth):**

`src/components/{atoms|organisms|rhf}/<component-name>/<component-name>.pipeline.md`

Sections: **Inputs**, **Research**, **Implementation**, **Tests**, **Story**, **Verify**. Each phase agent updates its section; phase 5 runs **`npm run verify` once** and **`ui-browser-verify-story`** when stories exist ([Finish protocol](#finish-protocol-verify)). Do not run vitest in the pipeline unless the user explicitly asks.

**When to use:** Full redesign or new component with Figma/shadcn parity. For a single step, pick the matching specialist instead of the orchestrator. Ad-hoc edits outside the pipeline: run **Verify component** or ask the agent to verify before finishing — there is no automatic verify hook on every turn.

## Related Skills

- **[shadcn](./shadcn/SKILL.md)** — Component management, CLI, styling rules, composition. **Always load this first.**
- **[storybook](./storybook/SKILL.md)** — CSF 3 stories, Storybook config, decorators and parameters.
- **[react-testing](./react-testing/SKILL.md)** — Vitest + React Testing Library component tests.
- **[tailwind-4-docs](./tailwind-4-docs/SKILL.md)** — Tailwind CSS v4 documentation and migration reference.
- **[react-hook-form](./react-hook-form/SKILL.md)** — Form performance, validation, subscription patterns.
- **[next-best-practices](./next-best-practices/SKILL.md)** — Next.js file conventions, RSC, async APIs, metadata.
- **[next-cache-components](./next-cache-components/SKILL.md)** — Next.js 16 cache components, PPR, `use cache`.
- **[vercel-composition-patterns](./vercel-composition-patterns/SKILL.md)** — Component architecture, compound components.
- **[vercel-react-best-practices](./vercel-react-best-practices/SKILL.md)** — React/Next.js performance optimization.
- **[skill-creator](./skill-creator/SKILL.md)** — Create and iterate on new skills.
- **[ui-browser-verify-story](./ui-browser-verify-story/SKILL.md)** — Storybook verification in Cursor's built-in browser.
