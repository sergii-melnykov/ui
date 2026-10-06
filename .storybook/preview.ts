import "../src/styles/globals.css"
import type { Preview } from "@storybook/react-vite"

const preview: Preview = {
  parameters: {
    // Chromatic: publish Storybook + MCP only; do not bill visual snapshots.
    chromatic: {
      disableSnapshot: true
    },
    options: {
      storySort: {
        order: ["Pages", "Atoms", "Molecules", "Organisms", "Form"]
      }
    },
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
