/**
 * Storybook-only layout mirroring the Figma Dialog documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight, X } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Input } from "@/components/atoms/input/input"
import { Label } from "@/components/atoms/label/label"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import { DialogBody, DialogFooter } from "./dialog"

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

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

function ColumnHeaders() {
  return (
    <div className="grid w-full min-w-[640px] grid-cols-2 gap-6">
      {(["LTR", "RTL"] as const).map((label) => (
        <div key={label} className="flex flex-col items-center gap-6">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <div className="h-3 w-full border-b border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function StaticCloseIcon() {
  return <X className="size-4 shrink-0 opacity-70" aria-hidden />
}

function DialogHeaderSpec({ dir = "ltr" }: { dir?: "ltr" | "rtl" }) {
  const isRtl = dir === "rtl"
  return (
    <div dir={dir} className="w-full max-w-[368px]">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          {isRtl ? <StaticCloseIcon /> : null}
          <p
            className={cn(
              "min-w-0 flex-1 text-base font-medium leading-6 text-popover-foreground",
              isRtl && "text-right"
            )}
          >
            Login to your account
          </p>
          {!isRtl ? <StaticCloseIcon /> : null}
        </div>
        <p className={cn("text-sm text-muted-foreground", isRtl && "text-right")}>
          Enter your email below to login to your account
        </p>
      </div>
    </div>
  )
}

function DialogFooterSpec({ dir = "ltr" }: { dir?: "ltr" | "rtl" }) {
  const isRtl = dir === "rtl"
  return (
    <div
      dir={dir}
      className={cn(
        "flex w-full max-w-[385px] gap-2 rounded-b-xl border-t bg-muted/50 p-4",
        isRtl ? "justify-end" : "items-center"
      )}
    >
      {!isRtl ? (
        <>
          <Button size="sm">Save changes</Button>
          <Button size="sm" variant="outline">
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Button size="sm" variant="outline">
            Cancel
          </Button>
          <Button size="sm">Save changes</Button>
        </>
      )}
    </div>
  )
}

function StaticDialogShell({
  children,
  className,
  width = "md"
}: {
  children: React.ReactNode
  className?: string
  width?: "sm" | "md"
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-xl border border-border bg-popover shadow-lg",
        width === "sm" ? "max-w-[384px]" : "max-w-[448px]",
        className
      )}
    >
      {children}
    </div>
  )
}

function StaticDialogHeader({
  title,
  description,
  showClose = true,
  dir = "ltr",
  className
}: {
  title: string
  description: string
  showClose?: boolean
  dir?: "ltr" | "rtl"
  className?: string
}) {
  const isRtl = dir === "rtl"
  return (
    <div dir={dir} className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-start justify-between gap-2">
        {isRtl && showClose ? <StaticCloseIcon /> : null}
        <p
          className={cn(
            "min-w-0 flex-1 text-base font-medium leading-6 text-popover-foreground",
            isRtl && "text-right"
          )}
        >
          {title}
        </p>
        {!isRtl && showClose ? <StaticCloseIcon /> : null}
      </div>
      <p className={cn("text-sm text-muted-foreground", isRtl && "text-right")}>{description}</p>
    </div>
  )
}

export function DialogDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Dialog</h1>
          <p className="text-base text-muted-foreground">
            A window overlaid on either the primary window or another dialog window, rendering the
            content underneath inert.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/dialog" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Dialog Header">
          <VariantGrid className="overflow-x-auto">
            <div className="flex min-w-[640px] flex-col gap-4">
              <ColumnHeaders />
              <div className="grid grid-cols-2 gap-6">
                <DialogHeaderSpec dir="ltr" />
                <DialogHeaderSpec dir="rtl" />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Dialog Footer">
          <VariantGrid className="overflow-x-auto">
            <div className="flex min-w-[640px] flex-col gap-4">
              <ColumnHeaders />
              <div className="grid grid-cols-2 gap-6">
                <DialogFooterSpec dir="ltr" />
                <DialogFooterSpec dir="rtl" />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Custom Close Button"
          description="Replace the default close control with your own button."
        >
          <PreviewBox>
            <StaticDialogShell>
              <div className="flex flex-col gap-4 p-4 pb-0">
                <StaticDialogHeader
                  title="Share link"
                  description="Anyone who has this link will be able to view this."
                />
                <Input
                  readOnly
                  defaultValue="https://ui.shadcn.com/docs/installation"
                  className="h-8"
                />
              </div>
              <DialogFooter>
                <Button size="sm">Close</Button>
              </DialogFooter>
            </StaticDialogShell>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="No Close Button"
          description={
            <>
              Use <code className="text-sm">showCloseButton=&#123;false&#125;</code> to hide the
              close button.
            </>
          }
        >
          <PreviewBox>
            <StaticDialogShell width="sm">
              <StaticDialogHeader
                className="p-4"
                showClose={false}
                title="No Close Button"
                description="This dialog doesn't have a close button in the top-right corner."
              />
            </StaticDialogShell>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Sticky Footer"
          description="Keep actions visible while the content scrolls."
        >
          <PreviewBox>
            <StaticDialogShell className="h-[517px]">
              <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-4 pb-0">
                <StaticDialogHeader
                  title="Sticky Footer"
                  description="This dialog has a sticky footer that stays visible while the content scrolls."
                />
                <DialogBody className="space-y-4 pr-1 text-sm text-foreground">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <p key={index}>{LOREM}</p>
                  ))}
                </DialogBody>
              </div>
              <DialogFooter className="shrink-0 sm:justify-end">
                <Button size="sm" variant="outline">
                  Close
                </Button>
              </DialogFooter>
            </StaticDialogShell>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Scrollable Content"
          description="Long content can scroll while the header stays in view."
        >
          <PreviewBox>
            <StaticDialogShell className="h-[443px] p-4">
              <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
                <StaticDialogHeader
                  title="Scrollable Content"
                  description="This is a dialog with scrollable content."
                />
                <DialogBody className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1 text-sm text-foreground">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <p key={index}>{LOREM}</p>
                  ))}
                </DialogBody>
              </div>
            </StaticDialogShell>
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
            <div dir="rtl" className="w-full max-w-[385px]">
              <StaticDialogShell width="sm">
                <div className="flex flex-col gap-5 p-4 pb-0">
                  <StaticDialogHeader
                    dir="rtl"
                    title="تعديل الملف الشخصي"
                    description="قم بإجراء تغييرات على ملفك الشخصي هنا. انقر فوق حفظ عند الانتهاء."
                  />
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <Label className="text-right">الاسم</Label>
                      <Input defaultValue="Pedro Duarte" className="h-8 text-right" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-right">اسم المستخدم</Label>
                      <Input defaultValue="@peduarte" className="h-8 text-right" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button size="sm">حفظ التغييرات</Button>
                  <Button size="sm" variant="outline">
                    إلغاء
                  </Button>
                </DialogFooter>
              </StaticDialogShell>
            </div>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
