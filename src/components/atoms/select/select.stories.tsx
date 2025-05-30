import * as React from "react"
import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { User, Mail, Settings } from "lucide-react"
import { Select } from "./select"

// Wrapper component to demonstrate state management
const SelectWrapper = ({ value, ...props }: React.ComponentProps<typeof Select>) => {
  const [selectedValue, setSelectedValue] = useState<string>(value || "")

  return (
    <div className="flex flex-col gap-4">
      <Select {...props} value={selectedValue} onChange={setSelectedValue} />
      <div className="text-sm text-muted-foreground">Selected value: {selectedValue || "None"}</div>
    </div>
  )
}

const meta = {
  title: "Atoms/Select",
  component: SelectWrapper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A searchable select component that provides a searchable dropdown select input.
Built on top of Radix UI's Select primitive.

## Features
- Searchable dropdown with single selection
- Support for icons (start and end)
- Keyboard navigation
- Screen reader support
- Error states and validation
- Helper text and labels
- Disabled states
- Full width support

## Accessibility
- Keyboard navigation (Arrow keys, Enter, Space, Escape)
- ARIA attributes for screen readers
- Focus management
- Error announcements
- Required field indicators

## State Management
The component is wrapped in a state management example that shows:
- Current selected value
- State updates on selection
- Controlled component behavior
`
      }
    }
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Currently selected value"
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the value changes"
    },
    options: {
      control: "object",
      description: "Array of options to display in the select"
    },
    placeholder: {
      control: "text",
      description: "Placeholder text to show when no value is selected"
    },
    disabled: {
      control: "boolean",
      description: "Whether the select is disabled"
    },
    required: {
      control: "boolean",
      description: "Whether the select is required"
    },
    error: {
      control: "text",
      description: "Error message to display"
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the select should take up the full width of its container"
    }
  }
} satisfies Meta<typeof SelectWrapper>

export default meta
type Story = StoryObj<typeof SelectWrapper>

const defaultOptions = [
  { id: "1", label: "Option 1" },
  { id: "2", label: "Option 2" },
  { id: "3", label: "Option 3" }
]

const optionsWithIcons = [
  { id: "1", label: "User Profile", startIcon: <User className="h-4 w-4" /> },
  {
    id: "2",
    label: "Email Settings",
    startIcon: <Mail className="h-4 w-4" />,
    className: "text-red-500"
  },
  { id: "3", label: "System Settings", startIcon: <Settings className="h-4 w-4" /> }
]

const optionsWithDisabled = [
  { id: "1", label: "Option 1" },
  { id: "2", label: "Option 2", disabled: true },
  { id: "3", label: "Option 3" }
]

export const Default: Story = {
  args: {
    options: defaultOptions,
    value: "",
    placeholder: "Select an option"
  }
}

export const WithValue: Story = {
  args: {
    options: defaultOptions,
    value: "1",
    placeholder: "Select an option"
  }
}

export const WithIcons: Story = {
  args: {
    options: optionsWithIcons,
    value: "",
    placeholder: "Select an option"
  }
}

export const WithDisabled: Story = {
  args: {
    options: optionsWithDisabled,
    value: "",
    placeholder: "Select an option"
  }
}

export const Required: Story = {
  args: {
    options: defaultOptions,
    value: "",
    placeholder: "Select an option",

    required: true
  }
}

export const WithError: Story = {
  args: {
    options: defaultOptions,
    value: "",
    placeholder: "Select an option",

    error: "This field is required"
  }
}

export const WithHelperText: Story = {
  args: {
    options: defaultOptions,
    value: "",
    placeholder: "Select an option"
  }
}

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    value: "",
    placeholder: "Select an option",

    disabled: true
  }
}

export const FullWidth: Story = {
  args: {
    options: defaultOptions,
    value: "",
    placeholder: "Select an option",

    fullWidth: true
  },
  parameters: {
    layout: "padded"
  }
}
