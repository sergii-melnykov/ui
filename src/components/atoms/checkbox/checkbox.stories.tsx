import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel
} from "@/components/atoms/field/field"

import { CheckboxDesignSpec } from "./checkbox-design-spec"
import { Checkbox } from "./checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean"
    },
    disabled: {
      control: "boolean"
    }
  }
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const DesignSpec: Story = {
  render: () => <CheckboxDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  args: {}
}

export const Checked: Story = {
  args: {
    checked: true
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const WithLabel: Story = {
  render: () => (
    <Field orientation="horizontal" className="gap-2">
      <Checkbox id="terms" />
      <FieldLabel htmlFor="terms">Accept terms and conditions</FieldLabel>
    </Field>
  )
}

export const WithDescription: Story = {
  render: () => (
    <Field orientation="horizontal" className="max-w-sm gap-2">
      <Checkbox id="terms-desc" defaultChecked />
      <FieldContent className="gap-0.5">
        <FieldLabel htmlFor="terms-desc">Accept terms and conditions</FieldLabel>
        <FieldDescription>
          By clicking this checkbox, you agree to the terms and conditions.
        </FieldDescription>
      </FieldContent>
    </Field>
  )
}
