import type { Meta, StoryObj } from "@storybook/react-vite"
import { Stack } from "./stack"
import { cn } from "@/utils"

const meta: Meta<typeof Stack> = {
  title: "Atoms/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["vertical", "horizontal"]
    },
    spacing: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"]
    },
    justify: {
      control: "select",
      options: ["start", "end", "center", "between", "around", "evenly"]
    },
    align: {
      control: "select",
      options: ["start", "end", "center", "stretch", "baseline"]
    }
  }
}

export default meta
type Story = StoryObj<typeof Stack>

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Item = ({ children, className, ...props }: ItemProps) => (
  <div
    className={cn("p-4 bg-primary/10 rounded-lg min-w-[100px] text-center", className)}
    {...props}
  >
    {children}
  </div>
)

export const Vertical: Story = {
  args: {
    direction: "vertical",
    spacing: "md",
    children: (
      <>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </>
    )
  }
}

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
    spacing: "md",
    children: (
      <>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </>
    )
  }
}

export const WithWrap: Story = {
  args: {
    direction: "horizontal",
    spacing: "md",
    wrap: true,
    className: "max-w-[300px]",
    children: (
      <>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
        <Item>Item 4</Item>
        <Item>Item 5</Item>
      </>
    )
  }
}

export const Centered: Story = {
  args: {
    direction: "horizontal",
    spacing: "md",
    center: true,
    className: "h-32",
    children: (
      <>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </>
    )
  }
}

export const Justified: Story = {
  args: {
    direction: "horizontal",
    spacing: "md",
    justify: "between",
    children: (
      <>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </>
    )
  }
}

export const Aligned: Story = {
  args: {
    direction: "horizontal",
    spacing: "md",
    align: "center",
    className: "h-32",
    children: (
      <>
        <Item className="h-8">Short</Item>
        <Item className="h-16">Tall</Item>
        <Item className="h-12">Medium</Item>
      </>
    )
  }
}
