import type { Meta, StoryObj } from "@storybook/react"
import { User, Mail, Settings } from "lucide-react"
import SearchableSelect from "./select"

const meta = {
  title: "Atoms/Select",
  component: SearchableSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A searchable select component that provides a searchable dropdown select input."
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
    },
    label: {
      control: "text",
      description: "Label for the select element"
    },
    helperText: {
      control: "text",
      description: "Helper text to display below the select"
    }
  }
} satisfies Meta<typeof SearchableSelect>

export default meta
type Story = StoryObj<typeof SearchableSelect>

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
    placeholder: "Select an option",
    label: "Select Option"
  }
}

export const WithValue: Story = {
  args: {
    options: defaultOptions,
    value: "1",
    placeholder: "Select an option",
    label: "Select Option"
  }
}

export const WithIcons: Story = {
  args: {
    options: optionsWithIcons,
    value: "",
    placeholder: "Select an option",
    label: "Select Option"
  }
}

export const WithDisabled: Story = {
  args: {
    options: optionsWithDisabled,
    value: "",
    placeholder: "Select an option",
    label: "Select Option"
  }
}

export const Required: Story = {
  args: {
    options: defaultOptions,
    value: "",
    placeholder: "Select an option",
    label: "Select Option",
    required: true
  }
}

export const WithError: Story = {
  args: {
    options: defaultOptions,
    value: "",
    placeholder: "Select an option",
    label: "Select Option",
    error: "This field is required"
  }
}

export const WithHelperText: Story = {
  args: {
    options: defaultOptions,
    value: "",
    placeholder: "Select an option",
    label: "Select Option",
    helperText: "Please select an option from the list"
  }
}

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    value: "",
    placeholder: "Select an option",
    label: "Select Option",
    disabled: true
  }
}

export const FullWidth: Story = {
  args: {
    options: defaultOptions,
    value: "",
    placeholder: "Select an option",
    label: "Select Option",
    fullWidth: true
  },
  parameters: {
    layout: "padded"
  }
}
