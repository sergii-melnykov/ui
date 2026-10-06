import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/atoms/button/button"

import { HoverCardDesignSpec } from "./hover-card-design-spec"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card"

const meta: Meta<typeof HoverCard> = {
  title: "Atoms/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof HoverCard>

export const DesignSpec: Story = {
  render: () => <HoverCardDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">@nextjs</p>
          <p className="text-sm">The React Framework - created and maintained by @vercel.</p>
          <p className="text-xs text-muted-foreground">Joined December 2021</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

function sideStory(
  side: "top" | "right" | "bottom" | "left",
  label: string,
  description: string
): Story {
  return {
    render: () => (
      <HoverCard defaultOpen>
        <HoverCardTrigger asChild>
          <Button variant="outline" size="sm">
            {label}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent side={side} className="w-64">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Hover card</p>
            <p className="text-sm">{description}</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    )
  }
}

export const SideLeft: Story = sideStory(
  "left",
  "Left",
  "This hover card appears on the left side of the trigger."
)

export const SideTop: Story = sideStory(
  "top",
  "Top",
  "This hover card appears on the top side of the trigger."
)

export const SideBottom: Story = sideStory(
  "bottom",
  "Bottom",
  "This hover card appears on the bottom side of the trigger."
)

export const SideRight: Story = sideStory(
  "right",
  "Right",
  "This hover card appears on the right side of the trigger."
)
