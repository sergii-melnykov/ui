/**
 * Storybook-only layout mirroring the Figma Alert Dialog documentation page.
 */

import * as React from "react"
import { ArrowUpRight, Bluetooth, CircleFadingPlus, Trash2 } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import {
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle
} from "./alert-dialog"

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

function DirectionColumnHeaders() {
  return (
    <div className="grid w-full min-w-[720px] grid-cols-3 gap-6">
      {(["None", "LTR", "RTL"] as const).map((label) => (
        <div key={label} className="flex flex-col items-center gap-2.5">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <div className="h-3 w-full border-b border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

const HEADER_COPY = {
  title: "Share this project?",
  description: "Anyone with the link will be able to view and edit this project."
} as const

function AlertDialogHeaderSpec({ layout }: { layout: "none" | "ltr" | "rtl" }) {
  const dir = layout === "rtl" ? "rtl" : layout === "ltr" ? "ltr" : undefined
  const isHorizontal = layout === "ltr" || layout === "rtl"

  return (
    <div
      dir={dir}
      className="group/alert-dialog-content w-full max-w-[288px]"
      data-size={layout === "none" ? "sm" : "default"}
    >
      <AlertDialogHeader
        className={cn(
          "px-4 pt-4",
          layout === "none" && "place-items-center text-center",
          isHorizontal &&
            "place-items-start text-left has-data-[slot=alert-dialog-media]:grid-cols-[auto_1fr] has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4",
          layout === "rtl" && "text-right"
        )}
      >
        <AlertDialogMedia
          className={cn(
            layout === "none" && "mb-2",
            isHorizontal && "col-start-1 row-span-2 mb-0",
            layout === "rtl" && "col-start-2 justify-self-end"
          )}
        >
          <Bluetooth />
        </AlertDialogMedia>
        <AlertDialogTitle
          className={cn(
            isHorizontal && "col-start-2 row-start-1 text-base",
            layout === "rtl" && "col-start-1 text-right"
          )}
        >
          {HEADER_COPY.title}
        </AlertDialogTitle>
        <AlertDialogDescription
          className={cn(
            isHorizontal && "col-start-2 row-start-2",
            layout === "rtl" && "col-start-1 text-right"
          )}
        >
          {HEADER_COPY.description}
        </AlertDialogDescription>
      </AlertDialogHeader>
    </div>
  )
}

function AlertDialogFooterSpec({ layout }: { layout: "none" | "ltr" | "rtl" }) {
  const dir = layout === "rtl" ? "rtl" : layout === "ltr" ? "ltr" : undefined

  return (
    <div dir={dir} className="group/alert-dialog-content w-full max-w-[320px]" data-size="sm">
      <AlertDialogFooter
        className={cn(
          "border-t bg-muted/50 p-4",
          layout === "none" && "sm:justify-end",
          layout === "ltr" && "sm:justify-end",
          layout === "rtl" && "sm:justify-start"
        )}
      >
        {layout === "rtl" ? (
          <>
            <Button className="flex-1 sm:flex-none">Allow</Button>
            <Button variant="outline" className="flex-1 sm:flex-none">
              Don&apos;t allow
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" className={layout === "none" ? "flex-1 sm:flex-none" : undefined}>
              Don&apos;t allow
            </Button>
            <Button className={layout === "none" ? "flex-1 sm:flex-none" : undefined}>Allow</Button>
          </>
        )}
      </AlertDialogFooter>
    </div>
  )
}

function StaticAlertDialog({
  size = "default",
  dir,
  className,
  children
}: {
  size?: "default" | "sm"
  dir?: "ltr" | "rtl"
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      dir={dir}
      className={cn(
        "group/alert-dialog-content flex w-full flex-col gap-4 overflow-hidden rounded-xl border border-border bg-background shadow-lg",
        size === "sm" ? "max-w-xs" : "max-w-xs sm:max-w-sm",
        className
      )}
      data-size={size}
    >
      {children}
    </div>
  )
}

function SpecFooter({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <AlertDialogFooter className={cn("border-t bg-muted/50 p-4 sm:justify-end", className)}>
      {children}
    </AlertDialogFooter>
  )
}

export function AlertDialogDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Alert Dialog</h1>
          <p className="text-base text-muted-foreground">
            A modal dialog that interrupts the user with important content and expects a response.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/alert-dialog"
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

        <SpecSection title="Alert Dialog Header">
          <VariantGrid className="overflow-x-auto">
            <div className="flex min-w-[720px] flex-col gap-4">
              <DirectionColumnHeaders />
              <div className="grid grid-cols-3 gap-6">
                <AlertDialogHeaderSpec layout="none" />
                <AlertDialogHeaderSpec layout="ltr" />
                <AlertDialogHeaderSpec layout="rtl" />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Alert Dialog Footer">
          <VariantGrid className="overflow-x-auto">
            <div className="flex min-w-[720px] flex-col gap-4">
              <DirectionColumnHeaders />
              <div className="grid grid-cols-3 gap-6">
                <AlertDialogFooterSpec layout="none" />
                <AlertDialogFooterSpec layout="ltr" />
                <AlertDialogFooterSpec layout="rtl" />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Alert Dialog">
          <PreviewBox>
            <StaticAlertDialog size="sm">
              <AlertDialogHeader className="px-4 pt-4">
                <AlertDialogMedia>
                  <Bluetooth />
                </AlertDialogMedia>
                <AlertDialogTitle>{HEADER_COPY.title}</AlertDialogTitle>
                <AlertDialogDescription>{HEADER_COPY.description}</AlertDialogDescription>
              </AlertDialogHeader>
              <SpecFooter>
                <Button variant="outline" className="flex-1 sm:flex-none">
                  Don&apos;t allow
                </Button>
                <Button className="flex-1 sm:flex-none">Allow</Button>
              </SpecFooter>
            </StaticAlertDialog>
          </PreviewBox>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Basic"
          description="A basic alert dialog with a title, description, and cancel and continue buttons."
        >
          <PreviewBox>
            <StaticAlertDialog>
              <AlertDialogHeader className="px-4 pt-4">
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove
                  your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <SpecFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Continue</Button>
              </SpecFooter>
            </StaticAlertDialog>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Small"
          description='Use the size="sm" prop to make the alert dialog smaller.'
        >
          <PreviewBox>
            <StaticAlertDialog size="sm">
              <AlertDialogHeader className="px-4 pt-4">
                <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to allow the USB accessory to connect to this device?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <SpecFooter>
                <Button variant="outline" className="flex-1 sm:flex-none">
                  Don&apos;t allow
                </Button>
                <Button className="flex-1 sm:flex-none">Allow</Button>
              </SpecFooter>
            </StaticAlertDialog>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Media"
          description="Use the AlertDialogMedia component to add a media element such as an icon or image to the alert dialog."
        >
          <PreviewBox>
            <StaticAlertDialog className="max-w-md">
              <AlertDialogHeader className="px-4 pt-4">
                <AlertDialogMedia>
                  <CircleFadingPlus />
                </AlertDialogMedia>
                <AlertDialogTitle>{HEADER_COPY.title}</AlertDialogTitle>
                <AlertDialogDescription>{HEADER_COPY.description}</AlertDialogDescription>
              </AlertDialogHeader>
              <SpecFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Share</Button>
              </SpecFooter>
            </StaticAlertDialog>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Small with Media"
          description='Use the size="sm" prop to make the alert dialog smaller and the AlertDialogMedia component to add a media element such as an icon or image to the alert dialog.'
        >
          <PreviewBox>
            <StaticAlertDialog size="sm">
              <AlertDialogHeader className="px-4 pt-4">
                <AlertDialogMedia>
                  <Bluetooth />
                </AlertDialogMedia>
                <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to allow the USB accessory to connect to this device?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <SpecFooter>
                <Button variant="outline" className="flex-1 sm:flex-none">
                  Don&apos;t allow
                </Button>
                <Button className="flex-1 sm:flex-none">Allow</Button>
              </SpecFooter>
            </StaticAlertDialog>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Destructive"
          description="Use the AlertDialogAction component to add a destructive action button to the alert dialog."
        >
          <PreviewBox>
            <StaticAlertDialog size="sm">
              <AlertDialogHeader className="px-4 pt-4">
                <AlertDialogMedia className="bg-destructive/10 text-destructive">
                  <Trash2 />
                </AlertDialogMedia>
                <AlertDialogTitle>Delete chat?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this chat conversation. View{" "}
                  <a
                    href="https://ui.shadcn.com/docs/components/radix/alert-dialog"
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Settings
                  </a>{" "}
                  delete any memories saved during this chat.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <SpecFooter>
                <Button variant="outline" className="flex-1 sm:flex-none">
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 bg-destructive/10 text-destructive hover:bg-destructive/20 sm:flex-none"
                >
                  Delete
                </Button>
              </SpecFooter>
            </StaticAlertDialog>
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
            <StaticAlertDialog dir="rtl">
              <AlertDialogHeader className="px-4 pt-4">
                <AlertDialogTitle>هل أنت متأكد تمامًا؟</AlertDialogTitle>
                <AlertDialogDescription>
                  لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف حسابك نهائيًا من خوادمنا.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <SpecFooter className="sm:justify-start">
                <Button>متابعة</Button>
                <Button variant="outline">إلغاء</Button>
              </SpecFooter>
            </StaticAlertDialog>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
