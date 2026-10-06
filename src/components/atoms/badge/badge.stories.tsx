import type { Meta, StoryObj } from "@storybook/react-vite"
import { ArrowUpRight, BadgeCheck, Bookmark, Loader2 } from "lucide-react"

import { BadgeDesignSpec } from "./badge-design-spec"
import { Badge } from "./badge"

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
      description: "The visual style of the badge"
    }
  }
}

export default meta
type Story = StoryObj<typeof Badge>

export const DesignSpec: Story = {
  render: () => <BadgeDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  args: {
    children: "Badge"
  }
}

export const WithVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  )
}

export const WithIcon: Story = {
  name: "With icon",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">
        <BadgeCheck data-icon="inline-start" />
        Verified
      </Badge>
      <Badge variant="outline">
        Bookmark
        <Bookmark data-icon="inline-end" />
      </Badge>
    </div>
  )
}

export const WithSpinner: Story = {
  name: "With spinner",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="destructive">
        <Loader2 className="animate-spin" data-icon="inline-start" />
        Deleting
      </Badge>
      <Badge variant="secondary">
        Generating
        <Loader2 className="animate-spin" data-icon="inline-end" />
      </Badge>
    </div>
  )
}

export const AsLink: Story = {
  name: "As link",
  render: () => (
    <Badge asChild>
      <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
        Open link
        <ArrowUpRight data-icon="inline-end" />
      </a>
    </Badge>
  )
}

export const CustomColors: Story = {
  name: "Custom colors",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="border-transparent bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
        Blue
      </Badge>
      <Badge className="border-transparent bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
        Green
      </Badge>
    </div>
  )
}
