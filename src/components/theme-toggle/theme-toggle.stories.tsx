import type { Meta, StoryObj } from "@storybook/react"
import { ThemeToggle } from "./theme-toggle"
import { useTheme } from "../theme-provider/theme-provider"

const meta: Meta<typeof ThemeToggle> = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered"
  }
}

export default meta
type Story = StoryObj<typeof ThemeToggle>

export const Default: Story = {
  args: {
    theme: useTheme().theme,
    mode: useTheme().mode,
    setMode: useTheme().setMode
  }
}
