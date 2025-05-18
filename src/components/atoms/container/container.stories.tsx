import type { Meta, StoryObj } from "@storybook/react"
import { Container } from "./container"

const meta: Meta<typeof Container> = {
  title: "Atoms/Container",
  component: Container,
  tags: ["autodocs"],
  argTypes: {
    maxWidth: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full", false]
    },
    fluid: {
      control: "boolean"
    },
    disablePadding: {
      control: "boolean"
    }
  }
}

export default meta
type Story = StoryObj<typeof Container>

export const Default: Story = {
  args: {
    children: <div className="bg-primary/10 p-4 text-center">Default Container (maxWidth: lg)</div>
  }
}

export const Small: Story = {
  args: {
    maxWidth: "sm",
    children: <div className="bg-primary/10 p-4 text-center">Small Container (maxWidth: sm)</div>
  }
}

export const Medium: Story = {
  args: {
    maxWidth: "md",
    children: <div className="bg-primary/10 p-4 text-center">Medium Container (maxWidth: md)</div>
  }
}

export const Large: Story = {
  args: {
    maxWidth: "lg",
    children: <div className="bg-primary/10 p-4 text-center">Large Container (maxWidth: lg)</div>
  }
}

export const ExtraLarge: Story = {
  args: {
    maxWidth: "xl",
    children: (
      <div className="bg-primary/10 p-4 text-center">Extra Large Container (maxWidth: xl)</div>
    )
  }
}

export const Fluid: Story = {
  args: {
    fluid: true,
    children: <div className="bg-primary/10 p-4 text-center">Fluid Container (no max-width)</div>
  }
}

export const NoPadding: Story = {
  args: {
    disablePadding: true,
    children: <div className="bg-primary/10 p-4 text-center">Container without padding</div>
  }
}
