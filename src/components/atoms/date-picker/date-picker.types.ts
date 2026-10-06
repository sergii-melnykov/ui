import type * as React from "react"
import type { DateRange } from "react-day-picker"

import type { ButtonProps } from "@/components/atoms/button/button.types"
import type { CalendarProps } from "@/components/atoms/calendar/calendar.types"
import { PopoverContent } from "@/components/atoms/popover/popover"

export type DatePickerContentProps = React.ComponentPropsWithoutRef<typeof PopoverContent>

export type DatePickerCalendarProps = CalendarProps

export type DatePickerButtonProps = ButtonProps & {
  date?: Date
  placeholder?: string
  dateFormat?: string
  showIcon?: boolean
  triggerIcon?: "calendar" | "chevron"
}

export type DatePickerRangeButtonProps = ButtonProps & {
  range?: DateRange
  placeholder?: string
}
