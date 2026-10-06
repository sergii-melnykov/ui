"use client"

import * as React from "react"
import {
  Activity,
  AreaChart as AreaChartIcon,
  TrendingDown,
  TrendingUp
} from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "@/components/atoms/chart/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/atoms/select/select"
import { cn } from "@/utils/index"

import {
  areaChartDateTickFormatter,
  areaChartDualSeriesData,
  areaChartMonthTickFormatter,
  areaChartMonthlyData,
  areaChartTripleSeriesData,
  areaChartVisitorData
} from "./chart-area-shared"

const desktopConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)"
  }
} satisfies ChartConfig

const dualSeriesConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)"
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)"
  }
} satisfies ChartConfig

const tripleSeriesConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)"
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)"
  },
  other: {
    label: "Other",
    color: "var(--chart-3)"
  }
} satisfies ChartConfig

const visitorConfig = {
  visitors: {
    label: "Visitors"
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)"
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)"
  }
} satisfies ChartConfig

const iconsConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
    icon: TrendingDown
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
    icon: TrendingUp
  }
} satisfies ChartConfig

const stepConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
    icon: Activity
  }
} satisfies ChartConfig

const sixMonthDescription = "Showing total visitors for the last 6 months"

function AreaChartTrendFooter() {
  return (
    <>
      <div className="flex items-center gap-2 text-sm font-medium leading-5">
        Trending up by 5.2% this month
        <TrendingUp className="size-4" aria-hidden />
      </div>
      <p className="text-sm leading-5 text-muted-foreground">January - June 2024</p>
    </>
  )
}

export function AreaChartDocCard({
  metaLabel = "Chart",
  title,
  description,
  headerAction,
  footer,
  children,
  className,
  chartClassName
}: {
  metaLabel?: string
  title: string
  description: string
  headerAction?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
  className?: string
  chartClassName?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border bg-background",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
        <AreaChartIcon className="size-3.5 text-muted-foreground" aria-hidden />
        <span className="text-[13px] leading-5 text-muted-foreground">{metaLabel}</span>
      </div>
      <div className="flex flex-col gap-6 py-6">
        <div
          className={cn(
            "flex flex-col gap-1.5 px-6",
            headerAction && "border-b border-border pb-6"
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <h3 className="text-base font-semibold leading-6 text-card-foreground">{title}</h3>
              <p className="text-sm leading-5 text-muted-foreground">{description}</p>
            </div>
            {headerAction}
          </div>
        </div>
        <div className={cn("px-6", chartClassName)}>{children}</div>
        {footer ? <div className="flex flex-col gap-2 px-6">{footer}</div> : null}
      </div>
    </div>
  )
}

function useChartGradientIds() {
  const id = React.useId().replace(/:/g, "")
  return {
    desktop: `fillDesktop-${id}`,
    mobile: `fillMobile-${id}`
  }
}

export function ChartAreaDefaultDemo({ className }: { className?: string }) {
  return (
    <AreaChartDocCard
      className={className}
      title="Area Chart"
      description={sixMonthDescription}
      footer={<AreaChartTrendFooter />}
    >
      <ChartContainer config={desktopConfig} className="aspect-auto h-[188px] w-full">
        <AreaChart
          accessibilityLayer
          data={[...areaChartMonthlyData]}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={areaChartMonthTickFormatter}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <Area
            dataKey="desktop"
            type="natural"
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
          />
        </AreaChart>
      </ChartContainer>
    </AreaChartDocCard>
  )
}

export function ChartAreaLinearDemo({ className }: { className?: string }) {
  return (
    <AreaChartDocCard
      className={className}
      title="Area Chart - Linear"
      description={sixMonthDescription}
      footer={<AreaChartTrendFooter />}
    >
      <ChartContainer config={desktopConfig} className="aspect-auto h-[188px] w-full">
        <AreaChart
          accessibilityLayer
          data={[...areaChartMonthlyData]}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={areaChartMonthTickFormatter}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" hideLabel />}
          />
          <Area
            dataKey="desktop"
            type="linear"
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
          />
        </AreaChart>
      </ChartContainer>
    </AreaChartDocCard>
  )
}

export function ChartAreaStepDemo({ className }: { className?: string }) {
  return (
    <AreaChartDocCard
      className={className}
      title="Area Chart - Step"
      description={sixMonthDescription}
      footer={<AreaChartTrendFooter />}
    >
      <ChartContainer config={stepConfig} className="aspect-auto h-[188px] w-full">
        <AreaChart
          accessibilityLayer
          data={[...areaChartMonthlyData]}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={areaChartMonthTickFormatter}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Area
            dataKey="desktop"
            type="step"
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
          />
        </AreaChart>
      </ChartContainer>
    </AreaChartDocCard>
  )
}

export function ChartAreaLegendDemo({ className }: { className?: string }) {
  return (
    <AreaChartDocCard
      className={className}
      title="Area Chart - Legend"
      description={sixMonthDescription}
      footer={<AreaChartTrendFooter />}
    >
      <ChartContainer config={dualSeriesConfig} className="aspect-auto h-[188px] w-full">
        <AreaChart
          accessibilityLayer
          data={[...areaChartDualSeriesData]}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={areaChartMonthTickFormatter}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <Area
            dataKey="mobile"
            type="natural"
            fill="var(--color-mobile)"
            fillOpacity={0.4}
            stroke="var(--color-mobile)"
            stackId="a"
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
            stackId="a"
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </AreaChartDocCard>
  )
}

export function ChartAreaStackedDemo({ className }: { className?: string }) {
  return (
    <AreaChartDocCard
      className={className}
      title="Area Chart - Stacked"
      description={sixMonthDescription}
      footer={<AreaChartTrendFooter />}
    >
      <ChartContainer config={dualSeriesConfig} className="aspect-auto h-[188px] w-full">
        <AreaChart
          accessibilityLayer
          data={[...areaChartDualSeriesData]}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={areaChartMonthTickFormatter}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
          <Area
            dataKey="mobile"
            type="natural"
            fill="var(--color-mobile)"
            fillOpacity={0.4}
            stroke="var(--color-mobile)"
            stackId="a"
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </AreaChartDocCard>
  )
}

export function ChartAreaStackedExpandDemo({ className }: { className?: string }) {
  return (
    <AreaChartDocCard
      className={className}
      title="Area Chart - Stacked Expanded"
      description="Showing total visitors for the last 6 months"
      footer={<AreaChartTrendFooter />}
    >
      <ChartContainer config={tripleSeriesConfig} className="aspect-auto h-[188px] w-full">
        <AreaChart
          accessibilityLayer
          data={[...areaChartTripleSeriesData]}
          margin={{ left: 12, right: 12, top: 12 }}
          stackOffset="expand"
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={areaChartMonthTickFormatter}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <Area
            dataKey="other"
            type="natural"
            fill="var(--color-other)"
            fillOpacity={0.1}
            stroke="var(--color-other)"
            stackId="a"
          />
          <Area
            dataKey="mobile"
            type="natural"
            fill="var(--color-mobile)"
            fillOpacity={0.4}
            stroke="var(--color-mobile)"
            stackId="a"
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </AreaChartDocCard>
  )
}

export function ChartAreaIconsDemo({ className }: { className?: string }) {
  return (
    <AreaChartDocCard
      className={className}
      title="Area Chart - Icons"
      description={sixMonthDescription}
      footer={<AreaChartTrendFooter />}
    >
      <ChartContainer config={iconsConfig} className="aspect-auto h-[188px] w-full">
        <AreaChart
          accessibilityLayer
          data={[...areaChartDualSeriesData]}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={areaChartMonthTickFormatter}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <Area
            dataKey="mobile"
            type="natural"
            fill="var(--color-mobile)"
            fillOpacity={0.4}
            stroke="var(--color-mobile)"
            stackId="a"
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
            stackId="a"
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </AreaChartDocCard>
  )
}

export function ChartAreaGradientDemo({ className }: { className?: string }) {
  const gradientIds = useChartGradientIds()

  return (
    <AreaChartDocCard
      className={className}
      title="Area Chart - Gradient"
      description={sixMonthDescription}
      footer={<AreaChartTrendFooter />}
    >
      <ChartContainer config={dualSeriesConfig} className="aspect-auto h-[188px] w-full">
        <AreaChart
          accessibilityLayer
          data={[...areaChartDualSeriesData]}
          margin={{ left: 12, right: 12 }}
        >
          <defs>
            <linearGradient id={gradientIds.desktop} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id={gradientIds.mobile} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={areaChartMonthTickFormatter}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Area
            dataKey="mobile"
            type="natural"
            fill={`url(#${gradientIds.mobile})`}
            fillOpacity={0.4}
            stroke="var(--color-mobile)"
            stackId="a"
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill={`url(#${gradientIds.desktop})`}
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </AreaChartDocCard>
  )
}

export function ChartAreaAxesDemo({ className }: { className?: string }) {
  return (
    <AreaChartDocCard
      className={className}
      title="Area Chart - Axes"
      description={sixMonthDescription}
      footer={<AreaChartTrendFooter />}
    >
      <ChartContainer config={dualSeriesConfig} className="aspect-auto h-[188px] w-full">
        <AreaChart
          accessibilityLayer
          data={[...areaChartDualSeriesData]}
          margin={{ left: -20, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={areaChartMonthTickFormatter}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={3} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Area
            dataKey="mobile"
            type="natural"
            fill="var(--color-mobile)"
            fillOpacity={0.4}
            stroke="var(--color-mobile)"
            stackId="a"
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </AreaChartDocCard>
  )
}

export function ChartAreaInteractiveDemo({ className }: { className?: string }) {
  const [timeRange, setTimeRange] = React.useState("90d")
  const gradientIds = useChartGradientIds()

  const filteredData = React.useMemo(
    () =>
      areaChartVisitorData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 90
        if (timeRange === "30d") {
          daysToSubtract = 30
        } else if (timeRange === "7d") {
          daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
      }),
    [timeRange]
  )

  return (
    <AreaChartDocCard
      className={className}
      metaLabel="Area Chart"
      title="Area Chart - Interactive"
      description="Showing total visitors for the last 3 months"
      chartClassName="pt-0"
      headerAction={
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="h-9 w-[180px] rounded-lg" aria-label="Select a value">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      }
    >
      <ChartContainer config={visitorConfig} className="aspect-auto h-[250px] w-full">
        <AreaChart accessibilityLayer data={[...filteredData]}>
          <defs>
            <linearGradient id={gradientIds.desktop} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id={gradientIds.mobile} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={areaChartDateTickFormatter}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator="dot"
                labelFormatter={(value) => {
                  return new Date(String(value)).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                  })
                }}
              />
            }
          />
          <Area
            dataKey="mobile"
            type="natural"
            fill={`url(#${gradientIds.mobile})`}
            stroke="var(--color-mobile)"
            stackId="a"
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill={`url(#${gradientIds.desktop})`}
            stroke="var(--color-desktop)"
            stackId="a"
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </AreaChartDocCard>
  )
}
