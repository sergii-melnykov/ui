/**
 * Storybook-only layout mirroring the Figma Attachment documentation page.
 */

import * as React from "react"
import {
  ArrowUpRight,
  Check,
  CircleFadingPlus,
  Clock,
  Copy,
  FileCode,
  FileSearch,
  FileText,
  Loader2,
  RefreshCw,
  Table,
  X
} from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import {
  Attachment,
  type AttachmentState,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger
} from "./attachment"

const ATTACHMENT_IMAGES = {
  workspace: "/attachment/workspace.png",
  desk: "/attachment/desk-reference.jpg",
  office: "/attachment/office-reference.jpg"
} as const

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
  rowClassName = "h-10"
}: {
  rows: string[]
  rowClassName?: string
}) {
  return (
    <div className="flex min-w-[280px] flex-col gap-6 pt-14">
      {rows.map((row) => (
        <div key={row} className={cn("flex items-center gap-2.5", rowClassName)}>
          <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">{row}</span>
          <div className="h-full w-3 border-l border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function ColumnHeaders({ labels }: { labels: readonly string[] }) {
  return (
    <div className={cn("grid gap-6", labels.length === 2 ? "grid-cols-2" : "grid-cols-3")}>
      {labels.map((label) => (
        <div key={label} className="flex flex-col items-center gap-2.5">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <div className="h-3 w-full border-b border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function MoreActionButton() {
  return (
    <Button variant="secondary" size="icon" className="size-7 shrink-0" aria-label="More">
      <CircleFadingPlus className="size-4" />
    </Button>
  )
}

function HorizontalAttachmentDemo({
  dir = "ltr",
  title = "Attachment title",
  description = "Attachment description"
}: {
  dir?: "ltr" | "rtl"
  title?: string
  description?: string
}) {
  return (
    <Attachment dir={dir} className="w-full max-w-sm">
      <AttachmentMedia>
        <FileText />
      </AttachmentMedia>
      <AttachmentContent className={dir === "rtl" ? "items-end text-right" : undefined}>
        <AttachmentTitle>{title}</AttachmentTitle>
        <AttachmentDescription>{description}</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Complete">
          <Check className="size-4" />
        </AttachmentAction>
        <AttachmentAction aria-label="Remove">
          <X className="size-4" />
        </AttachmentAction>
        <MoreActionButton />
      </AttachmentActions>
    </Attachment>
  )
}

function VerticalAttachmentDemo({
  dir = "ltr",
  title = "Attachment title",
  description = "Attachment description"
}: {
  dir?: "ltr" | "rtl"
  title?: string
  description?: string
}) {
  return (
    <Attachment orientation="vertical" dir={dir}>
      <AttachmentMedia variant="image">
        <img src={ATTACHMENT_IMAGES.workspace} alt="" />
      </AttachmentMedia>
      <AttachmentContent className={dir === "rtl" ? "items-end text-right" : undefined}>
        <AttachmentTitle>{title}</AttachmentTitle>
        <AttachmentDescription>{description}</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  )
}

function FileAttachmentRow({
  state = "done",
  title,
  description,
  media,
  actions
}: {
  state?: AttachmentState
  title: string
  description: string
  media: React.ReactNode
  actions?: React.ReactNode
}) {
  return (
    <Attachment state={state} className="w-full max-w-sm">
      <AttachmentMedia>{media}</AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{title}</AttachmentTitle>
        <AttachmentDescription>{description}</AttachmentDescription>
      </AttachmentContent>
      {actions ? <AttachmentActions>{actions}</AttachmentActions> : null}
    </Attachment>
  )
}

function DefaultFileActions({ includeRetry = false }: { includeRetry?: boolean }) {
  if (includeRetry) {
    return (
      <>
        <AttachmentAction aria-label="Retry">
          <RefreshCw className="size-4" />
        </AttachmentAction>
        <AttachmentAction aria-label="Remove">
          <X className="size-4" />
        </AttachmentAction>
        <MoreActionButton />
      </>
    )
  }

  return (
    <>
      <AttachmentAction aria-label="Remove">
        <X className="size-4" />
      </AttachmentAction>
      <MoreActionButton />
    </>
  )
}

export function AttachmentDesignSpec() {
  const mediaStates = ["Default", "Destructive"] as const
  const mediaSizes = ["default", "sm", "xs"] as const
  const mediaSizeLabels = ["Large", "Medium", "Small"] as const

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold leading-10 text-foreground">Attachment</h1>
          <p className="text-base text-muted-foreground">
            Displays a file or image attachment with media, metadata, upload state, and actions.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/base/attachment"
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

        <SpecSection title="Attachment Media">
          <VariantGrid>
            <MatrixLabels rows={[...mediaStates]} />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <ColumnHeaders labels={mediaSizeLabels} />
              <div className="flex flex-col gap-6">
                {mediaStates.map((mediaState) => (
                  <div key={mediaState} className="grid grid-cols-3 gap-6">
                    {mediaSizes.map((size) => (
                      <AttachmentMedia
                        key={`${mediaState}-${size}`}
                        size={size}
                        state={mediaState === "Destructive" ? "destructive" : "default"}
                      >
                        <FileText />
                      </AttachmentMedia>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Attachment">
          <VariantGrid>
            <MatrixLabels rows={["Horizontal", "Vertical"]} rowClassName="h-[78px]" />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <ColumnHeaders labels={["LTR", "RTL"]} />
              <div className="grid grid-cols-2 gap-6">
                <HorizontalAttachmentDemo />
                <HorizontalAttachmentDemo dir="rtl" />
                <VerticalAttachmentDemo />
                <VerticalAttachmentDemo dir="rtl" />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Image"
          description={
            <>
              Set <code>variant=&quot;image&quot;</code> on <code>AttachmentMedia</code> and render an{" "}
              <code>&lt;img&gt;</code> inside it. Use <code>orientation=&quot;vertical&quot;</code> to stack
              the media above the content.
            </>
          }
        >
          <PreviewBox>
            <div className="flex flex-wrap justify-center gap-3">
              <Attachment orientation="vertical">
                <AttachmentMedia variant="image">
                  <img src={ATTACHMENT_IMAGES.workspace} alt="" />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>workspace.png</AttachmentTitle>
                  <AttachmentDescription>PNG · 820 KB</AttachmentDescription>
                </AttachmentContent>
              </Attachment>
              <Attachment orientation="vertical">
                <AttachmentMedia variant="image">
                  <img src={ATTACHMENT_IMAGES.desk} alt="" />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>desk-reference.jpg</AttachmentTitle>
                  <AttachmentDescription>JPG · 1.1 MB</AttachmentDescription>
                </AttachmentContent>
              </Attachment>
              <Attachment orientation="vertical">
                <AttachmentMedia variant="image">
                  <img src={ATTACHMENT_IMAGES.office} alt="" />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>office-reference.jpg</AttachmentTitle>
                  <AttachmentDescription>JPG · 940 KB</AttachmentDescription>
                </AttachmentContent>
              </Attachment>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="States"
          description={
            <>
              Set <code>state</code> to reflect the upload lifecycle. <code>uploading</code> and{" "}
              <code>processing</code> shimmer the title, and <code>error</code> switches to a destructive
              treatment.
            </>
          }
        >
          <PreviewBox>
            <div className="flex w-full max-w-sm flex-col gap-2">
              <FileAttachmentRow
                state="idle"
                title="selected-file.pdf"
                description="Ready to upload"
                media={<Clock className="size-4" />}
                actions={<DefaultFileActions />}
              />
              <FileAttachmentRow
                state="uploading"
                title="design-system.zip"
                description="Uploading · 64%"
                media={<Loader2 className="size-4 animate-spin" />}
                actions={<DefaultFileActions />}
              />
              <FileAttachmentRow
                state="processing"
                title="market-research.pdf"
                description="Processing document"
                media={<FileText className="size-4" />}
                actions={<DefaultFileActions />}
              />
              <FileAttachmentRow
                state="error"
                title="financial-model.xlsx"
                description="Upload failed. Try again."
                media={<FileText className="size-4" />}
                actions={<DefaultFileActions includeRetry />}
              />
              <FileAttachmentRow
                state="done"
                title="uploaded-report.pdf"
                description="Uploaded · 1.8 MB"
                media={<Check className="size-4" />}
                actions={<DefaultFileActions />}
              />
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description={
            <>
              Use <code>size</code> to switch between <code>default</code>, <code>sm</code>, and{" "}
              <code>xs</code>.
            </>
          }
        >
          <PreviewBox>
            <div className="flex w-full max-w-sm flex-col gap-2">
              <Attachment className="w-full max-w-sm">
                <AttachmentMedia>
                  <FileText />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>Default attachment</AttachmentTitle>
                  <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <MoreActionButton />
                </AttachmentActions>
              </Attachment>
              <Attachment size="sm" className="w-full max-w-sm">
                <AttachmentMedia>
                  <FileText />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>Small attachment</AttachmentTitle>
                  <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <MoreActionButton />
                </AttachmentActions>
              </Attachment>
              <Attachment size="xs" className="w-full max-w-sm">
                <AttachmentMedia>
                  <FileText />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>Extra small attachment</AttachmentTitle>
                </AttachmentContent>
                <AttachmentActions>
                  <MoreActionButton />
                </AttachmentActions>
              </Attachment>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Group"
          description={
            <>
              Wrap attachments in <code>AttachmentGroup</code> to lay them out in a horizontally
              scrollable, snapping row with an edge fade.
            </>
          }
        >
          <PreviewBox>
            <AttachmentGroup className="w-full max-w-sm">
              <Attachment className="w-64 shrink-0">
                <AttachmentMedia>
                  <FileText />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>briefing-notes.pdf</AttachmentTitle>
                  <AttachmentDescription>PDF · 1.4 MB</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction aria-label="Remove">
                    <X className="size-4" />
                  </AttachmentAction>
                  <MoreActionButton />
                </AttachmentActions>
              </Attachment>
              <Attachment className="w-64 shrink-0">
                <AttachmentMedia className="size-10 [&_img]:size-full [&_img]:object-cover">
                  <img src={ATTACHMENT_IMAGES.workspace} alt="" />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>workspace.png</AttachmentTitle>
                  <AttachmentDescription>PNG · 820 KB</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction aria-label="Remove">
                    <X className="size-4" />
                  </AttachmentAction>
                  <MoreActionButton />
                </AttachmentActions>
              </Attachment>
              <Attachment className="w-64 shrink-0">
                <AttachmentMedia>
                  <Table className="size-4" />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>customers.csv</AttachmentTitle>
                  <AttachmentDescription>CSV · 18 KB</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction aria-label="Remove">
                    <X className="size-4" />
                  </AttachmentAction>
                  <MoreActionButton />
                </AttachmentActions>
              </Attachment>
              <Attachment className="w-64 shrink-0">
                <AttachmentMedia>
                  <FileCode className="size-4" />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>renderer.tsx</AttachmentTitle>
                  <AttachmentDescription>TSX · 12 KB</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction aria-label="Remove">
                    <X className="size-4" />
                  </AttachmentAction>
                  <MoreActionButton />
                </AttachmentActions>
              </Attachment>
            </AttachmentGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Trigger"
          description={
            <>
              Add an <code>AttachmentTrigger</code> to make the whole card open a link or dialog. It fills
              the card behind the actions, so the actions stay clickable.
            </>
          }
        >
          <PreviewBox>
            <Attachment className="w-full max-w-sm">
              <AttachmentTrigger aria-label="Open preview dialog" />
              <AttachmentMedia>
                <FileSearch className="size-4" />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>research-summary.pdf</AttachmentTitle>
                <AttachmentDescription>Open preview dialog</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="Copy">
                  <Copy className="size-4" />
                </AttachmentAction>
                <AttachmentAction aria-label="Remove">
                  <X className="size-4" />
                </AttachmentAction>
                <MoreActionButton />
              </AttachmentActions>
            </Attachment>
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
              <HorizontalAttachmentDemo
                dir="rtl"
                title="مرفق.pdf"
                description="PDF · ٢٫٤ ميغابايت"
              />
            </div>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
