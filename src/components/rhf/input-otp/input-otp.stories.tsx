import type { Meta, StoryObj } from "@storybook/react-vite"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/atoms/button"

import { FormInputOTP } from "./input-otp"

const meta: Meta<typeof FormInputOTP> = {
  title: "Form/InputOTP",
  component: FormInputOTP,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => {
      const schema = z.object({
        code: z.string().length(6, "Enter the 6-digit code")
      })

      const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues: { code: "" },
        mode: "onSubmit"
      })

      return (
        <FormProvider {...methods}>
          <form
            className="flex flex-col items-start gap-4"
            onSubmit={(event) => {
              void methods.handleSubmit(() => undefined)(event)
            }}
          >
            <Story />
            <Button type="submit">Verify</Button>
          </form>
        </FormProvider>
      )
    }
  ],
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof FormInputOTP>

export const Default: Story = {
  args: {
    name: "code",
    label: "Verification code",
    maxLength: 6
  }
}
