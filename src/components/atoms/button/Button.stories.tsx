import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component that supports different variants, sizes, and states."
      }
    }
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost"],
      description: "The visual style of the button"
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the button"
    },
    isLoading: {
      control: "boolean",
      description: "Whether the button is in a loading state"
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the button is disabled"
    },
    children: {
      control: "text",
      description: "The content of the button"
    }
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button"
  }
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button"
  }
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Button"
  }
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Button"
  }
}

export const Small: Story = {
  args: {
    size: "sm",
    children: "Button"
  }
}

export const Medium: Story = {
  args: {
    size: "md",
    children: "Button"
  }
}

export const Large: Story = {
  args: {
    size: "lg",
    children: "Button"
  }
}

export const Loading: Story = {
  args: {
    isLoading: true,
    children: "Button"
  }
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
    children: "Button"
  }
}
