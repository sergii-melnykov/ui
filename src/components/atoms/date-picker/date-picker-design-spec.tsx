/**
 * Storybook-only layout mirroring the Figma Date Picker documentation page.
 */

import * as React from "react"
import { addDays, format } from "date-fns"
import { arSA } from "date-fns/locale"
import { ArrowUpRight, CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/atoms/button/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from "@/components/atoms/field/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "@/components/atoms/input-group/input-group"
import { Input } from "@/components/atoms/input/input"
import { Label } from "@/components/atoms/label/label"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import {
  DatePicker,
  DatePickerButton,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerRangeButton,
  DatePickerTrigger
} from "./date-picker"

const designSpecCalendarProps = {
  size: "sm" as const,
  showOutsideDays: false
}

function PreviewBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-border p-10">
      {children}
    </div>
  )
}

function ExampleBlock({
  title,
  description,
  children
}: {
  title: string
  description: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full flex-col">
      <h4 className="text-lg font-semibold text-foreground">{title}</h4>
      <p className="pt-4 text-base text-muted-foreground">{description}</p>
      <div className="pt-6">{children}</div>
    </div>
  )
}

function BasicDatePickerDemo({ className }: { className?: string }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 1, 10))

  return (
    <div className={cn("flex w-[212px] flex-col gap-2", className)}>
      <FieldLabel>Date</FieldLabel>
      <DatePicker defaultOpen>
        <DatePickerTrigger asChild>
          <DatePickerButton
            date={date}
            placeholder="Pick a date"
            showIcon={false}
            className="w-[176px]"
          />
        </DatePickerTrigger>
        <DatePickerContent>
          <DatePickerCalendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={new Date(2026, 1, 1)}
            {...designSpecCalendarProps}
          />
        </DatePickerContent>
      </DatePicker>
    </div>
  )
}

function RangeDatePickerDemo() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 0, 20),
    to: new Date(2026, 1, 9)
  })

  return (
    <div className="flex w-full max-w-[424px] flex-col gap-2">
      <FieldLabel>Date Range Picker</FieldLabel>
      <DatePicker defaultOpen>
        <DatePickerTrigger asChild>
          <DatePickerRangeButton range={range} className="w-[240px]" />
        </DatePickerTrigger>
        <DatePickerContent className="w-auto">
          <DatePickerCalendar
            mode="range"
            numberOfMonths={2}
            selected={range}
            onSelect={setRange}
            defaultMonth={new Date(2026, 0, 1)}
            {...designSpecCalendarProps}
          />
        </DatePickerContent>
      </DatePicker>
    </div>
  )
}

function DateOfBirthPickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>()

  return (
    <div className="flex w-[212px] flex-col gap-2">
      <FieldLabel>Date of birth</FieldLabel>
      <DatePicker defaultOpen>
        <DatePickerTrigger asChild>
          <DatePickerButton
            date={date}
            placeholder="Select date"
            className="w-full"
          />
        </DatePickerTrigger>
        <DatePickerContent>
          <DatePickerCalendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            onSelect={setDate}
            defaultMonth={new Date(1990, 0, 1)}
            {...designSpecCalendarProps}
          />
        </DatePickerContent>
      </DatePicker>
    </div>
  )
}

function InputDatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 1, 10))
  const [value, setValue] = React.useState(format(new Date(2026, 1, 10), "MM/dd/yyyy"))

  function handleSelect(next: Date | undefined) {
    setDate(next)
    if (next) {
      setValue(format(next, "MM/dd/yyyy"))
    }
  }

  return (
    <div className="flex w-[212px] flex-col gap-2">
      <FieldLabel>Date</FieldLabel>
      <DatePicker defaultOpen>
        <InputGroup>
          <InputGroupInput
            value={value}
            placeholder="MM/DD/YYYY"
            onChange={(event) => {
              setValue(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault()
              }
            }}
          />
          <InputGroupAddon align="inline-end">
            <DatePickerTrigger asChild>
              <InputGroupButton size="icon-xs" variant="ghost" aria-label="Select date">
                <CalendarIcon />
              </InputGroupButton>
            </DatePickerTrigger>
          </InputGroupAddon>
        </InputGroup>
        <DatePickerContent align="end">
          <DatePickerCalendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            defaultMonth={new Date(2026, 1, 1)}
            {...designSpecCalendarProps}
          />
        </DatePickerContent>
      </DatePicker>
    </div>
  )
}

function TimeDatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 1, 10))
  const [time, setTime] = React.useState("10:30")

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex min-w-[210px] flex-1 flex-col gap-2">
          <FieldLabel>Date</FieldLabel>
          <DatePicker defaultOpen>
            <DatePickerTrigger asChild>
              <DatePickerButton date={date} className="w-full" />
            </DatePickerTrigger>
            <DatePickerContent>
              <DatePickerCalendar
                mode="single"
                selected={date}
                onSelect={setDate}
                defaultMonth={new Date(2026, 1, 1)}
                {...designSpecCalendarProps}
              />
            </DatePickerContent>
          </DatePicker>
        </div>
        <div className="flex w-[90px] flex-col gap-2">
          <Label>Time</Label>
          <Input
            type="time"
            value={time}
            onChange={(event) => {
              setTime(event.target.value)
            }}
          />
        </div>
      </div>
    </div>
  )
}

function parseNaturalLanguageDate(input: string): Date | undefined {
  const relative = input.trim().toLowerCase()
  if (relative === "today") {
    return new Date()
  }
  if (relative === "tomorrow") {
    return addDays(new Date(), 1)
  }
  const inDays = relative.match(/^in (\d+) days?$/)
  if (inDays) {
    return addDays(new Date(), Number(inDays[1]))
  }
  const next = new Date(input)
  if (!Number.isNaN(next.getTime())) {
    return next
  }
  return undefined
}

function NaturalLanguagePickerDemo() {
  const [input, setInput] = React.useState("In 2 days")
  const [parsed, setParsed] = React.useState<Date | undefined>(addDays(new Date(), 2))
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 1, 14))

  function handleBlur() {
    setParsed(parseNaturalLanguageDate(input))
  }

  function handleSelect(next: Date | undefined) {
    setDate(next)
    if (next) {
      setParsed(next)
      setInput(format(next, "MMMM dd, yyyy"))
    }
  }

  const publishedOn = parsed ?? new Date(2026, 4, 15)

  return (
    <div className="flex w-[320px] flex-col items-center">
      <FieldGroup className="w-full gap-2">
        <Field>
          <FieldLabel>Schedule Date</FieldLabel>
          <DatePicker defaultOpen>
            <InputGroup className="w-full">
              <InputGroupInput
                value={input}
                placeholder="Tomorrow or in 3 days"
                onChange={(event) => {
                  setInput(event.target.value)
                }}
                onBlur={handleBlur}
              />
              <InputGroupAddon align="inline-end">
                <DatePickerTrigger asChild>
                  <InputGroupButton size="icon-xs" variant="ghost" aria-label="Select date">
                    <CalendarIcon />
                  </InputGroupButton>
                </DatePickerTrigger>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>
              Your post will be published on{" "}
              <span className="font-medium text-foreground">
                {format(publishedOn, "MMMM dd, yyyy")}.
              </span>
            </FieldDescription>
            <DatePickerContent align="center" sideOffset={8}>
              <DatePickerCalendar
                mode="single"
                captionLayout="dropdown"
                selected={date}
                onSelect={handleSelect}
                defaultMonth={new Date(2026, 1, 1)}
                {...designSpecCalendarProps}
              />
            </DatePickerContent>
          </DatePicker>
        </Field>
      </FieldGroup>
    </div>
  )
}

function RtlDatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 6, 23))

  return (
    <div className="flex w-[212px] flex-col items-end gap-0.5" dir="rtl">
      <DatePicker defaultOpen>
        <DatePickerTrigger asChild>
          <DatePickerButton
            date={date}
            placeholder="اختر تاريخًا"
            triggerIcon="chevron"
            className="w-full"
          />
        </DatePickerTrigger>
        <DatePickerContent>
          <DatePickerCalendar
            mode="single"
            locale={arSA}
            dir="rtl"
            selected={date}
            onSelect={setDate}
            defaultMonth={new Date(2026, 6, 1)}
            {...designSpecCalendarProps}
          />
        </DatePickerContent>
      </DatePicker>
    </div>
  )
}

export function DatePickerDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Date Picker</h1>
          <p className="text-base text-muted-foreground">
            A date picker component with range and presets.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/date-picker"
            target="_blank"
            rel="noreferrer"
          >
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <Separator />

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-foreground">Examples</h2>
        </div>

        <ExampleBlock title="Basic" description="A basic date picker component.">
          <PreviewBox>
            <BasicDatePickerDemo />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Date Range Picker"
          description="A date picker component for selecting a range of dates."
        >
          <PreviewBox>
            <RangeDatePickerDemo />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Date of Birth"
          description="A date picker component for selecting a date of birth. This component includes a dropdown caption layout for date and month selection."
        >
          <PreviewBox>
            <DateOfBirthPickerDemo />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Input"
          description="A date picker component with an input field for selecting a date."
        >
          <PreviewBox>
            <InputDatePickerDemo />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Time Picker"
          description="A date picker component with a time input field for selecting a time."
        >
          <PreviewBox>
            <TimeDatePickerDemo />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Natural Language Picker"
          description="This component uses natural language input to schedule a date."
        >
          <PreviewBox>
            <NaturalLanguagePickerDemo />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="RTL"
          description={
            <>
              To enable RTL support in shadcn/ui, see the{" "}
              <a
                href="https://ui.shadcn.com/docs/rtl"
                className="underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                RTL configuration guide
              </a>
              .
            </>
          }
        >
          <PreviewBox>
            <RtlDatePickerDemo />
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
