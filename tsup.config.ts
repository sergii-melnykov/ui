import { glob } from "glob"
import { defineConfig, Options } from "tsup"
import path from "path"
import fs from "fs"

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"))

type Entries = Record<
  string,
  {
    alias: string
    src: string
    bundle: boolean
  }
>

// Function to get all component entry points
async function getComponentEntries() {
  const entries: Entries = {
    // Main entry points
    hooks: {
      alias: "hooks",
      src: "src/hooks/index.ts",
      bundle: true
    },
    utils: {
      alias: "utils",
      src: "src/utils/index.ts",
      bundle: true
    },
    types: {
      alias: "types",
      src: "src/types/index.ts",
      bundle: true
    }
  }

  // Get all component directories (excluding hooks, utils, and types)
  const componentDirs = ["atoms", "molecules", "organisms", "rhf"]

  // Process each component directory
  await Promise.all(
    componentDirs.map(async (dir) => {
      // Get all component directories
      const components = await glob(`src/components/${dir}/*/index.ts`, {
        ignore: ["**/node_modules/**"],
        dot: false
      })

      // Add individual component entries
      components.forEach((component) => {
        const componentName = path.basename(path.dirname(component.replace("src/components", "")))
        // Use the full path structure for the entry key
        entries[`${dir}/${componentName}`] = {
          alias: `${componentName}`,
          src: component,
          bundle: true
        }
      })
    })
  )

  return entries
}

const entries = await getComponentEntries()
console.log("entries", entries)

// Function to generate package.json exports
async function generatePackageExports() {
  // Generate exports for each entry
  const exports: Record<string, Record<string, string>> = {}

  // Main entry point
  exports[`.`] = {
    types: `./dist/index.d.mts`,
    import: `./dist/index.mjs`
  }

  Object.values(entries).forEach((value) => {
    exports[`./${value.alias}`] = {
      types: `./dist/${value.alias}/index.d.mts`,
      import: `./dist/${value.alias}/index.mjs`
    }
  })

  // Update package.json
  packageJson.exports = exports
  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2))
}

const externalDependencies = Object.keys(packageJson.peerDependencies)

const config: Options = {
  format: ["esm"],
  dts: true,
  external: externalDependencies,
  minify: true,
  bundle: false,
  sourcemap: true,
  treeshake: true,
  injectStyle: false,
  splitting: true
}

const entriesConfig: Options[] = Object.entries(entries).map(([key, value]) => {
  return {
    ...config,
    entry: {
      [`${value.alias}/index`]: value.src
    },
    ...(value.bundle
      ? { bundle: true }
      : {
          async onSuccess() {
            console.log("onSuccess", key, value)
          }
        })
  }
})

export default defineConfig([
  ...entriesConfig,
  {
    entry: { index: "src/index.ts" },
    ...config,
    // Add post-build hook to generate package.json exports
    async onSuccess() {
      await generatePackageExports()
      // Lazy proxy-based export reexport all entries from the main index.mjs
      const reexport = Object.values(entries)
        .map((value) => `export * from "./${value.alias}/index.mjs"`)
        .join("\n")
      fs.writeFileSync("dist/index.mjs", reexport)
    }
  }
])
