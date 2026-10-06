/**
 * Storybook-only layout mirroring the Figma Calendar documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { addDays } from "date-fns"
import { arSA, faIR } from "date-fns/locale"
import { ArrowUpRight } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/atoms/button/button"
import { Field, FieldGroup, FieldLabel } from "@/components/atoms/field/field"
import { Input } from "@/components/atoms/input/input"
import { Separator } from "@/components/atoms/separator/separator"
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/molecules/card/card"
import { cn } from "@/utils/index"

import { Calendar, CalendarDayButton } from "./calendar"
import {
  calendarSpecDateCellClassName,
  type CalendarDateSpecPosition,
  type CalendarDateSpecState,
  type CalendarSize
} from "./calendar.variants"

const DATE_SIZE_CELL_CLASS: Record<CalendarSize, string> = {
  sm: "[--cell-size:1.75rem]",
  default: "[--cell-size:2.375rem]",
  lg: "[--cell-size:3rem]"
}

function SpecSection({
  title,
  children,
  className
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <h3 className="text-xl font-semibold tracking-normal text-foreground">{title}</h3>
      {children}
    </section>
  )
}

function VariantGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-4 rounded-xl border border-dashed border-border p-5",
        className
      )}
    >
      {children}
    </div>
  )
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

function MatrixLabels({ rows }: { rows: string[] }) {
  return (
    <div className="flex min-w-[100px] flex-col gap-4 pt-14">
      {rows.map((row) => (
        <div key={row} className="flex h-7 items-center gap-2.5">
          <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">{row}</span>
          <div className="h-full w-3 border-l border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function ColumnHeaders({ columns }: { columns: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {columns.map((label) => (
        <div key={label} className="flex flex-col items-center gap-2.5">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <div className="h-3 w-full border-b border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function HeaderSpecRow({
  captionLayout,
  dir
}: {
  captionLayout: "label" | "dropdown" | "dropdown-months" | "dropdown-years"
  dir?: "ltr" | "rtl"
}) {
  return (
    <Calendar
      mode="single"
      dir={dir}
      captionLayout={captionLayout}
      defaultMonth={new Date(2026, 2, 1)}
      size="sm"
      className="w-[194px]"
      classNames={{
        month_grid: "hidden",
        weekdays: "hidden",
        week: "hidden"
      }}
    />
  )
}

const DATE_STATES: CalendarDateSpecState[] = [
  "default",
  "hover",
  "selected",
  "focus",
  "disabled",
  "booked"
]

const DATE_POSITIONS: CalendarDateSpecPosition[] = ["single", "left", "right", "middle"]

const DATE_SIZES: { label: string; value: CalendarSize }[] = [
  { label: "Small", value: "sm" },
  { label: "Default", value: "default" },
  { label: "Large", value: "lg" }
]

function SpecDateCell({
  state,
  position,
  size
}: {
  state: CalendarDateSpecState
  position: CalendarDateSpecPosition
  size: CalendarSize
}) {
  return (
    <div className={calendarSpecDateCellClassName({ state, position, size })} aria-hidden>
      <span>1</span>
      {size === "lg" ? <span className="text-xs leading-4 text-muted-foreground">$100</span> : null}
    </div>
  )
}

function DateStateMatrix() {
  return (
    <div className="flex min-w-0 flex-col gap-6 overflow-x-auto">
      <div className="grid min-w-[960px] grid-cols-3 gap-6">
        {DATE_SIZES.map(({ label }) => (
          <div key={label} className="flex flex-col items-center gap-2.5">
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
            <div className="h-3 w-full border-b border-foreground" aria-hidden />
          </div>
        ))}
      </div>
      <div className="grid min-w-[960px] grid-cols-3 gap-6">
        {DATE_SIZES.map(({ label, value }) => (
          <div key={label} className={cn("flex flex-wrap gap-x-4 gap-y-1", DATE_SIZE_CELL_CLASS[value])}>
            {DATE_STATES.map((state) => (
              <span
                key={state}
                className="flex w-(--cell-size) shrink-0 justify-center text-xs font-medium capitalize text-muted-foreground"
              >
                {state === "hover" ? "Hover" : state.charAt(0).toUpperCase() + state.slice(1)}
              </span>
            ))}
          </div>
        ))}
      </div>
      {DATE_POSITIONS.map((position) => (
        <div key={position} className="flex flex-wrap items-start gap-6">
          <div className="flex min-w-[100px] flex-col gap-4 pt-1">
            <span className="text-sm font-medium capitalize text-muted-foreground">{position}</span>
          </div>
          <div className="grid min-w-[960px] flex-1 grid-cols-3 gap-6">
            {DATE_SIZES.map(({ label, value }) => (
              <div
                key={`${position}-${label}`}
                className={cn("flex flex-wrap gap-x-4 gap-y-4", DATE_SIZE_CELL_CLASS[value])}
              >
                {DATE_STATES.map((state) => (
                  <SpecDateCell key={state} state={state} position={position} size={value} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function SizeSpecCalendar({ size }: { size: "sm" | "default" | "lg" }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 2, 23))

  return (
    <Calendar
      mode="single"
      size={size}
      selected={date}
      onSelect={setDate}
      defaultMonth={new Date(2026, 2, 1)}
    />
  )
}

const PRESET_LABELS = ["Today", "Tomorrow", "In 3 days", "In a week", "In 2 weeks"] as const

function PresetsExample() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 2, 23))
  const presetOffsets = [0, 1, 3, 7, 14]

  return (
    <Card className="w-[300px] gap-0 overflow-hidden py-0">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={new Date(2026, 2, 1)}
          className="rounded-none border-0"
        />
      </CardContent>
      <CardFooter className="flex-row flex-wrap gap-2">
        {PRESET_LABELS.map((label, index) => (
          <Button
            key={label}
            type="button"
            variant="outline"
            size="sm"
            className="h-7 flex-1 px-2.5 text-xs shadow-none"
            onClick={() => {
              const offset = presetOffsets[index] ?? 0
              setDate(addDays(new Date(), offset))
            }}
          >
            {label}
          </Button>
        ))}
      </CardFooter>
    </Card>
  )
}

function DateTimePickerExample() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 2, 23))

  return (
    <Card className="w-[220px] gap-0 overflow-hidden py-0">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          size="sm"
          selected={date}
          onSelect={setDate}
          defaultMonth={new Date(2026, 2, 1)}
          className="rounded-none border-0"
        />
      </CardContent>
      <CardFooter className="border-t bg-muted p-3">
        <FieldGroup className="gap-5">
          <Field>
            <FieldLabel>Date</FieldLabel>
            <Input defaultValue="03/23/2026" readOnly />
          </Field>
          <Field>
            <FieldLabel>Time</FieldLabel>
            <Input defaultValue="10:30 AM" readOnly />
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  )
}

function CustomCellSizeExample() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 2, 23))

  return (
    <Calendar
      mode="single"
      size="lg"
      selected={date}
      onSelect={setDate}
      defaultMonth={new Date(2026, 2, 1)}
      components={{
        DayButton: ({ children, ...props }) => (
          <CalendarDayButton {...props}>
            {children}
            <span className="text-xs leading-4 text-muted-foreground">$100</span>
          </CalendarDayButton>
        )
      }}
    />
  )
}

export function CalendarDesignSpec() {
  const [singleDate, setSingleDate] = React.useState<Date | undefined>(new Date(2026, 2, 12))
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 2, 8),
    to: new Date(2026, 2, 14)
  })
  const booked = [
    new Date(2026, 2, 3),
    new Date(2026, 2, 17),
    new Date(2026, 2, 24)
  ]

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Calendar</h1>
          <p className="text-base text-muted-foreground">
            A calendar component that allows users to select a date or a range of dates.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/radix/calendar"
            target="_blank"
            rel="noreferrer"
          >
            View in Shadcn
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <div className="flex flex-col gap-10">
          <h3 className="text-xl font-semibold text-foreground">Calendar</h3>

          <SpecSection title="Calendar Header">
            <VariantGrid className="flex-col gap-6">
              <div className="flex flex-wrap gap-6">
                <MatrixLabels rows={["MonthYear", "Month", "Year"]} />
                <div className="flex min-w-0 flex-1 flex-col gap-6">
                  <ColumnHeaders columns={["LTR", "RTL"]} />
                  <div className="grid grid-cols-2 gap-6">
                    <HeaderSpecRow captionLayout="dropdown" dir="ltr" />
                    <HeaderSpecRow captionLayout="dropdown" dir="rtl" />
                    <HeaderSpecRow captionLayout="dropdown-months" dir="ltr" />
                    <HeaderSpecRow captionLayout="dropdown-months" dir="rtl" />
                    <HeaderSpecRow captionLayout="dropdown-years" dir="ltr" />
                    <HeaderSpecRow captionLayout="dropdown-years" dir="rtl" />
                  </div>
                </div>
              </div>
            </VariantGrid>
          </SpecSection>

          <SpecSection title="Date">
            <VariantGrid className="flex-col gap-8 overflow-x-auto">
              <DateStateMatrix />
            </VariantGrid>
          </SpecSection>

          <SpecSection title="Calendar">
            <VariantGrid className="justify-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Small</span>
                <SizeSpecCalendar size="sm" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Default</span>
                <SizeSpecCalendar size="default" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Large</span>
                <SizeSpecCalendar size="lg" />
              </div>
            </VariantGrid>
          </SpecSection>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Persian / Hijri / Jalali Calendar"
          description={
            <>
              To use the Persian calendar, edit{" "}
              <code className="text-sm">components/ui/calendar.tsx</code> and replace{" "}
              <code className="text-sm">react-day-picker</code> with{" "}
              <code className="text-sm">react-day-picker/persian</code>.
            </>
          }
        >
          <PreviewBox>
            <Calendar
              mode="single"
              locale={faIR}
              dir="rtl"
              size="sm"
              selected={singleDate}
              onSelect={setSingleDate}
              defaultMonth={new Date(2026, 2, 1)}
            />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Basic"
          description={
            <>
              A basic calendar component. We used{" "}
              <code className="text-sm">className=&quot;rounded-lg border&quot;</code> to style the
              calendar.
            </>
          }
        >
          <PreviewBox>
            <Calendar
              mode="single"
              size="sm"
              selected={singleDate}
              onSelect={setSingleDate}
              defaultMonth={new Date(2026, 2, 1)}
              className="rounded-lg border"
            />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Range Calendar"
          description={
            <>
              Use the <code className="text-sm">mode=&quot;range&quot;</code> prop to enable range
              selection.
            </>
          }
        >
          <PreviewBox>
            <Calendar
              mode="range"
              numberOfMonths={2}
              selected={range}
              onSelect={setRange}
              defaultMonth={new Date(2026, 2, 1)}
            />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Month and Year Selector"
          description={
            <>
              Use <code className="text-sm">captionLayout=&quot;dropdown&quot;</code> to show month
              and year dropdowns.
            </>
          }
        >
          <PreviewBox>
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={singleDate}
              onSelect={setSingleDate}
              defaultMonth={new Date(2026, 2, 1)}
              size="sm"
            />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Presets" description="Quick date presets in a card footer.">
          <PreviewBox>
            <PresetsExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Date and Time Picker"
          description="Pair the calendar with date and time fields."
        >
          <PreviewBox>
            <DateTimePickerExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Booked dates"
          description="Unavailable days use a struck-through treatment and reduced opacity."
        >
          <PreviewBox>
            <Calendar
              mode="single"
              size="sm"
              selected={singleDate}
              onSelect={setSingleDate}
              defaultMonth={new Date(2026, 2, 1)}
              modifiers={{ booked }}
              disabled={booked}
            />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Cell Size"
          description="Use the large size variant and custom day content for pricing or metadata."
        >
          <PreviewBox>
            <CustomCellSizeExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="RTL"
          description={
            <>
              To enable RTL support in shadcn/ui, see the{" "}
              <a
                href="https://ui.shadcn.com/docs/rtl"
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                RTL configuration guide
              </a>
              . See also the{" "}
              <a
                href="https://ui.shadcn.com/docs/components/radix/calendar#persian--hijri--jalali-calendar"
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                Hijri Guide
              </a>{" "}
              for enabling the Persian / Hijri / Jalali calendar.
            </>
          }
        >
          <PreviewBox>
            <Calendar
              mode="single"
              locale={arSA}
              dir="rtl"
              captionLayout="dropdown"
              selected={new Date(2026, 2, 23)}
              defaultMonth={new Date(2026, 2, 1)}
            />
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
