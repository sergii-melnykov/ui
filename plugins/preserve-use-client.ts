import type { Plugin } from "tsup/node_modules/esbuild"
import fs from "fs/promises"
import path from "path"

export const preserveUseClientPlugin = (): Plugin => ({
  name: "preserve-use-client",
  setup(build) {
    build.onLoad({ filter: /\.[jt]sx?$/ }, async (args) => {
      const source = await fs.readFile(args.path, "utf8")
      const trimmed = source.trimStart()

      const hasUseClient = trimmed.startsWith('"use client"') || trimmed.startsWith("'use client'")

      if (hasUseClient) {
        const ext = path.extname(args.path).slice(1)
        const loader =
          ext === "ts"
            ? "ts"
            : ext === "tsx"
              ? "tsx"
              : ext === "js"
                ? "js"
                : ext === "jsx"
                  ? "jsx"
                  : "ts"

        // Add the directive at the beginning of the file
        const contents = `"use client";\n${source}`

        return {
          contents,
          loader,
          resolveDir: path.dirname(args.path)
        }
      }

      return undefined
    })
  }
})
