/**
 * Live previews for the components catalog (Storybook only).
 */

import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/atoms/accordion/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/atoms/alert/alert"
import { AspectRatio } from "@/components/atoms/aspect-ratio/aspect-ratio"
import { Avatar, AvatarFallback } from "@/components/atoms/avatar/avatar"
import { Badge } from "@/components/atoms/badge/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/atoms/breadcrumb/breadcrumb"
import { Bubble } from "@/components/atoms/bubble/bubble"
import { Button } from "@/components/atoms/button/button"
import { Checkbox } from "@/components/atoms/checkbox/checkbox"
import { Empty, EmptyDescription, EmptyTitle } from "@/components/atoms/empty/empty"
import { Input } from "@/components/atoms/input/input"
import { Item, ItemContent, ItemTitle } from "@/components/atoms/item/item"
import { Kbd } from "@/components/atoms/kbd/kbd"
import { Label } from "@/components/atoms/label/label"
import { Marker, MarkerContent } from "@/components/atoms/marker/marker"
import { Message, MessageContent } from "@/components/atoms/message/message"
import { Progress } from "@/components/atoms/progress/progress"
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group/radio-group"
import { Separator } from "@/components/atoms/separator/separator"
import { Skeleton } from "@/components/atoms/skeleton/skeleton"
import { Slider } from "@/components/atoms/slider/slider"
import { Spinner } from "@/components/atoms/spinner/spinner"
import { Switch } from "@/components/atoms/switch/switch"
import { Textarea } from "@/components/atoms/textarea/textarea"
import { Typography } from "@/components/atoms/typography"
import { Toggle } from "@/components/atoms/toggle/toggle"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger
} from "@/components/organisms/menubar/menubar"
import { cn } from "@/utils/index"

import type { ALL_COMPONENTS } from "./components-catalog-data"

type CatalogComponent = (typeof ALL_COMPONENTS)[number]

function PreviewPlaceholder({ name }: { name: string }) {
  return (
    <span className="text-center text-sm font-medium text-muted-foreground">{name}</span>
  )
}

const PREVIEWS: Partial<Record<CatalogComponent, React.ReactNode>> = {
  Accordion: (
    <Accordion type="single" collapsible className="w-full max-w-xs">
      <AccordionItem value="preview">
        <AccordionTrigger className="py-2 text-sm">Preview</AccordionTrigger>
        <AccordionContent className="text-xs text-muted-foreground">Content</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  Alert: (
    <Alert className="w-full max-w-sm py-2">
      <AlertTitle className="text-sm">Alert</AlertTitle>
      <AlertDescription className="text-xs">Live preview</AlertDescription>
    </Alert>
  ),
  "Alert Dialog": <Button size="sm">Open alert dialog</Button>,
  "Aspect Ratio": (
    <AspectRatio ratio={16 / 9} className="w-full max-w-[12rem] overflow-hidden rounded-md bg-muted">
      <div className="flex size-full items-center justify-center text-xs text-muted-foreground">16:9</div>
    </AspectRatio>
  ),
  Avatar: (
    <Avatar>
      <AvatarFallback>UI</AvatarFallback>
    </Avatar>
  ),
  Badge: <Badge variant="secondary">Badge</Badge>,
  Breadcrumb: (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Home</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  Bubble: <Bubble className="max-w-[10rem] text-sm">Hello</Bubble>,
  Button: (
    <Button size="default" variant="outline">
      Button
    </Button>
  ),
  "Button Group": (
    <div className="inline-flex rounded-md shadow-xs">
      <Button size="sm" className="rounded-r-none">
        One
      </Button>
      <Button size="sm" variant="outline" className="rounded-l-none border-l-0">
        Two
      </Button>
    </div>
  ),
  Calendar: <Button size="sm" variant="outline">Pick a date</Button>,
  Card: (
    <div className="w-full max-w-xs rounded-xl border border-border bg-card p-4 text-sm shadow-xs">
      <p className="font-medium">Card title</p>
      <p className="text-xs text-muted-foreground">Card description</p>
    </div>
  ),
  Carousel: <Button size="sm" variant="ghost">‹ Slide ›</Button>,
  Chart: (
    <div className="flex h-16 w-28 items-end gap-1">
      {[40, 65, 35, 80, 55].map((h, i) => (
        <div key={i} className="flex-1 rounded-sm bg-primary/80" style={{ height: `${String(h)}%` }} />
      ))}
    </div>
  ),
  Checkbox: (
    <div className="flex items-center gap-2">
      <Checkbox id="catalog-checkbox" defaultChecked />
      <Label htmlFor="catalog-checkbox" className="text-sm font-normal">
        Accept
      </Label>
    </div>
  ),
  Collapsible: <Button size="sm" variant="outline">Toggle section</Button>,
  Combobox: <Input className="max-w-xs" placeholder="Search…" readOnly />,
  Command: <Input className="max-w-xs font-mono text-xs" placeholder="Type a command…" readOnly />,
  "Context Menu": <Button size="sm" variant="secondary">Right click</Button>,
  "Data Table": (
    <div className="w-full max-w-xs overflow-hidden rounded-md border text-xs">
      <div className="grid grid-cols-2 gap-2 border-b bg-muted/50 px-3 py-2 font-medium">
        <span>Name</span>
        <span>Status</span>
      </div>
      <div className="grid grid-cols-2 gap-2 px-3 py-2">
        <span>Row</span>
        <span>Active</span>
      </div>
    </div>
  ),
  "Date Picker": <Button size="sm" variant="outline">Jan 1, 2026</Button>,
  Dialog: <Button size="sm">Open dialog</Button>,
  Drawer: <Button size="sm" variant="outline">Open drawer</Button>,
  "Dropdown Menu": <Button size="sm" variant="outline">Menu ▾</Button>,
  Empty: (
    <Empty className="max-w-xs border-none p-0">
      <EmptyTitle className="text-sm">No items</EmptyTitle>
      <EmptyDescription className="text-xs">Empty state</EmptyDescription>
    </Empty>
  ),
  Field: (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      <Label className="text-sm">Email</Label>
      <Input type="email" placeholder="you@example.com" readOnly />
    </div>
  ),
  "Hover Card": <Button size="sm" variant="link">Hover me</Button>,
  Input: <Input className="max-w-xs" placeholder="Email" readOnly />,
  "Input Group": (
    <div className="flex max-w-xs overflow-hidden rounded-md border shadow-xs">
      <span className="flex items-center bg-muted px-3 text-xs text-muted-foreground">https://</span>
      <Input className="border-0 shadow-none" placeholder="site.com" readOnly />
    </div>
  ),
  "Input OTP": (
    <div className="flex gap-2">
      {["1", "2", "3", "4"].map((d) => (
        <div
          key={d}
          className="flex size-9 items-center justify-center rounded-md border text-sm font-medium"
        >
          {d}
        </div>
      ))}
    </div>
  ),
  Item: (
    <Item className="max-w-xs">
      <ItemContent>
        <ItemTitle className="text-sm">List item</ItemTitle>
      </ItemContent>
    </Item>
  ),
  Kbd: <Kbd>⌘K</Kbd>,
  Marker: (
    <Marker className="max-w-[11rem]">
      <MarkerContent>Marker text</MarkerContent>
    </Marker>
  ),
  Menubar: (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  ),
  Message: (
    <Message className="max-w-xs">
      <MessageContent className="text-sm">Message preview</MessageContent>
    </Message>
  ),
  "Message Scroller": (
    <div className="flex max-h-20 w-full max-w-xs flex-col gap-2 overflow-hidden rounded-lg border p-2 text-xs">
      <Bubble className="self-start text-xs">Hi</Bubble>
      <Bubble className="self-end text-xs">Hello</Bubble>
    </div>
  ),
  "Native Select": (
    <select className="h-9 max-w-xs rounded-md border bg-background px-3 text-sm" defaultValue="a">
      <option value="a">Option A</option>
    </select>
  ),
  "Navigation Menu": (
    <nav className="flex gap-4 text-sm font-medium">
      <span>Product</span>
      <span className="text-muted-foreground">Docs</span>
    </nav>
  ),
  Pagination: (
    <div className="flex items-center gap-1 text-sm">
      <Button size="icon-sm" variant="outline" disabled>
        ‹
      </Button>
      <Button size="icon-sm" variant="secondary">
        1
      </Button>
      <Button size="icon-sm" variant="outline">
        ›
      </Button>
    </div>
  ),
  Popover: <Button size="sm" variant="outline">Open popover</Button>,
  Progress: <Progress value={45} className="w-full max-w-[12rem]" />,
  "Radio Group": (
    <RadioGroup defaultValue="a" className="flex gap-4">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="a" id="catalog-radio-a" />
        <Label htmlFor="catalog-radio-a" className="text-sm font-normal">
          A
        </Label>
      </div>
    </RadioGroup>
  ),
  "Scroll Area": (
    <div className="h-16 w-full max-w-xs overflow-y-auto rounded-md border p-2 text-xs">
      {Array.from({ length: 6 }, (_, i) => (
        <p key={i} className="py-0.5">
          Line {i + 1}
        </p>
      ))}
    </div>
  ),
  Select: <Button size="sm" variant="outline" className="min-w-[8rem] justify-between">Select ▾</Button>,
  Separator: (
    <div className="flex w-full max-w-xs items-center gap-3 text-xs text-muted-foreground">
      <span>Left</span>
      <Separator className="flex-1" />
      <span>Right</span>
    </div>
  ),
  Sheet: <Button size="sm" variant="outline">Open sheet</Button>,
  Sidebar: (
    <div className="flex h-20 w-full max-w-[10rem] flex-col gap-1 rounded-md border bg-sidebar p-2 text-xs">
      <span className="font-medium">App</span>
      <span className="text-muted-foreground">Home</span>
    </div>
  ),
  Skeleton: <Skeleton className="h-8 w-full max-w-[10rem]" />,
  Slider: <Slider defaultValue={[40]} max={100} step={1} className="w-full max-w-[12rem]" />,
  Sonner: <Button size="sm" variant="secondary">Show toast</Button>,
  Spinner: <Spinner className="size-8" />,
  Switch: <Switch defaultChecked aria-label="Preview switch" />,
  Table: (
    <table className="w-full max-w-xs text-left text-xs">
      <thead>
        <tr className="border-b">
          <th className="py-1.5 pr-4 font-medium">Col</th>
          <th className="py-1.5 font-medium">Val</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-1.5 pr-4">A</td>
          <td className="py-1.5">1</td>
        </tr>
      </tbody>
    </table>
  ),
  Tabs: (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <div className="inline-flex h-9 w-fit items-center rounded-lg bg-muted p-1 text-xs">
        <span className={cn("rounded-md bg-background px-3 py-1 shadow-xs")}>Tab</span>
        <span className="px-3 py-1 text-muted-foreground">Other</span>
      </div>
    </div>
  ),
  Textarea: <Textarea className="max-w-xs resize-none" rows={2} placeholder="Notes…" readOnly />,
  Toggle: <Toggle size="sm" aria-label="Preview toggle">B</Toggle>,
  "Toggle Group": (
    <div className="inline-flex rounded-md border p-0.5">
      <Toggle size="sm" pressed aria-label="Left">
        L
      </Toggle>
      <Toggle size="sm" aria-label="Right">
        R
      </Toggle>
    </div>
  ),
  Tooltip: (
    <Button size="sm" variant="outline">
      Hover tooltip
    </Button>
  )
}

const PREVIEWS_BY_STORY_TITLE: Record<string, React.ReactNode> = {
  "Atoms/Box": (
    <div className="rounded-md border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm">
      Box
    </div>
  ),
  "Atoms/Stack": (
    <div className="flex flex-col gap-1.5">
      <div className="h-2 w-20 rounded bg-muted-foreground/30" />
      <div className="h-2 w-16 rounded bg-muted-foreground/20" />
      <div className="h-2 w-24 rounded bg-muted-foreground/25" />
    </div>
  ),
  "Atoms/Container": (
    <div className="w-full max-w-[10rem] rounded-md border bg-muted/30 px-3 py-2 text-center text-xs">
      Container
    </div>
  ),
  "Atoms/DndInput": (
    <div className="flex w-full max-w-xs flex-col items-center justify-center rounded-lg border border-dashed px-4 py-6 text-xs text-muted-foreground">
      Drop files here
    </div>
  ),
  "Form/MultiSelect": <Button size="sm" variant="outline">Multi select ▾</Button>,
  "Atoms/PageLoader": <Spinner className="size-8" />,
  "Atoms/Resizable": (
    <div className="flex h-14 w-full max-w-xs overflow-hidden rounded-md border">
      <div className="flex flex-1 items-center justify-center bg-muted/30 text-xs">A</div>
      <div className="w-px bg-border" />
      <div className="flex flex-1 items-center justify-center text-xs">B</div>
    </div>
  ),
  "Atoms/Toaster": <Button size="sm" variant="secondary">Toaster</Button>,
  "Atoms/Typography": (
    <div className="flex flex-col gap-0.5 text-center">
      <Typography variant="large">Heading</Typography>
      <Typography variant="muted">Body text</Typography>
    </div>
  ),
  "Form/Form": <Button size="sm">Submit form</Button>
}

export function getComponentPreview(options: {
  catalogName: string | null
  title: string
  label: string
}): React.ReactNode {
  const catalogKey = options.catalogName as CatalogComponent | undefined
  if (catalogKey && PREVIEWS[catalogKey]) return PREVIEWS[catalogKey]
  if (PREVIEWS_BY_STORY_TITLE[options.title]) return PREVIEWS_BY_STORY_TITLE[options.title]
  return <PreviewPlaceholder name={options.label} />
}
