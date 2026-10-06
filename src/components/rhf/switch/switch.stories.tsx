import type { Meta, StoryObj } from "@storybook/react-vite"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/atoms/button"
import { FormSwitch } from "./switch"

const meta: Meta<typeof FormSwitch> = {
  title: "Form/Switch",
  component: FormSwitch,
  parameters: {
    layout: "centered"
  },
  decorators: [
    (Story) => {
      const schema = z.object({
        notifications: z.boolean().refine((val) => val, {
          message: "You must enable notifications"
        })
      })

      const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
          notifications: false
        }
      })

      type FormValues = z.infer<typeof schema>

      const onSubmit = (data: FormValues) => {
        console.log(data)
      }

      return (
        <FormProvider {...methods}>
          <form
            className="w-[350px] flex flex-col gap-4"
            onSubmit={(event) => {
              void methods.handleSubmit(onSubmit)(event)
            }}
          >
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
type Story = StoryObj<typeof FormSwitch>

export const Default: Story = {
  args: {
    name: "notifications",
    label: "Enable notifications"
  }
}

export const WithDescription: Story = {
  args: {
    name: "notifications",
    label: "Enable notifications",
    description: "Receive updates about your account"
  }
}

export const Required: Story = {
  args: {
    name: "notifications",
    label: "Enable notifications",
    required: true
  }
}

export const WithWarning: Story = {
  args: {
    name: "notifications",
    label: "Enable notifications",
    warningText: "This is a required field"
  }
}

export const Disabled: Story = {
  args: {
    name: "notifications",
    label: "Enable notifications",
    disabled: true
  }
}
