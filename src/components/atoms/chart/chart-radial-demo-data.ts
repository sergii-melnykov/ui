import type { ChartConfig } from "./chart"

export const radialBrowserChartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" }
] as const

export const radialBrowserChartConfig = {
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

export const radialSafariTextChartData = [
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" }
] as const

export const radialSafariTextChartConfig = {
  visitors: {
    label: "Visitors"
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)"
  }
} satisfies ChartConfig

export const radialSafariShapeChartData = [
  { browser: "safari", visitors: 1260, fill: "var(--color-safari)" }
] as const

export const radialStackedChartData = [{ month: "january", desktop: 1260, mobile: 570 }] as const

export const radialStackedChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)"
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)"
  }
} satisfies ChartConfig

export const radialChartPeriodDescription = "January - June 2024"
