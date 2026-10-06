import type { Meta, StoryObj } from "@storybook/react-vite"

import { AspectRatioDesignSpec } from "./aspect-ratio-design-spec"
import { AspectRatio } from "./aspect-ratio"

const meta: Meta = {
  title: "Atoms/AspectRatio",
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj

export const DesignSpec: Story = {
  render: () => <AspectRatioDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: { disable: true }
  }
}

export const Default: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} className="w-[320px]">
      <div className="size-full rounded-lg bg-muted" />
    </AspectRatio>
  )
}

export const Square: Story = {
  render: () => (
    <AspectRatio ratio={1 / 1} className="w-48">
      <div className="size-full rounded-lg bg-muted" />
    </AspectRatio>
  )
}
