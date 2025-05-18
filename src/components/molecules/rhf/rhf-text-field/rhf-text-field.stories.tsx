import type { Meta, StoryObj } from "@storybook/react"
import { RHFTextField } from "./rhf-text-field"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const meta: Meta<typeof RHFTextField> = {
  title: "Molecules/RHF/RHFTextField",
  component: RHFTextField,
  parameters: {
    layout: "centered"
  },
  decorators: [
    (Story) => {
      const schema = z.object({
        text: z.string().min(1, "Text is required"),
        email: z.string().email("Invalid email address"),
        number: z.number().min(1, "Number must be greater than 0")
      })

      const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
          text: "",
          email: "",
          number: 0
        }
      })

      return (
        <FormProvider {...methods}>
          <div className="w-[350px]">
            <Story />
          </div>
        </FormProvider>
      )
    }
  ],
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof RHFTextField>

export const Default: Story = {
  args: {
    name: "text",
    label: "Text Field",
    placeholder: "Enter some text"
  }
}

export const WithDescription: Story = {
  args: {
    name: "text",
    label: "Text Field",
    description: "This is a description of the field",
    placeholder: "Enter some text"
  }
}

export const WithWarning: Story = {
  args: {
    name: "text",
    label: "Text Field",
    warningText: "This is a warning message",
    placeholder: "Enter some text"
  }
}

export const Required: Story = {
  args: {
    name: "text",
    label: "Required Field",
    required: true,
    placeholder: "This field is required"
  }
}

export const Disabled: Story = {
  args: {
    name: "text",
    label: "Disabled Field",
    disabled: true,
    placeholder: "This field is disabled"
  }
}

export const ReadOnly: Story = {
  args: {
    name: "text",
    label: "Read Only Field",
    readOnly: true,
    value: "This value cannot be changed"
  }
}

export const Email: Story = {
  args: {
    name: "email",
    label: "Email Field",
    type: "email",
    placeholder: "Enter your email"
  }
}

export const Number: Story = {
  args: {
    name: "number",
    label: "Number Field",
    type: "number",
    placeholder: "Enter a number"
  }
}

export const WithError: Story = {
  args: {
    name: "text",
    label: "Field with Error",
    placeholder: "This will show an error"
  },
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form")
    if (form) {
      form.dispatchEvent(new Event("submit"))
    }
  }
}
