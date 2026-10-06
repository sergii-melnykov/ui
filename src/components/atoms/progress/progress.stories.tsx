import type { Meta, StoryObj } from "@storybook/react-vite"

import { ProgressDesignSpec } from "./progress-design-spec"
import { Progress } from "./progress"

const meta: Meta<typeof Progress> = {
  title: "Atoms/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof Progress>

export const DesignSpec: Story = {
  render: () => <ProgressDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => <Progress value={45} className="w-64" />
}
