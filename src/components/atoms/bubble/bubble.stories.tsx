import type { Meta, StoryObj } from "@storybook/react-vite"

import { BubbleDesignSpec } from "./bubble-design-spec"
import { Bubble, BubbleContent, BubbleReaction, BubbleReactions } from "./bubble"

const meta: Meta = {
  title: "Atoms/Bubble",
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj

export const DesignSpec: Story = {
  render: () => <BubbleDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: { disable: true }
  }
}

export const Default: Story = {
  render: () => (
    <Bubble variant="primary">
      <BubbleContent>This is the default primary bubble.</BubbleContent>
    </Bubble>
  )
}

export const Secondary: Story = {
  render: () => (
    <Bubble variant="secondary">
      <BubbleContent>This is the secondary variant.</BubbleContent>
    </Bubble>
  )
}

export const Tinted: Story = {
  render: () => (
    <Bubble variant="tinted">
      <BubbleContent>This one is tinted.</BubbleContent>
    </Bubble>
  )
}

export const WithReaction: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col items-end">
      <Bubble variant="secondary" align="end" className="relative z-[1] mb-[-4px]">
        <BubbleContent>Message with reactions.</BubbleContent>
      </Bubble>
      <BubbleReactions align="start">
        <BubbleReaction>👍 17</BubbleReaction>
      </BubbleReactions>
    </div>
  )
}
