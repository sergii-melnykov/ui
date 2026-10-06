import type { Meta, StoryObj } from "@storybook/react-vite"

import { SignupDesignSpec } from "./signup-design-spec"

const meta: Meta<typeof SignupDesignSpec> = {
  title: "Pages/Signup",
  component: SignupDesignSpec,
  parameters: {
    layout: "fullscreen"
  }
}

export default meta
type Story = StoryObj<typeof SignupDesignSpec>

export const DesignSpec: Story = {
  render: () => <SignupDesignSpec />,
  parameters: {
    docs: {
      disable: true
    }
  }
}
