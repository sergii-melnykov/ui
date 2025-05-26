import type { Meta, StoryObj } from "@storybook/react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/atoms/button"
import { RHFCheckbox } from "./rhf-checkbox"

const meta: Meta<typeof RHFCheckbox> = {
  title: "RHF/RHFCheckbox",
  component: RHFCheckbox,
  parameters: {
    layout: "centered"
  },
  decorators: [
    (Story) => {
      const schema = z.object({
        terms: z.boolean().refine((val) => val === true, {
          message: "You must accept the terms and conditions"
        })
      })

      const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
          terms: false
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
type Story = StoryObj<typeof RHFCheckbox>

export const Default: Story = {
  args: {
    name: "terms",
    label: "Accept terms and conditions"
  }
}

export const WithDescription: Story = {
  args: {
    name: "terms",
    label: "Accept terms and conditions",
    description: "Please read our terms and conditions before accepting"
  }
}

export const Required: Story = {
  args: {
    name: "terms",
    label: "Accept terms and conditions",
    required: true
  }
}

export const WithWarning: Story = {
  args: {
    name: "terms",
    label: "Accept terms and conditions",
    warningText: "This is a required field"
  }
}

export const Disabled: Story = {
  args: {
    name: "terms",
    label: "Accept terms and conditions",
    disabled: true
  }
}
