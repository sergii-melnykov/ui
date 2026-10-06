import type { Meta, StoryObj } from "@storybook/react-vite"
import React from "react"

import { Button } from "@/components/atoms/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle
} from "@/components/atoms/field/field"

import { RadioGroupDesignSpec } from "./radio-group-design-spec"
import { RadioGroup, RadioGroupItem, RadioItemContainer, RadioItemLabel } from "./radio-group"

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

export const DesignSpec: Story = {
  render: () => <RadioGroupDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

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

export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="default" className="max-w-xs gap-2">
      <Field orientation="horizontal" className="items-start gap-2">
        <RadioGroupItem value="default" id="story-default" className="mt-0.5" />
        <FieldContent className="gap-0.5">
          <FieldLabel htmlFor="story-default">Default</FieldLabel>
          <FieldDescription>Standard spacing for most use cases.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal" className="items-start gap-2">
        <RadioGroupItem value="comfortable" id="story-comfortable" className="mt-0.5" />
        <FieldContent className="gap-0.5">
          <FieldLabel htmlFor="story-comfortable">Comfortable</FieldLabel>
          <FieldDescription>More space between elements.</FieldDescription>
        </FieldContent>
      </Field>
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

export const ChoiceCard: Story = {
  render: () => (
    <RadioGroup defaultValue="plus" className="max-w-sm gap-5">
      <FieldLabel
        htmlFor="story-plus"
        className="has-data-[state=checked]:bg-accent has-[>[data-slot=field]]:rounded-lg [&>*]:data-[slot=field]:gap-2 [&>*]:data-[slot=field]:p-2.5"
      >
        <Field orientation="horizontal" className="items-start">
          <FieldContent className="gap-0.5">
            <FieldTitle>Plus</FieldTitle>
            <FieldDescription>For individuals and small teams.</FieldDescription>
          </FieldContent>
          <RadioGroupItem value="plus" id="story-plus" className="mt-0.5 shrink-0" />
        </Field>
      </FieldLabel>
      <FieldLabel
        htmlFor="story-pro"
        className="has-data-[state=checked]:bg-accent has-[>[data-slot=field]]:rounded-lg [&>*]:data-[slot=field]:gap-2 [&>*]:data-[slot=field]:p-2.5"
      >
        <Field orientation="horizontal" className="items-start">
          <FieldContent className="gap-0.5">
            <FieldTitle>Pro</FieldTitle>
            <FieldDescription>For growing businesses.</FieldDescription>
          </FieldContent>
          <RadioGroupItem value="pro" id="story-pro" className="mt-0.5 shrink-0" />
        </Field>
      </FieldLabel>
    </RadioGroup>
  )
}

export const Fieldset: Story = {
  render: () => (
    <FieldGroup className="max-w-xs">
      <FieldSet>
        <FieldLegend variant="label">Subscription Plan</FieldLegend>
        <FieldDescription>Yearly and lifetime plans offer significant savings.</FieldDescription>
        <RadioGroup defaultValue="yearly" className="gap-3">
          <Field orientation="horizontal" className="gap-2">
            <RadioGroupItem value="monthly" id="story-monthly" />
            <FieldLabel htmlFor="story-monthly" className="font-normal">
              Monthly ($9.99/month)
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" className="gap-2">
            <RadioGroupItem value="yearly" id="story-yearly" />
            <FieldLabel htmlFor="story-yearly" className="font-normal">
              Yearly ($99.99/year)
            </FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
    </FieldGroup>
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
      className="flex w-fit gap-2 rounded-md border border-border p-2"
    >
      <Button
        size="sm"
        variant={value === "option-1" ? "default" : "secondary"}
        onClick={() => {
          setValue("option-1")
        }}
        role="radio"
        aria-checked={value === "option-1"}
      >
        Option 1
      </Button>
      <Button
        size="sm"
        variant={value === "option-2" ? "default" : "secondary"}
        onClick={() => {
          setValue("option-2")
        }}
        role="radio"
        aria-checked={value === "option-2"}
      >
        Option 2
      </Button>
      <Button
        size="sm"
        variant={value === "option-3" ? "default" : "secondary"}
        onClick={() => {
          setValue("option-3")
        }}
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
