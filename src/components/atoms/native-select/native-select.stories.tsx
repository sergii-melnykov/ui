import type { Meta, StoryObj } from "@storybook/react-vite"

import { NativeSelectDesignSpec } from "./native-select-design-spec"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption
} from "./native-select"

const meta: Meta<typeof NativeSelect> = {
  title: "Atoms/NativeSelect",
  component: NativeSelect,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean"
    },
    size: {
      control: "select",
      options: ["default", "sm"]
    }
  }
}

export default meta
type Story = StoryObj<typeof NativeSelect>

export const DesignSpec: Story = {
  render: () => <NativeSelectDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => (
    <NativeSelect defaultValue="">
      <NativeSelectOption value="">Select a fruit</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
    </NativeSelect>
  )
}

export const WithGroups: Story = {
  render: () => (
    <NativeSelect defaultValue="frontend">
      <NativeSelectOption value="" disabled>
        Select department
      </NativeSelectOption>
      <NativeSelectOptGroup label="Engineering">
        <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
        <NativeSelectOption value="backend">Backend</NativeSelectOption>
        <NativeSelectOption value="devops">DevOps</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Sales">
        <NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
        <NativeSelectOption value="account-manager">Account Manager</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  )
}

export const Disabled: Story = {
  render: () => (
    <NativeSelect disabled defaultValue="disabled">
      <NativeSelectOption value="disabled">Disabled</NativeSelectOption>
    </NativeSelect>
  )
}

export const Invalid: Story = {
  render: () => (
    <NativeSelect aria-invalid defaultValue="error">
      <NativeSelectOption value="error">Error state</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
    </NativeSelect>
  )
}

export const Rtl: Story = {
  render: () => (
    <NativeSelect dir="rtl" defaultValue="status" className="w-[140px] text-right">
      <NativeSelectOption value="status">اختر الحالة</NativeSelectOption>
      <NativeSelectOption value="todo">مهام</NativeSelectOption>
      <NativeSelectOption value="done">منجز</NativeSelectOption>
    </NativeSelect>
  )
}
