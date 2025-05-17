import "../src/styles/globals.css"
import type { Preview } from "@storybook/react"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    a11y: {
      // Optional: customize a11y config here
      // element: '#root',
      // manual: false,
    }
  }
}

export default preview
