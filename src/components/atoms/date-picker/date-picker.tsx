"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, ChevronDown } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Calendar } from "@/components/atoms/calendar/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/atoms/popover/popover"
import { cn } from "@/utils/index"

import type {
  DatePickerButtonProps,
  DatePickerCalendarProps,
  DatePickerContentProps,
  DatePickerRangeButtonProps
} from "./date-picker.types"

const DatePicker = Popover

function DatePickerTrigger({
  className,
  ...props
}: React.ComponentProps<typeof PopoverTrigger>) {
  return (
    <PopoverTrigger
      data-slot="date-picker-trigger"
      className={cn(className)}
      {...props}
    />
  )
}

function DatePickerContent({
  className,
  align = "start",
  sideOffset = 3,
  ...props
}: DatePickerContentProps) {
  return (
    <PopoverContent
      data-slot="date-picker-content"
      align={align}
      sideOffset={sideOffset}
      className={cn("w-auto p-0", className)}
      {...props}
    />
  )
}

function DatePickerCalendar({ className, ...props }: DatePickerCalendarProps) {
  return (
    <Calendar data-slot="date-picker-calendar" className={className} {...props} />
  )
}

function DatePickerButton({
  date,
  placeholder = "Pick a date",
  dateFormat = "PPP",
  showIcon = true,
  triggerIcon = "calendar",
  className,
  children,
  ...props
}: DatePickerButtonProps) {
  const TriggerIcon = triggerIcon === "chevron" ? ChevronDown : CalendarIcon

  return (
    <Button
      variant="outline"
      data-slot="date-picker-button"
      data-empty={!date}
      className={cn(
        "w-[240px] justify-start gap-2 text-left font-normal data-[empty=true]:text-muted-foreground",
        triggerIcon === "chevron" && "justify-between",
        className
      )}
      {...props}
    >
      {showIcon && triggerIcon === "chevron" ? (
        <>
          <TriggerIcon className="size-4 shrink-0 opacity-50" />
          {children ?? (date ? format(date, dateFormat) : <span>{placeholder}</span>)}
        </>
      ) : (
        <>
          {showIcon ? <TriggerIcon className="size-4 shrink-0 opacity-50" /> : null}
          {children ?? (date ? format(date, dateFormat) : <span>{placeholder}</span>)}
        </>
      )}
    </Button>
  )
}

function DatePickerRangeButton({
  range,
  placeholder = "Pick a date",
  className,
  ...props
}: DatePickerRangeButtonProps) {
  return (
    <Button
      variant="outline"
      data-slot="date-picker-range-button"
      data-empty={!range?.from}
      className={cn(
        "w-[300px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
        className
      )}
      {...props}
    >
      <CalendarIcon />
      {range?.from ? (
        range.to ? (
          <>
            {format(range.from, "LLL dd, y")} - {format(range.to, "LLL dd, y")}
          </>
        ) : (
          format(range.from, "LLL dd, y")
        )
      ) : (
        <span>{placeholder}</span>
      )}
    </Button>
  )
}

export {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerCalendar,
  DatePickerButton,
  DatePickerRangeButton
}
