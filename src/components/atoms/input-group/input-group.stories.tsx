import type { Meta, StoryObj } from "@storybook/react-vite"
import { Search } from "lucide-react"

import { InputGroupDesignSpec } from "./input-group-design-spec"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group"

const meta: Meta<typeof InputGroup> = {
  title: "Atoms/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof InputGroup>

export const DesignSpec: Story = {
  render: () => <InputGroupDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: { disable: true }
  }
}

export const Default: Story = {
  render: () => (
    <InputGroup className="w-[280px]">
      <InputGroupAddon>
        <Search className="size-4" aria-hidden />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search" />
    </InputGroup>
  )
}
