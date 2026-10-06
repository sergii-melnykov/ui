import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/index"

export const calendarVariants = cva(
  [
    "bg-background group/calendar flex flex-col gap-4 rounded-lg border border-border",
    "[[data-slot=card-content]_&]:border-0 [[data-slot=card-content]_&]:bg-transparent [[data-slot=card-content]_&]:p-0",
    "[[data-slot=popover-content]_&]:border-0 [[data-slot=popover-content]_&]:bg-transparent [[data-slot=popover-content]_&]:p-0",
    String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
    String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`
  ],
  {
    variants: {
      size: {
        sm: "[--cell-size:1.75rem] p-2",
        default: "[--cell-size:2.375rem] p-3",
        lg: "[--cell-size:3rem] p-3"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
)

export type CalendarSize = NonNullable<VariantProps<typeof calendarVariants>["size"]>

/** Tailwind v4 length tokens tied to `--cell-size` on the calendar root. */
export const calendarCellBoxClass = "size-(--cell-size) shrink-0"

export type CalendarDateSpecState =
  | "default"
  | "hover"
  | "selected"
  | "focus"
  | "disabled"
  | "booked"

export type CalendarDateSpecPosition = "single" | "left" | "right" | "middle"

const datePositionRadius: Record<CalendarDateSpecPosition, string> = {
  single: "rounded-lg",
  left: "rounded-l-lg rounded-r-none",
  right: "rounded-r-lg rounded-l-none",
  middle: "rounded-none"
}

/** Static date-cell visuals for Storybook design spec (mirrors Figma Date component set). */
export function calendarSpecDateCellClassName({
  state,
  position,
  size = "sm"
}: {
  state: CalendarDateSpecState
  position: CalendarDateSpecPosition
  size?: CalendarSize
}) {
  const base = cn(
    "flex shrink-0 items-center justify-center text-sm font-normal leading-5",
    calendarCellBoxClass,
    size === "lg" && "flex-col gap-1"
  )

  if (state === "disabled") {
    return cn(base, datePositionRadius[position], "text-muted-foreground opacity-50")
  }

  if (state === "booked") {
    return cn(base, datePositionRadius[position], "text-foreground line-through opacity-50")
  }

  if (state === "hover") {
    return cn(base, datePositionRadius[position], "bg-accent text-foreground")
  }

  if (state === "selected" || state === "focus") {
    return cn(
      base,
      datePositionRadius[position],
      "bg-primary text-primary-foreground",
      state === "focus" && "ring-[3px] ring-ring/50"
    )
  }

  return cn(base, datePositionRadius[position], "text-foreground")
}

/** Shared day-button styling for CalendarDayButton (react-day-picker). */
export const calendarDayButtonClassName = [
  "mx-auto flex aspect-square size-(--cell-size) flex-col gap-1 p-0 text-sm font-normal leading-none",
  "data-[selected-single=true]:rounded-lg data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground",
  "data-[range-start=true]:rounded-none data-[range-start=true]:rounded-l-lg data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground",
  "data-[range-end=true]:rounded-none data-[range-end=true]:rounded-r-lg data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground",
  "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-primary data-[range-middle=true]:text-primary-foreground",
  "data-[booked=true]:line-through data-[booked=true]:opacity-50",
  "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50",
  "[&>span]:text-xs [&>span]:opacity-70"
].join(" ")
