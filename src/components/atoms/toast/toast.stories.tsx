import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  CircleCheck,
  Info as InfoIcon,
  Loader2,
  OctagonX,
  TriangleAlert
} from "lucide-react"

import { Button } from "@/components/atoms/button/button"

import { ToastDesignSpec } from "./toast-design-spec"
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "."

const meta: Meta<typeof Toast> = {
  title: "Atoms/Toast",
  component: Toast,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider duration={Number.POSITIVE_INFINITY}>
        <Story />
        <ToastViewport />
      </ToastProvider>
    )
  ]
}

export default meta
type Story = StoryObj<typeof Toast>

export const DesignSpec: Story = {
  render: () => <ToastDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => (
    <Toast open onOpenChange={() => {}} className="w-[382px]">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <ToastTitle>Toast title</ToastTitle>
        <ToastDescription>Toast description</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  )
}

export const Success: Story = {
  render: () => (
    <Toast open onOpenChange={() => {}} className="w-[382px]">
      <CircleCheck />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <ToastDescription>Event has been created</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  )
}

export const Info: Story = {
  render: () => (
    <Toast open onOpenChange={() => {}} className="w-[382px]">
      <InfoIcon />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <ToastDescription>Arrive 10 minutes before the event.</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  )
}

export const Warning: Story = {
  render: () => (
    <Toast open onOpenChange={() => {}} className="w-[382px]">
      <TriangleAlert />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <ToastDescription>The event cannot start before 8:00 AM.</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  )
}

export const Error: Story = {
  render: () => (
    <Toast open onOpenChange={() => {}} className="w-[382px]">
      <OctagonX />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <ToastDescription>The event could not be created.</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  )
}

export const Promise: Story = {
  render: () => (
    <Toast open onOpenChange={() => {}} className="w-[382px]">
      <Loader2 className="animate-spin" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <ToastDescription>Creating event...</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  )
}

export const MessageOnly: Story = {
  name: "Default (message only)",
  render: () => (
    <Toast open onOpenChange={() => {}} className="w-[382px]">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <ToastDescription>Event has been created</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  )
}

export const Destructive: Story = {
  render: () => (
    <Toast variant="destructive" open onOpenChange={() => {}} className="w-[382px]">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <ToastTitle>Error</ToastTitle>
        <ToastDescription>Something went wrong. Please try again.</ToastDescription>
      </div>
      <ToastAction altText="Try again">Try again</ToastAction>
      <ToastClose />
    </Toast>
  )
}

export const WithAction: Story = {
  name: "With action",
  render: () => (
    <Toast open onOpenChange={() => {}} className="w-[382px]">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <ToastTitle>Toast title</ToastTitle>
        <ToastDescription>Toast description</ToastDescription>
      </div>
      <ToastAction altText="Undo">Undo</ToastAction>
      <ToastClose />
    </Toast>
  )
}

export const WithLongContent: Story = {
  render: () => (
    <Toast open onOpenChange={() => {}} className="w-[382px]">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <ToastTitle>Important update</ToastTitle>
        <ToastDescription>
          This is a longer description that might contain important information about the update.
          It can span multiple lines and provide more context to the user.
        </ToastDescription>
      </div>
      <ToastAction altText="Learn more">
        <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs">
          Learn more
        </Button>
      </ToastAction>
      <ToastClose />
    </Toast>
  )
}
