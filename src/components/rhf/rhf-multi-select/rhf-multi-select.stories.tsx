import type { Meta, StoryObj } from "@storybook/react-vite"
import { useForm } from "react-hook-form"
import { Form } from "@/components/rhf/form"
import { Button } from "@/components/atoms/button"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { RHFMultiSelect } from "./rhf-multi-select"

const meta = {
  title: "RHF/RHFMultiSelect",
  component: RHFMultiSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A multi-select component that integrates with React Hook Form. Provides form validation, error handling, and accessibility features."
      }
    }
  },
  decorators: [
    (Story) => {
      const schema = z.object({
        countries: z.array(z.string()).min(1, "Countries are required")
      })
      const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
          countries: []
        }
      })
      const onSubmit = (data: any) => {
        console.log(data)
      }
      return (
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Story />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )
    }
  ],
  tags: ["autodocs"]
} satisfies Meta<typeof RHFMultiSelect>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { id: "us", label: "United States" },
  { id: "ca", label: "Canada" },
  { id: "uk", label: "United Kingdom" },
  { id: "au", label: "Australia" },
  { id: "de", label: "Germany" },
  { id: "fr", label: "France" },
  { id: "jp", label: "Japan" },
  { id: "cn", label: "China" }
]

export const Default: Story = {
  args: {
    name: "countries",
    label: "Countries",
    options,
    placeholder: "Select countries..."
  }
}

export const Required: Story = {
  args: {
    name: "countries",
    label: "Countries",
    options,
    required: true,
    placeholder: "Select countries..."
  }
}

export const WithDescription: Story = {
  args: {
    name: "countries",
    label: "Countries",
    description: "Select one or more countries from the list",
    options,
    placeholder: "Select countries..."
  }
}

export const WithWarning: Story = {
  args: {
    name: "countries",
    label: "Countries",
    warningText: "Some countries may have restricted access",
    options,
    placeholder: "Select countries..."
  }
}

export const Disabled: Story = {
  args: {
    name: "countries",
    label: "Countries",
    options,
    disabled: true,
    placeholder: "Select countries..."
  }
}

export const ReadOnly: Story = {
  args: {
    name: "countries",
    label: "Countries",
    options,
    readOnly: true,
    placeholder: "Select countries..."
  }
}

export const WithCustomAriaLabels: Story = {
  args: {
    name: "countries",
    label: "Countries",
    options,
    "aria-label": "Select multiple countries",
    "aria-describedby": "countries-description",
    placeholder: "Select countries..."
  }
}
