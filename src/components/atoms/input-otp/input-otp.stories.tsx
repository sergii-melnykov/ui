import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"

import { InputOtpDesignSpec } from "./input-otp-design-spec"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "./input-otp"

const meta: Meta<typeof InputOTP> = {
  title: "Atoms/InputOtp",
  component: InputOTP,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof InputOTP>

export const DesignSpec: Story = {
  render: () => <InputOtpDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: function DefaultInputOtp() {
    return (
      <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    )
  }
}

export const WithValue: Story = {
  render: function FilledInputOtp() {
    const [value, setValue] = React.useState("123456")

    return (
      <InputOTP maxLength={6} value={value} onChange={setValue} pattern={REGEXP_ONLY_DIGITS}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    )
  }
}

export const Disabled: Story = {
  render: () => (
    <InputOTP maxLength={6} defaultValue="123456" disabled pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}

export const Invalid: Story = {
  render: () => (
    <InputOTP maxLength={6} defaultValue="000000" pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup className="overflow-hidden rounded-lg shadow-[0_0_0_3px] shadow-destructive/20">
        <InputOTPSlot index={0} aria-invalid />
        <InputOTPSlot index={1} aria-invalid />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup className="overflow-hidden rounded-lg shadow-[0_0_0_3px] shadow-destructive/20">
        <InputOTPSlot index={2} aria-invalid />
        <InputOTPSlot index={3} aria-invalid />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup className="overflow-hidden rounded-lg shadow-[0_0_0_3px] shadow-destructive/20">
        <InputOTPSlot index={4} aria-invalid />
        <InputOTPSlot index={5} aria-invalid />
      </InputOTPGroup>
    </InputOTP>
  )
}
