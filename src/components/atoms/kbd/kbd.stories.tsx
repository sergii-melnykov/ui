import type { Meta, StoryObj } from "@storybook/react-vite"

import { KbdDesignSpec } from "./kbd-design-spec"
import { Kbd, KbdGroup } from "./kbd"

const meta: Meta<typeof Kbd> = {
  title: "Atoms/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof Kbd>

export const DesignSpec: Story = {
  render: () => <KbdDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: { disable: true }
  }
}

export const Default: Story = {
  render: () => <Kbd>⇧</Kbd>
}

export const Group: Story = {
  render: () => (
    <p className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
      <span>Use</span>
      <KbdGroup>
        <Kbd>Ctrl+B</Kbd>
        <Kbd>Ctrl+K</Kbd>
      </KbdGroup>
      <span>to open the command palette</span>
    </p>
  )
}

export const ModifierKeys: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  )
}
