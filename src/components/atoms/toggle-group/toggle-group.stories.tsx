import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bold, Italic, Underline } from "lucide-react"

import { ToggleDesignSpec } from "@/components/atoms/toggle/toggle-design-spec"

import { ToggleGroup, ToggleGroupItem } from "./toggle-group"

const meta: Meta<typeof ToggleGroup> = {
  title: "Atoms/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"]
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"]
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"]
    },
    spacing: {
      control: "number"
    },
    type: {
      control: "select",
      options: ["single", "multiple"]
    },
    disabled: {
      control: "boolean"
    }
  }
}

export default meta
type Story = StoryObj<typeof ToggleGroup>

export const DesignSpec: Story = {
  render: () => <ToggleDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => (
    <ToggleGroup type="multiple" variant="outline" defaultValue={["bold"]}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export const Outline: Story = {
  render: () => (
    <ToggleGroup type="multiple" variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline" defaultValue="all">
      <ToggleGroupItem value="all">All</ToggleGroupItem>
      <ToggleGroupItem value="missed">Missed</ToggleGroupItem>
      <ToggleGroupItem value="unread">Unread</ToggleGroupItem>
    </ToggleGroup>
  )
}

export const Small: Story = {
  render: () => (
    <ToggleGroup type="multiple" variant="outline" size="sm">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export const Large: Story = {
  render: () => (
    <ToggleGroup type="multiple" variant="outline" size="lg">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export const Spacing: Story = {
  render: () => (
    <ToggleGroup type="multiple" variant="outline" spacing={2} size="sm">
      <ToggleGroupItem value="one">One</ToggleGroupItem>
      <ToggleGroupItem value="two">Two</ToggleGroupItem>
      <ToggleGroupItem value="three">Three</ToggleGroupItem>
    </ToggleGroup>
  )
}

export const Vertical: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline" orientation="vertical" defaultValue="bold">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export const Disabled: Story = {
  render: () => (
    <ToggleGroup type="multiple" disabled>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
