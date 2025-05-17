import type { Meta, StoryObj } from "@storybook/react"
import { DropdownMenu } from "./dropdown-menu"
import { Avatar } from "../../atoms/avatar"
import { Edit, Trash2, Share2, User, ExternalLink } from "lucide-react"

const meta: Meta<typeof DropdownMenu> = {
  title: "Organisms/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  argTypes: {
    items: { control: "object" },
    trigger: { control: "object" },
    fullWidth: { control: "boolean" },
    triggerLabel: { control: "text" },
    contentLabel: { control: "text" }
  }
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

const defaultItems = [
  {
    label: "Edit",
    onClick: () => console.log("Edit clicked"),
    icon: <Edit className="h-4 w-4" />
  },
  {
    label: "Delete",
    onClick: () => console.log("Delete clicked"),
    icon: <Trash2 className="h-4 w-4" />,
    disabled: true
  },
  {
    label: "Share",
    onClick: () => console.log("Share clicked"),
    icon: <Share2 className="h-4 w-4" />
  }
]

export const Default: Story = {
  args: {
    items: defaultItems
  }
}

export const FullWidth: Story = {
  args: {
    items: defaultItems,
    fullWidth: true,
    trigger: (
      <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        Full Width Menu
      </button>
    )
  }
}

export const WithAvatar: Story = {
  args: {
    items: [
      {
        label: "View Profile",
        href: "/profile",
        icon: <User className="h-4 w-4" />
      },
      ...defaultItems
    ],
    trigger: (
      <Avatar
        src="https://i.pravatar.cc/300"
        fallback="John Doe"
        size="md"
        className="cursor-pointer hover:opacity-80 transition-opacity"
      />
    )
  }
}

export const WithLinks: Story = {
  args: {
    items: [
      {
        label: "Documentation",
        href: "/docs",
        icon: <ExternalLink className="h-4 w-4" />
      },
      {
        label: "GitHub",
        href: "https://github.com",
        icon: <ExternalLink className="h-4 w-4" />
      },
      ...defaultItems
    ]
  }
}

export const CustomTrigger: Story = {
  args: {
    items: defaultItems,
    trigger: (
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        Click Me
      </button>
    )
  }
}

export const FullWidthWithCustomTrigger: Story = {
  args: {
    items: defaultItems,
    fullWidth: true,
    trigger: (
      <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        Full Width Custom Trigger
      </button>
    )
  }
}
