/**
 * Storybook-only layout mirroring the Figma Sheet documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight, X } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Input } from "@/components/atoms/input/input"
import { Label } from "@/components/atoms/label/label"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetCloseButton,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "./sheet"

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
  return (
    <span
      className="inline-flex size-7 shrink-0 items-center justify-center rounded-sm opacity-70"
      aria-hidden
    >
      <X className="size-4" />
    </span>
  )
}

/** Static typography matching SheetTitle / SheetDescription (no Radix dialog context). */
function StaticSheetTitle({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn("text-base font-medium leading-6 text-foreground", className)}>{children}</p>
  )
}

function StaticSheetDescription({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
}

function SheetHeaderSpec({ dir = "ltr" }: { dir?: "ltr" | "rtl" }) {
  return (
    <div dir={dir} className="w-full max-w-sm">
      <SheetHeader>
        <div className="flex w-full items-center gap-2.5">
          {dir === "rtl" ? <StaticCloseIcon /> : null}
          <StaticSheetTitle className="min-w-0 flex-1">
            {dir === "rtl" ? "تعديل الملف الشخصي" : "Edit profile"}
          </StaticSheetTitle>
          {dir === "ltr" ? <StaticCloseIcon /> : null}
        </div>
        <StaticSheetDescription>
          {dir === "rtl"
            ? "قم بإجراء تغييرات على ملفك الشخصي هنا. انقر حفظ عند الانتهاء."
            : "Make changes to your profile here. Click save when you're done."}
        </StaticSheetDescription>
      </SheetHeader>
    </div>
  )
}

function SheetFooterSpec() {
  return (
    <SheetFooter className="w-full max-w-sm rounded-xl">
      <Button size="sm" className="w-full">
        Save changes
      </Button>
      <Button size="sm" variant="outline" className="w-full">
        Cancel
      </Button>
    </SheetFooter>
  )
}

function StaticSheetShell({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 bg-background shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      {children}
    </div>
  )
}

function EditProfileHeader({
  showClose = true,
  dir = "ltr"
}: {
  showClose?: boolean
  dir?: "ltr" | "rtl"
}) {
  const isRtl = dir === "rtl"
  return (
    <SheetHeader dir={dir}>
      <div className="flex w-full items-center gap-2.5">
        {isRtl && showClose ? <StaticCloseIcon /> : null}
        <StaticSheetTitle className="min-w-0 flex-1">
          {isRtl ? "تعديل الملف الشخصي" : "Edit profile"}
        </StaticSheetTitle>
        {!isRtl && showClose ? <StaticCloseIcon /> : null}
      </div>
      <StaticSheetDescription>
        {isRtl
          ? "قم بإجراء تغييرات على ملفك الشخصي هنا. انقر حفظ عند الانتهاء."
          : "Make changes to your profile here. Click save when you're done."}
      </StaticSheetDescription>
    </SheetHeader>
  )
}

function EditProfileFooter({ dir = "ltr" }: { dir?: "ltr" | "rtl" }) {
  const isRtl = dir === "rtl"
  return (
    <SheetFooter>
      <Button size="sm" className="w-full">
        {isRtl ? "حفظ التغييرات" : "Save changes"}
      </Button>
      <Button size="sm" variant="outline" className="w-full">
        {isRtl ? "إغلاق" : "Cancel"}
      </Button>
    </SheetFooter>
  )
}

function SideSheetPreview({ variant }: { variant: "right" | "bottom" }) {
  const isBottom = variant === "bottom"
  return (
    <StaticSheetShell
      className={cn(
        isBottom ? "w-full max-w-none" : "w-full max-w-sm",
        isBottom ? "min-h-[280px]" : "min-h-[520px]"
      )}
    >
      <EditProfileHeader />
      <SheetBody className={isBottom ? "max-h-none" : undefined}>
        {Array.from({ length: 3 }).map((_, index) => (
          <p key={index} className="pb-4 leading-5">
            {LOREM}
          </p>
        ))}
      </SheetBody>
      <EditProfileFooter />
    </StaticSheetShell>
  )
}

export function SheetDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Sheet</h1>
          <p className="text-base text-muted-foreground">
            Extends the Dialog component to display content that complements the main content of
            the screen.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/sheet" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Sheet Header">
          <VariantGrid className="overflow-x-auto">
            <div className="flex min-w-[640px] flex-col gap-4">
              <ColumnHeaders />
              <div className="grid grid-cols-2 gap-6">
                <SheetHeaderSpec dir="ltr" />
                <SheetHeaderSpec dir="rtl" />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Sheet Footer">
          <SheetFooterSpec />
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Side"
          description={
            <>
              Use the <code className="text-sm">side</code> prop on{" "}
              <code className="text-sm">SheetContent</code> to set the edge of the screen where the
              sheet appears. Values are <code className="text-sm">top</code>,{" "}
              <code className="text-sm">right</code>, <code className="text-sm">bottom</code>, or{" "}
              <code className="text-sm">left</code>.
            </>
          }
        >
          <div className="flex flex-col gap-6">
            <PreviewBox>
              <SideSheetPreview variant="right" />
            </PreviewBox>
            <PreviewBox>
              <SideSheetPreview variant="bottom" />
            </PreviewBox>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="No Close Button"
          description={
            <>
              Use <code className="text-sm">showCloseButton=&#123;false&#125;</code> on{" "}
              <code className="text-sm">SheetContent</code> to hide the close button.
            </>
          }
        >
          <PreviewBox>
            <StaticSheetShell className="h-[818px] w-full max-w-sm">
              <SheetHeader>
                <StaticSheetTitle>No Close Button</StaticSheetTitle>
                <StaticSheetDescription>
                  This sheet doesn&apos;t have a close button in the top-right corner. Click outside
                  to close.
                </StaticSheetDescription>
              </SheetHeader>
              <SheetBody className="flex-1" />
            </StaticSheetShell>
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
            <div dir="rtl" className="w-full max-w-sm">
              <StaticSheetShell className="min-h-[520px]">
                <EditProfileHeader dir="rtl" />
                <SheetBody>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <Label className="text-right">الاسم</Label>
                      <Input defaultValue="Pedro Duarte" className="h-8 text-right" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-right">اسم المستخدم</Label>
                      <Input defaultValue="peduarte" className="h-8 text-right" />
                    </div>
                  </div>
                </SheetBody>
                <EditProfileFooter dir="rtl" />
              </StaticSheetShell>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Interactive" description="Open a live sheet with the updated layout.">
          <PreviewBox>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Sheet</Button>
              </SheetTrigger>
              <SheetContent showCloseButton={false}>
                <SheetHeader>
                  <div className="flex items-start justify-between gap-2">
                    <SheetTitle className="flex-1">Edit profile</SheetTitle>
                    <SheetCloseButton />
                  </div>
                  <SheetDescription>
                    Make changes to your profile here. Click save when you&apos;re done.
                  </SheetDescription>
                </SheetHeader>
                <SheetBody>
                  <div className="flex flex-col gap-5 pb-4">
                    <div className="grid gap-2">
                      <Label htmlFor="sheet-spec-name">Name</Label>
                      <Input id="sheet-spec-name" defaultValue="Pedro Duarte" className="h-8" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="sheet-spec-username">Username</Label>
                      <Input id="sheet-spec-username" defaultValue="peduarte" className="h-8" />
                    </div>
                  </div>
                </SheetBody>
                <SheetFooter>
                  <Button size="sm" className="w-full">
                    Save changes
                  </Button>
                  <SheetClose asChild>
                    <Button size="sm" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
