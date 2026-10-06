import type { Meta, StoryObj } from "@storybook/react-vite"
import { BadgeCheckIcon, ChevronRightIcon, Inbox, ShieldAlertIcon } from "lucide-react"

import { Button } from "@/components/atoms/button/button"

import { ItemDesignSpec } from "./item-design-spec"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle
} from "./item"

const meta: Meta<typeof Item> = {
  title: "Atoms/Item",
  component: Item,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "muted"]
    },
    size: {
      control: "select",
      options: ["default", "sm"]
    }
  }
}

export default meta
type Story = StoryObj<typeof Item>

export const DesignSpec: Story = {
  render: () => <ItemDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: { disable: true }
  }
}

export const Default: Story = {
  render: () => (
    <Item variant="outline" className="w-full max-w-md">
      <ItemContent>
        <ItemTitle>Basic Item</ItemTitle>
        <ItemDescription>A simple item with title and description.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Action
        </Button>
      </ItemActions>
    </Item>
  )
}

export const Variants: Story = {
  render: () => (
    <ItemGroup className="w-full max-w-lg gap-2">
      <Item>
        <ItemMedia>
          <Inbox />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Default</ItemTitle>
          <ItemDescription>Transparent background.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia>
          <Inbox />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Outline</ItemTitle>
          <ItemDescription>Bordered item.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemMedia>
          <Inbox />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Muted</ItemTitle>
          <ItemDescription>Muted background.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  )
}

export const WithIcon: Story = {
  render: () => (
    <Item variant="outline" className="w-full max-w-lg">
      <ItemMedia variant="icon">
        <ShieldAlertIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Security Alert</ItemTitle>
        <ItemDescription>New login detected from unknown device.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          Review
        </Button>
      </ItemActions>
    </Item>
  )
}

export const Small: Story = {
  render: () => (
    <Item variant="outline" size="sm" asChild className="w-full max-w-md">
      <a href="#small">
        <ItemMedia>
          <BadgeCheckIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Your profile has been verified.</ItemTitle>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon className="size-4" />
        </ItemActions>
      </a>
    </Item>
  )
}
