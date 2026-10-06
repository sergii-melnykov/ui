import type { Meta, StoryObj } from "@storybook/react-vite"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/atoms/button"

import { FormSlider } from "./slider"

const meta: Meta<typeof FormSlider> = {
  title: "Form/Slider",
  component: FormSlider,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => {
      const schema = z.object({
        volume: z.number().min(0).max(100)
      })

      const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues: { volume: 40 },
        mode: "onSubmit"
      })

      return (
        <FormProvider {...methods}>
          <form
            className="flex w-[280px] flex-col gap-4"
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
type Story = StoryObj<typeof FormSlider>

export const Default: Story = {
  args: {
    name: "volume",
    label: "Volume",
    showValue: true,
    max: 100,
    step: 1
  }
}
