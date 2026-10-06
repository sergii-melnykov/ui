import type { Meta, StoryObj } from "@storybook/react-vite"

import { LoginDesignSpec } from "./login-design-spec"

const meta: Meta<typeof LoginDesignSpec> = {
  title: "Pages/Login",
  component: LoginDesignSpec,
  parameters: {
    layout: "fullscreen"
  }
}

export default meta
type Story = StoryObj<typeof LoginDesignSpec>

export const DesignSpec: Story = {
  render: () => <LoginDesignSpec />,
  parameters: {
    docs: {
      disable: true
    }
  }
}
