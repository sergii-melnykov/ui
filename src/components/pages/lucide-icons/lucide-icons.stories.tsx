import type { Meta, StoryObj } from "@storybook/react-vite"

import { LucideIconsDesignSpec } from "./lucide-icons-design-spec"

const meta: Meta<typeof LucideIconsDesignSpec> = {
  title: "Pages/Lucide Icons",
  component: LucideIconsDesignSpec,
  parameters: {
    layout: "fullscreen"
  }
}

export default meta
type Story = StoryObj<typeof LucideIconsDesignSpec>

export const DesignSpec: Story = {
  render: () => <LucideIconsDesignSpec />,
  parameters: {
    docs: {
      disable: true
    }
  }
}
