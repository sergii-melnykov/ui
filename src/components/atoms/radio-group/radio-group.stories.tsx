import type { Meta, StoryObj } from "@storybook/react-vite"
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group"
import { Button } from "@/components/atoms/button"
import React from "react"
import { RadioItemLabel, RadioItemContainer } from "./radio-group"

const meta: Meta<typeof RadioGroup> = {
  title: "Atoms/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "text",
      description: "The value of the radio item that should be checked when initially rendered"
    },
    value: {
      control: "text",
      description: "The controlled value of the radio item to check"
    },
    onValueChange: {
      action: "onValueChange",
      description: "Event handler called when the value changes"
    }
  }
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  args: {
    defaultValue: "option-1"
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioItemContainer>
        <RadioGroupItem value="option-1" id="option-1" />
        <RadioItemLabel htmlFor="option-1">Option 1</RadioItemLabel>
      </RadioItemContainer>
      <RadioItemContainer>
        <RadioGroupItem value="option-2" id="option-2" />
        <RadioItemLabel htmlFor="option-2">Option 2</RadioItemLabel>
      </RadioItemContainer>
      <RadioItemContainer>
        <RadioGroupItem value="option-3" id="option-3" />
        <RadioItemLabel htmlFor="option-3">Option 3</RadioItemLabel>
      </RadioItemContainer>
    </RadioGroup>
  )
}

export const Disabled: Story = {
  args: {
    defaultValue: "option-1"
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioItemContainer>
        <RadioGroupItem value="option-1" id="option-1" />
        <RadioItemLabel htmlFor="option-1">Option 1</RadioItemLabel>
      </RadioItemContainer>
      <RadioItemContainer>
        <RadioGroupItem value="option-2" id="option-2" disabled />
        <RadioItemLabel htmlFor="option-2">Option 2 (Disabled)</RadioItemLabel>
      </RadioItemContainer>
    </RadioGroup>
  )
}

interface RadioGroupButtonStyleProps {
  defaultValue?: string
}

const RadioGroupButtonStyle = ({ defaultValue }: RadioGroupButtonStyleProps) => {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <RadioGroup
      value={value}
      onValueChange={setValue}
      className="flex gap-2 p-2 border border-gray-200 rounded-md w-fit"
    >
      <Button
        size="sm"
        variant={value === "option-1" ? "default" : "secondary"}
        onClick={() => setValue("option-1")}
        role="radio"
        aria-checked={value === "option-1"}
      >
        Option 1
      </Button>
      <Button
        size="sm"
        variant={value === "option-2" ? "default" : "secondary"}
        onClick={() => setValue("option-2")}
        role="radio"
        aria-checked={value === "option-2"}
      >
        Option 2
      </Button>
      <Button
        size="sm"
        variant={value === "option-3" ? "default" : "secondary"}
        onClick={() => setValue("option-3")}
        role="radio"
        aria-checked={value === "option-3"}
      >
        Option 3
      </Button>
    </RadioGroup>
  )
}

export const ButtonStyle: Story = {
  args: {
    defaultValue: "option-1"
  },
  render: (args) => <RadioGroupButtonStyle {...args} />
}
