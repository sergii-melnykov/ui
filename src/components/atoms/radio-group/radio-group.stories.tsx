import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group"
import { Button } from "@/components/atoms/button"
import React from "react"

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
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="option-1" />
        <label htmlFor="option-1">Option 1</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="option-2" />
        <label htmlFor="option-2">Option 2</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="option-3" />
        <label htmlFor="option-3">Option 3</label>
      </div>
    </RadioGroup>
  )
}

export const Disabled: Story = {
  args: {
    defaultValue: "option-1"
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="option-1" />
        <label htmlFor="option-1">Option 1</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="option-2" disabled />
        <label htmlFor="option-2">Option 2 (Disabled)</label>
      </div>
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
