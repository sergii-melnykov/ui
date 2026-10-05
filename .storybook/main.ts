import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [// "@storybook/addon-docs"
  "@storybook/addon-onboarding", "@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  async viteFinal(config) {
    return {
      ...config,
      css: {
        ...config.css,
        postcss: "./postcss.config.mjs"
      }
    }
  }
}
export default config
