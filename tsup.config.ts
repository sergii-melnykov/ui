import { defineConfig } from "tsup"

export default defineConfig({
  entry: [
    "src/components/atoms/index.ts",
    "src/components/molecules/index.ts",
    "src/components/organisms/index.ts",
    "src/hooks/index.ts",
    "src/utils/index.ts",
    "src/types/index.ts"
  ],
  format: ["cjs", "esm"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "next"],
  treeshake: true,
  minify: true,
  injectStyle: false
})
