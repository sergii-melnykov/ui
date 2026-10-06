import type { Meta, StoryObj } from "@storybook/react-vite"

import { FeaturedDesignSpec } from "./featured-design-spec"
import { FeaturedDashboardDemo } from "./featured-dashboard-demo"

const meta: Meta<typeof FeaturedDesignSpec> = {
  title: "Pages/Featured",
  component: FeaturedDesignSpec,
  parameters: {
    layout: "fullscreen"
  }
}

export default meta
type Story = StoryObj<typeof FeaturedDesignSpec>

export const DesignSpec: Story = {
  render: () => <FeaturedDesignSpec />,
  parameters: {
    docs: {
      disable: true
    }
  }
}

export const Dashboard: Story = {
  render: () => <FeaturedDashboardDemo />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}
