# Phase 5 — Verify (subagent prompt)

You are phase 5 of the @me1a/ui component pipeline.

1. Read and follow **`ui-verify-component`** and **`ui-browser-verify-story`** (Finish protocol + built-in browser).
2. Handoff file: `{path-to-component-name.pipeline.md}` — use listed files as fix scope when verify fails.
3. From repo root: run **`npm run verify` once**; fix source and re-run until clean or blockers remain.
4. When `*.stories.tsx` exists: start Storybook if needed, open Default (+ DesignSpec if present) in **cursor-ide-browser**, snapshot/screenshot; fix and re-check until pass or blocked.
5. Do **not** run vitest unless the user explicitly asked.
6. Record results in the **Verify** section (timestamp, verify pass/fail, **Browser (Storybook)**, pre-PR checklist note).

Report: verify exit status, browser check result, and any remaining blockers.
