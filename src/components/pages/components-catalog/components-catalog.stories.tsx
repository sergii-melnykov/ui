import type { Meta, StoryObj } from "@storybook/react-vite"

import { ComponentsCatalogDesignSpec } from "./components-catalog-design-spec"

const meta: Meta<typeof ComponentsCatalogDesignSpec> = {
  title: "Pages/Components Catalog",
  component: ComponentsCatalogDesignSpec,
  parameters: {
    layout: "fullscreen"
  }
}

export default meta
type Story = StoryObj<typeof ComponentsCatalogDesignSpec>

export const DesignSpec: Story = {
  render: () => <ComponentsCatalogDesignSpec />,
  parameters: {
    docs: {
      disable: true
    }
  }
}
