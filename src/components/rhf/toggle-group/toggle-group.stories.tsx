import type { Meta, StoryObj } from "@storybook/react-vite"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/atoms/button"

import { FormToggleGroup } from "./toggle-group"

const meta: Meta<typeof FormToggleGroup> = {
  title: "Form/ToggleGroup",
  component: FormToggleGroup,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => {
      const schema = z.object({
        alignment: z.string().min(1, "Pick an alignment")
      })

      const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues: { alignment: "left" },
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
type Story = StoryObj<typeof FormToggleGroup>

export const Default: Story = {
  args: {
    name: "alignment",
    label: "Alignment",
    options: [
      { id: "left", label: "Left" },
      { id: "center", label: "Center" },
      { id: "right", label: "Right" }
    ]
  }
}
