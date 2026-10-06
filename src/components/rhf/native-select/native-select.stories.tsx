import type { Meta, StoryObj } from "@storybook/react-vite"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/atoms/button"

import { FormNativeSelect } from "./native-select"

const meta: Meta<typeof FormNativeSelect> = {
  title: "Form/NativeSelect",
  component: FormNativeSelect,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => {
      const schema = z.object({
        country: z.string().min(1, "Country is required")
      })

      const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues: { country: "" },
        mode: "onSubmit"
      })

      return (
        <FormProvider {...methods}>
          <form
            className="flex w-[240px] flex-col gap-4"
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
type Story = StoryObj<typeof FormNativeSelect>

export const Default: Story = {
  args: {
    name: "country",
    label: "Country",
    placeholder: "Select country",
    options: [
      { id: "us", label: "United States" },
      { id: "ca", label: "Canada" },
      { id: "mx", label: "Mexico" }
    ]
  }
}
