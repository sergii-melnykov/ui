import type { Meta, StoryObj } from "@storybook/react"
import { TextField } from "./text-field"

const meta: Meta<typeof TextField> = {
  title: "Atoms/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    helperText: { control: "text" },
    error: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    placeholder: { control: "text" }
  }
}

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Enter text..."
  }
}

export const WithHelperText: Story = {
  args: {
    label: "Label",
    helperText: "This is a helper text",
    placeholder: "Enter text..."
  }
}

export const WithError: Story = {
  args: {
    label: "Label",
    error: "This field is required",
    placeholder: "Enter text..."
  }
}

export const Required: Story = {
  args: {
    label: "Label",
    required: true,
    placeholder: "Enter text..."
  }
}

export const Disabled: Story = {
  args: {
    label: "Label",
    disabled: true,
    placeholder: "Enter text..."
  }
}

export const FullWidth: Story = {
  args: {
    label: "Label",
    fullWidth: true,
    placeholder: "Enter text..."
  }
}
