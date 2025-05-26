import type { Meta, StoryObj } from "@storybook/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form } from "@/components/rhf/form"
import { RHFRadioButtonGroup } from "./rhf-radio-button-group"

const meta = {
  title: "RHF/RHFRadioButtonGroup",
  component: RHFRadioButtonGroup,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      const formSchema = z.object({
        preference: z.string({
          required_error: "Please select a preference"
        })
      })

      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          preference: ""
        }
      })

      return (
        <Form {...form}>
          <form className="w-[350px] space-y-6">
            <Story />
          </form>
        </Form>
      )
    }
  ]
} satisfies Meta<typeof RHFRadioButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

const defaultOptions = [
  { id: "option1", label: "Option 1" },
  { id: "option2", label: "Option 2" },
  { id: "option3", label: "Option 3" }
]

export const Default: Story = {
  args: {
    name: "preference",
    label: "Select your preference",
    options: defaultOptions
  }
}

export const WithDescription: Story = {
  args: {
    name: "preference",
    label: "Select your preference",
    description: "Choose the option that best suits your needs",
    options: defaultOptions
  }
}

export const Required: Story = {
  args: {
    name: "preference",
    label: "Select your preference",
    required: true,
    options: defaultOptions
  }
}

export const Disabled: Story = {
  args: {
    name: "preference",
    label: "Select your preference",
    disabled: true,
    options: defaultOptions
  }
}

export const WithWarning: Story = {
  args: {
    name: "preference",
    label: "Select your preference",
    warningText: "This selection cannot be changed later",
    options: defaultOptions
  }
}

export const DifferentSizes: Story = {
  args: {
    name: "preference",
    label: "Select your preference",
    options: [
      { id: "option1", label: "Small", size: "sm" },
      { id: "option2", label: "Default", size: "default" },
      { id: "option3", label: "Large", size: "lg" }
    ]
  }
}
