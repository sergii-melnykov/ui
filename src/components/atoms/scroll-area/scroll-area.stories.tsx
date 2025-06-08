import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { ScrollArea } from "./scroll-area"

const meta: Meta<typeof ScrollArea> = {
  title: "Atoms/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
}

export default meta
type Story = StoryObj<typeof ScrollArea>

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium leading-none">Scroll Area</h4>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam
          ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl
          eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam
          euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis
          nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam
          nisl nunc quis nisl.
        </p>
      </div>
    </ScrollArea>
  )
}

export const WithHorizontalScroll: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="flex space-x-4">
        <div className="min-w-[200px] space-y-4">
          <h4 className="text-sm font-medium leading-none">Horizontal Scroll</h4>
          <p className="text-sm text-muted-foreground">
            This content is wider than the container and will show a horizontal scrollbar.
          </p>
        </div>
        <div className="min-w-[200px] space-y-4">
          <h4 className="text-sm font-medium leading-none">More Content</h4>
          <p className="text-sm text-muted-foreground">
            Additional content to demonstrate horizontal scrolling.
          </p>
        </div>
      </div>
    </ScrollArea>
  )
}
