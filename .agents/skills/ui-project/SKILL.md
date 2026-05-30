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
  "add validation", "work with server actions".
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
| Adding/installing components, CLI commands, styling with Tailwind, component composition, presets, theming, icons                    | `shadcn`                      | The shadcn skill has all CLI commands, critical styling rules, component docs, and project context |
| Building forms, form validation, react-hook-form patterns, performance optimization for forms, useForm, useFieldArray, useController | `react-hook-form`             | Comprehensive 45-rule guide for RHF v7+                                                            |
| Next.js file conventions, RSC boundaries, async APIs, metadata, error handling, route handlers                                       | `next-best-practices`         | Next.js 15+ best practices including async APIs and RSC                                            |
| Next.js 16 cache components, PPR, `use cache` directive, cacheLife, cacheTag                                                         | `next-cache-components`       | Cache Components and Partial Prerendering                                                          |
| Component architecture, compound components, React 19 APIs, refactoring boolean props                                                | `vercel-composition-patterns` | Composition patterns for flexible component APIs                                                   |
| React/Next.js performance, bundle optimization, re-render optimization, server-side performance, waterfall elimination               | `vercel-react-best-practices` | 70 performance rules from Vercel Engineering                                                       |
| Creating or modifying skills in this project                                                                                         | `skill-creator`               | Skill creation and iteration workflow                                                              |

### How to Route

1. **Identify the user's primary concern** from the matrix above.
2. **Load the corresponding skill** by reading its `SKILL.md`.
3. **Follow that skill's instructions** to complete the task.
4. **If the task spans multiple concerns** (e.g., "add a form with validation and style it"), load `shadcn` first for the component setup, then `react-hook-form` for the form wiring.

---

## Project Overview

```
@me1a/ui — published as npm package
├── src/
│   ├── components/
│   │   ├── atoms/       → Atomic design: basic components (Button, Input, Dialog, Table, etc.)
│   │   ├── organisms/   → Complex composed components (Sidebar, Drawer, DropdownMenu)
│   │   └── rhf/         → React Hook Form wrappers (Form, RHFCheckbox, RHFTextField, etc.)
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
| **Tailwind CSS v3**    | Utility-first CSS (v3 with `tailwind.config.js`) | `shadcn` (via rules/styling.md)                              |
| **react-hook-form v7** | Form state management and validation             | `react-hook-form`                                            |
| **Zod**                | Schema validation for forms                      | `react-hook-form` (via validation patterns)                  |
| **Storybook**          | Component documentation and testing              | none needed                                                  |
| **TypeScript**         | Typed components                                 | none needed                                                  |

### Component Organization (Atomic Design)

This project follows **atomic design** principles:

- **`atoms/`** — Basic, reusable components that can't be broken down further. Examples: `Button`, `Input`, `Dialog`, `Table`, `Checkbox`, `Switch`, `Select`, `Label`, `Breadcrumb`, `Pagination`, `Separator`, `Skeleton`, `Tooltip`, `Toast`, `Command`, `Collapsible`, `Popover`, `Resizable`, `ScrollArea`, `Textarea`, `Container`, `Stack`, `Typography`, `PageLoader`, `DndInput`, `Sheet`.
- **`organisms/`** — Complex composites of atoms and molecules. Examples: `Sidebar`, `Drawer`, `DropdownMenu`.
- **`rhf/`** — Specialized React Hook Form wrappers that bridge shadcn/ui components with `useController`. Examples: `Form`, `RHFCheckbox`, `RHFTextField`, `RHFTextarea`, `RHFSelect`, `RHFMultiSelect`, `RHFSwitch`, `RHFRadioGroup`, `RHFRadioButtonGroup`, `RHF DndInput`.

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
├── component-name.test.tsx    → Jest unit tests
├── component-name.stories.tsx → Storybook stories
└── index.ts                   → Public re-exports
```

### Styling Conventions

- **Tailwind CSS v3** with `tailwind.config.js` (NOT v4 with `@theme`).
- **CSS variables** defined in `src/styles/globals.css` for the design token system.
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
npm run test         # jest — run unit tests
npm run storybook    # Storybook dev server on port 6006
npm run lint         # ESLint with max-warnings 0
npm run typecheck    # tsc --noEmit
npm run format       # prettier --check
```

---

## Workflow: Common Tasks

### Adding a New Component

1. Load the `shadcn` skill.
2. Run `npx shadcn@latest search` to find if it exists in a registry.
3. Run `npx shadcn@latest add <component>` to install it.
4. Follow the shadcn skill's workflow for post-install review.

### Building a Form

1. Load the `shadcn` skill — use `FieldGroup`/`Field`/`InputGroup` for form layout.
2. For form data/validation logic, use existing RHF wrappers in `src/components/rhf/` (e.g., `RHFTextField`, `RHFCheckbox`, `RHFSelect`).
3. For wiring forms with validation, load `react-hook-form` skill.
4. For complex validation, use Zod schemas with `@hookform/resolvers/zod`.

### Debugging a Component

1. Load the `shadcn` skill.
2. Run `npx shadcn@latest docs <component>` and fetch the docs to verify correct API usage.
3. Check `test.tsx` files for test patterns.
4. Run `npm run test` to see if existing tests pass.

### Styling Changes

1. Load the `shadcn` skill — it contains all Tailwind/styling rules.
2. Check `rules/styling.md` for semantic colors, spacing conventions, and dark mode.
3. Edit `src/styles/globals.css` for CSS variable changes (never create new CSS files).

### Performance Optimization

1. Load `vercel-react-best-practices` for general React/Next.js perf.
2. Load `react-hook-form` for form-specific perf (subscriptions, re-renders).
3. Load `next-best-practices` for server-side data fetching patterns.

---

## Critical Project Rules

1. **Always load `shadcn` skill before working with any component.** It provides CLI commands, styling rules, and composition patterns that are essential for this project.
2. **Never guess component APIs.** Run `npx shadcn@latest docs <component>` and fetch the documentation URLs.
3. **Use existing RHF wrappers** for forms — don't directly wire react-hook-form to shadcn inputs unless no wrapper exists.
4. **Respect atomic design boundaries.** Don't import organisms into atoms, or rhf into organisms.
5. **One component per directory** with the standard file structure (tsx, types.ts, test.tsx, stories.tsx, index.ts).
6. **No raw color values.** Always use semantic Tailwind tokens or CSS variables.
7. **Run `npm run typecheck` and `npm run test`** before considering a task complete, when modifying existing components.

## Related Skills

- **[shadcn](./shadcn/SKILL.md)** — Component management, CLI, styling rules, composition. **Always load this first.**
- **[react-hook-form](./react-hook-form/SKILL.md)** — Form performance, validation, subscription patterns.
- **[next-best-practices](./next-best-practices/SKILL.md)** — Next.js file conventions, RSC, async APIs, metadata.
- **[next-cache-components](./next-cache-components/SKILL.md)** — Next.js 16 cache components, PPR, `use cache`.
- **[vercel-composition-patterns](./vercel-composition-patterns/SKILL.md)** — Component architecture, compound components.
- **[vercel-react-best-practices](./vercel-react-best-practices/SKILL.md)** — React/Next.js performance optimization.
- **[skill-creator](./skill-creator/SKILL.md)** — Create and iterate on new skills.
