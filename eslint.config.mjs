import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import prettier from "eslint-config-prettier/flat"
import storybook from "eslint-plugin-storybook"
import tseslint from "typescript-eslint"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{ts,tsx}"],
    extends: [...tseslint.configs.strictTypeChecked],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.eslint.json"],
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  ...storybook.configs["flat/recommended"],
  {
    rules: {
      // Component library — no Next.js pages/ app router tree; silences startup noise on lint.
      "@next/next/no-html-link-for-pages": "off"
    }
  },
  {
    files: ["src/**/*design-spec.tsx", "src/**/*.stories.tsx"],
    rules: {
      // Storybook (Vite) design specs use static /public assets, not next/image.
      "@next/next/no-img-element": "off"
    }
  },
  {
    files: ["**/*.mjs"],
    extends: [tseslint.configs.disableTypeChecked]
  },
  prettier,
  globalIgnores([
    "node_modules/",
    "dist/",
    "storybook-static/",
    "build/",
    "out/",
    ".next/",
    ".turbo/",
    "coverage/",
    "*.tsbuildinfo",
    ".cache/",
    ".eslintcache",
    ".env",
    ".env.*",
    "*.log",
    "*storybook.log",
    "package-lock.json",
    ".agents/",
    "docs/",
    "tokens/",
    "scripts/",
    "plugins/",
    ".cursor/",
    ".github/",
    "verify_exports.py",
    "vite.config.mjs",
    "tsup.config.ts",
    "tsdown.config.mjs",
    "tailwind.config.js",
    "postcss.config.mjs",
    "components.json"
  ])
])

export default eslintConfig
