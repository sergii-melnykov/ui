import type { Meta, StoryObj } from "@storybook/react-vite"

import { Field, FieldDescription, FieldLabel } from "@/components/atoms/field/field"

import { TextareaDesignSpec } from "./textarea-design-spec"
import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = {
  title: "Atoms/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    autoResize: { control: "boolean" },
    rows: { control: "number" },
    cols: { control: "number" },
    maxLength: { control: "number" },
    minLength: { control: "number" }
  }
}

export default meta
type Story = StoryObj<typeof Textarea>

export const DesignSpec: Story = {
  render: () => <TextareaDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  args: {
    placeholder: "Type your message here.",
    className: "w-[320px]"
  }
}

export const WithLabel: Story = {
  render: () => (
    <Field className="w-[320px] gap-2">
      <FieldLabel htmlFor="textarea-with-label">Message</FieldLabel>
      <FieldDescription>Enter your message below.</FieldDescription>
      <Textarea id="textarea-with-label" placeholder="Type your message here." />
    </Field>
  )
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Type your message here.",
    className: "w-[320px]"
  }
}

export const Invalid: Story = {
  render: () => (
    <Field className="w-[320px] gap-2" data-invalid={true}>
      <FieldLabel htmlFor="textarea-invalid" className="text-destructive">
        Message
      </FieldLabel>
      <Textarea id="textarea-invalid" aria-invalid placeholder="Type your message here." />
      <FieldDescription>Please enter a valid message.</FieldDescription>
    </Field>
  )
}

export const AutoResize: Story = {
  args: {
    autoResize: true,
    placeholder: "This textarea will automatically resize as you type...",
    className: "w-[320px]"
  }
}

export const WithMaxLength: Story = {
  args: {
    maxLength: 100,
    placeholder: "Maximum 100 characters allowed",
    className: "w-[320px]"
  }
}
