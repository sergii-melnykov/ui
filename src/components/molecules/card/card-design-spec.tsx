/**
 * Storybook-only layout mirroring the Figma Card documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/atoms/badge/badge"
import { Button } from "@/components/atoms/button/button"
import { Field, FieldGroup, FieldLabel } from "@/components/atoms/field/field"
import { Input } from "@/components/atoms/input/input"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./card"

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
        <div key={row} className="flex h-[68px] items-center gap-2.5">
          <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">{row}</span>
          <div className="h-full w-3 border-l border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function HeaderColumnHeaders() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {(["LTR", "RTL", "Middle", "None"] as const).map((label) => (
        <div key={label} className="flex flex-col items-center gap-2.5">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <div className="h-3 w-full border-b border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function ContentColumnHeaders() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {(["LTR", "RTL", "None"] as const).map((label) => (
        <div key={label} className="flex flex-col items-center gap-2.5">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <div className="h-3 w-full border-b border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

const LOGIN_TITLE = "Login to your account"
const LOGIN_DESCRIPTION = "Enter your email below to login to your account"

function SpecCardHeader({
  dir = "ltr",
  action = "button",
  align = "start"
}: {
  dir?: "ltr" | "rtl"
  action?: "button" | "badge" | "image"
  align?: "start" | "center"
}) {
  if (action === "image") {
    return (
      <img
        src="/card/header-image-placeholder.png"
        alt=""
        className="h-[216px] w-full max-w-[392px] object-cover"
      />
    )
  }

  return (
    <CardHeader
      dir={dir}
      className={cn(
        "w-full max-w-[368px]",
        align === "center" &&
          "text-center has-data-[slot=card-action]:grid-cols-1 [&_[data-slot=card-action]]:col-span-1 [&_[data-slot=card-action]]:col-start-1 [&_[data-slot=card-action]]:row-start-3 [&_[data-slot=card-action]]:justify-self-center",
        dir === "rtl" && "text-right"
      )}
    >
      <CardTitle className={cn(dir === "rtl" && "text-right", align === "center" && "text-center")}>
        {LOGIN_TITLE}
      </CardTitle>
      <CardDescription
        className={cn(dir === "rtl" && "text-right", align === "center" && "text-center")}
      >
        {LOGIN_DESCRIPTION}
      </CardDescription>
      {action === "button" ? (
        <CardAction>
          <Button variant="ghost" size="sm" className="h-8 px-2.5 shadow-none">
            Sign up
          </Button>
        </CardAction>
      ) : (
        <CardAction>
          <Badge variant="secondary">Badge</Badge>
        </CardAction>
      )}
    </CardHeader>
  )
}

function SpecCardContent({ dir = "ltr" }: { dir?: "ltr" | "rtl" | "none" }) {
  if (dir === "none") {
    return <div className="h-[68px] w-full max-w-[368px]" aria-hidden />
  }

  return (
    <CardContent
      className={cn("flex w-full max-w-[368px] flex-col gap-1", dir === "rtl" && "text-right")}
      dir={dir}
    >
      <CardTitle className={cn(dir === "rtl" && "text-right")}>{LOGIN_TITLE}</CardTitle>
      <CardDescription className={cn(dir === "rtl" && "text-right")}>
        {LOGIN_DESCRIPTION}
      </CardDescription>
    </CardContent>
  )
}

function SmallCardExample() {
  return (
    <Card size="sm" className="w-full max-w-sm overflow-hidden">
      <CardHeader>
        <CardTitle>Small card</CardTitle>
        <CardDescription>This card uses the small size variant.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-card-foreground">
          The card component supports a size prop that can be set to &quot;sm&quot; for a more compact
          appearance.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Action
        </Button>
      </CardFooter>
    </Card>
  )
}

function ImageCardExample() {
  return (
    <Card className="w-full max-w-sm overflow-hidden pt-0">
      <img
        src="/card/meetup-header.png"
        alt=""
        className="h-[216px] w-full object-cover"
      />
      <CardHeader className="pt-4">
        <CardTitle>Design systems meetup</CardTitle>
        <CardDescription>
          A practical talk on component APIs, accessibility, and shipping faster.
        </CardDescription>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View event</Button>
      </CardFooter>
    </Card>
  )
}

function RtlLoginCardExample() {
  return (
    <Card dir="rtl" className="w-full max-w-sm overflow-hidden">
      <CardHeader>
        <CardAction>
          <Button variant="ghost" size="sm" className="h-8 px-2.5 shadow-none">
            إنشاء حساب
          </Button>
        </CardAction>
        <CardTitle className="text-right">تسجيل الدخول إلى حسابك</CardTitle>
        <CardDescription className="text-right">
          أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-6">
          <Field>
            <FieldLabel htmlFor="card-spec-rtl-email" className="w-full justify-end">
              البريد الإلكتروني
            </FieldLabel>
            <Input
              id="card-spec-rtl-email"
              type="email"
              placeholder="m@example.com"
              className="text-right"
            />
          </Field>
          <Field>
            <div className="flex w-full items-center justify-end gap-2">
              <Button
                variant="link"
                size="sm"
                className="h-auto flex-1 justify-end px-0 text-sm"
              >
                نسيت كلمة المرور؟
              </Button>
              <FieldLabel htmlFor="card-spec-rtl-password" className="shrink-0">
                كلمة المرور
              </FieldLabel>
            </div>
            <Input id="card-spec-rtl-password" type="password" />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button className="w-full">تسجيل الدخول</Button>
        <Button variant="outline" className="w-full">
          تسجيل الدخول باستخدام Google
        </Button>
      </CardFooter>
    </Card>
  )
}

function FooterAnatomyExample() {
  return (
    <CardFooter className="w-full max-w-[385px]">
      <Button className="w-full">Login</Button>
      <Button variant="outline" className="w-full">
        Login with Google
      </Button>
    </CardFooter>
  )
}

export function CardDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Card</h1>
          <p className="text-base text-muted-foreground">
            Displays a card with header, content, and footer.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/radix/card" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Card Header">
          <VariantGrid className="flex-col gap-4 overflow-x-auto">
            <div className="flex min-w-[900px] gap-4">
              <MatrixLabels rows={["Button", "Badge"]} />
              <div className="flex flex-1 flex-col gap-4">
                <HeaderColumnHeaders />
                <div className="grid grid-cols-4 gap-6">
                  <SpecCardHeader dir="ltr" action="button" />
                  <SpecCardHeader dir="rtl" action="button" />
                  <SpecCardHeader dir="ltr" action="button" align="center" />
                  <SpecCardHeader action="image" />
                </div>
                <div className="grid grid-cols-4 gap-6">
                  <SpecCardHeader dir="ltr" action="badge" />
                  <SpecCardHeader dir="rtl" action="badge" />
                  <SpecCardHeader dir="ltr" action="badge" align="center" />
                  <SpecCardHeader action="image" />
                </div>
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Card Content">
          <VariantGrid className="flex-col gap-4 overflow-x-auto">
            <div className="flex min-w-[720px] gap-4">
              <MatrixLabels rows={["Button", "Badge"]} />
              <div className="flex flex-1 flex-col gap-4">
                <ContentColumnHeaders />
                <div className="grid grid-cols-3 gap-6">
                  <SpecCardContent dir="ltr" />
                  <SpecCardContent dir="rtl" />
                  <SpecCardContent dir="none" />
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <SpecCardContent dir="ltr" />
                  <SpecCardContent dir="rtl" />
                  <SpecCardContent dir="none" />
                </div>
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Card Footer">
          <VariantGrid className="justify-center">
            <FooterAnatomyExample />
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Size"
          description={
            <>
              Use the <code className="text-foreground">size=&quot;sm&quot;</code> prop to set the size of
              the card to small. The small size variant uses smaller spacing.
            </>
          }
        >
          <PreviewBox>
            <SmallCardExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Image"
          description="Add an image before the card header to create a card with an image."
        >
          <PreviewBox>
            <ImageCardExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="RTL"
          description={
            <>
              To enable RTL support in shadcn/ui, see the{" "}
              <a
                href="https://ui.shadcn.com/docs/rtl"
                className="text-foreground underline underline-offset-4"
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
            <RtlLoginCardExample />
          </PreviewBox>
        </ExampleBlock>

      </div>
    </div>
  )
}
