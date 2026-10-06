import type { ChartConfig } from "./chart"

export const tooltipChartData = [
  { date: "2024-07-15", running: 450, swimming: 300 },
  { date: "2024-07-16", running: 380, swimming: 420 },
  { date: "2024-07-17", running: 520, swimming: 120 },
  { date: "2024-07-18", running: 140, swimming: 550 },
  { date: "2024-07-19", running: 600, swimming: 350 },
  { date: "2024-07-20", running: 480, swimming: 400 }
] as const

export const tooltipRunningSwimmingChartConfig = {
  running: {
    label: "Running",
    color: "var(--chart-1)"
  },
  swimming: {
    label: "Swimming",
    color: "var(--chart-2)"
  }
} satisfies ChartConfig

export const tooltipActivitiesChartConfig = {
  activities: {
    label: "Activities"
  },
  running: {
    label: "Running",
    color: "var(--chart-1)"
  },
  swimming: {
    label: "Swimming",
    color: "var(--chart-2)"
  }
} satisfies ChartConfig

export function formatTooltipWeekdayTick(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    weekday: "short"
  })
}

export function formatTooltipLongDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  })
}
