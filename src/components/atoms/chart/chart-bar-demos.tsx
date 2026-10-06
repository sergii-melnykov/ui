"use client"

import { TrendingUp } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Rectangle,
  XAxis,
  YAxis
} from "recharts"
import type { BarShapeProps } from "recharts/types/cartesian/Bar"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/molecules/card/card"
import { cn } from "@/utils/index"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "./chart"
import {
  browserActiveChartData,
  browserChartConfig,
  browserChartData,
  customLabelChartConfig,
  desktopChartConfig,
  desktopMobileChartConfig,
  formatBrowserTick,
  formatMonthTick,
  monthDesktopChartData,
  monthVisitorChartData,
  negativeChartConfig,
  negativeVisitorChartData
} from "./chart-bar-shared"

const ACTIVE_BAR_INDEX = 2

function getBarPayloadFill(payload: unknown): string | undefined {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }
  const fill = (payload as { fill?: unknown }).fill
  return typeof fill === "string" ? fill : undefined
}

function ChartBarTrendFooter() {
  return (
    <CardFooter className="flex-col items-start gap-2 text-sm">
      <div className="flex gap-2 leading-none font-medium">
        Trending up by 5.2% this month
        <TrendingUp className="size-4" />
      </div>
      <div className="leading-none text-muted-foreground">
        Showing total visitors for the last 6 months
      </div>
    </CardFooter>
  )
}

export function ChartBarDefault({ className }: { className?: string }) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Bar chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={desktopChartConfig}>
          <BarChart accessibilityLayer data={[...monthDesktopChartData]}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={formatMonthTick}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <ChartBarTrendFooter />
    </Card>
  )
}

export function ChartBarHorizontal({ className }: { className?: string }) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Bar Chart - Horizontal</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={desktopChartConfig}>
          <BarChart
            accessibilityLayer
            data={[...monthDesktopChartData]}
            layout="vertical"
            margin={{ left: -20 }}
          >
            <XAxis type="number" dataKey="desktop" hide />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={formatMonthTick}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <ChartBarTrendFooter />
    </Card>
  )
}

export function ChartBarMultiple({ className }: { className?: string }) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={desktopMobileChartConfig}>
          <BarChart accessibilityLayer data={[...monthVisitorChartData]}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={formatMonthTick}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <ChartBarTrendFooter />
    </Card>
  )
}

export function ChartBarStackedLegend({ className }: { className?: string }) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Bar Chart - Stacked + Legend</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={desktopMobileChartConfig}>
          <BarChart accessibilityLayer data={[...monthVisitorChartData]}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={formatMonthTick}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="desktop"
              stackId="a"
              fill="var(--color-desktop)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="mobile"
              stackId="a"
              fill="var(--color-mobile)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <ChartBarTrendFooter />
    </Card>
  )
}

export function ChartBarLabel({ className }: { className?: string }) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Bar Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={desktopChartConfig}>
          <BarChart accessibilityLayer data={[...monthDesktopChartData]} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={formatMonthTick}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <ChartBarTrendFooter />
    </Card>
  )
}

export function ChartBarCustomLabel({ className }: { className?: string }) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Bar Chart - Custom Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={customLabelChartConfig}>
          <BarChart
            accessibilityLayer
            data={[...monthVisitorChartData]}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={formatMonthTick}
              hide
            />
            <XAxis dataKey="desktop" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4}>
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="desktop"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <ChartBarTrendFooter />
    </Card>
  )
}

export function ChartBarMixed({ className }: { className?: string }) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Bar Chart - Mixed</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={browserChartConfig}>
          <BarChart
            accessibilityLayer
            data={[...browserChartData]}
            layout="vertical"
            margin={{ left: 0 }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={formatBrowserTick}
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="visitors" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <ChartBarTrendFooter />
    </Card>
  )
}

export function ChartBarActive({ className }: { className?: string }) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Bar Chart - Active</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={browserChartConfig}>
          <BarChart accessibilityLayer data={[...browserActiveChartData]}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="browser"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={formatBrowserTick}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="visitors"
              strokeWidth={2}
              radius={8}
              shape={({ index, payload, ...props }: BarShapeProps) => {
                const fill = getBarPayloadFill(payload)
                return index === ACTIVE_BAR_INDEX ? (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                ) : (
                  <Rectangle {...props} />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <ChartBarTrendFooter />
    </Card>
  )
}

export function ChartBarNegative({ className }: { className?: string }) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Bar Chart - Negative</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={negativeChartConfig}>
          <BarChart
            accessibilityLayer
            data={negativeVisitorChartData.map((item) => ({
              ...item,
              fill: item.visitors > 0 ? "var(--chart-1)" : "var(--chart-2)"
            }))}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Bar dataKey="visitors">
              <LabelList position="top" dataKey="month" fillOpacity={1} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <ChartBarTrendFooter />
    </Card>
  )
}
