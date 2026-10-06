# Phase 4 — Story (subagent prompt)

You are phase 4 of the @me1a/ui component pipeline.

1. Read and follow **`ui-create-story`**.
2. Read `{path-to-component-name.pipeline.md}` for Figma/catalog context from **Research**.
3. Create or update `*.stories.tsx`; add `*-design-spec.tsx` + `DesignSpec` story when the catalog or Figma doc page applies.
4. Add the component to [`components-catalog-data.ts`](../../../../src/components/pages/components-catalog/components-catalog-data.ts) `ALL_COMPONENTS` when it belongs on the Figma index; story links auto-resolve from `index.json` (overrides only in `components-catalog-story-index.ts` when needed).
5. Update the **Story** section in the handoff file.
6. Do **not** run `npm run verify` or `build-storybook` unless the user asked for full CI parity.
7. After stories are saved, run **`ui-browser-verify-story`** (built-in browser) unless the user asked to skip browser checks or phase 5 runs immediately next in the same pipeline run.

Report: story titles, DesignSpec yes/no, and browser check pass/fail/blocked.
