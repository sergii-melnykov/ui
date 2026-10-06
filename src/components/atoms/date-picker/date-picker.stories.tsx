import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { type DateRange } from "react-day-picker"

import { Field, FieldLabel } from "@/components/atoms/field/field"

import { DatePickerDesignSpec } from "./date-picker-design-spec"
import {
  DatePicker,
  DatePickerButton,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerRangeButton,
  DatePickerTrigger
} from "./date-picker"

const meta: Meta<typeof DatePicker> = {
  title: "Atoms/Date Picker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const DesignSpec: Story = {
  render: () => <DatePickerDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: function DefaultDatePicker() {
    const [date, setDate] = React.useState<Date | undefined>()

    return (
      <DatePicker>
        <DatePickerTrigger asChild>
          <DatePickerButton date={date} />
        </DatePickerTrigger>
        <DatePickerContent>
          <DatePickerCalendar mode="single" selected={date} onSelect={setDate} />
        </DatePickerContent>
      </DatePicker>
    )
  }
}

export const WithLabel: Story = {
  render: function LabeledDatePicker() {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 1, 10))

    return (
      <Field className="w-[240px] gap-2">
        <FieldLabel>Date</FieldLabel>
        <DatePicker>
          <DatePickerTrigger asChild>
            <DatePickerButton date={date} className="w-full" />
          </DatePickerTrigger>
          <DatePickerContent>
            <DatePickerCalendar
              mode="single"
              selected={date}
              onSelect={setDate}
              defaultMonth={new Date(2026, 1, 1)}
            />
          </DatePickerContent>
        </DatePicker>
      </Field>
    )
  }
}

export const Range: Story = {
  render: function RangeDatePicker() {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 0, 20),
      to: new Date(2026, 1, 9)
    })

    return (
      <DatePicker>
        <DatePickerTrigger asChild>
          <DatePickerRangeButton range={range} />
        </DatePickerTrigger>
        <DatePickerContent>
          <DatePickerCalendar
            mode="range"
            numberOfMonths={2}
            selected={range}
            onSelect={setRange}
            defaultMonth={new Date(2026, 0, 1)}
          />
        </DatePickerContent>
      </DatePicker>
    )
  }
}
