/**
 * Storybook-only layout mirroring the Figma Toast documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import {
  ArrowUpRight,
  CircleCheck,
  Info,
  Loader2,
  OctagonX,
  TriangleAlert
} from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle
} from "./toast"

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

function PreviewBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-border p-10">
      {children}
    </div>
  )
}

function StaticToast({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Toast open onOpenChange={() => {}} className={cn("w-[382px]", className)}>
      {children}
    </Toast>
  )
}

function ToastContent({
  title,
  description
}: {
  title?: string
  description: React.ReactNode
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      {title ? <ToastTitle>{title}</ToastTitle> : null}
      <ToastDescription>{description}</ToastDescription>
    </div>
  )
}

function BaseComponentToast() {
  return (
    <StaticToast>
      <ToastContent title="Toast title" description="Toast description" />
      <ToastClose />
    </StaticToast>
  )
}

function TypeExample({
  label,
  icon,
  description
}: {
  label: string
  icon?: React.ReactNode
  description: string
}) {
  return (
    <div className="flex w-full flex-col gap-4">
      <h4 className="text-lg font-semibold text-foreground">{label}</h4>
      <PreviewBox>
        <StaticToast>
          {icon}
          <ToastContent description={description} />
          <ToastClose />
        </StaticToast>
      </PreviewBox>
    </div>
  )
}

export function ToastDesignSpec() {
  return (
    <ToastProvider duration={Number.POSITIVE_INFINITY}>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold leading-9 text-foreground">Toast</h1>
            <p className="text-base text-muted-foreground">
              A succinct message that is displayed temporarily.
            </p>
          </div>
          <Button variant="outline" className="shrink-0 shadow-xs" asChild>
            <a
              href="https://ui.shadcn.com/docs/components/sonner"
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

          <SpecSection title="Toast">
            <BaseComponentToast />
          </SpecSection>
        </div>

        <Separator />

        <div className="flex flex-col gap-10">
          <h2 className="text-xl font-semibold text-foreground">Examples</h2>

          <div className="flex flex-col gap-6 pt-6">
            <h3 className="text-lg font-semibold text-foreground">Types</h3>
          </div>

          <TypeExample label="Default" description="Event has been created" />

          <TypeExample
            label="Success"
            icon={<CircleCheck />}
            description="Event has been created"
          />

          <TypeExample
            label="Info"
            icon={<Info />}
            description="Arrive 10 minutes before the event."
          />

          <TypeExample
            label="Warning"
            icon={<TriangleAlert />}
            description="The event cannot start before 8:00 AM."
          />

          <TypeExample
            label="Error"
            icon={<OctagonX />}
            description="The event could not be created."
          />

          <div className="flex w-full flex-col gap-4">
            <h4 className="text-lg font-semibold text-foreground">Promise</h4>
            <PreviewBox>
              <StaticToast>
                <Loader2 className="animate-spin" />
                <ToastContent description="Creating event..." />
                <ToastClose />
              </StaticToast>
            </PreviewBox>
          </div>
        </div>
      </div>
    </ToastProvider>
  )
}
