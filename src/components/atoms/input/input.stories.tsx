import type { Meta, StoryObj } from "@storybook/react-vite"
import { Input } from "./input"

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"]
    },
    disabled: {
      control: "boolean"
    },
    placeholder: {
      control: "text"
    }
  }
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: "Enter text..."
  }
}

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <label htmlFor="input" className="text-sm font-medium">
        Label
      </label>
      <Input id="input" placeholder="Enter text..." />
    </div>
  )
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input"
  }
}

export const WithError: Story = {
  render: () => (
    <div className="space-y-2">
      <Input placeholder="Error state" className="border-red-500 focus-visible:ring-red-500" />
      <p className="text-sm text-red-500">This field is required</p>
    </div>
  )
}

export const DifferentTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input id="email" type="email" placeholder="Enter email" />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input id="password" type="password" placeholder="Enter password" />
      </div>
      <div className="space-y-2">
        <label htmlFor="number" className="text-sm font-medium">
          Number
        </label>
        <Input id="number" type="number" placeholder="Enter number" />
      </div>
    </div>
  )
}
