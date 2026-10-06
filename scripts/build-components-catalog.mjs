/**
 * Build the components catalog page data from Storybook index.json.
 *
 * Writes a committed snapshot for offline/fallback use and optionally syncs
 * ALL_COMPONENTS in components-catalog-data.ts from discovered stories.
 *
 * Index resolution (first match):
 *   --index <path|url>
 *   STORYBOOK_INDEX env
 *   storybook-static/index.json
 *   http://127.0.0.1:6006/index.json (dev server)
 */

import fs from "node:fs"
import path from "node:path"

import {
  parseStoryIndex,
  storyTitleSegmentToLabel
} from "./lib/components-catalog-index.mjs"

const root = path.join(import.meta.dirname, "..")
const generatedIndexPath = path.join(
  root,
  "src/components/pages/components-catalog/components-catalog.generated-index.json"
)
const catalogDataPath = path.join(
  root,
  "src/components/pages/components-catalog/components-catalog-data.ts"
)

/** Story title segment → Figma / shadcn catalog display name. */
const STORY_SEGMENT_TO_CATALOG_NAME = {
  Toast: "Sonner",
  InputOtp: "Input OTP",
  NativeSelect: "Native Select",
  DataTable: "Data Table",
  DatePicker: "Date Picker",
  ButtonGroup: "Button Group",
  ToggleGroup: "Toggle Group",
  RadioGroup: "Radio Group",
  ScrollArea: "Scroll Area",
  HoverCard: "Hover Card",
  AlertDialog: "Alert Dialog",
  ContextMenu: "Context Menu",
  DropdownMenu: "Dropdown Menu",
  NavigationMenu: "Navigation Menu",
  InputGroup: "Input Group"
}

const CATALOG_LAYER_PREFIXES = new Set(["Atoms", "Molecules", "Organisms"])

function parseArgs(argv) {
  let indexSource
  let writeNames = false
  let checkOnly = false

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === "--index" && argv[i + 1]) {
      indexSource = argv[++i]
    } else if (arg === "--sync-names") {
      writeNames = true
    } else if (arg === "--check") {
      checkOnly = true
    } else if (arg === "--help" || arg === "-h") {
      console.log(`Usage: node scripts/build-components-catalog.mjs [options]

Options:
  --index <path|url>  Storybook index.json (default: auto-detect)
  --sync-names        Update ALL_COMPONENTS in components-catalog-data.ts
  --check             Exit 1 if generated files are out of date
  --help              Show this help
`)
      process.exit(0)
    }
  }

  return { indexSource, writeNames, checkOnly }
}

async function loadIndex(source) {
  if (source) {
    if (source.startsWith("http://") || source.startsWith("https://")) {
      const response = await fetch(source)
      if (!response.ok) {
        throw new Error(`Failed to fetch index (${String(response.status)}): ${source}`)
      }
      return response.json()
    }

    const filePath = path.isAbsolute(source) ? source : path.join(root, source)
    if (!fs.existsSync(filePath)) {
      throw new Error(`Index file not found: ${filePath}`)
    }
    return JSON.parse(fs.readFileSync(filePath, "utf8"))
  }

  const fromEnv = process.env.STORYBOOK_INDEX
  if (fromEnv) {
    return loadIndex(fromEnv)
  }

  const staticPath = path.join(root, "storybook-static/index.json")
  if (fs.existsSync(staticPath)) {
    return JSON.parse(fs.readFileSync(staticPath, "utf8"))
  }

  try {
    const response = await fetch("http://127.0.0.1:6006/index.json")
    if (response.ok) {
      return response.json()
    }
  } catch {
    // dev server not running
  }

  throw new Error(
    "No Storybook index found. Run `npm run storybook` or `npm run build-storybook`, or pass --index."
  )
}

function catalogNameFromStoryTitle(storyTitle) {
  const [layer, segment] = storyTitle.split("/")
  if (!layer || !segment || !CATALOG_LAYER_PREFIXES.has(layer)) return null
  const override = STORY_SEGMENT_TO_CATALOG_NAME[segment]
  if (override) return override
  return storyTitleSegmentToLabel(segment)
}

function collectCatalogNames(snapshot) {
  const names = new Set()
  for (const row of snapshot.groups) {
    const name = catalogNameFromStoryTitle(row.title)
    if (name) names.add(name)
  }
  return [...names].sort((a, b) => a.localeCompare(b))
}

function mergeCatalogNames(existing, discovered) {
  const merged = [...existing]
  for (const name of discovered) {
    if (!merged.includes(name)) merged.push(name)
  }
  return merged
}

function readCurrentAllComponents(source) {
  const match = source.match(/export const ALL_COMPONENTS = \[([\s\S]*?)\] as const/)
  if (!match) throw new Error("Could not parse ALL_COMPONENTS in components-catalog-data.ts")

  const names = []
  const stringPattern = /"((?:\\.|[^"\\])*)"/g
  let m
  while ((m = stringPattern.exec(match[1])) !== null) {
    names.push(m[1].replace(/\\"/g, '"'))
  }
  return names
}

function writeAllComponents(source, names) {
  const lines = names.map((name) => `  ${JSON.stringify(name)}`).join(",\n")
  return source.replace(
    /export const ALL_COMPONENTS = \[[\s\S]*?\] as const/,
    `export const ALL_COMPONENTS = [\n${lines}\n] as const`
  )
}

function normalizeJson(data) {
  return `${JSON.stringify(data, null, 2)}\n`
}

async function main() {
  const { indexSource, writeNames, checkOnly } = parseArgs(process.argv.slice(2))
  const index = await loadIndex(indexSource)
  const snapshot = parseStoryIndex(index)
  const discoveredNames = collectCatalogNames(snapshot)

  const nextIndexJson = normalizeJson(index)
  const existingIndex = fs.existsSync(generatedIndexPath)
    ? fs.readFileSync(generatedIndexPath, "utf8")
    : null

  const catalogSource = fs.readFileSync(catalogDataPath, "utf8")
  const currentNames = readCurrentAllComponents(catalogSource)
  const mergedNames = mergeCatalogNames(currentNames, discoveredNames)
  const nextCatalogSource = writeAllComponents(catalogSource, mergedNames)

  const indexStale = existingIndex !== nextIndexJson
  const namesStale = catalogSource !== nextCatalogSource

  if (checkOnly) {
    if (indexStale || namesStale) {
      console.error("Components catalog artifacts are out of date.")
      if (indexStale) console.error(`  - ${path.relative(root, generatedIndexPath)}`)
      if (namesStale) console.error(`  - ${path.relative(root, catalogDataPath)} (ALL_COMPONENTS)`)
      console.error("Run: npm run build:catalog")
      process.exit(1)
    }
    console.log(
      `Components catalog is up to date (${String(snapshot.groups.length)} story groups, ${String(mergedNames.length)} catalog names).`
    )
    return
  }

  fs.writeFileSync(generatedIndexPath, nextIndexJson)
  console.log(
    `Wrote ${path.relative(root, generatedIndexPath)} (${String(snapshot.groups.length)} component groups).`
  )

  if (writeNames) {
    fs.writeFileSync(catalogDataPath, nextCatalogSource)
    const added = mergedNames.filter((name) => !currentNames.includes(name))
    console.log(
      `Updated ALL_COMPONENTS (${String(mergedNames.length)} names${added.length ? `, +${String(added.length)} new` : ""}).`
    )
    if (added.length) console.log(`  Added: ${added.join(", ")}`)
  } else if (namesStale) {
    const added = mergedNames.filter((name) => !currentNames.includes(name))
    console.log(
      `Hint: ${String(added.length)} catalog name(s) missing from ALL_COMPONENTS. Re-run with --sync-names to update.`
    )
    if (added.length) console.log(`  ${added.join(", ")}`)
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
