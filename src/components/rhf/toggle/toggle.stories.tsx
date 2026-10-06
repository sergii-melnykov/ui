import type { Meta, StoryObj } from "@storybook/react-vite"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/atoms/button"

import { FormToggle } from "./toggle"

const meta: Meta<typeof FormToggle> = {
  title: "Form/Toggle",
  component: FormToggle,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => {
      const schema = z.object({
        bold: z.boolean()
      })

      const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues: { bold: false },
        mode: "onSubmit"
      })

      return (
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              void methods.handleSubmit(() => undefined)(event)
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
type Story = StoryObj<typeof FormToggle>

export const Default: Story = {
  args: {
    name: "bold",
    label: "Bold formatting",
    children: "B"
  }
}
