import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge } from "@/components/atoms/badge/badge"
import { Button } from "@/components/atoms/button/button"

import { SpinnerDesignSpec } from "./spinner-design-spec"
import { Spinner } from "./spinner"

const meta: Meta<typeof Spinner> = {
  title: "Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof Spinner>

export const DesignSpec: Story = {
  render: () => <SpinnerDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => <Spinner />
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-5" />
      <Spinner className="size-6" />
    </div>
  )
}

export const InButton: Story = {
  name: "In button",
  render: () => (
    <Button disabled size="sm">
      <Spinner data-icon="inline-start" />
      Loading
    </Button>
  )
}

export const InBadge: Story = {
  name: "In badge",
  render: () => (
    <Badge variant="secondary">
      <Spinner data-icon="inline-start" className="size-3" />
      Syncing
    </Badge>
  )
}
