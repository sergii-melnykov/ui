import type { Meta, StoryObj } from "@storybook/react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "."
import { Button } from "../button/button"
import { ToastAction } from "../toast"

const meta: Meta<typeof Toaster> = {
  title: "Atoms/Toaster",
  component: Toaster,
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof Toaster>

function ToastDemo() {
  const { toast } = useToast()

  return (
    <div className="flex gap-4">
      <Button
        onClick={() => {
          toast({
            title: "Success",
            description: "Your changes have been saved.",
            action: <ToastAction altText="Undo">Undo</ToastAction>
          })
        }}
      >
        Show Success Toast
      </Button>
      <Button
        variant="destructive"
        onClick={() => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong. Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>
          })
        }}
      >
        Show Error Toast
      </Button>
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <ToastDemo />
    </>
  )
}
