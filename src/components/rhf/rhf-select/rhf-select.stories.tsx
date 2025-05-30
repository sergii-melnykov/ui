import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { User, Mail, Settings } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form } from "@/components/rhf/form"
import { RHFSelect } from "./rhf-select"
import { Button } from "@/components/atoms"

// Form wrapper component to demonstrate form integration
const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const formSchema = z.object({
    country: z.string().min(1, "Country is required"),
    role: z.string().optional(),
    settings: z.string().optional()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      role: "",
      settings: ""
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {children}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

const meta = {
  title: "RHF/RHFSelect",
  component: RHFSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A select component that integrates with React Hook Form.
Provides form validation, error handling, and accessibility features.

## Features
- React Hook Form integration
- Form validation with Zod
- Error handling and display
- Accessibility features
- Support for icons
- Helper text and labels
- Disabled and read-only states
- Warning text support

## Accessibility
- ARIA attributes for screen readers
- Error announcements
- Required field indicators
- Keyboard navigation
- Focus management

## Form Integration
The component is designed to work seamlessly with React Hook Form and Zod validation.
It provides:
- Form state management
- Validation error display
- Field-level error handling
- Form-level error handling
`
      }
    }
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    )
  ],
  argTypes: {
    name: {
      control: "text",
      description: "The name of the field in the form"
    },
    label: {
      control: "text",
      description: "Optional label for the field"
    },
    description: {
      control: "text",
      description: "Optional description text below the field"
    },
    warningText: {
      control: "text",
      description: "Optional warning text to display"
    },
    required: {
      control: "boolean",
      description: "Whether the field is required"
    },
    disabled: {
      control: "boolean",
      description: "Whether the field is disabled"
    },
    readOnly: {
      control: "boolean",
      description: "Whether the field is read-only"
    },
    placeholder: {
      control: "text",
      description: "Placeholder text to show when no value is selected"
    },
    options: {
      control: "object",
      description: "Array of options to display in the select"
    }
  }
} satisfies Meta<typeof RHFSelect>

export default meta
type Story = StoryObj<typeof RHFSelect>

// Test data
const defaultOptions = [
  { id: "us", label: "United States" },
  { id: "ca", label: "Canada" },
  { id: "uk", label: "United Kingdom" }
]

const optionsWithIcons = [
  { id: "admin", label: "Administrator", startIcon: <User className="h-4 w-4" /> },
  { id: "user", label: "Regular User", startIcon: <Mail className="h-4 w-4" /> },
  { id: "guest", label: "Guest", startIcon: <Settings className="h-4 w-4" /> }
]

const optionsWithDisabled = [
  { id: "basic", label: "Basic Plan" },
  { id: "pro", label: "Pro Plan", disabled: true },
  { id: "enterprise", label: "Enterprise Plan" }
]

// Stories
export const Default: Story = {
  args: {
    name: "country",
    label: "Country",
    options: defaultOptions,
    placeholder: "Select a country"
  }
}

export const WithDescription: Story = {
  args: {
    name: "country",
    label: "Country",
    description: "Select your country of residence",
    options: defaultOptions,
    placeholder: "Select a country"
  }
}

export const Required: Story = {
  args: {
    name: "country",
    label: "Country",
    required: true,
    options: defaultOptions,
    placeholder: "Select a country"
  }
}

export const WithIcons: Story = {
  args: {
    name: "role",
    label: "User Role",
    options: optionsWithIcons,
    placeholder: "Select a role"
  }
}

export const WithDisabled: Story = {
  args: {
    name: "plan",
    label: "Subscription Plan",
    options: optionsWithDisabled,
    placeholder: "Select a plan"
  }
}

export const WithWarning: Story = {
  args: {
    name: "settings",
    label: "Settings",
    warningText: "This setting cannot be changed later",
    options: defaultOptions,
    placeholder: "Select settings"
  }
}

export const Disabled: Story = {
  args: {
    name: "country",
    label: "Country",
    disabled: true,
    options: defaultOptions,
    placeholder: "Select a country"
  }
}

export const ReadOnly: Story = {
  args: {
    name: "country",
    label: "Country",
    readOnly: true,
    options: defaultOptions,
    placeholder: "Select a country"
  }
}
