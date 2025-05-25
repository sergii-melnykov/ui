import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "./switch"

const meta: Meta<typeof Switch> = {
  title: "Atoms/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    defaultChecked: {
      control: "boolean",
      description: "The default checked state of the switch"
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled"
    }
  }
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {}
}

export const Checked: Story = {
  args: {
    defaultChecked: true
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true
  }
}
