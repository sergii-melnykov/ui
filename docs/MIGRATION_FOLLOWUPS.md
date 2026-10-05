# @me1a/ui — TypeScript 7 / Build Follow-ups

See also: `app-skeleton/docs/MIGRATION_FOLLOWUPS.md` in the sibling app-skeleton repo.

Theme / Tailwind v4 (OKLCH tokens, Figma sync, consumer CSS): [V4_THEME.md](./V4_THEME.md).

## Current hybrid setup

- `peerDependencies.next`: ^16.3.0
- `peerDependencies.zod`: ^4.0.0 (semver-major `@me1a/ui` v5 for consumers)
- **Package build:** [tsdown](https://github.com/rolldown/tsdown) (`npm run build`) with per-component ESM entries
- **Unit tests:** Vitest 5 + jsdom + React Testing Library (`npm test`) — **CI and agent verify skip the suite** until each component is redesigned and tests are rewritten
- **Storybook:** 10.x on `@storybook/react-vite`
- **ESLint:** flat config ([`eslint.config.mjs`](../eslint.config.mjs)) with `eslint-config-next` 16 core-web-vitals + typescript, then `typescript-eslint` **`strictTypeChecked`** for `**/*.{ts,tsx}`. Typed lint uses `parserOptions.project: ['./tsconfig.eslint.json']` (standalone TS program — see below); `projectService: true` alone does not cover story/Storybook files while root [`tsconfig.json`](../tsconfig.json) excludes `**/*.stories.*`. [`tsconfig.eslint.json`](../tsconfig.eslint.json) duplicates compiler options (no `extends`) so stories and `.storybook` are in the lint program without joining `tsc`. Prettier runs standalone (`npm run format`); `eslint-config-prettier` last. Storybook plugin + targeted story/test rule overrides. Re-enabled default jsx-a11y / import rules (legacy Airbnb `off` entries removed from global block).
- `devDependencies.typescript`: ^6.x (dts emit via tsdown)
- `devDependencies.typescript-native`: npm alias for typescript@^7.x
- `typecheck:fast`: TS7 native type-check via `typescript-native/bin/tsc --noEmit`
- Test files are included in `typecheck` / `typecheck:fast` (stories remain excluded)

## Recommended next steps

1. **Short term:** Keep dual typecheck in CI; re-enable Vitest in CI when component redesign + tests land.
2. **Long term:** Evaluate `treeshake: true` in tsdown alongside the preserve-use-client plugin.
