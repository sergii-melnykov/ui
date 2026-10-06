import type { Meta, StoryObj } from "@storybook/react-vite"
import type * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/atoms/button"

import { FormDatePicker } from "./date-picker"

const meta: Meta<typeof FormDatePicker> = {
  title: "Form/DatePicker",
  component: FormDatePicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof FormDatePicker>

function SingleFormDecorator(Story: React.ComponentType) {
  const schema = z.object({
    date: z.date({ error: "Date is required" })
  })

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: { date: undefined as Date | undefined },
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

export const Single: Story = {
  decorators: [SingleFormDecorator],
  args: {
    name: "date",
    label: "Date",
    placeholder: "Pick a date"
  }
}

function RangeFormDecorator(Story: React.ComponentType) {
  const schema = z.object({
    range: z.object({
      from: z.date(),
      to: z.date().optional()
    })
  })

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: { range: undefined },
    mode: "onSubmit"
  })

  return (
    <FormProvider {...methods}>
      <form
        className="flex w-[320px] flex-col gap-4"
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

export const Range: Story = {
  decorators: [RangeFormDecorator],
  args: {
    name: "range",
    mode: "range",
    label: "Date range",
    placeholder: "Pick a range"
  }
}
