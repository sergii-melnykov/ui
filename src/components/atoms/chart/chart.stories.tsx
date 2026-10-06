import type { Meta, StoryObj } from "@storybook/react-vite"

import { ChartAreaDesignSpec } from "./chart-area-design-spec"
import { ChartDesignSpec } from "./chart-design-spec"
import { ChartOverviewDesignSpec } from "./chart-overview-design-spec"
import {
  ChartBarActive,
  ChartBarCustomLabel,
  ChartBarDefault,
  ChartBarHorizontal,
  ChartBarLabel,
  ChartBarMixed,
  ChartBarMultiple,
  ChartBarNegative,
  ChartBarStackedLegend
} from "./chart-bar-demos"
import { ChartInteractiveBar } from "./chart-interactive-bar"
import { ChartInteractiveLine } from "./chart-interactive-line"
import { ChartLineDesignSpec } from "./chart-line-design-spec"
import { ChartRadarDesignSpec } from "./chart-radar-design-spec"
import { ChartTooltipDesignSpec } from "./chart-tooltip-design-spec"
import {
  ChartTooltipAdvancedExample,
  ChartTooltipCustomLabelExample,
  ChartTooltipDefaultExample,
  ChartTooltipFormatterExample,
  ChartTooltipIconsExample,
  ChartTooltipLabelFormatterExample,
  ChartTooltipLineIndicatorExample,
  ChartTooltipNoIndicatorExample,
  ChartTooltipNoLabelExample
} from "./chart-tooltip-examples"
import { ChartRadialDesignSpec } from "./chart-radial-design-spec"
import {
  ChartRadarDefaultExample,
  ChartRadarDotsExample,
  ChartRadarGridCircleExample,
  ChartRadarGridCircleFillExample,
  ChartRadarGridCircleNoLinesExample,
  ChartRadarGridCustomExample,
  ChartRadarGridFillExample,
  ChartRadarGridNoneExample,
  ChartRadarLabelCustomExample,
  ChartRadarLegendExample,
  ChartRadarLinesOnlyExample,
  ChartRadarMultipleExample
} from "./chart-radar-examples"
import { ChartContainer, type ChartConfig } from "./chart"

const meta: Meta<typeof ChartContainer> = {
  title: "Atoms/Chart",
  component: ChartContainer,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof ChartContainer>

export const OverviewDesignSpec: Story = {
  name: "Chart — Figma design spec",
  render: () => <ChartOverviewDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const DesignSpec: Story = {
  name: "Bar chart — Figma design spec",
  render: () => <ChartDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const AreaDesignSpec: Story = {
  name: "Area chart — Figma design spec",
  render: () => <ChartAreaDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const RadarDesignSpec: Story = {
  name: "Radar chart — Figma design spec",
  render: () => <ChartRadarDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const RadialDesignSpec: Story = {
  name: "Radial chart — Figma design spec",
  render: () => <ChartRadialDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const LineChartDesignSpec: Story = {
  name: "Line chart — Figma design spec",
  render: () => <ChartLineDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const TooltipDesignSpec: Story = {
  name: "Chart tooltip — Figma design spec",
  render: () => <ChartTooltipDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const InteractiveBar: Story = {
  name: "Bar chart — interactive",
  render: () => <ChartInteractiveBar />,
  parameters: {
    layout: "padded"
  }
}

export const InteractiveLine: Story = {
  name: "Line chart — interactive",
  render: () => <ChartInteractiveLine />,
  parameters: {
    layout: "padded"
  }
}

export const BarDefault: Story = {
  name: "Bar chart",
  render: () => <ChartBarDefault className="max-w-[419px]" />
}

export const BarHorizontal: Story = {
  name: "Bar chart — horizontal",
  render: () => <ChartBarHorizontal className="max-w-[419px]" />
}

export const BarMultiple: Story = {
  name: "Bar chart — multiple",
  render: () => <ChartBarMultiple className="max-w-[419px]" />
}

export const BarStackedLegend: Story = {
  name: "Bar chart — stacked + legend",
  render: () => <ChartBarStackedLegend className="max-w-[419px]" />
}

export const BarLabel: Story = {
  name: "Bar chart — label",
  render: () => <ChartBarLabel className="max-w-[419px]" />
}

export const BarCustomLabel: Story = {
  name: "Bar chart — custom label",
  render: () => <ChartBarCustomLabel className="max-w-[419px]" />
}

export const BarMixed: Story = {
  name: "Bar chart — mixed",
  render: () => <ChartBarMixed className="max-w-[419px]" />
}

export const BarActive: Story = {
  name: "Bar chart — active",
  render: () => <ChartBarActive className="max-w-[419px]" />
}

export const BarNegative: Story = {
  name: "Bar chart — negative",
  render: () => <ChartBarNegative className="max-w-[419px]" />
}

export const RadarDefault: Story = {
  name: "Radar chart",
  render: () => <ChartRadarDefaultExample />
}

export const RadarDots: Story = {
  name: "Radar chart — dots",
  render: () => <ChartRadarDotsExample />
}

export const RadarLinesOnly: Story = {
  name: "Radar chart — lines only",
  render: () => <ChartRadarLinesOnlyExample />
}

export const RadarLabelCustom: Story = {
  name: "Radar chart — custom label",
  render: () => <ChartRadarLabelCustomExample />
}

export const RadarGridCustom: Story = {
  name: "Radar chart — grid custom",
  render: () => <ChartRadarGridCustomExample />
}

export const RadarGridNone: Story = {
  name: "Radar chart — grid none",
  render: () => <ChartRadarGridNoneExample />
}

export const RadarGridCircle: Story = {
  name: "Radar chart — grid circle",
  render: () => <ChartRadarGridCircleExample />
}

export const RadarGridCircleNoLines: Story = {
  name: "Radar chart — grid circle (no lines)",
  render: () => <ChartRadarGridCircleNoLinesExample />
}

export const RadarGridCircleFill: Story = {
  name: "Radar chart — grid circle filled",
  render: () => <ChartRadarGridCircleFillExample />
}

export const RadarGridFill: Story = {
  name: "Radar chart — grid filled",
  render: () => <ChartRadarGridFillExample />
}

export const RadarMultiple: Story = {
  name: "Radar chart — multiple",
  render: () => <ChartRadarMultipleExample />
}

export const RadarLegend: Story = {
  name: "Radar chart — legend",
  render: () => <ChartRadarLegendExample />
}

export const TooltipDefault: Story = {
  name: "Chart tooltip — default",
  render: () => <ChartTooltipDefaultExample />
}

export const TooltipLineIndicator: Story = {
  name: "Chart tooltip — line indicator",
  render: () => <ChartTooltipLineIndicatorExample />
}

export const TooltipNoIndicator: Story = {
  name: "Chart tooltip — no indicator",
  render: () => <ChartTooltipNoIndicatorExample />
}

export const TooltipCustomLabel: Story = {
  name: "Chart tooltip — custom label",
  render: () => <ChartTooltipCustomLabelExample />
}

export const TooltipLabelFormatter: Story = {
  name: "Chart tooltip — label formatter",
  render: () => <ChartTooltipLabelFormatterExample />
}

export const TooltipNoLabel: Story = {
  name: "Chart tooltip — no label",
  render: () => <ChartTooltipNoLabelExample />
}

export const TooltipFormatter: Story = {
  name: "Chart tooltip — formatter",
  render: () => <ChartTooltipFormatterExample />
}

export const TooltipIcons: Story = {
  name: "Chart tooltip — icons",
  render: () => <ChartTooltipIconsExample />
}

export const TooltipAdvanced: Story = {
  name: "Chart tooltip — advanced",
  render: () => <ChartTooltipAdvancedExample />
}

const demoConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)"
  }
} satisfies ChartConfig

export const Container: Story = {
  render: () => (
    <ChartContainer config={demoConfig} className="h-[200px] w-[320px]">
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Compose Recharts children inside ChartContainer
      </div>
    </ChartContainer>
  )
}
