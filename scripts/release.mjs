import { execSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { parseArgs } from "node:util"

const BUMPS = new Set(["patch", "minor", "major"])

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    push: { type: "boolean", default: false },
    "dry-run": { type: "boolean", default: false },
  },
  allowPositionals: true,
})

const bump = positionals[0]

if (!bump || !BUMPS.has(bump)) {
  console.error("Usage: npm run release -- patch|minor|major [--push]")
  console.error("   or: npm run release:patch | release:minor | release:major")
  console.error("")
  console.error("Bumps package.json, commits, and creates git tag v{version}.")
  console.error("Deploy workflows run on GitHub after: git push origin main --follow-tags")
  process.exit(1)
}

function run(command, { dry = false, capture = false } = {}) {
  if (dry) {
    console.log(`[dry-run] ${command}`)
    return ""
  }
  return execSync(command, {
    encoding: "utf8",
    stdio: capture ? "pipe" : "inherit",
  })
}

const dirty = run("git status --porcelain", {
  dry: values["dry-run"],
  capture: true,
}).trim()
if (!values["dry-run"] && dirty) {
  console.error("Working tree must be clean before release. Uncommitted changes:")
  console.error(dirty)
  process.exit(1)
}

const branch = run("git branch --show-current", {
  dry: values["dry-run"],
  capture: true,
}).trim()
if (!values["dry-run"] && branch !== "main") {
  console.warn(`Warning: you are on "${branch}", not main. Release tags are usually pushed from main.`)
}

const versionCmd = `npm version ${bump} -m "Release %s"`
run(versionCmd, { dry: values["dry-run"] })

if (values["dry-run"]) {
  process.exit(0)
}

const version = JSON.parse(readFileSync("package.json", "utf8")).version
const tag = `v${version}`

let tagSha
try {
  tagSha = run(`git rev-parse --verify ${tag}^{commit}`, { capture: true }).trim()
} catch {
  console.error(`\nRelease commit was created but git tag "${tag}" is missing.`)
  console.error("Check .npmrc for git-tag-version=false, then create the tag manually:")
  console.error(`  git tag ${tag} HEAD`)
  process.exit(1)
}

console.log(`\nCreated ${tag} → ${tagSha.slice(0, 7)} (package.json ${version})`)
console.log("Push to trigger deploy workflows:")
console.log("  git push origin main --follow-tags")

if (values.push) {
  run("git push origin main --follow-tags")
  console.log("Pushed commit and tag.")
}
