import type { Meta, StoryObj } from "@storybook/react-vite"

import { Checkbox } from "@/components/atoms/checkbox/checkbox"

import { LabelDesignSpec } from "./label-design-spec"
import { Label } from "./label"

const meta: Meta<typeof Label> = {
  title: "Atoms/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the label"
    }
  }
}

export default meta
type Story = StoryObj<typeof Label>

export const DesignSpec: Story = {
  render: () => <LabelDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  args: {
    children: "Label"
  }
}

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="story-label-terms" />
      <Label htmlFor="story-label-terms">Accept terms and conditions</Label>
    </div>
  )
}

export const WithCustomClass: Story = {
  args: {
    children: "Custom Styled Label",
    className: "text-primary font-semibold"
  }
}

export const Disabled: Story = {
  args: {
    children: "Disabled Label",
    className: "opacity-50"
  }
}
