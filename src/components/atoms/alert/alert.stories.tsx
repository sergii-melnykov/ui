import type { Meta, StoryObj } from "@storybook/react-vite"
import { AlertCircle, CircleCheck } from "lucide-react"

import { Button } from "@/components/atoms/button/button"

import { AlertDesignSpec } from "./alert-design-spec"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "./alert"

const meta: Meta<typeof Alert> = {
  title: "Atoms/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"]
    }
  }
}

export default meta
type Story = StoryObj<typeof Alert>

export const DesignSpec: Story = {
  render: () => <AlertDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => (
    <Alert className="max-w-md">
      <CircleCheck />
      <AlertTitle>Account updated successfully</AlertTitle>
      <AlertDescription>
        Your profile information has been saved. Changes will be reflected immediately.
      </AlertDescription>
    </Alert>
  )
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircle />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        Your payment could not be processed. Please check your payment method and try again.
      </AlertDescription>
    </Alert>
  )
}

export const WithAction: Story = {
  name: "With action",
  render: () => (
    <Alert className="max-w-md">
      <AlertTitle>Dark mode is now available</AlertTitle>
      <AlertDescription>Enable it under your profile settings to get started.</AlertDescription>
      <AlertAction>
        <Button size="xs" className="w-[55px] rounded-lg shadow-xs">
          Enable
        </Button>
      </AlertAction>
    </Alert>
  )
}
