import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/atoms/button/button"
import { Input } from "@/components/atoms/input/input"
import { Label } from "@/components/atoms/label/label"

import { PopoverDesignSpec } from "./popover-design-spec"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from "./popover"

const meta: Meta<typeof Popover> = {
  title: "Atoms/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof Popover>

export const DesignSpec: Story = {
  render: () => <PopoverDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-col gap-2.5">
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
          </PopoverHeader>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="popover-width">Width</Label>
              <Input id="popover-width" defaultValue="100%" className="h-8 flex-1" />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="popover-height">Height</Label>
              <Input id="popover-height" defaultValue="25px" className="h-8 flex-1" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const AlignStart: Story = {
  render: () => (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          Start
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-40">
        <p className="text-sm">Aligned to start</p>
      </PopoverContent>
    </Popover>
  )
}

export const AlignCenter: Story = {
  render: () => (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          Center
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-40">
        <p className="text-sm">Aligned to center</p>
      </PopoverContent>
    </Popover>
  )
}

export const AlignEnd: Story = {
  render: () => (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          End
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-40">
        <p className="text-sm">Aligned to end</p>
      </PopoverContent>
    </Popover>
  )
}
