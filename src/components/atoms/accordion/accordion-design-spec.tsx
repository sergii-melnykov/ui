/**
 * Storybook-only layout mirroring the Figma Accordion documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight, ChevronDown } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/molecules/card/card"
import { cn } from "@/utils/index"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"

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
        <div key={row} className="flex h-10 items-center gap-2.5">
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

function AccordionTriggerSpec({
  dir = "ltr",
  state = "default"
}: {
  dir?: "ltr" | "rtl"
  state?: "default" | "hover" | "focus" | "destructive"
}) {
  const label = "Is it accessible?"
  const textClass = cn(
    "flex-1 text-sm font-medium",
    state === "destructive" ? "text-destructive" : "text-foreground",
    (state === "hover" || state === "focus") && "underline",
    dir === "rtl" && "text-right"
  )
  const chevronClass = cn(
    "size-4 shrink-0",
    state === "destructive" ? "text-destructive" : "text-foreground"
  )

  return (
    <div
      dir={dir}
      className={cn(
        "flex h-10 w-full max-w-[400px] items-start justify-between gap-2 rounded-lg py-2.5",
        state === "focus" && "ring-[3px] ring-ring/50"
      )}
    >
      <span className={textClass}>{label}</span>
      <ChevronDown className={chevronClass} aria-hidden />
    </div>
  )
}

function AccordionContentSpec({ dir = "ltr" }: { dir?: "ltr" | "rtl" }) {
  return (
    <p
      dir={dir}
      className={cn(
        "w-full max-w-[400px] pb-2.5 text-sm text-foreground",
        dir === "rtl" && "text-right"
      )}
    >
      Yes. It adheres to the WAI-ARIA design pattern.
    </p>
  )
}

function AccordionItemSpec({ dir = "ltr", open = false }: { dir?: "ltr" | "rtl"; open?: boolean }) {
  return (
    <Accordion
      type="single"
      collapsible
      dir={dir}
      defaultValue={open ? "spec" : undefined}
      className="w-full max-w-[400px]"
    >
      <AccordionItem value="spec" className="border-b">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function BasicAccordionExample() {
  return (
    <Accordion type="single" collapsible defaultValue="password" className="w-full max-w-sm">
      <AccordionItem value="password">
        <AccordionTrigger>How do I reset my password?</AccordionTrigger>
        <AccordionContent>
          Click on &apos;Forgot Password&apos; on the login page, enter your email address, and
          we&apos;ll send you a link to reset your password. The link will expire in 24 hours.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="plan">
        <AccordionTrigger>Can I change my subscription plan?</AccordionTrigger>
        <AccordionContent>
          Yes. You can upgrade or downgrade from account settings at any time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="payment" className="border-b-0">
        <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
        <AccordionContent>We accept major credit cards and PayPal.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function MultipleAccordionExample() {
  return (
    <Accordion
      type="multiple"
      defaultValue={["notifications", "privacy", "billing"]}
      className="w-full max-w-sm"
    >
      <AccordionItem value="notifications">
        <AccordionTrigger>Notification Settings</AccordionTrigger>
        <AccordionContent>
          Manage how you receive notifications. You can enable email alerts for updates or push
          notifications for mobile devices.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="privacy">
        <AccordionTrigger>Privacy & Security</AccordionTrigger>
        <AccordionContent>
          Control your privacy settings and security preferences. Enable two-factor authentication,
          manage connected devices, review active sessions, and configure data sharing preferences.
          You can also download your data or delete your account.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="billing">
        <AccordionTrigger>Billing & Subscription</AccordionTrigger>
        <AccordionContent>
          View your current plan, payment history, and upcoming invoices. Update your payment
          method, change your subscription tier, or cancel your subscription.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function DisabledAccordionExample() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-sm">
      <AccordionItem value="history">
        <AccordionTrigger>Can I access my account history?</AccordionTrigger>
        <AccordionContent>Yes. Visit the activity tab in your account settings.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="premium" disabled>
        <AccordionTrigger>Premium feature information</AccordionTrigger>
        <AccordionContent>This section is unavailable on your current plan.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="email" className="border-b-0">
        <AccordionTrigger>How do I update my email address?</AccordionTrigger>
        <AccordionContent>
          Open profile settings, enter a new email, and confirm via the verification link we send.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function BorderedAccordionExample() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="billing"
      className="w-full max-w-sm rounded-lg border"
    >
      <AccordionItem value="billing" className="border-b px-4 last:border-b-0">
        <AccordionTrigger>How does billing work?</AccordionTrigger>
        <AccordionContent>
          We offer monthly and annual subscription plans. Billing is charged at the beginning of
          each cycle, and you can cancel anytime. All plans include automatic backups, 24/7 support,
          and unlimited team members.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="security" className="border-b px-4 last:border-b-0">
        <AccordionTrigger>Is my data secure?</AccordionTrigger>
        <AccordionContent>
          Yes. We encrypt data in transit and at rest and follow industry best practices.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="integrations" className="border-b-0 px-4">
        <AccordionTrigger>What integrations do you support?</AccordionTrigger>
        <AccordionContent>
          We integrate with Slack, GitHub, and common CRM tools via our API.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function CardAccordionExample() {
  return (
    <Card className="w-full max-w-sm gap-4 py-4 shadow-sm">
      <CardHeader className="gap-1 px-4 pb-0 pt-0">
        <CardTitle className="text-base font-medium leading-6">Subscription & Billing</CardTitle>
        <CardDescription>
          Common questions about your account, plans, payments and cancellations.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 pt-0 pb-0">
        <Accordion type="single" collapsible defaultValue="plans">
          <AccordionItem value="plans" className="border-b px-4 last:border-b-0">
            <AccordionTrigger>What subscription plans do you offer?</AccordionTrigger>
            <AccordionContent>
              We offer three subscription tiers: Starter ($9/month), Professional ($29/month), and
              Enterprise ($99/month). Each plan includes increasing storage limits, API access,
              priority support, and team collaboration features.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="billing-card" className="border-b px-4 last:border-b-0">
            <AccordionTrigger>How does billing work?</AccordionTrigger>
            <AccordionContent>
              Billing runs at the start of each cycle. You can switch plans or cancel anytime.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="cancel" className="px-4">
            <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
            <AccordionContent>
              Go to billing settings and choose cancel subscription. Access continues until the end
              of the paid period.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

function RtlAccordionExample() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="password"
      dir="rtl"
      className="w-full max-w-sm"
    >
      <AccordionItem value="password">
        <AccordionTrigger>كيف يمكنني إعادة تعيين كلمة المرور؟</AccordionTrigger>
        <AccordionContent>
          انقر على &apos;نسيت كلمة المرور&apos; في صفحة تسجيل الدخول، أدخل عنوان بريدك الإلكتروني،
          وسنرسل لك رابطًا لإعادة تعيين كلمة المرور. سينتهي صلاحية الرابط خلال 24 ساعة.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="plan">
        <AccordionTrigger>هل يمكنني تغيير خطة الاشتراك الخاصة بي؟</AccordionTrigger>
        <AccordionContent>نعم، يمكنك تغيير خطتك من إعدادات الحساب.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="payment" className="border-b-0">
        <AccordionTrigger>ما هي طرق الدفع التي تقبلونها؟</AccordionTrigger>
        <AccordionContent>نقبل بطاقات الائتمان الرئيسية وPayPal.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function AccordionDesignSpec() {
  const triggerStates = ["Default", "Hover", "Focus", "Destructive"] as const
  const triggerStateKeys = ["default", "hover", "focus", "destructive"] as const

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Accordion</h1>
          <p className="text-base text-muted-foreground">
            A vertically stacked set of interactive headings that each reveal a section of content.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/accordion"
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

        <SpecSection title="Accordion Trigger">
          <VariantGrid>
            <MatrixLabels rows={[...triggerStates]} />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <ColumnHeaders />
              <div className="grid grid-cols-2 gap-6">
                {triggerStateKeys.map((state) => (
                  <React.Fragment key={state}>
                    <AccordionTriggerSpec state={state} />
                    <AccordionTriggerSpec state={state} dir="rtl" />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Accordion Content">
          <VariantGrid className="flex-col">
            <ColumnHeaders />
            <div className="grid w-full grid-cols-2 gap-6">
              <AccordionContentSpec />
              <AccordionContentSpec dir="rtl" />
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Accordion Item">
          <VariantGrid className="flex-col">
            <ColumnHeaders />
            <div className="grid w-full grid-cols-2 gap-6">
              <AccordionItemSpec />
              <AccordionItemSpec dir="rtl" />
              <AccordionItemSpec open />
              <AccordionItemSpec dir="rtl" open />
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Basic"
          description="A basic accordion that shows one item at a time. The first item is open by default."
        >
          <PreviewBox>
            <BasicAccordionExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Multiple"
          description={
            <>
              Use <code>type=&quot;multiple&quot;</code> to allow multiple items to be open at the
              same time.
            </>
          }
        >
          <PreviewBox>
            <MultipleAccordionExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description={
            <>
              Use the <code>disabled</code> prop on <code>AccordionItem</code> to disable individual
              items.
            </>
          }
        >
          <PreviewBox>
            <DisabledAccordionExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Borders"
          description={
            <>
              Add <code>border</code> to the <code>Accordion</code> and{" "}
              <code>border-b last:border-b-0</code> to the <code>AccordionItem</code> to add borders
              to the items.
            </>
          }
        >
          <PreviewBox>
            <BorderedAccordionExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Card" description="Wrap the Accordion in a Card component.">
          <PreviewBox>
            <CardAccordionExample />
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
            <RtlAccordionExample />
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
