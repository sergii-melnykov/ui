import fs from "node:fs"
import path from "node:path"
import { defineConfig } from "tsdown"
import { getComponentEntries, postBuild } from "./scripts/build-entries.mjs"
import { preserveUseClientPlugin } from "./plugins/preserve-use-client.mjs"

const root = import.meta.dirname
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf-8"))
const peerDeps = Object.keys(packageJson.peerDependencies)
const entries = getComponentEntries()

/** @type {Record<string, string>} */
const entry = { index: "src/index.ts" }
for (const value of Object.values(entries)) {
  entry[`${value.alias}/index`] = value.src
}

export default defineConfig({
  entry,
  format: ["esm"],
  dts: true,
  unbundle: true,
  deps: {
    neverBundle: peerDeps
  },
  minify: true,
  sourcemap: true,
  treeshake: false,
  esbuildPlugins: [preserveUseClientPlugin()],
  async onSuccess() {
    postBuild(entries)
  }
})
