/**
 * Storybook-only layout mirroring the Figma Alert documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { AlertCircle, ArrowUpRight, CircleCheck, TriangleAlert } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "./alert"

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

function MatrixLabels({ rows }: { rows: string[] }) {
  return (
    <div className="flex min-w-[280px] flex-col gap-6 pt-14">
      {rows.map((row) => (
        <div key={row} className="flex h-[78px] items-center gap-2.5">
          <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">{row}</span>
          <div className="h-full w-3 border-l border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function ColumnHeaders() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {(["LTR", "RTL"] as const).map((label) => (
        <div key={label} className="flex flex-col items-center gap-2.5">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <div className="h-3 w-full border-b border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function SpecAlert({
  dir = "ltr",
  variant = "default"
}: {
  dir?: "ltr" | "rtl"
  variant?: "default" | "destructive"
}) {
  const isDestructive = variant === "destructive"
  const Icon = isDestructive ? AlertCircle : CircleCheck

  return (
    <Alert dir={dir} variant={variant} className="w-full max-w-[464px]">
      <Icon />
      <AlertTitle>{isDestructive ? "Payment failed" : "Account updated successfully"}</AlertTitle>
      <AlertDescription>
        {isDestructive
          ? "Your payment could not be processed. Please check your payment method and try again."
          : "Your profile information has been saved. Changes will be reflected immediately."}
      </AlertDescription>
      <AlertAction>
        <Button size="xs" className="w-[55px] rounded-lg shadow-xs">
          Enable
        </Button>
      </AlertAction>
    </Alert>
  )
}

function BasicAlertExample() {
  return (
    <Alert className="w-full max-w-[464px]">
      <CircleCheck />
      <AlertTitle>Account updated successfully</AlertTitle>
      <AlertDescription>
        Your profile information has been saved. Changes will be reflected immediately.
      </AlertDescription>
    </Alert>
  )
}

function DestructiveAlertExample() {
  return (
    <Alert variant="destructive" className="w-full max-w-[464px]">
      <AlertCircle />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        Your payment could not be processed. Please check your payment method and try again.
      </AlertDescription>
    </Alert>
  )
}

function ActionAlertExample() {
  return (
    <Alert className="w-full max-w-[448px]">
      <AlertTitle>Dark mode is now available</AlertTitle>
      <AlertDescription>Enable it under your profile settings to get started.</AlertDescription>
      <AlertAction>
        <Button size="xs" className="w-[55px] rounded-lg shadow-xs">
          Enable
        </Button>
      </AlertAction>
    </Alert>
  )
}

function CustomColorsAlertExample() {
  return (
    <Alert className="w-full max-w-[464px] border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950">
      <TriangleAlert className="text-amber-900 dark:text-amber-200" />
      <AlertTitle className="text-amber-900 dark:text-amber-100">
        Your subscription will expire in 3 days.
      </AlertTitle>
      <AlertDescription className="text-muted-foreground">
        Renew now to avoid service interruption or upgrade to a paid plan to continue using the
        service.
      </AlertDescription>
    </Alert>
  )
}

function RtlAlertExample() {
  return (
    <Alert dir="rtl" className="w-full max-w-[448px]">
      <CircleCheck />
      <AlertTitle>تم الدفع بنجاح</AlertTitle>
      <AlertDescription>
        تمت معالجة دفعتك البالغة 29.99 دولارًا. تم إرسال إيصال إلى عنوان بريدك الإلكتروني.
      </AlertDescription>
    </Alert>
  )
}

export function AlertDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold leading-10 text-foreground">Alert</h1>
          <p className="text-base text-muted-foreground">Displays a callout for user attention.</p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/radix/alert"
            target="_blank"
            rel="noreferrer"
          >
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Alert">
          <VariantGrid>
            <MatrixLabels rows={["Default", "Destructive"]} />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <ColumnHeaders />
              <div className="grid grid-cols-2 gap-6">
                <SpecAlert />
                <SpecAlert dir="rtl" />
                <SpecAlert variant="destructive" />
                <SpecAlert dir="rtl" variant="destructive" />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Basic"
          description="A basic alert with an icon, title and description."
        >
          <PreviewBox>
            <BasicAlertExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Destructive"
          description={
            <>
              Use <code>variant=&quot;destructive&quot;</code> to create a destructive alert.
            </>
          }
        >
          <PreviewBox>
            <DestructiveAlertExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Action"
          description="Use AlertAction to add a button or other action element to the alert."
        >
          <PreviewBox>
            <ActionAlertExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Colors"
          description={
            <>
              You can customize the alert colors by adding custom classes such as{" "}
              <code>bg-amber-50 dark:bg-amber-950</code> to the Alert component.
            </>
          }
        >
          <PreviewBox>
            <CustomColorsAlertExample />
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
            <RtlAlertExample />
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
