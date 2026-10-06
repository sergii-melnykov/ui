import type { Meta, StoryObj } from "@storybook/react-vite"
import { arSA, faIR } from "date-fns/locale"
import * as React from "react"
import { type DateRange } from "react-day-picker"

import { CalendarDesignSpec } from "./calendar-design-spec"
import { Calendar } from "./calendar"

const meta: Meta<typeof Calendar> = {
  title: "Atoms/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof Calendar>

export const DesignSpec: Story = {
  render: () => <CalendarDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: function DefaultCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 2, 23))

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        defaultMonth={new Date(2026, 2, 1)}
      />
    )
  }
}

export const Range: Story = {
  render: function RangeCalendar() {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 2, 10),
      to: new Date(2026, 2, 16)
    })

    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        defaultMonth={new Date(2026, 2, 1)}
      />
    )
  }
}

export const TwoMonths: Story = {
  render: function TwoMonthCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 2, 12))

    return (
      <Calendar
        mode="single"
        numberOfMonths={2}
        selected={date}
        onSelect={setDate}
        defaultMonth={new Date(2026, 2, 1)}
      />
    )
  }
}

export const Persian: Story = {
  name: "Persian locale",
  render: function PersianCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 2, 15))

    return (
      <Calendar
        mode="single"
        locale={faIR}
        dir="rtl"
        selected={date}
        onSelect={setDate}
        defaultMonth={new Date(2026, 2, 1)}
        size="sm"
      />
    )
  }
}

export const RtlArabic: Story = {
  name: "RTL Arabic",
  render: function ArabicCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 2, 23))

    return (
      <Calendar
        mode="single"
        locale={arSA}
        dir="rtl"
        captionLayout="dropdown"
        selected={date}
        onSelect={setDate}
        defaultMonth={new Date(2026, 2, 1)}
      />
    )
  }
}

export const BookedDates: Story = {
  name: "Booked dates",
  render: function BookedCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 2, 8))
    const booked = [
      new Date(2026, 2, 5),
      new Date(2026, 2, 12),
      new Date(2026, 2, 19),
      new Date(2026, 2, 26)
    ]

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        defaultMonth={new Date(2026, 2, 1)}
        modifiers={{ booked }}
        disabled={booked}
      />
    )
  }
}
