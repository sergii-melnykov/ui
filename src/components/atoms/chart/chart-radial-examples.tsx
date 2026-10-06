"use client"

import {
  Label,
  LabelList,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "./chart"
import {
  radialBrowserChartConfig,
  radialBrowserChartData,
  radialSafariShapeChartData,
  radialSafariTextChartConfig,
  radialSafariTextChartData,
  radialStackedChartConfig,
  radialStackedChartData
} from "./chart-radial-demo-data"
import { RadialChartVariantLayout } from "./chart-radial-shell"

const radialChartClassName = "mx-auto aspect-square max-h-[250px] w-full max-w-[250px]"

export function ChartRadialDefaultExample() {
  return (
    <RadialChartVariantLayout title="Radial Chart">
      <ChartContainer config={radialBrowserChartConfig} className={radialChartClassName}>
        <RadialBarChart data={[...radialBrowserChartData]} innerRadius={30} outerRadius={110}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel nameKey="browser" />}
          />
          <RadialBar dataKey="visitors" background />
        </RadialBarChart>
      </ChartContainer>
    </RadialChartVariantLayout>
  )
}

export function ChartRadialLabelExample() {
  return (
    <RadialChartVariantLayout title="Radial Chart - Label">
      <ChartContainer config={radialBrowserChartConfig} className={radialChartClassName}>
        <RadialBarChart
          data={[...radialBrowserChartData]}
          startAngle={-90}
          endAngle={380}
          innerRadius={30}
          outerRadius={110}
        >
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel nameKey="browser" />}
          />
          <RadialBar dataKey="visitors" background>
            <LabelList
              position="insideStart"
              dataKey="browser"
              className="fill-white capitalize mix-blend-luminosity"
              fontSize={11}
            />
          </RadialBar>
        </RadialBarChart>
      </ChartContainer>
    </RadialChartVariantLayout>
  )
}

export function ChartRadialGridExample() {
  return (
    <RadialChartVariantLayout title="Radial Chart - Grid">
      <ChartContainer config={radialBrowserChartConfig} className={radialChartClassName}>
        <RadialBarChart data={[...radialBrowserChartData]} innerRadius={30} outerRadius={100}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel nameKey="browser" />}
          />
          <PolarGrid gridType="circle" />
          <RadialBar dataKey="visitors" />
        </RadialBarChart>
      </ChartContainer>
    </RadialChartVariantLayout>
  )
}

export function ChartRadialTextExample() {
  return (
    <RadialChartVariantLayout title="Radial Chart - Text">
      <ChartContainer config={radialSafariTextChartConfig} className={radialChartClassName}>
        <RadialBarChart
          data={[...radialSafariTextChartData]}
          startAngle={0}
          endAngle={250}
          innerRadius={80}
          outerRadius={110}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-background"
            polarRadius={[86, 74]}
          />
          <RadialBar dataKey="visitors" background cornerRadius={10} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-4xl font-bold"
                      >
                        {radialSafariTextChartData[0].visitors.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy + 24}
                        className="fill-muted-foreground"
                      >
                        Visitors
                      </tspan>
                    </text>
                  )
                }
                return null
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </RadialChartVariantLayout>
  )
}

export function ChartRadialShapeExample() {
  return (
    <RadialChartVariantLayout title="Radial Chart - Shape">
      <ChartContainer config={radialSafariTextChartConfig} className={radialChartClassName}>
        <RadialBarChart
          data={[...radialSafariShapeChartData]}
          endAngle={100}
          innerRadius={80}
          outerRadius={140}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-background"
            polarRadius={[86, 74]}
          />
          <RadialBar dataKey="visitors" background />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-4xl font-bold"
                      >
                        {radialSafariShapeChartData[0].visitors.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy + 24}
                        className="fill-muted-foreground"
                      >
                        Visitors
                      </tspan>
                    </text>
                  )
                }
                return null
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </RadialChartVariantLayout>
  )
}

export function ChartRadialStackedExample() {
  const totalVisitors =
    radialStackedChartData[0].desktop + radialStackedChartData[0].mobile

  return (
    <RadialChartVariantLayout title="Radial Chart - Stacked">
      <ChartContainer config={radialStackedChartConfig} className={radialChartClassName}>
        <RadialBarChart
          data={[...radialStackedChartData]}
          endAngle={180}
          innerRadius={80}
          outerRadius={130}
        >
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy - 16}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy + 4}
                        className="fill-muted-foreground"
                      >
                        Visitors
                      </tspan>
                    </text>
                  )
                }
                return null
              }}
            />
          </PolarRadiusAxis>
          <RadialBar
            dataKey="desktop"
            stackId="a"
            cornerRadius={5}
            fill="var(--color-desktop)"
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="mobile"
            fill="var(--color-mobile)"
            stackId="a"
            cornerRadius={5}
            className="stroke-transparent stroke-2"
          />
        </RadialBarChart>
      </ChartContainer>
    </RadialChartVariantLayout>
  )
}
