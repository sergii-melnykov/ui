import { glob } from "glob"
import { defineConfig, Options } from "tsup"
import path from "path"
import fs from "fs"

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"))

// Function to get all component entry points
async function getComponentEntries() {
  const entries: Record<string, string> = {
    // Main entry points
    hooks: "src/hooks/index.ts",
    utils: "src/utils/index.ts",
    types: "src/types/index.ts"
  }

  // Get all component directories
  const componentDirs = ["atoms", "molecules", "organisms", "rhf"]

  // Process each component directory
  await Promise.all(
    componentDirs.map(async (dir) => {
      // Add the main index for backward compatibility
      entries[dir] = `src/components/${dir}/index.ts`

      // Get all component directories
      const components = await glob(`src/components/${dir}/*/index.ts`, {
        ignore: ["**/node_modules/**"],
        dot: false
      })

      // Add individual component entries
      components.forEach((component) => {
        const componentName = path.basename(path.dirname(component))
        entries[`${dir}/${componentName}`] = component
      })
    })
  )

  return entries
}

// Function to generate package.json exports
async function generatePackageExports() {
  const entries = await getComponentEntries()

  // Generate exports for each entry
  const exports: Record<string, Record<string, string>> = {}

  // Main entry point
  exports[`.`] = {
    types: `./dist/index.d.ts`,
    import: `./dist/index.mjs`,
    require: `./dist/index.js`
  }

  Object.keys(entries).forEach((key) => {
    exports[`./${key}`] = {
      types: `./dist/${key}.d.ts`,
      import: `./dist/${key}.mjs`,
      require: `./dist/${key}.js`
    }
  })

  // Update package.json
  packageJson.exports = exports
  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2))
}

const externalDependencies = Object.keys(packageJson.peerDependencies)
const entries = await getComponentEntries()

const config: Options = {
  format: ["cjs", "esm"],
  dts: true,
  external: externalDependencies,
  minify: true,
  bundle: false,
  sourcemap: true,
  treeshake: true,
  injectStyle: false,
  outExtension({ format }) {
    return { js: format === "esm" ? ".mjs" : ".js" }
  }
}

const entriesConfig: Options[] = Object.entries(entries).map(([key, value]) => ({
  entry: { [key]: value },
  ...config
}))

export default defineConfig([
  ...entriesConfig,
  {
    entry: { index: "src/index.ts" },
    ...config,
    // Add post-build hook to generate package.json exports
    async onSuccess() {
      await generatePackageExports()
    }
  }
])
