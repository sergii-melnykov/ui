import type { Meta, StoryObj } from "@storybook/react-vite"

import { DesignTokensGallery } from "./design-tokens-gallery"

const meta: Meta<typeof DesignTokensGallery> = {
  title: "Foundations/Design tokens",
  component: DesignTokensGallery,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
}

export default meta
type Story = StoryObj<typeof DesignTokensGallery>

export const Gallery: Story = {
  render: () => <DesignTokensGallery />
}
