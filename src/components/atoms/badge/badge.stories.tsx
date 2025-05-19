import type { Meta, StoryObj } from "@storybook/react"
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"
import { Badge } from "./badge"

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "success", "warning", "info"],
      description: "The visual style of the badge"
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "The size of the badge"
    },
    icon: {
      control: "boolean",
      description: "Whether to show an icon before the badge content"
    },
    iconAfter: {
      control: "boolean",
      description: "Whether to show an icon after the badge content"
    }
  }
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: "Badge"
  }
}

export const WithVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  )
}

export const WithSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="default">Default</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  )
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge icon={<CheckCircle className="h-3 w-3" />}>Success</Badge>
      <Badge icon={<AlertCircle className="h-3 w-3" />}>Warning</Badge>
      <Badge icon={<Info className="h-3 w-3" />}>Info</Badge>
      <Badge icon={<XCircle className="h-3 w-3" />}>Error</Badge>
    </div>
  )
}

export const WithIconAfter: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge iconAfter={<Info className="h-3 w-3" />}>New</Badge>
      <Badge iconAfter={<CheckCircle className="h-3 w-3" />}>Verified</Badge>
    </div>
  )
}
