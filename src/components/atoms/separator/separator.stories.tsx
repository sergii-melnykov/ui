import type { Meta, StoryObj } from "@storybook/react"
import { Separator } from "./separator"

const meta: Meta<typeof Separator> = {
  title: "Atoms/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"]
    },
    decorative: {
      control: "boolean"
    }
  }
}

export default meta
type Story = StoryObj<typeof Separator>

export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <div>Above</div>
      <Separator />
      <div>Below</div>
    </div>
  )
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center space-x-4">
      <div>Left</div>
      <Separator orientation="vertical" />
      <div>Right</div>
    </div>
  )
}

export const WithText: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Section Title</h4>
        <p className="text-sm text-gray-500">Section description goes here.</p>
      </div>
      <Separator />
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Another Section</h4>
        <p className="text-sm text-gray-500">Another section description.</p>
      </div>
    </div>
  )
}

export const InNavigation: Story = {
  render: () => (
    <nav className="space-y-4">
      <div className="space-y-1">
        <a href="#" className="text-sm font-medium">
          Navigation Item 1
        </a>
      </div>
      <Separator />
      <div className="space-y-1">
        <a href="#" className="text-sm font-medium">
          Navigation Item 2
        </a>
      </div>
      <Separator />
      <div className="space-y-1">
        <a href="#" className="text-sm font-medium">
          Navigation Item 3
        </a>
      </div>
    </nav>
  )
}

export const InForm: Story = {
  render: () => (
    <form className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full rounded-md border p-2"
          placeholder="Enter your name"
        />
      </div>
      <Separator />
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full rounded-md border p-2"
          placeholder="Enter your email"
        />
      </div>
    </form>
  )
}
