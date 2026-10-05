# Warnings from Plan / Agent stop-hook verify chain

Commands the **stop** hook runs: [`.cursor/hooks/stop-verify-followup.sh`](../.cursor/hooks/stop-verify-followup.sh).

**Last updated:** 2026-10-05 after silencing repo-fixable lint/Storybook noise.

---

## Fixed in repo

| Former noise | Fix |
|--------------|-----|
| `Pages directory cannot be found …` on lint | `@next/next/no-html-link-for-pages` off in [`eslint.config.mjs`](../eslint.config.mjs) |
| Vite `configLoader: 'native'` / ESM in `vite.config.ts` | [`vite.config.mjs`](../vite.config.mjs) (native ESM) |
| Storybook chunks &gt; 500 kB | `chunkSizeWarningLimit: 3000` in [`.storybook/main.ts`](../.storybook/main.ts) `viteFinal` |

---

## Still environment-specific

| Source | Message | Action |
|--------|---------|--------|
| **npm** | `Unknown env config "devdir"` | Remove `devdir` from `~/.npmrc` or env (`npm config delete devdir` if set). Not controlled by this repo. Cursor/sandbox shells may inject it. |

---

## Stop hook command order

1. `npm run lint`
2. `npm run format`
3. `npm run typecheck`
4. `npm run typecheck:fast`

Before PR (hook text): `validate:tokens`, `build`, `build-storybook`.

---

## Cursor Hooks output channel

Script/JSON/matcher issues appear under **View → Output → Hooks** — separate from npm/eslint/vite stderr.
