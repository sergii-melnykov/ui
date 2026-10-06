import type { Meta, StoryObj } from "@storybook/react-vite"
import { ArrowRight, Minus, Plus, Search } from "lucide-react"

import { Button } from "../button/button"
import { Input } from "../input/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../select/select"

import { ButtonGroupDesignSpec } from "./button-group-design-spec"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./button-group"

const meta: Meta<typeof ButtonGroup> = {
  title: "Atoms/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof ButtonGroup>

export const DesignSpec: Story = {
  render: () => <ButtonGroupDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Archive</Button>
      <Button variant="outline">Report</Button>
    </ButtonGroup>
  )
}

export const Orientation: Story = {
  render: () => (
    <ButtonGroup orientation="vertical" aria-label="Stepper" className="h-fit">
      <Button variant="outline" size="icon" aria-label="Increase">
        <Plus />
      </Button>
      <Button variant="outline" size="icon" aria-label="Decrease">
        <Minus />
      </Button>
    </ButtonGroup>
  )
}

export const WithSeparator: Story = {
  name: "With separator",
  render: () => (
    <ButtonGroup>
      <Button variant="secondary" size="sm">
        Copy
      </Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="sm">
        Paste
      </Button>
    </ButtonGroup>
  )
}

export const Split: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="icon" aria-label="Add">
        <Plus />
      </Button>
    </ButtonGroup>
  )
}

export const WithInput: Story = {
  name: "With input",
  render: () => (
    <ButtonGroup className="w-full max-w-sm">
      <Input placeholder="Search..." />
      <Button variant="outline" size="icon" aria-label="Search">
        <Search />
      </Button>
    </ButtonGroup>
  )
}

export const WithSelect: Story = {
  name: "With select",
  render: () => (
    <ButtonGroup>
      <ButtonGroup className="gap-0">
        <Select defaultValue="usd">
          <SelectTrigger
            size="sm"
            className="h-8 w-fit rounded-r-none border-r-0 shadow-none focus:z-10"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">$</SelectItem>
            <SelectItem value="eur">€</SelectItem>
          </SelectContent>
        </Select>
        <Input
          defaultValue="10.00"
          className="h-8 w-44 rounded-l-none shadow-none focus-visible:z-10"
        />
      </ButtonGroup>
      <Button variant="outline" size="icon" aria-label="Continue">
        <ArrowRight />
      </Button>
    </ButtonGroup>
  )
}

export const WithText: Story = {
  name: "With text",
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>Repo</ButtonGroupText>
      <Button variant="outline">
        main
        <Plus data-icon="inline-end" />
      </Button>
    </ButtonGroup>
  )
}
