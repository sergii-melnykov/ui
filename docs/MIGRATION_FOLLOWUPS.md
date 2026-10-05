# @me1a/ui — TypeScript 7 / Build Follow-ups

See also: `app-skeleton/docs/MIGRATION_FOLLOWUPS.md` in the sibling app-skeleton repo.

Theme / Tailwind v4 (OKLCH tokens, Figma sync, consumer CSS): [V4_THEME.md](./V4_THEME.md).

## Current hybrid setup

- `peerDependencies.next`: ^16.3.0
- **Package build:** [tsdown](https://github.com/rolldown/tsdown) (`npm run build`) with per-component ESM entries
- **Unit tests:** Vitest + jsdom + React Testing Library (`npm test`) — **CI and agent verify skip the suite** until each component is redesigned and tests are rewritten
- **Storybook:** 8.6.x stable on `@storybook/react-vite`
- `devDependencies.typescript`: ^6.0.2 (dts emit via tsdown)
- `devDependencies.typescript-native`: npm alias for typescript@^7.0.2
- `typecheck:fast`: TS7 native type-check via `typescript-native/bin/tsc --noEmit`
- Test files are included in `typecheck` / `typecheck:fast` (stories remain excluded)

## Blocked / lagging tooling

| Tool | Issue |
|------|-------|
| @typescript-eslint v6 | Peer dep excludes typescript >= 6.1 |
| eslint-config-next ^14 | Peers Next 16 — rules may lag consumer apps |

## Recommended next steps

1. **Short term:** Keep dual typecheck in CI; rely on Vitest for unit tests (no Babel / Jest).
2. **Medium term:** Align ESLint/typescript-eslint with app-skeleton (flat config, v8+); bump eslint-config-next when upgrading ESLint stack.
3. **Long term:** Evaluate `treeshake: true` in tsdown alongside the preserve-use-client plugin.
