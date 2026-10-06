import type { ChartConfig } from "./chart"

export const monthVisitorChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 }
] as const

export const monthDesktopChartData = monthVisitorChartData.map(({ month, desktop }) => ({
  month,
  desktop
}))

export const browserChartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" }
] as const

export const browserActiveChartData = [
  { browser: "chrome", visitors: 187, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 275, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" }
] as const

export const negativeVisitorChartData = [
  { month: "January", visitors: 186 },
  { month: "February", visitors: 205 },
  { month: "March", visitors: -207 },
  { month: "April", visitors: 173 },
  { month: "May", visitors: -209 },
  { month: "June", visitors: 214 }
] as const

export const desktopMobileChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)"
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)"
  }
} satisfies ChartConfig

export const desktopChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)"
  }
} satisfies ChartConfig

export const browserChartConfig = {
  visitors: {
    label: "Visitors"
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)"
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)"
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)"
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)"
  },
  other: {
    label: "Other",
    color: "var(--chart-5)"
  }
} satisfies ChartConfig

export const customLabelChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)"
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)"
  },
  label: {
    color: "var(--background)"
  }
} satisfies ChartConfig

export const negativeChartConfig = {
  visitors: {
    label: "Visitors"
  }
} satisfies ChartConfig

export function formatMonthTick(value: string) {
  return value.slice(0, 3)
}

export function formatBrowserTick(value: string) {
  const key = value as keyof typeof browserChartConfig
  if (key in browserChartConfig) {
    return browserChartConfig[key].label
  }
  return value
}
