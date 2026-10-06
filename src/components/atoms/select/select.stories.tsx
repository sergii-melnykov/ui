import type { Meta, StoryObj } from "@storybook/react-vite"

import { SelectDesignSpec } from "./select-design-spec"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./select"
import { FRUITS } from "./select-shared"

const meta: Meta<typeof Select> = {
  title: "Atoms/Select",
  component: Select,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof Select>

export const DesignSpec: Story = {
  render: () => <SelectDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => (
    <Select defaultValue="apple">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        {FRUITS.map((fruit) => (
          <SelectItem key={fruit} value={fruit.toLowerCase()}>
            {fruit}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
