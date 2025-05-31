import type { Meta, StoryObj } from "@storybook/react-vite"
import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = {
  title: "Atoms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    autoResize: { control: "boolean" },
    rows: { control: "number" },
    cols: { control: "number" },
    maxLength: { control: "number" },
    minLength: { control: "number" }
  }
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    placeholder: "Enter your message here..."
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "This textarea is disabled"
  }
}

export const AutoResize: Story = {
  args: {
    autoResize: true,
    placeholder: "This textarea will automatically resize as you type..."
  }
}

export const WithMaxLength: Story = {
  args: {
    maxLength: 100,
    placeholder: "Maximum 100 characters allowed"
  }
}

export const WithMinLength: Story = {
  args: {
    minLength: 10,
    placeholder: "Minimum 10 characters required"
  }
}

export const WithRowsAndCols: Story = {
  args: {
    rows: 5,
    cols: 50,
    placeholder: "This textarea has 5 rows and 50 columns"
  }
}
