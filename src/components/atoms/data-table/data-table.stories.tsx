import type { Meta, StoryObj } from "@storybook/react-vite"

import { DataTableDesignSpec } from "./data-table-design-spec"
import { DataTableDemo } from "./data-table-demo"

const meta: Meta<typeof DataTableDemo> = {
  title: "Atoms/DataTable",
  component: DataTableDemo,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof DataTableDemo>

export const DesignSpec: Story = {
  render: () => <DataTableDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => <DataTableDemo className="max-w-[558px]" />
}
