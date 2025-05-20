import type { Meta, StoryObj } from "@storybook/react"
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "."
import { Button } from "../button/button"

const meta: Meta<typeof Toast> = {
  title: "Atoms/Toast",
  component: Toast,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastViewport />
      </ToastProvider>
    )
  ]
}

export default meta
type Story = StoryObj<typeof Toast>

export const Default: Story = {
  render: () => (
    <Toast>
      <ToastTitle>Success</ToastTitle>
      <ToastDescription>Your changes have been saved.</ToastDescription>
      <ToastAction altText="Undo">
        <Button variant="outline" size="sm">
          Undo
        </Button>
      </ToastAction>
      <ToastClose />
    </Toast>
  )
}

export const Destructive: Story = {
  render: () => (
    <Toast variant="destructive">
      <ToastTitle>Error</ToastTitle>
      <ToastDescription>Something went wrong. Please try again.</ToastDescription>
      <ToastAction altText="Try again">
        <Button variant="outline" size="sm">
          Try again
        </Button>
      </ToastAction>
      <ToastClose />
    </Toast>
  )
}

export const WithLongContent: Story = {
  render: () => (
    <Toast>
      <ToastTitle>Important Update</ToastTitle>
      <ToastDescription>
        This is a longer description that might contain important information about the update. It
        can span multiple lines and provide more context to the user.
      </ToastDescription>
      <ToastAction altText="Learn more">
        <Button variant="outline" size="sm">
          Learn more
        </Button>
      </ToastAction>
      <ToastClose />
    </Toast>
  )
}
