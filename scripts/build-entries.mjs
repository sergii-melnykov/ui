import fs from "node:fs"
import path from "node:path"
import { globSync } from "glob"

const root = path.join(import.meta.dirname, "..")

/** @returns {Record<string, { alias: string, src: string }>} */
export function getComponentEntries() {
  /** @type {Record<string, { alias: string, src: string }>} */
  const entries = {
    hooks: { alias: "hooks", src: "src/hooks/index.ts" },
    utils: { alias: "utils", src: "src/utils/index.ts" },
    types: { alias: "types", src: "src/types/index.ts" }
  }

  for (const dir of ["atoms", "molecules", "organisms", "rhf"]) {
    const components = globSync(`src/components/${dir}/*/index.ts`, {
      cwd: root,
      ignore: ["**/node_modules/**"],
      dot: false
    })

    for (const component of components) {
      const componentName = path.basename(path.dirname(component))
      entries[`${dir}/${componentName}`] = {
        alias: componentName,
        src: component
      }
    }
  }

  return entries
}

export function generatePackageExports(entries) {
  const packageJsonPath = path.join(root, "package.json")
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"))

  /** @type {Record<string, Record<string, string>>} */
  const exports = {
    ".": {
      types: "./dist/index.d.mts",
      import: "./dist/index.mjs"
    },
    "./styles/globals.css": {
      default: "./dist/styles/globals.css"
    }
  }

  for (const value of Object.values(entries)) {
    exports[`./${value.alias}`] = {
      types: `./dist/${value.alias}/index.d.mts`,
      import: `./dist/${value.alias}/index.mjs`
    }
  }

  packageJson.exports = exports
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`)
}

export function postBuild(entries) {
  const stylesDir = path.join(root, "dist", "styles")
  fs.mkdirSync(stylesDir, { recursive: true })
  fs.copyFileSync(
    path.join(root, "src", "styles", "globals.css"),
    path.join(stylesDir, "globals.css")
  )

  generatePackageExports(entries)

  const reexport = Object.values(entries)
    .map((value) => `export * from "./${value.alias}/index.mjs"`)
    .join("\n")
  fs.writeFileSync(path.join(root, "dist", "index.mjs"), `${reexport}\n`)
}
