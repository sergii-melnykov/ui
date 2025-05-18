import type { Meta, StoryObj } from "@storybook/react"
import { Avatar, AvatarImage, AvatarFallback } from "./avatar"

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the avatar"
    }
  }
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export const WithFallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  )
}

export const WithCustomSize: Story = {
  render: (args) => (
    <Avatar className="h-20 w-20" {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
