# @me1a/ui — TypeScript 7 / Build Follow-ups

See also: `app-skeleton/docs/MIGRATION_FOLLOWUPS.md` in the sibling app-skeleton repo.

## Current hybrid setup (August 2026)

- `peerDependencies.next`: ^16.3.0
- `devDependencies.typescript`: ^6.0.2 (required by tsup dts + @typescript-eslint v6)
- `devDependencies.typescript-native`: npm alias for typescript@^7.0.2
- `typecheck:fast`: optional TS7 native type-check via `typescript-native/bin/tsc --noEmit`

## Blocked until TS 7.1 or build migration

| Tool | Issue |
|------|-------|
| tsup + `dts: true` | rollup-plugin-dts needs TS Compiler API (broken on native TS7) |
| @typescript-eslint v6 | Peer dep excludes typescript >= 6.1 |

## Recommended next steps

1. **Short term:** Use `npm run typecheck:fast` in CI for faster feedback; keep `npm run build` on TS6 until dts path is fixed.
2. **Medium term:** Split dts emit (tsup JS-only + `tsc --emitDeclarationOnly`) OR migrate to tsdown.
3. **Long term:** Align ESLint/typescript-eslint with app-skeleton (flat config, v8+).
