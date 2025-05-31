import type { Meta, StoryObj } from "@storybook/react-vite"
import { TextField } from "./text-field"
import { Search, Calendar, Mail } from "lucide-react"

const meta: Meta<typeof TextField> = {
  title: "Atoms/TextField",
  component: TextField,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"]
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"]
    }
  }
}

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    placeholder: "Enter text"
  }
}

export const WithLabel: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email"
  }
}

export const WithStartIcon: Story = {
  args: {
    startIcon: <Search className="h-4 w-4" />,
    placeholder: "Search..."
  }
}

export const WithEndIcon: Story = {
  args: {
    endIcon: <Calendar className="h-4 w-4" />,
    placeholder: "Select date"
  }
}

export const WithBothIcons: Story = {
  args: {
    startIcon: <Mail className="h-4 w-4" />,
    endIcon: <Calendar className="h-4 w-4" />,
    placeholder: "Enter email"
  }
}

export const Loading: Story = {
  args: {
    loading: true,
    placeholder: "Loading..."
  }
}

export const Error: Story = {
  args: {
    error: "Invalid input",
    placeholder: "Enter text"
  }
}

export const WithHelperText: Story = {
  args: {
    helperText: "This is a helper text",
    placeholder: "Enter text"
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input"
  }
}

export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Small input"
  }
}

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "Large input"
  }
}
