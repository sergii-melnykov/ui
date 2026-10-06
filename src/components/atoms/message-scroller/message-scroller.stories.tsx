import type { Meta, StoryObj } from "@storybook/react-vite"

import { MessageScrollerDesignSpec } from "./message-scroller-design-spec"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport
} from "./message-scroller"

const meta: Meta<typeof MessageScroller> = {
  title: "Atoms/Message Scroller",
  component: MessageScroller,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof MessageScroller>

export const DesignSpec: Story = {
  render: () => <MessageScrollerDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: { disable: true }
  }
}

export const Default: Story = {
  render: () => (
    <div className="h-80 w-full max-w-sm rounded-xl border">
      <MessageScrollerProvider>
        <MessageScroller>
          <MessageScrollerViewport>
            <MessageScrollerContent>
              <MessageScrollerItem messageId="1" scrollAnchor>
                <div className="rounded-3xl bg-secondary px-3 py-2 text-sm">First anchored turn</div>
              </MessageScrollerItem>
              <MessageScrollerItem messageId="2">
                <div className="rounded-3xl bg-primary px-3 py-2 text-sm text-primary-foreground">
                  Follow-up message
                </div>
              </MessageScrollerItem>
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  )
}
