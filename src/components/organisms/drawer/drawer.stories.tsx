import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "../../atoms/button/button"
import { DrawerDesignSpec } from "./drawer-design-spec"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "./drawer"

const meta: Meta<typeof Drawer> = {
  title: "Organisms/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof Drawer>

const GOAL_CHART_DATA = [
  { goal: 400 },
  { goal: 300 },
  { goal: 200 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 239 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 349 }
]

export const DesignSpec: Story = {
  render: () => <DrawerDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: { disable: true }
  }
}

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>This is a description of the drawer content.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm text-foreground">Drawer content goes here.</p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Save changes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export const MoveGoal: Story = {
  render: function MoveGoalStory() {
    const [goal, setGoal] = React.useState(350)

    function onClick(adjustment: number) {
      setGoal((current) => Math.max(200, Math.min(400, current + adjustment)))
    }

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 shrink-0 rounded-full"
                  onClick={() => {
                    onClick(-10)
                  }}
                  disabled={goal <= 200}
                >
                  <Minus className="size-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">{goal}</div>
                  <div className="text-xs uppercase text-muted-foreground">Calories/day</div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 shrink-0 rounded-full"
                  onClick={() => {
                    onClick(10)
                  }}
                  disabled={goal >= 400}
                >
                  <Plus className="size-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
              <div className="mt-3 h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={GOAL_CHART_DATA}>
                    <Bar
                      dataKey="goal"
                      style={{ fill: "hsl(var(--foreground))", opacity: 0.9 }}
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }
}

const DRAWER_SIDES = ["top", "right", "bottom", "left"] as const

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {DRAWER_SIDES.map((side) => (
        <Drawer
          key={side}
          direction={side === "bottom" ? undefined : side}
        >
          <DrawerTrigger asChild>
            <Button variant="outline" className="capitalize">
              {side}
            </Button>
          </DrawerTrigger>
          <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>
            <div className="overflow-y-auto px-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <p key={index} className="mb-4 text-sm leading-normal text-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              ))}
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  )
}

export const ScrollableContent: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Scrollable Content</Button>
      </DrawerTrigger>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <p key={index} className="mb-4 text-sm leading-normal text-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          ))}
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
