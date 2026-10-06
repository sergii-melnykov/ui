import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bold, CircleFadingPlus, Italic } from "lucide-react"

import { ToggleDesignSpec } from "./toggle-design-spec"
import { Toggle } from "./toggle"

const meta: Meta<typeof Toggle> = {
  title: "Atoms/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"]
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"]
    },
    disabled: {
      control: "boolean"
    },
    defaultPressed: {
      control: "boolean",
      description: "Initial pressed state"
    }
  }
}

export default meta
type Story = StoryObj<typeof Toggle>

export const DesignSpec: Story = {
  render: () => <ToggleDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  args: {
    children: "Toggle",
    "aria-label": "Toggle"
  }
}

export const Outline: Story = {
  args: {
    children: "Toggle",
    variant: "outline",
    "aria-label": "Toggle"
  }
}

export const Pressed: Story = {
  args: {
    children: "Toggle",
    variant: "outline",
    defaultPressed: true,
    "aria-label": "Toggle"
  }
}

export const Small: Story = {
  args: {
    children: "Toggle",
    size: "sm",
    variant: "outline",
    "aria-label": "Toggle"
  }
}

export const Large: Story = {
  args: {
    children: "Toggle",
    size: "lg",
    variant: "outline",
    "aria-label": "Toggle"
  }
}

export const Disabled: Story = {
  args: {
    children: "Toggle",
    variant: "outline",
    disabled: true,
    "aria-label": "Toggle"
  }
}

export const WithIcon: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle with icon">
      <CircleFadingPlus />
      Toggle
    </Toggle>
  )
}

export const IconOnly: Story = {
  render: () => (
    <Toggle variant="outline" size="sm" aria-label="Toggle bold">
      <Bold />
    </Toggle>
  )
}

export const GhostPressed: Story = {
  render: () => (
    <Toggle defaultPressed aria-label="Toggle italic">
      <Italic />
      Italic
    </Toggle>
  )
}
