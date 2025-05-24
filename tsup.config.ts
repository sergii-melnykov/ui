// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    // Main entry point for components
    index: "src/index.ts",
    // Separate bundle for hooks
    hooks: "src/hooks/index.ts",
    // Separate bundles for atomic design components
    atoms: "src/components/atoms/index.ts",
    molecules: "src/components/molecules/index.ts",
    // Separate bundle for rhf components
    rhf: "src/components/rhf/index.ts",
    organisms: "src/components/organisms/index.ts",
    // Utilities and types
    utils: "src/utils/index.ts",
    types: "src/types/index.ts"
  },
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
  }
})
