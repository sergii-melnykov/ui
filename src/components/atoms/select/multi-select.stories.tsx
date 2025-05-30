import * as React from "react"
import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { User, Mail, Settings, Star, Tag, Building } from "lucide-react"
import { MultiSelect } from "./multi-select"

// Wrapper component to demonstrate state management
const MultiSelectWrapper = ({ value, ...props }: React.ComponentProps<typeof MultiSelect>) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(value || [])

  return (
    <div className="flex flex-col gap-4">
      <MultiSelect {...props} value={selectedValues} onChange={setSelectedValues} />
      <div className="text-sm text-muted-foreground">
        Selected values: {selectedValues.length > 0 ? selectedValues.join(", ") : "None"}
      </div>
    </div>
  )
}

const meta = {
  title: "Atoms/MultiSelect",
  component: MultiSelectWrapper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A searchable multi-select component that provides a searchable dropdown select input with multiple selection.
Built on top of Radix UI's Select primitive.

## Features
- Searchable dropdown with multiple selection
- Support for icons (start and end)
- Select all functionality
- Maximum selections limit
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
- Current selected values
- State updates on selection
- Controlled component behavior
`
      }
    }
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "object",
      description: "Currently selected values"
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the values change"
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
    },

    maxSelections: {
      control: "number",
      description: "Maximum number of selections allowed"
    },
    showSelectAll: {
      control: "boolean",
      description: "Whether to show the select all option"
    }
  }
} satisfies Meta<typeof MultiSelectWrapper>

export default meta
type Story = StoryObj<typeof MultiSelectWrapper>

// Test data
const defaultOptions = [
  { id: "1", label: "Option 1" },
  { id: "2", label: "Option 2" },
  { id: "3", label: "Option 3" }
]

const optionsWithIcons = [
  { id: "4", label: "User Profile", startIcon: <User className="h-4 w-4" /> },
  { id: "5", label: "Email Settings", startIcon: <Mail className="h-4 w-4" /> },
  { id: "6", label: "System Settings", startIcon: <Settings className="h-4 w-4" /> },
  { id: "7", label: "System Settings", startIcon: <Settings className="h-4 w-4" /> },
  { id: "8", label: "System Settings", startIcon: <Settings className="h-4 w-4" /> },
  { id: "9", label: "System Settings", startIcon: <Settings className="h-4 w-4" /> },
  { id: "10", label: "System Settings", startIcon: <Settings className="h-4 w-4" /> },
  { id: "11", label: "System Settings", startIcon: <Settings className="h-4 w-4" /> },
  { id: "12", label: "System Settings", startIcon: <Settings className="h-4 w-4" /> },
  { id: "13", label: "System Settings", startIcon: <Settings className="h-4 w-4" /> }
]

const optionsWithDisabled = [
  { id: "14", label: "Option 1" },
  { id: "15", label: "Option 2", disabled: true },
  { id: "16", label: "Option 3" }
]

const optionsWithEndIcons = [
  { id: "17", label: "Premium", endIcon: <Star className="h-4 w-4 text-yellow-500" /> },
  { id: "18", label: "Featured", endIcon: <Tag className="h-4 w-4 text-blue-500" /> },
  { id: "19", label: "Enterprise", endIcon: <Building className="h-4 w-4 text-purple-500" /> }
]

const longOptions = [
  { id: "20", label: "Very long option text that might wrap to multiple lines" },
  { id: "21", label: "Another long option with lots of text to demonstrate wrapping behavior" },
  { id: "22", label: "Short option" }
]

// Stories
export const Default: Story = {
  args: {
    options: defaultOptions,
    value: [],
    placeholder: "Select options"
  }
}

export const WithValue: Story = {
  args: {
    options: defaultOptions,
    value: ["1", "2"],
    placeholder: "Select options"
  }
}

export const WithIcons: Story = {
  args: {
    options: optionsWithIcons,
    value: [],
    placeholder: "Select options"
  }
}

export const WithEndIcons: Story = {
  args: {
    options: optionsWithEndIcons,
    value: [],
    placeholder: "Select options"
  }
}

export const WithDisabled: Story = {
  args: {
    options: optionsWithDisabled,
    value: [],
    placeholder: "Select options"
  }
}

export const Required: Story = {
  args: {
    options: defaultOptions,
    value: [],
    placeholder: "Select options",

    required: true
  }
}

export const WithError: Story = {
  args: {
    options: defaultOptions,
    value: [],
    placeholder: "Select options",

    error: "This field is required"
  }
}

export const WithHelperText: Story = {
  args: {
    options: defaultOptions,
    value: [],
    placeholder: "Select options"
  }
}

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    value: [],
    placeholder: "Select options",

    disabled: true
  }
}

export const FullWidth: Story = {
  args: {
    options: defaultOptions,
    value: [],
    placeholder: "Select options",

    fullWidth: true
  },
  parameters: {
    layout: "padded"
  }
}

export const WithMaxSelections: Story = {
  args: {
    options: defaultOptions,
    value: [],
    placeholder: "Select options",

    maxSelections: 2
  }
}

export const WithSelectAll: Story = {
  args: {
    options: defaultOptions,
    value: [],
    placeholder: "Select options",

    showSelectAll: true
  }
}

export const LongOptions: Story = {
  args: {
    options: longOptions,
    value: [],
    placeholder: "Select options",

    fullWidth: true
  },
  parameters: {
    layout: "padded"
  }
}

export const ComplexExample: Story = {
  args: {
    options: [...optionsWithIcons, ...optionsWithEndIcons, ...optionsWithDisabled],
    value: ["14", "15"],
    placeholder: "Select options",
    showSelectAll: true,
    maxSelections: 4,
    fullWidth: true
  },
  parameters: {
    layout: "padded"
  }
}
