/**
 * Storybook-only layout mirroring the Figma Input OTP documentation page.
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import { ArrowUpRight, RefreshCw } from "lucide-react"
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import { Button } from "@/components/atoms/button/button"
import { FieldDescription, FieldLabel } from "@/components/atoms/field/field"
import { Separator } from "@/components/atoms/separator/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/molecules/card/card"
import { cn } from "@/utils/index"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "./input-otp"

function SpecSection({
  title,
  children,
  className
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <h3 className="text-xl font-semibold tracking-normal text-foreground">{title}</h3>
      {children}
    </section>
  )
}

function VariantGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-4 rounded-xl border border-dashed border-border p-5",
        className
      )}
    >
      {children}
    </div>
  )
}

function PreviewBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-border p-10">
      {children}
    </div>
  )
}

function ExampleBlock({
  title,
  description,
  children
}: {
  title: string
  description: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full flex-col">
      <h4 className="text-lg font-semibold text-foreground">{title}</h4>
      <p className="pt-4 text-base text-muted-foreground">{description}</p>
      <div className="pt-6">{children}</div>
    </div>
  )
}

function MatrixRowLabels({ rows }: { rows: string[] }) {
  return (
    <div className="flex flex-col gap-6">
      {rows.map((row) => (
        <div key={row} className="flex h-9 items-center gap-2.5">
          <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">{row}</span>
          <div className="h-full w-3 border-l border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

type SpecPairState = "default" | "focus" | "destructive" | "disabled"

function SpecTwoSlotPair({ state }: { state: SpecPairState }) {
  const invalid = state === "destructive"
  const disabled = state === "disabled"

  const defaultValue =
    state === "default" ? "1" : state === "destructive" ? "00" : state === "disabled" ? "12" : ""

  return (
    <InputOTP
      maxLength={2}
      defaultValue={defaultValue}
      disabled={disabled}
      autoFocus={state === "focus"}
    >
      <InputOTPGroup
        className={cn(
          invalid && "overflow-hidden rounded-lg shadow-[0_0_0_3px] shadow-destructive/20"
        )}
      >
        <InputOTPSlot index={0} aria-invalid={invalid || undefined} />
        <InputOTPSlot index={1} aria-invalid={invalid || undefined} />
      </InputOTPGroup>
    </InputOTP>
  )
}

function OtpGrouped({
  groupSizes,
  value,
  defaultValue,
  disabled,
  invalid,
  slotClassName,
  autoFocus,
  pattern = REGEXP_ONLY_DIGITS
}: {
  groupSizes: number[]
  value?: string
  defaultValue?: string
  disabled?: boolean
  invalid?: boolean
  slotClassName?: string
  autoFocus?: boolean
  pattern?: string
}) {
  const maxLength = groupSizes.reduce((sum, size) => sum + size, 0)
  const groupClass = invalid
    ? "overflow-hidden rounded-lg shadow-[0_0_0_3px] shadow-destructive/20"
    : undefined

  const slotProps = {
    "aria-invalid": invalid || undefined,
    className: slotClassName
  } as const

  const slotGroups = React.useMemo(() => {
    return groupSizes.map((size, groupIndex) => {
      const startIndex = groupSizes
        .slice(0, groupIndex)
        .reduce((sum, groupSize) => sum + groupSize, 0)
      const indices = Array.from({ length: size }, (_, slotOffset) => startIndex + slotOffset)
      return { groupIndex, indices }
    })
  }, [groupSizes])

  return (
    <InputOTP
      maxLength={maxLength}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      autoFocus={autoFocus}
      pattern={pattern}
    >
      {slotGroups.map(({ groupIndex, indices }) => (
        <React.Fragment key={groupIndex}>
          {groupIndex > 0 ? <InputOTPSeparator /> : null}
          <InputOTPGroup className={groupClass}>
            {indices.map((index) => (
              <InputOTPSlot key={index} index={index} {...slotProps} />
            ))}
          </InputOTPGroup>
        </React.Fragment>
      ))}
    </InputOTP>
  )
}

function ControlledExample() {
  const [value, setValue] = React.useState("")

  return (
    <div className="flex flex-col items-center gap-2">
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-foreground">Enter your one-time password.</p>
    </div>
  )
}

function VerifyLoginFormExample() {
  return (
    <Card className="w-[336px] gap-4 pt-4">
      <CardHeader className="px-4">
        <CardTitle>Verify your login</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address:{" "}
          <span className="font-medium text-foreground">m@example.com.</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-4">
        <div className="flex items-start justify-between gap-2">
          <FieldLabel>Verification code</FieldLabel>
          <Button variant="outline" size="sm" className="h-6 gap-1 px-2 text-xs">
            <RefreshCw className="size-3" />
            Resend Code
          </Button>
        </div>
        <div className="flex w-full items-center justify-between">
          <InputOTP maxLength={6} defaultValue="456123" pattern={REGEXP_ONLY_DIGITS}>
            <InputOTPGroup>
              <InputOTPSlot index={0} className="h-12 w-[42px]" />
              <InputOTPSlot index={1} className="h-12 w-[42px]" />
              <InputOTPSlot index={2} className="h-12 w-[42px]" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} className="h-12 w-[42px]" />
              <InputOTPSlot index={4} className="h-12 w-[42px]" />
              <InputOTPSlot index={5} className="h-12 w-[42px]" />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <FieldDescription className="underline">
          <a href="#email-recovery">I no longer have access to this email address.</a>
        </FieldDescription>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Verify
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Having trouble signing in?{" "}
          <a href="#support" className="underline">
            Contact support
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}

const COMPONENT_ROWS: SpecPairState[] = ["default", "focus", "destructive", "disabled"]

export function InputOtpDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Input OTP</h1>
          <p className="text-base text-muted-foreground">
            Accessible one-time password component with copy paste functionality.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/input-otp" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Input OTP">
          <VariantGrid className="items-start">
            <MatrixRowLabels rows={["Default", "Focus", "Destructive", "Disabled"]} />
            <div className="flex flex-col gap-6 pt-0">
              {COMPONENT_ROWS.map((state) => (
                <div key={state} className="flex h-9 items-center">
                  <SpecTwoSlotPair state={state} />
                </div>
              ))}
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Separator"
          description="Use groups and InputOTPSeparator to split digits."
        >
          <PreviewBox>
            <OtpGrouped groupSizes={[2, 2, 2]} autoFocus />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Use the disabled prop to disable the input."
        >
          <PreviewBox>
            <OtpGrouped groupSizes={[3, 3]} defaultValue="123456" disabled />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Controlled"
          description="Use the value and onChange props to control the input value."
        >
          <PreviewBox>
            <ControlledExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Invalid"
          description="Use aria-invalid on the slots to show an error state."
        >
          <PreviewBox>
            <OtpGrouped groupSizes={[2, 2, 2]} defaultValue="000000" invalid />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Four Digits"
          description={
            <>
              A common pattern for PIN codes. This uses the{" "}
              <code className="text-sm">pattern={"{"}REGEXP_ONLY_DIGITS{"}"}</code> prop.
            </>
          }
        >
          <PreviewBox>
            <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Alphanumeric"
          description="Use REGEXP_ONLY_DIGITS_AND_CHARS to accept both letters and numbers."
        >
          <PreviewBox>
            <OtpGrouped
              groupSizes={[3, 3]}
              defaultValue="abc123"
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Form" description="">
          <PreviewBox>
            <VerifyLoginFormExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="RTL"
          description={
            <>
              To enable RTL support in shadcn/ui, see the{" "}
              <a
                href="https://ui.shadcn.com/docs/rtl"
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                RTL configuration guide
              </a>
              .
            </>
          }
        >
          <PreviewBox>
            <div dir="rtl" className="flex w-full flex-col items-end gap-2">
              <FieldLabel className="text-right">رمز التحقق</FieldLabel>
              <InputOTP maxLength={6} defaultValue="654321" pattern={REGEXP_ONLY_DIGITS}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
