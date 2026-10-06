/**
 * Storybook-only layout mirroring the Figma Table documentation page (node 1945:3787).
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import { ArrowUpRight, MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/atoms/badge/badge"
import { Button } from "@/components/atoms/button/button"
import { Checkbox } from "@/components/atoms/checkbox/checkbox"
import { Input } from "@/components/atoms/input/input"
import { Separator } from "@/components/atoms/separator/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/organisms/dropdown-menu/dropdown-menu"
import { cn } from "@/utils/index"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "./table"

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

function MatrixLabels({
  rows,
  rowHeightClass = "h-10"
}: {
  rows: string[]
  rowHeightClass?: string
}) {
  return (
    <div className="flex min-w-[280px] flex-col gap-6 pt-14">
      {rows.map((row) => (
        <div key={row} className={cn("flex items-center gap-2.5", rowHeightClass)}>
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

function SpecTableHead({
  dir = "ltr",
  hover = false,
  variant = "text"
}: {
  dir?: "ltr" | "rtl"
  hover?: boolean
  variant?: "text" | "button" | "checkbox"
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead dir={dir} className={cn(dir === "rtl" && "text-right", hover && "bg-muted")}>
            {variant === "checkbox" ? (
              <Checkbox aria-label="Select all" />
            ) : variant === "button" ? (
              <Button variant="ghost" size="sm" className="h-8">
                Button
              </Button>
            ) : (
              "Table head"
            )}
          </TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  )
}

function SpecTableCell({
  dir = "ltr",
  hover = false,
  variant = "text"
}: {
  dir?: "ltr" | "rtl"
  hover?: boolean
  variant?: "text" | "button" | "checkbox" | "badge" | "input"
}) {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell dir={dir} className={cn(dir === "rtl" && "text-right", hover && "bg-muted")}>
            {variant === "checkbox" ? (
              <Checkbox aria-label="Select row" />
            ) : variant === "button" ? (
              <Button variant="ghost" size="icon-sm" aria-label="Row action">
                <MoreHorizontal />
              </Button>
            ) : variant === "badge" ? (
              <Badge>Default</Badge>
            ) : variant === "input" ? (
              <Input placeholder="Enter text" className="h-8 w-[85px]" />
            ) : (
              <span className="font-medium">Table cell</span>
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

function FooterExampleTable() {
  return (
    <Table className="max-w-[558px]">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
      <TableCaption>A list of your recent invoices.</TableCaption>
    </Table>
  )
}

const actionProducts = [
  { name: "Wireless Mouse", price: "$29.99" },
  { name: "Mechanical Keyboard", price: "$129.99" },
  { name: "USB-C Hub", price: "$49.99" }
] as const

function ActionsExampleTable() {
  return (
    <Table className="max-w-[558px]">
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {actionProducts.map((product) => (
          <TableRow key={product.name}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${product.name}`}>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const rtlInvoices = [
  { id: "INV001", status: "مدفوع", method: "بطاقة ائتمانية", amount: "$250.00" },
  { id: "INV002", status: "قيد الانتظار", method: "PayPal", amount: "$150.00" },
  { id: "INV003", status: "غير مدفوع", method: "تحويل بنكي", amount: "$350.00" },
  { id: "INV004", status: "مدفوع", method: "بطاقة ائتمانية", amount: "$450.00" },
  { id: "INV005", status: "مدفوع", method: "PayPal", amount: "$550.00" },
  { id: "INV006", status: "قيد الانتظار", method: "تحويل بنكي", amount: "$200.00" },
  { id: "INV007", status: "غير مدفوع", method: "بطاقة ائتمانية", amount: "$300.00" }
] as const

function RtlExampleTable() {
  return (
    <Table dir="rtl" className="max-w-[558px]">
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">الفاتورة</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
          <TableHead className="text-right">الطريقة</TableHead>
          <TableHead className="text-right">المبلغ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rtlInvoices.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="text-right font-medium">{row.id}</TableCell>
            <TableCell className="text-right">{row.status}</TableCell>
            <TableCell className="text-right">{row.method}</TableCell>
            <TableCell className="text-right">{row.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="text-right">
            المجموع
          </TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
      <TableCaption dir="auto">قائمة بفواتيرك الأخيرة.</TableCaption>
    </Table>
  )
}

export function TableDesignSpec() {
  const headRows = ["Default", "Hover", "Button", "Checkbox"]
  const cellRows = ["Default", "Hover", "Button", "Checkbox", "Badge", "Input"]

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Table</h1>
          <p className="text-base leading-6 text-muted-foreground">A responsive table component.</p>
        </div>
        <Button variant="outline" className="h-8 shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/radix/table"
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

        <SpecSection title="Table Head">
          <VariantGrid>
            <MatrixLabels rows={headRows} />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <ColumnHeaders />
              <div className="grid grid-cols-2 gap-6">
                <SpecTableHead />
                <SpecTableHead dir="rtl" />
                <SpecTableHead hover />
                <SpecTableHead dir="rtl" hover />
                <SpecTableHead variant="button" />
                <SpecTableHead dir="rtl" variant="button" />
                <SpecTableHead variant="checkbox" />
                <SpecTableHead dir="rtl" variant="checkbox" />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Table Cell">
          <VariantGrid>
            <MatrixLabels rows={cellRows} rowHeightClass="h-[37px]" />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <ColumnHeaders />
              <div className="grid grid-cols-2 gap-6">
                <SpecTableCell />
                <SpecTableCell dir="rtl" />
                <SpecTableCell hover />
                <SpecTableCell dir="rtl" hover />
                <SpecTableCell variant="button" />
                <SpecTableCell dir="rtl" variant="button" />
                <SpecTableCell variant="checkbox" />
                <SpecTableCell dir="rtl" variant="checkbox" />
                <SpecTableCell variant="badge" />
                <SpecTableCell dir="rtl" variant="badge" />
                <SpecTableCell variant="input" />
                <SpecTableCell dir="rtl" variant="input" />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Footer"
          description="Use the TableFooter component to add a footer to the table."
        >
          <PreviewBox>
            <FooterExampleTable />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Actions"
          description={
            <>
              A table showing actions for each row using a{" "}
              <code className="text-foreground">&lt;DropdownMenu /&gt;</code> component.
            </>
          }
        >
          <PreviewBox>
            <ActionsExampleTable />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="RTL"
          description={
            <>
              To enable RTL support in shadcn/ui, see the{" "}
              <a
                href="https://ui.shadcn.com/docs/rtl"
                className="underline underline-offset-4"
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
            <RtlExampleTable />
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
