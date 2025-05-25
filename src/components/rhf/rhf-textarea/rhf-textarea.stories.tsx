import type { Meta, StoryObj } from "@storybook/react"
import { FormProvider, useForm, type FieldValues } from "react-hook-form"
import { Button } from "@/components/atoms/button"
import { RHFTextarea } from "./rhf-textarea"

// Wrapper component to provide form context
const FormWrapper = ({
  children,
  defaultValues = {}
}: {
  children: React.ReactNode
  defaultValues?: FieldValues
}) => {
  const methods = useForm({ defaultValues })
  const onSubmit = (data: FieldValues) => {
    console.log(data)
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {children}
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  )
}

const meta: Meta<typeof RHFTextarea> = {
  title: "RHF/RHFTextarea",
  component: RHFTextarea,
  decorators: [
    (Story) => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    )
  ],
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof RHFTextarea>

export const Default: Story = {
  args: {
    name: "description",
    label: "Description",
    placeholder: "Enter your description here..."
  }
}

export const Required: Story = {
  args: {
    name: "description",
    label: "Description",
    required: true,
    placeholder: "Enter your description here..."
  }
}

export const WithDescription: Story = {
  args: {
    name: "description",
    label: "Description",
    description: "Please provide a detailed description of your project.",
    placeholder: "Enter your description here..."
  }
}

export const WithWarning: Story = {
  args: {
    name: "description",
    label: "Description",
    warningText: "This description will be visible to all users.",
    placeholder: "Enter your description here..."
  }
}

export const Disabled: Story = {
  args: {
    name: "description",
    label: "Description",
    disabled: true,
    placeholder: "This field is disabled"
  }
}

export const ReadOnly: Story = {
  args: {
    name: "description",
    label: "Description",
    readOnly: true,
    placeholder: "This field is read-only"
  }
}

export const WithValidation: Story = {
  args: {
    name: "description",
    label: "Description",
    required: true,
    placeholder: "Enter your description here..."
  }
}

export const WithAutoResize: Story = {
  args: {
    name: "description",
    label: "Description",
    autoResize: true,
    placeholder: "This textarea will automatically resize as you type..."
  }
}

export const WithCustomClassName: Story = {
  args: {
    name: "description",
    label: "Description",
    className: "min-h-[200px]",
    placeholder: "This textarea has a custom minimum height..."
  }
}

export const WithAriaAttributes: Story = {
  args: {
    name: "description",
    label: "Description",
    "aria-label": "Custom Description Label",
    "aria-describedby": "custom-description",
    placeholder: "This textarea has custom ARIA attributes..."
  }
}
