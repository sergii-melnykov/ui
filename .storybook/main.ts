import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    {
      name: "@storybook/addon-mcp",
      options: {
        toolsets: {
          dev: true,
          docs: true,
          test: false
        }
      }
    }
  ],
  features: {
    componentsManifest: true
  },
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  viteFinal(config) {
    return {
      ...config,
      build: {
        ...config.build,
        // Storybook bundles the full design system; avoid noisy agent/CI warnings.
        chunkSizeWarningLimit: 3000
      },
      css: {
        ...config.css,
        postcss: "./postcss.config.mjs"
      }
    }
  }
}
export default config
