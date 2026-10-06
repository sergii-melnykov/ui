import type { Meta, StoryObj } from "@storybook/react-vite"

import { Field, FieldDescription, FieldLabel } from "@/components/atoms/field/field"

import { InputDesignSpec } from "./input-design-spec"
import { Input } from "./input"

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "file"]
    },
    shape: {
      control: "select",
      options: ["default", "pill"]
    },
    disabled: {
      control: "boolean"
    },
    placeholder: {
      control: "text"
    }
  }
}

export default meta
type Story = StoryObj<typeof Input>

export const DesignSpec: Story = {
  render: () => <InputDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  args: {
    placeholder: "Enter text"
  }
}

export const Pill: Story = {
  args: {
    shape: "pill",
    placeholder: "Enter text"
  }
}

export const WithLabel: Story = {
  render: () => (
    <Field className="w-[320px] gap-2">
      <FieldLabel htmlFor="input-with-label">Email</FieldLabel>
      <Input id="input-with-label" type="email" placeholder="m@example.com" />
      <FieldDescription>Enter your email address.</FieldDescription>
    </Field>
  )
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Enter text"
  }
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    defaultValue: "not-an-email",
    type: "email"
  }
}

export const DifferentTypes: Story = {
  render: () => (
    <div className="flex w-[320px] flex-col gap-4">
      <Field className="gap-2">
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="email" placeholder="Enter email" />
      </Field>
      <Field className="gap-2">
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input id="password" type="password" placeholder="Enter password" />
      </Field>
      <Field className="gap-2">
        <FieldLabel htmlFor="number">Number</FieldLabel>
        <Input id="number" type="number" placeholder="Enter number" />
      </Field>
    </div>
  )
}
