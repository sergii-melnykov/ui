import type { Meta, StoryObj } from "@storybook/react"
import { PageLoader } from "./page-loader"

const meta: Meta<typeof PageLoader> = {
  title: "Atoms/PageLoader",
  component: PageLoader,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof PageLoader>

export const Default: Story = {
  args: {}
}

export const WithText: Story = {
  args: {
    text: "Loading..."
  }
}

export const Small: Story = {
  args: {
    size: "sm",
    text: "Loading..."
  }
}

export const Large: Story = {
  args: {
    size: "lg",
    text: "Loading..."
  }
}

export const Secondary: Story = {
  args: {
    color: "secondary",
    text: "Loading..."
  }
}

export const Accent: Story = {
  args: {
    color: "accent",
    text: "Loading..."
  }
}

export const Muted: Story = {
  args: {
    color: "muted",
    text: "Loading..."
  }
}

export const Destructive: Story = {
  args: {
    color: "destructive",
    text: "Loading..."
  }
}

export const CustomColor: Story = {
  args: {
    color: "#FF5733",
    text: "Loading..."
  }
}
