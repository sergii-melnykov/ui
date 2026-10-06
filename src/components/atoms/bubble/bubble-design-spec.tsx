/**
 * Storybook-only layout mirroring the Figma Bubble documentation page.
 */

"use client"

import * as React from "react"
import { ArrowUpRight, Check, ChevronDown, Info } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/atoms/collapsible/collapsible"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/atoms/popover/popover"
import { Separator } from "@/components/atoms/separator/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/atoms/tooltip/tooltip"
import { cn } from "@/utils/index"

import {
  Bubble,
  BubbleContent,
  BubbleFooter,
  BubbleGroup,
  BubbleReaction,
  BubbleReactions
} from "./bubble"

const LONG_BUBBLE_COLLAPSED =
  "The accessibility review found two focus states that were visually too subtle in dark mode.\n\nI checked the dialog, menu, and drawer paths because each one renders focusable control..."

const LONG_BUBBLE_EXPANDED = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`

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

function MatrixLabels({ rows }: { rows: { label: string; className?: string }[] }) {
  return (
    <div className="flex flex-col gap-6">
      {rows.map(({ label, className }) => (
        <div
          key={label}
          className={cn("flex h-10 items-center gap-2.5", className)}
        >
          <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">
            {label}
          </span>
          <div className="h-full w-3 border-l border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

export function BubbleDesignSpec() {
  return (
    <TooltipProvider>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold leading-9 text-foreground">Bubble</h1>
            <p className="text-base text-muted-foreground">
              Displays conversational content in a message bubble. Supports variants, alignment,
              grouping, reactions, and collapsible content.
            </p>
          </div>
          <Button variant="outline" className="shrink-0 shadow-xs" asChild>
            <a
              href="https://ui.shadcn.com/docs/components/radix/bubble"
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

          <div>
            <h3 className="text-xl font-semibold text-foreground">Bubble</h3>
            <div className="mt-4 flex flex-wrap gap-4 rounded-xl border border-dashed border-border p-5">
              <MatrixLabels
                rows={[
                  { label: "Primary" },
                  { label: "Secondary" },
                  { label: "Muted", className: "h-[60px]" },
                  { label: "Tinted", className: "h-[60px]" },
                  { label: "Outline" },
                  { label: "Destructive" }
                ]}
              />
              <div className="flex min-w-0 flex-1 flex-col gap-6">
                <Bubble variant="primary">
                  <BubbleContent>This is the default primary bubble.</BubbleContent>
                </Bubble>
                <Bubble variant="secondary">
                  <BubbleContent>This is the secondary variant.</BubbleContent>
                </Bubble>
                <Bubble variant="muted">
                  <BubbleContent>
                    {`This one is muted. It uses a lower emphasis color for the chat bubble.`}
                  </BubbleContent>
                </Bubble>
                <Bubble variant="tinted">
                  <BubbleContent>
                    {`This one is tinted. The tint is a softer color derived from the primary color.`}
                  </BubbleContent>
                </Bubble>
                <Bubble variant="outline">
                  <BubbleContent>We can also use an outlined variant.</BubbleContent>
                </Bubble>
                <Bubble variant="destructive">
                  <BubbleContent>Or a destructive variant with a reaction.</BubbleContent>
                </Bubble>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground">Bubble Reaction</h3>
            <BubbleReaction className="mt-4 w-fit">
              <span>👍</span>
              <span>😮</span>
              <span>+2</span>
            </BubbleReaction>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-10">
          <h2 className="text-xl font-semibold text-foreground">Examples</h2>

          <ExampleBlock
            title="Variants"
            description="Use variant to change the visual treatment of the bubble."
          >
            <PreviewBox>
              <div className="flex w-full max-w-md flex-col gap-12">
                <Bubble variant="primary">
                  <BubbleContent>This is the default primary bubble.</BubbleContent>
                </Bubble>
                <Bubble variant="secondary">
                  <BubbleContent>This is the secondary variant.</BubbleContent>
                </Bubble>
                <div className="flex w-full flex-col items-end">
                  <Bubble variant="muted" className="relative z-[1] mb-[-4px]">
                    <BubbleContent>
                      {`This one is muted. It uses a lower emphasis color for the chat bubble.`}
                    </BubbleContent>
                  </Bubble>
                  <BubbleReactions align="end">
                    <BubbleReaction>👍</BubbleReaction>
                  </BubbleReactions>
                </div>
                <Bubble variant="tinted">
                  <BubbleContent>
                    {`This one is tinted. The tint is a softer color derived from the primary color.`}
                  </BubbleContent>
                </Bubble>
                <Bubble variant="outline">
                  <BubbleContent>We can also use an outlined variant.</BubbleContent>
                </Bubble>
                <div className="flex w-full flex-col items-end">
                  <Bubble variant="destructive" className="relative z-[1] mb-[-4px]">
                    <BubbleContent>Or a destructive variant with a reaction.</BubbleContent>
                  </Bubble>
                  <BubbleReactions align="end">
                    <BubbleReaction>🔥</BubbleReaction>
                  </BubbleReactions>
                </div>
              </div>
            </PreviewBox>
          </ExampleBlock>

          <ExampleBlock
            title="Alignment"
            description="Use align on Bubble to align the bubble to the start or end of the conversation."
          >
            <PreviewBox>
              <div className="flex w-full flex-col gap-8">
                <Bubble variant="secondary" align="start">
                  <BubbleContent>
                    {`This bubble is aligned to the start. This is the default alignment.`}
                  </BubbleContent>
                </Bubble>
                <Bubble variant="primary" align="end">
                  <BubbleContent>
                    {`This bubble is aligned to the end. Use this for user messages.`}
                  </BubbleContent>
                </Bubble>
              </div>
            </PreviewBox>
          </ExampleBlock>

          <ExampleBlock
            title="Bubble Group"
            description="Use BubbleGroup to group consecutive bubbles from the same sender. Note the align prop should be set on the Bubble component itself, not the BubbleGroup component."
          >
            <PreviewBox>
              <div className="flex w-full flex-col gap-8">
                <Bubble variant="secondary" align="start">
                  <BubbleContent>{`Can you tell me what's the issue?`}</BubbleContent>
                </Bubble>
                <BubbleGroup className="items-end">
                  <Bubble variant="primary" align="end">
                    <BubbleContent>You tell me!</BubbleContent>
                  </Bubble>
                  <Bubble variant="primary" align="end">
                    <BubbleContent>It worked yesterday. You broke it!</BubbleContent>
                  </Bubble>
                  <div className="flex w-full flex-col items-end">
                    <Bubble variant="primary" align="end" className="relative z-[1] mb-[-4px]">
                      <BubbleContent>Find the bug and fix it.</BubbleContent>
                    </Bubble>
                    <BubbleReactions align="start">
                      <BubbleReaction>👍</BubbleReaction>
                    </BubbleReactions>
                  </div>
                </BubbleGroup>
                <Bubble variant="secondary" align="start">
                  <BubbleContent>
                    {`Want me to diff yesterday's you against today's you? It's a bit embarrassing.`}
                  </BubbleContent>
                </Bubble>
              </div>
            </PreviewBox>
          </ExampleBlock>

          <ExampleBlock
            title="Links and Buttons"
            description="You can turn a bubble into a link or button by using the asChild prop on BubbleContent."
          >
            <PreviewBox>
              <div className="flex w-full flex-col gap-8">
                <Bubble variant="secondary" align="start">
                  <BubbleContent>How can I help you today?</BubbleContent>
                </Bubble>
                <BubbleGroup className="items-end">
                  <Bubble variant="tinted" align="end">
                    <BubbleContent asChild>
                      <button type="button" className="text-left">
                        I forgot my password.
                      </button>
                    </BubbleContent>
                  </Bubble>
                  <Bubble variant="tinted" align="end">
                    <BubbleContent asChild>
                      <button type="button" className="text-left">
                        I need help with my subscription
                      </button>
                    </BubbleContent>
                  </Bubble>
                  <Bubble variant="tinted" align="end">
                    <BubbleContent asChild>
                      <button type="button" className="text-left">
                        Something else. Talk to a human.
                      </button>
                    </BubbleContent>
                  </Bubble>
                </BubbleGroup>
              </div>
            </PreviewBox>
          </ExampleBlock>

          <ExampleBlock
            title="Reactions"
            description={`Use BubbleReactions for bubble reactions. You can use it to display reactions or quick action buttons. Use side and align to position the row — side="top" anchors it to the upper edge. Reactions overlap the bubble edge, so leave vertical space between rows.`}
          >
            <PreviewBox>
              <div className="flex w-full flex-col gap-8">
                <div className="flex w-full flex-col items-end">
                  <Bubble variant="secondary" align="end" className="relative z-[1] mb-[-4px]">
                    <BubbleContent>{`I don't need tests, I know my code works.`}</BubbleContent>
                  </Bubble>
                  <BubbleReactions align="start">
                    <BubbleReaction>👍</BubbleReaction>
                  </BubbleReactions>
                </div>
                <div className="flex w-full flex-col items-start">
                  <Bubble variant="muted" align="start" className="relative z-[1] mb-[-4px]">
                    <BubbleContent>
                      {`Bold. Fine I'll add some tests. I'll let you know when they're done.`}
                    </BubbleContent>
                  </Bubble>
                  <BubbleReactions align="end">
                    <BubbleReaction>
                      <span>👀</span>
                      <span>🚀</span>
                      <span>+2</span>
                    </BubbleReaction>
                  </BubbleReactions>
                </div>
                <div className="flex w-full flex-col items-end">
                  <div className="relative flex flex-col items-start">
                    <BubbleReactions side="top" align="start" className="relative z-[2] mb-[-4px]">
                      <BubbleReaction>
                        <span>🎉</span>
                        <span>👏</span>
                      </BubbleReaction>
                    </BubbleReactions>
                    <Bubble variant="primary" align="end" className="relative z-[1]">
                      <BubbleContent>
                        {`Tests passed on the first try. All 142 of them. Looking good!`}
                      </BubbleContent>
                    </Bubble>
                  </div>
                </div>
                <div className="flex w-full flex-col items-start">
                  <Bubble variant="destructive" align="start" className="relative z-[1] mb-[-4px]">
                    <BubbleContent>Are you sure I can run this command?</BubbleContent>
                  </Bubble>
                  <BubbleReactions align="end">
                    <BubbleReaction className="h-6 px-2 text-xs font-medium">
                      Yes, run it.
                    </BubbleReaction>
                  </BubbleReactions>
                </div>
              </div>
            </PreviewBox>
          </ExampleBlock>

          <ExampleBlock
            title="Show More / Collapsible"
            description={
              <>
                Long bubble content can be composed with{" "}
                <a
                  href="https://ui.shadcn.com/docs/components/collapsible"
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Collapsible
                </a>{" "}
                to allow for a show more or show less interaction. Use the CollapsibleTrigger
                component to trigger the collapsible content.
              </>
            }
          >
            <PreviewBox>
              <div className="flex w-full flex-col gap-8">
                <Bubble variant="secondary" align="start">
                  <BubbleContent>How can I help you today?</BubbleContent>
                </Bubble>
                <Collapsible>
                  <Bubble variant="secondary" align="end" className="max-w-[292px]">
                    <BubbleContent>{LONG_BUBBLE_COLLAPSED}</BubbleContent>
                    <CollapsibleContent>
                      <BubbleContent className="pt-0">{LONG_BUBBLE_EXPANDED}</BubbleContent>
                    </CollapsibleContent>
                    <BubbleFooter>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 px-0 text-muted-foreground"
                        >
                          Show more
                          <ChevronDown className="size-4" />
                        </Button>
                      </CollapsibleTrigger>
                    </BubbleFooter>
                  </Bubble>
                </Collapsible>
              </div>
            </PreviewBox>
          </ExampleBlock>

          <ExampleBlock
            title="Tooltip"
            description="Wrap a bubble in a Tooltip to reveal metadata on hover, such as when a message was read."
          >
            <PreviewBox>
              <div className="flex w-full flex-col gap-8">
                <Bubble variant="secondary" align="start">
                  <BubbleContent>Did you remove the stale route?</BubbleContent>
                </Bubble>
                <div className="flex w-full flex-col items-end">
                  <Bubble variant="primary" align="end" className="relative z-[1] mb-[-4px]">
                    <BubbleContent>Yes, removed it from the registry.</BubbleContent>
                  </Bubble>
                  <div className="flex flex-col items-end gap-2.5 pr-3.5">
                    <Tooltip defaultOpen>
                      <TooltipTrigger asChild>
                        <span className="inline-flex size-6 items-center justify-center rounded-full border-[3px] border-card bg-muted">
                          <Check className="size-3 text-foreground" aria-hidden />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="rounded-3xl px-3 py-2 text-sm">
                        Read on Jan 5, 2026 at 4:32 PM
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </PreviewBox>
          </ExampleBlock>

          <ExampleBlock
            title="Popover"
            description="Pair a bubble with a Popover to surface more information on demand, such as the full error message for a failed action."
          >
            <PreviewBox>
              <div className="flex w-full flex-col gap-8">
                <Bubble variant="primary" align="end">
                  <BubbleContent>Run the build script.</BubbleContent>
                </Bubble>
                <div className="flex w-full flex-col items-start">
                  <Bubble variant="destructive" align="start" className="relative z-[1] mb-[-4px]">
                    <BubbleContent>Failed to run the command.</BubbleContent>
                  </Bubble>
                  <div className="flex flex-col items-end pr-3.5">
                    <Popover defaultOpen>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex size-6 items-center justify-center rounded-full border-[3px] border-card bg-muted"
                          aria-label="Show error details"
                        >
                          <Info className="size-3 text-foreground" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="end"
                        className="w-72 rounded-3xl p-4 shadow-md"
                        side="bottom"
                      >
                        <p className="text-sm font-medium text-popover-foreground">
                          Command failed with exit code 1
                        </p>
                        <p className="pt-0.5 text-sm text-muted-foreground">
                          ENOENT: no such file or directory, open pnpm-lock.yaml
                        </p>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </PreviewBox>
          </ExampleBlock>
        </div>
      </div>
    </TooltipProvider>
  )
}
