import type { Meta, StoryObj } from "@storybook/react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/atoms/button"
import { RadioGroupItem } from "@/components/atoms/radio-group"
import { RHFRadioGroup } from "./rhf-radio-group"

const meta: Meta<typeof RHFRadioGroup> = {
  title: "RHF/RHFRadioGroup",
  component: RHFRadioGroup,
  parameters: {
    layout: "centered"
  },
  decorators: [
    (Story) => {
      const schema = z.object({
        preference: z.string().min(1, "Please select an option")
      })

      const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
          preference: ""
        }
      })

      const onSubmit = (data: any) => {
        console.log(data)
      }

      return (
        <FormProvider {...methods}>
          <form className="w-[350px] flex flex-col gap-4" onSubmit={methods.handleSubmit(onSubmit)}>
            <Story />
            <Button type="submit">Submit</Button>
          </form>
        </FormProvider>
      )
    }
  ],
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof RHFRadioGroup>

export const Default: Story = {
  args: {
    name: "preference",
    label: "Select your preference",
    options: [
      { id: "option1", label: "Option 1" },
      { id: "option2", label: "Option 2" },
      { id: "option3", label: "Option 3" }
    ]
  }
}

export const WithDescription: Story = {
  args: {
    name: "preference",
    label: "Select your preference",
    description: "Choose your preferred option",
    children: (
      <>
        <RadioGroupItem value="option1">Option 1</RadioGroupItem>
        <RadioGroupItem value="option2">Option 2</RadioGroupItem>
        <RadioGroupItem value="option3">Option 3</RadioGroupItem>
      </>
    )
  }
}

export const Required: Story = {
  args: {
    name: "preference",
    label: "Select your preference",
    required: true,
    options: [
      { id: "option1", label: "Option 1" },
      { id: "option2", label: "Option 2" },
      { id: "option3", label: "Option 3" }
    ]
  }
}

export const WithWarning: Story = {
  args: {
    name: "preference",
    label: "Select your preference",
    warningText: "This is a required field",
    options: [
      { id: "option1", label: "Option 1" },
      { id: "option2", label: "Option 2" },
      { id: "option3", label: "Option 3" }
    ]
  }
}

export const Disabled: Story = {
  args: {
    name: "preference",
    label: "Select your preference",
    disabled: true,
    options: [
      { id: "option1", label: "Option 1" },
      { id: "option2", label: "Option 2" },
      { id: "option3", label: "Option 3" }
    ]
  }
}
