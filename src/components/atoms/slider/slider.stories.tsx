import type { Meta, StoryObj } from "@storybook/react-vite"

import { SliderDesignSpec } from "./slider-design-spec"
import { Slider } from "./slider"

const meta: Meta<typeof Slider> = {
  title: "Atoms/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof Slider>

export const DesignSpec: Story = {
  render: () => <SliderDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => (
    <Slider className="w-64" defaultValue={[50]} max={100} step={1} aria-label="Volume" />
  )
}

export const Range: Story = {
  render: () => (
    <Slider className="w-64" defaultValue={[25, 75]} max={100} step={1} aria-label="Price range" />
  )
}

export const Vertical: Story = {
  render: () => (
    <Slider
      orientation="vertical"
      className="h-40"
      defaultValue={[50]}
      max={100}
      step={1}
      aria-label="Vertical slider"
    />
  )
}

export const Disabled: Story = {
  render: () => (
    <Slider
      className="w-64"
      defaultValue={[50]}
      max={100}
      step={1}
      disabled
      aria-label="Disabled slider"
    />
  )
}
