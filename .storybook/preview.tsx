import React from "react"
import type { Preview } from "@storybook/react"
import { ThemeProvider } from "../src/components/theme-provider/theme-provider"
import "../src/styles/globals.css"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    backgrounds: {
      default: "light"
    }
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div>
          <Story />
        </div>
      </ThemeProvider>
    )
  ]
}

export default preview
