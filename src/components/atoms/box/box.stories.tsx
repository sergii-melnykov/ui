import type { Meta, StoryObj } from "@storybook/react-vite"
import { Box } from "./box"

const meta: Meta<typeof Box> = {
  title: "Atoms/Box",
  component: Box,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["div", "span", "section", "article", "main", "aside", "header", "footer", "nav"]
    }
  }
}

export default meta
type Story = StoryObj<typeof Box>

export const Default: Story = {
  args: {
    children: "Default Box",
    className: "p-4 bg-primary/10 rounded-lg"
  }
}

export const AsSection: Story = {
  args: {
    as: "section",
    children: "Box as section",
    className: "p-4 bg-primary/10 rounded-lg"
  }
}

export const WithCustomStyles: Story = {
  args: {
    children: "Box with custom styles",
    className: "p-6 bg-primary/20 rounded-xl shadow-lg hover:bg-primary/30 transition-colors"
  }
}
