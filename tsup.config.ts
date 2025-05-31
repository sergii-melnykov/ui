// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "tsup"
import { glob } from "glob"
import path from "path"
import fs from "fs"

// Function to get all component entry points
async function getComponentEntries() {
  const entries: Record<string, string> = {
    // Main entry points
    index: "src/index.ts",
    hooks: "src/hooks/index.ts",
    utils: "src/utils/index.ts",
    types: "src/types/index.ts",
    rhf: "src/components/rhf/index.ts"
  }

  // Get all component directories
  const componentDirs = ["atoms", "molecules", "organisms"]

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
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"))

  // Generate exports for each entry
  const exports: Record<string, Record<string, string>> = {}

  Object.keys(entries).forEach((key) => {
    exports[`./${key}`] = {
      types: `./dist/${key}.d.ts`,
      import: `./dist/${key}.esm.js`,
      require: `./dist/${key}.cjs.js`
    }
  })

  // Update package.json
  packageJson.exports = exports
  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2))
}

export default defineConfig(async () => {
  const entries = await getComponentEntries()
  console.log("entries", entries)

  return {
    entry: entries,
    format: ["cjs", "esm"],
    dts: true,
    splitting: true,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom", "next"],
    treeshake: true,
    minify: true,
    injectStyle: false,
    // Ensure proper code splitting
    outExtension({ format }) {
      return {
        js: `.${format}.js`
      }
    },
    // Add post-build hook
    async onSuccess() {
      await generatePackageExports()
    }
  }
})
