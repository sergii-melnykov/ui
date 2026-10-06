import type { Meta, StoryObj } from "@storybook/react-vite"

import { Input } from "@/components/atoms/input/input"

import { FieldDesignSpec } from "./field-design-spec"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./field"

const meta: Meta<typeof Field> = {
  title: "Atoms/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof Field>

export const DesignSpec: Story = {
  render: () => <FieldDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="story-username">Username</FieldLabel>
      <Input id="story-username" placeholder="Max Leiter" />
      <FieldDescription>Choose a unique username for your account.</FieldDescription>
    </Field>
  )
}

export const Group: Story = {
  render: () => (
    <FieldGroup className="w-full max-w-xs gap-5">
      <Field>
        <FieldLabel htmlFor="story-email">Email</FieldLabel>
        <Input id="story-email" type="email" placeholder="you@example.com" />
      </Field>
      <Field>
        <FieldLabel htmlFor="story-name">Name</FieldLabel>
        <Input id="story-name" placeholder="Alex Smith" />
        <FieldDescription>Visible on your public profile.</FieldDescription>
      </Field>
    </FieldGroup>
  )
}
