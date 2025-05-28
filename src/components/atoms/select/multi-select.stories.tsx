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
    label: {
      control: "text",
      description: "Label for the select element"
    },
    helperText: {
      control: "text",
      description: "Helper text to display below the select"
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
  { id: "1", label: "User Profile", startIcon: <User className="h-4 w-4" /> },
  { id: "2", label: "Email Settings", startIcon: <Mail className="h-4 w-4" /> },
  { id: "3", label: "System Settings", startIcon: <Settings className="h-4 w-4" /> },
  { id: "4", label: "System Settings", startIcon: <Settings className="h-4 w-4" /> },
  { id: "5", label: "System Settings", startIcon: <Settings className="h-4 w-4" /> },
  { id: "6", label: "System Settings", startIcon: <Settings className="h-4 w-4" /> },
  { id: "7", label: "System Settings", startIcon: <Settings className="h-4 w-4" /> },
  { id: "8", label: "System Settings", startIcon: <Settings className="h-4 w-4" /> },
  { id: "9", label: "System Settings", startIcon: <Settings className="h-4 w-4" /> },
  { id: "10", label: "System Settings", startIcon: <Settings className="h-4 w-4" /> }
]

const optionsWithDisabled = [
  { id: "1", label: "Option 1" },
  { id: "2", label: "Option 2", disabled: true },
  { id: "3", label: "Option 3" }
]

const optionsWithEndIcons = [
  { id: "1", label: "Premium", endIcon: <Star className="h-4 w-4 text-yellow-500" /> },
  { id: "2", label: "Featured", endIcon: <Tag className="h-4 w-4 text-blue-500" /> },
  { id: "3", label: "Enterprise", endIcon: <Building className="h-4 w-4 text-purple-500" /> }
]

const longOptions = [
  { id: "1", label: "Very long option text that might wrap to multiple lines" },
  { id: "2", label: "Another long option with lots of text to demonstrate wrapping behavior" },
  { id: "3", label: "Short option" }
]

// Stories
export const Default: Story = {
  args: {
    options: defaultOptions,
    value: [],
    placeholder: "Select options",
    label: "Select Options"
  }
}

export const WithValue: Story = {
  args: {
    options: defaultOptions,
    value: ["1", "2"],
    placeholder: "Select options",
    label: "Select Options"
  }
}

export const WithIcons: Story = {
  args: {
    options: optionsWithIcons,
    value: [],
    placeholder: "Select options",
    label: "Select Options"
  }
}

export const WithEndIcons: Story = {
  args: {
    options: optionsWithEndIcons,
    value: [],
    placeholder: "Select options",
    label: "Select Options"
  }
}

export const WithDisabled: Story = {
  args: {
    options: optionsWithDisabled,
    value: [],
    placeholder: "Select options",
    label: "Select Options"
  }
}

export const Required: Story = {
  args: {
    options: defaultOptions,
    value: [],
    placeholder: "Select options",
    label: "Select Options",
    required: true
  }
}

export const WithError: Story = {
  args: {
    options: defaultOptions,
    value: [],
    placeholder: "Select options",
    label: "Select Options",
    error: "This field is required"
  }
}

export const WithHelperText: Story = {
  args: {
    options: defaultOptions,
    value: [],
    placeholder: "Select options",
    label: "Select Options",
    helperText: "Please select one or more options"
  }
}

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    value: [],
    placeholder: "Select options",
    label: "Select Options",
    disabled: true
  }
}

export const FullWidth: Story = {
  args: {
    options: defaultOptions,
    value: [],
    placeholder: "Select options",
    label: "Select Options",
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
    label: "Select Options",
    maxSelections: 2,
    helperText: "You can select up to 2 options"
  }
}

export const WithSelectAll: Story = {
  args: {
    options: defaultOptions,
    value: [],
    placeholder: "Select options",
    label: "Select Options",
    showSelectAll: true
  }
}

export const LongOptions: Story = {
  args: {
    options: longOptions,
    value: [],
    placeholder: "Select options",
    label: "Select Options",
    fullWidth: true
  },
  parameters: {
    layout: "padded"
  }
}

export const ComplexExample: Story = {
  args: {
    options: [...optionsWithIcons, ...optionsWithEndIcons, ...optionsWithDisabled],
    value: ["1", "2"],
    placeholder: "Select options",
    label: "Select Options",
    showSelectAll: true,
    maxSelections: 4,
    helperText: "You can select up to 4 options",
    fullWidth: true
  },
  parameters: {
    layout: "padded"
  }
}
