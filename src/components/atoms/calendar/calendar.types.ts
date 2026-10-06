import type * as React from "react"
import type { DayPicker } from "react-day-picker"

import type { ButtonVariant } from "@/components/atoms/button/button.variants"

import type { CalendarSize } from "./calendar.variants"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: ButtonVariant
  size?: CalendarSize
}
