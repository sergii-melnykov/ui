import type { Meta, StoryObj } from "@storybook/react"
import { Avatar } from "./avatar"

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    src: { control: "text" },
    fallback: { control: "text" },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"]
    },
    rounded: { control: "boolean" },
    alt: { control: "text" }
  }
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/300",
    alt: "User avatar"
  }
}

export const WithFallback: Story = {
  args: {
    fallback: "John Doe"
  }
}

export const Small: Story = {
  args: {
    size: "sm",
    fallback: "JD"
  }
}

export const Medium: Story = {
  args: {
    size: "md",
    fallback: "JD"
  }
}

export const Large: Story = {
  args: {
    size: "lg",
    fallback: "JD"
  }
}

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    fallback: "JD"
  }
}

export const Square: Story = {
  args: {
    rounded: false,
    fallback: "JD"
  }
}

export const WithCustomClass: Story = {
  args: {
    fallback: "JD",
    className: "bg-blue-100 text-blue-600"
  }
}
