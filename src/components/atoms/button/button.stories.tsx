import type { Meta, StoryObj } from "@storybook/react-vite"
import { ArrowUpRight, CircleFadingPlus } from "lucide-react"

import { Spinner } from "@/components/atoms/spinner/spinner"

import { ButtonDesignSpec } from "./button-design-spec"
import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"]
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"]
    }
  }
}

export default meta
type Story = StoryObj<typeof Button>

export const DesignSpec: Story = {
  render: () => <ButtonDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default"
  }
}

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary"
  }
}

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive"
  }
}

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline"
  }
}

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost"
  }
}

export const Link: Story = {
  args: {
    children: "Link",
    variant: "link"
  }
}

export const ExtraSmall: Story = {
  name: "Extra small",
  args: {
    children: "Button",
    size: "xs"
  }
}

export const Small: Story = {
  args: {
    children: "Small",
    size: "sm"
  }
}

export const Large: Story = {
  args: {
    children: "Large",
    size: "lg"
  }
}

export const Icon: Story = {
  render: () => (
    <Button variant="outline" size="icon" aria-label="Add">
      <CircleFadingPlus />
    </Button>
  )
}

export const WithIcon: Story = {
  name: "With icon",
  render: () => (
    <Button>
      <CircleFadingPlus data-icon="inline-start" />
      Button
    </Button>
  )
}

export const Loading: Story = {
  render: () => (
    <Button disabled>
      <Spinner data-icon="inline-start" className="animate-spin" />
      Loading
    </Button>
  )
}

export const AsLink: Story = {
  name: "As link",
  render: () => (
    <Button variant="outline" asChild>
      <a href="https://ui.shadcn.com/docs/components/button" target="_blank" rel="noreferrer">
        View docs
        <ArrowUpRight data-icon="inline-end" />
      </a>
    </Button>
  )
}
