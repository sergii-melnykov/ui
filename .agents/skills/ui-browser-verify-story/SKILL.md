---
name: ui-browser-verify-story
description: |
  Open @me1a/ui Storybook stories in Cursor's built-in browser (cursor-ide-browser MCP),
  snapshot/screenshot, and basic interaction checks. Run automatically after component
  implementation when *.stories.tsx exists — pipeline phase 5 and Verify component.
disable-model-invocation: true
---

# Browser verify (Storybook) — @me1a/ui

Visual and interaction smoke test for one component via **Storybook** and the **built-in browser** (`cursor-ide-browser` MCP). Required after implementation when stories exist (pipeline phase 5, **Verify component**, or standalone create-component + story flow).

## Load first

1. **`ui-project`** — Storybook port, story file layout.
2. **`storybook`** — `title` prefix (`Atoms/…`, `Organisms/…`, `RHF/…`).

## Prerequisites

- `component-name.stories.tsx` in `src/components/{layer}/{component-name}/`.
- Read `meta.title` and exported story names (`Default`, `DesignSpec`, etc.) from that file.

## Storybook URL

Dev server: **`http://localhost:6006`** (`npm run storybook`).

Story path (Storybook 9):

```text
http://localhost:6006/?path=/story/{slug}--{story-export-kebab}
```

- **slug:** `meta.title` lowercased, `/` → `-` (e.g. `Atoms/ButtonGroup` → `atoms-buttongroup`).
- **story-export-kebab:** export name lowercased (`Default` → `default`, `DesignSpec` → `designspec`). If the story sets `name: "With separator"`, prefer the export id (`with-separator`) unless navigation fails — then use Storybook UI or `index.json`.

Minimum stories to open:

1. **`Default`** (or first non–DesignSpec story if there is no Default).
2. **`DesignSpec`** when present in `*.stories.tsx`.

## Workflow (MCP — mandatory)

Use **`GetDynamicTools`** for namespace `cursor-ide-browser`, then **`CallDynamicTool`** for each step.

1. **Storybook running**
   - Check existing terminals / `curl -sf -o /dev/null http://localhost:6006` (or short CDP/snapshot attempt).
   - If not up: from repo root run `npm run storybook` **in the background** (`block_until_ms: 0`). Poll until `http://localhost:6006` responds (e.g. every 2–3s, max ~90s). Do not start a second server if one is already listening on 6006.

2. **Browser session**
   - `browser_tabs` → `list`.
   - `browser_navigate` to the Default (or primary) story URL.
   - `browser_lock` → `lock` before multi-step checks; `unlock` when done.

3. **Verify**
   - `browser_snapshot` — confirm the component root renders (no Storybook error overlay, no blank canvas).
   - `browser_take_screenshot` for Default; repeat for DesignSpec when applicable.
   - For interactive components (buttons, dialogs, toggles): one safe interaction via `browser_click` / `browser_press_key` and a follow-up snapshot.

4. **Failures**
   - Fix component or story source; reload the story URL and re-check.
   - If MCP/browser is unavailable, record **blocked** in the handoff (do not claim pass).

5. **Cleanup**
   - Leave Storybook running if the user may keep editing; do not kill unrelated dev processes.

## Handoff (`.pipeline.md`)

Under **Verify**, add **Browser (Storybook)**:

- ISO timestamp
- Storybook URL(s) visited
- Result: pass | fail | blocked (reason)
- Notes: overlay errors, missing stories, interaction issues

## When to run

| Context | Run browser verify? |
| ------- | ------------------- |
| Pipeline phase 5 / **Verify component** | **Yes** — after `npm run verify` passes (or in parallel if verify is clean on first run) |
| **Create story** (pipeline 4 or standalone) | **Yes** — immediately after stories are written, before handing off |
| **Create component** only (no stories yet) | **No** — defer until stories exist |
| User says “skip browser” | Skip; document in handoff |

## Do not

- Use browser automation for full CI parity instead of `npm run verify`.
- Run vitest unless the user asked.
- Edit ESLint/Prettier config when fixing story-only issues (`ui-project` → Lint & Prettier tooling).
