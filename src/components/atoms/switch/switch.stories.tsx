import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel
} from "@/components/atoms/field/field"

import { SwitchDesignSpec } from "./switch-design-spec"
import { Switch } from "./switch"

const meta: Meta<typeof Switch> = {
  title: "Atoms/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    defaultChecked: {
      control: "boolean",
      description: "The default checked state of the switch"
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled"
    },
    size: {
      control: "select",
      options: ["default", "sm"]
    }
  }
}

export default meta
type Story = StoryObj<typeof Switch>

export const DesignSpec: Story = {
  render: () => <SwitchDesignSpec />,
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
    defaultChecked: true
  }
}

export const Small: Story = {
  args: {
    size: "sm"
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true
  }
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true
  }
}

export const WithDescription: Story = {
  render: () => (
    <div className="flex max-w-sm items-start gap-2">
      <FieldContent className="gap-0.5">
        <p className="text-sm font-medium">Share across devices</p>
        <FieldDescription>
          Focus is shared across devices, and turns off when you leave the app.
        </FieldDescription>
      </FieldContent>
      <Switch aria-label="Share across devices" />
    </div>
  )
}

export const WithLabel: Story = {
  render: () => (
    <Field orientation="horizontal" className="gap-2">
      <Switch id="airplane-mode" />
      <FieldLabel htmlFor="airplane-mode">Airplane mode</FieldLabel>
    </Field>
  )
}
