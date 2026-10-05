#!/usr/bin/env node
/**
 * Regenerates :root and .dark token blocks in src/styles/globals.css
 * from tokens/figma-mode.json (Figma `mode` collection snapshot).
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { formatCss, parse, converter } from "culori"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const tokensPath = path.join(root, "tokens", "figma-mode.json")
const cssPath = path.join(root, "src", "styles", "globals.css")

const toOklch = converter("oklch")

const TOKEN_ORDER = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "warning",
  "warning-foreground",
  "border",
  "input",
  "ring",
  "radius",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring"
]

const LEGACY_KEY_ALIASES = {
  "sidebar-background": "sidebar"
}

const HSL_TRIPLET = /^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/

function formatOklch(color) {
  if (!color || color.mode !== "oklch") {
    return formatCss(color)
  }
  const l = Math.round(color.l * 1000) / 1000
  const c = Math.round((color.c ?? 0) * 1000) / 1000
  const h =
    color.h === undefined || Number.isNaN(color.h) ? "none" : String(Math.round(color.h * 10) / 10)
  return `oklch(${l} ${c} ${h})`
}

function normalizeModeValues(raw) {
  const out = { ...raw }
  for (const [legacy, canonical] of Object.entries(LEGACY_KEY_ALIASES)) {
    if (legacy in out && !(canonical in out)) {
      out[canonical] = out[legacy]
      delete out[legacy]
    }
  }
  return out
}

function cssValueForToken(key, value) {
  if (key === "radius") {
    return value
  }
  if (value.startsWith("oklch(") || value.startsWith("#")) {
    const parsed = parse(value)
    if (!parsed) {
      throw new Error(`Invalid color for ${key}: ${value}`)
    }
    return formatOklch(toOklch(parsed))
  }
  const hslMatch = HSL_TRIPLET.exec(value.trim())
  if (hslMatch) {
    const [, h, s, l] = hslMatch
    const parsed = parse(`hsl(${h} ${s}% ${l}%)`)
    if (!parsed) {
      throw new Error(`Invalid HSL triplet for ${key}: ${value}`)
    }
    return formatOklch(toOklch(parsed))
  }
  throw new Error(`Unsupported value for ${key}: ${value} (expected oklch(...), hex, or H S% L%)`)
}

function validateModes(light, dark) {
  for (const key of TOKEN_ORDER) {
    if (!(key in light)) {
      throw new Error(`Missing light.${key}`)
    }
    if (key === "radius") {
      continue
    }
    if (!(key in dark)) {
      throw new Error(`Missing dark.${key}`)
    }
  }
}

function blockForSelector(selector, values) {
  const normalized = normalizeModeValues(values)
  const keys = selector === ".dark" ? TOKEN_ORDER.filter((key) => key !== "radius") : TOKEN_ORDER
  const lines = keys
    .filter((key) => key in normalized)
    .map((key) => {
      const cssVal = cssValueForToken(key, normalized[key])
      return `    --${key}: ${cssVal};`
    })
  return `  ${selector} {\n${lines.join("\n")}\n  }`
}

function validateTokenFile() {
  const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf8"))
  if (!tokens.meta?.source || !tokens.light || !tokens.dark) {
    throw new Error("Invalid tokens file structure")
  }
  const light = normalizeModeValues(tokens.light)
  const dark = normalizeModeValues(tokens.dark)
  validateModes(light, dark)
  for (const [modeName, mode] of [
    ["light", light],
    ["dark", dark]
  ]) {
    for (const key of TOKEN_ORDER) {
      if (modeName === "dark" && key === "radius") {
        continue
      }
      cssValueForToken(key, mode[key])
    }
  }
  return tokens
}

export function syncTokensToCss({ dryRun = false } = {}) {
  const tokens = validateTokenFile()
  const css = fs.readFileSync(cssPath, "utf8")

  const light = normalizeModeValues(tokens.light)
  const dark = normalizeModeValues(tokens.dark)
  validateModes(light, dark)

  const newRoot = blockForSelector(":root", light)
  const newDark = blockForSelector(".dark", dark)

  const rootRe = /  :root \{[\s\S]*?\n  \}/
  const darkRe = /  \.dark \{[\s\S]*?\n  \}/

  if (!rootRe.test(css) || !darkRe.test(css)) {
    throw new Error("Could not find :root or .dark blocks in globals.css")
  }

  const next = css.replace(rootRe, newRoot).replace(darkRe, newDark)
  if (dryRun) {
    return next !== css
  }
  fs.writeFileSync(cssPath, next)
  console.log(`Updated ${path.relative(root, cssPath)} from ${path.relative(root, tokensPath)}`)
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url)
if (isMain) {
  const dryRun = process.argv.includes("--dry-run")
  try {
    if (dryRun) {
      const changed = syncTokensToCss({ dryRun: true })
      if (changed) {
        console.error("globals.css is out of sync with tokens/figma-mode.json")
        process.exit(1)
      }
      console.log("Token CSS blocks are in sync")
    } else {
      syncTokensToCss()
    }
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}
