import fs from "node:fs/promises"
import path from "node:path"

/**
 * Ensures "use client" survives bundling (treeshake can strip directives).
 * Compatible with tsdown / Rolldown via unplugin-style hooks when wired as esbuild plugin.
 */
export function preserveUseClientPlugin() {
  return {
    name: "preserve-use-client",
    setup(build) {
      build.onLoad({ filter: /\.[jt]sx?$/ }, async (args) => {
        const source = await fs.readFile(args.path, "utf8")
        const trimmed = source.trimStart()

        const hasUseClient =
          trimmed.startsWith('"use client"') || trimmed.startsWith("'use client'")

        if (!hasUseClient) {
          return undefined
        }

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

        return {
          contents: `"use client";\n${source}`,
          loader,
          resolveDir: path.dirname(args.path)
        }
      })
    }
  }
}
