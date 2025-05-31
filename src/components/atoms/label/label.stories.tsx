import type { Meta, StoryObj } from "@storybook/react-vite"
import { Label } from "./label"

const meta: Meta<typeof Label> = {
  title: "Atoms/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the label"
    }
  }
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    children: "Label"
  }
}

export const WithCustomClass: Story = {
  args: {
    children: "Custom Styled Label",
    className: "text-blue-500 font-bold"
  }
}

export const Disabled: Story = {
  args: {
    children: "Disabled Label",
    className: "opacity-50"
  }
}
