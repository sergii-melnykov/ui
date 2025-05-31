import type { Meta, StoryObj } from "@storybook/react-vite"
import { Typography } from "./typography"

const meta: Meta<typeof Typography> = {
  title: "Atoms/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "blockquote",
        "list",
        "lead",
        "large",
        "small",
        "muted"
      ]
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"]
    }
  }
}

export default meta
type Story = StoryObj<typeof Typography>

export const Default: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog",
    variant: "p"
  }
}

export const Heading1: Story = {
  args: {
    children: "Heading 1",
    variant: "h1"
  }
}

export const Heading2: Story = {
  args: {
    children: "Heading 2",
    variant: "h2"
  }
}

export const Heading3: Story = {
  args: {
    children: "Heading 3",
    variant: "h3"
  }
}

export const Heading4: Story = {
  args: {
    children: "Heading 4",
    variant: "h4"
  }
}

export const Heading5: Story = {
  args: {
    children: "Heading 5",
    variant: "h5"
  }
}

export const Heading6: Story = {
  args: {
    children: "Heading 6",
    variant: "h6"
  }
}

export const Blockquote: Story = {
  args: {
    children: "This is a blockquote",
    variant: "blockquote"
  }
}

export const Lead: Story = {
  args: {
    children: "This is a lead paragraph",
    variant: "lead"
  }
}

export const Large: Story = {
  args: {
    children: "This is large text",
    variant: "large"
  }
}

export const Small: Story = {
  args: {
    children: "This is small text",
    variant: "small"
  }
}

export const Muted: Story = {
  args: {
    children: "This is muted text",
    variant: "muted"
  }
}

export const Centered: Story = {
  args: {
    children: "This text is centered",
    variant: "p",
    align: "center"
  }
}

export const RightAligned: Story = {
  args: {
    children: "This text is right-aligned",
    variant: "p",
    align: "right"
  }
}

export const Justified: Story = {
  args: {
    children:
      "This text is justified. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    variant: "p",
    align: "justify"
  }
}
