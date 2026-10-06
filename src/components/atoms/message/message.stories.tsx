import type { Meta, StoryObj } from "@storybook/react-vite"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar/avatar"
import { Bubble, BubbleContent } from "@/components/atoms/bubble/bubble"

import { MessageDesignSpec } from "./message-design-spec"
import { Message, MessageAvatar, MessageContent } from "./message"

const meta: Meta = {
  title: "Atoms/Message",
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj

export const DesignSpec: Story = {
  render: () => <MessageDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: { disable: true }
  }
}

export const Default: Story = {
  render: () => (
    <Message className="max-w-md">
      <MessageAvatar>
        <Avatar className="size-8">
          <AvatarImage src="/message/avatar-1.png" alt="User" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="secondary">
          <BubbleContent>The build failed during dependency installation.</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}
