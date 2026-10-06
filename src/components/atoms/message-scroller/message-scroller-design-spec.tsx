/**
 * Storybook-only layout mirroring the Figma Message Scroller documentation page.
 */

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { Bubble, BubbleContent } from "@/components/atoms/bubble/bubble"
import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import { Message, MessageContent } from "@/components/atoms/message/message"

import {
  AnchoringTurnsDemo,
  AutoScrollDemo,
  ContextPeekDemo,
  GroupChatDemo,
  JumpToMessageDemo,
  OpeningPositionDemo,
  PrependHistoryDemo,
  ScrollableStateDemo,
  VisibilityOutlineDemo
} from "./message-scroller-demos"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport
} from "./message-scroller"

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
      <div className="space-y-4 pt-4 text-base text-muted-foreground">{description}</div>
      <div className="pt-6">{children}</div>
    </div>
  )
}

const STREAMING_PRINCIPLES = [
  "Move only when the reader asked to move.",
  "Follow only while they are following.",
  "Every interaction is a signal — scrolling, selecting text, or searching should stop automatic movement.",
  "Start a new turn near the top of the viewport, then stream the answer below it.",
  "Keep part of the previous conversation visible so the reader knows where they are.",
  "Let new content arrive offscreen when the reader has scrolled away.",
  "Show what is happening out of view and make it easy to jump back to the live edge.",
  "Reopen saved threads at the last meaningful turn, not always the absolute bottom.",
  "Preserve the reader's place when layout changes or older messages prepend above.",
  "Stay responsive in long threads without moving the reader against their intent."
]

export function MessageScrollerDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Message Scroller</h1>
          <p className="text-base text-muted-foreground">
            A chat scroll container that anchors turns, opens saved transcripts, follows streamed
            responses, loads history without jumping, and jumps to any message.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/radix/message-scroller"
            target="_blank"
            rel="noreferrer"
          >
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <ExampleBlock
        title="What Makes a Great Streaming Chat Experience"
        description={
          <ul className="list-disc space-y-2 ps-5">
            {STREAMING_PRINCIPLES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        }
      >
        <p className="text-sm font-medium text-foreground">
          Never move the reader against their intent.
        </p>
      </ExampleBlock>

      <Separator />

      <ExampleBlock
        title="MessageScroller"
        description={
          <>
            <p>
              <code className="text-foreground">MessageScrollerProvider</code> owns scroll state and
              transcript behavior. <code className="text-foreground">MessageScroller</code> is the
              styled frame for the viewport, content, and controls.
            </p>
            <p>
              The primitive is scoped to the scroll viewport — your product code still composes
              messages, markers, tools, and prompt inputs.
            </p>
          </>
        }
      >
        <PreviewBox>
          <div className="h-64 w-full max-w-sm">
            <MessageScrollerProvider>
              <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent>
                  <MessageScrollerItem messageId="demo-1" scrollAnchor>
                    <Message align="end" className="px-5">
                      <MessageContent className="max-w-[85%]">
                        <Bubble variant="secondary" align="end">
                          <BubbleContent>User turn anchor</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                  <MessageScrollerItem messageId="demo-2">
                    <Message align="start" className="px-5">
                      <MessageContent className="max-w-[85%]">
                        <Bubble variant="secondary" align="start">
                          <BubbleContent>Assistant reply streams here</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
              </MessageScroller>
            </MessageScrollerProvider>
          </div>
        </PreviewBox>
      </ExampleBlock>

      <Separator />

      <div className="flex flex-col gap-16">
        <ExampleBlock
          title="Anchoring Turns"
          description={
            <>
              <p>
                A turn is the part of the conversation that starts a new exchange. Mark the row that
                should anchor the viewport with <code className="text-foreground">scrollAnchor</code>
                .
              </p>
              <p>
                Scroll anchors are not tied to message role — you can anchor a user message, a
                system marker, or any row that starts a meaningful turn.
              </p>
            </>
          }
        >
          <PreviewBox>
            <AnchoringTurnsDemo />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Group Chat"
          description={
            <>
              <p>
                In a group chat, the turn boundary is often the message that asks the model to
                respond, or a marker like &quot;Marcus joined the chat&quot;.
              </p>
              <p>Because anchoring is role-independent, you can anchor a marker just as easily as a message.</p>
            </>
          }
        >
          <PreviewBox>
            <GroupChatDemo />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Keeping Context Visible"
          description={
            <p>
              <code className="text-foreground">scrollPreviousItemPeek</code> keeps a slice of the
              previous item visible above the anchor so the thread still feels continuous.
            </p>
          }
        >
          <PreviewBox>
            <ContextPeekDemo />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Following the Live Edge"
          description={
            <p>
              With <code className="text-foreground">autoScroll</code>, streamed replies stay in
              view while the reader remains at the live edge. Scrolling away releases follow-output
              until they jump back.
            </p>
          }
        >
          <PreviewBox>
            <AutoScrollDemo />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Opening Saved Threads"
          description={
            <p>
              Use <code className="text-foreground">defaultScrollPosition</code> to reopen at{" "}
              <code className="text-foreground">start</code>,{" "}
              <code className="text-foreground">end</code>, or{" "}
              <code className="text-foreground">last-anchor</code> — the last meaningful turn.
            </p>
          }
        >
          <PreviewBox>
            <OpeningPositionDemo />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Loading Earlier Messages"
          description={
            <p>
              When older rows prepend above the transcript, the viewport preserves the visible row so
              the reader stays in place.
            </p>
          }
        >
          <PreviewBox>
            <PrependHistoryDemo />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Jumping to Messages"
          description={
            <p>
              Use <code className="text-foreground">useMessageScroller()</code> from controls
              outside the frame to jump to any <code className="text-foreground">messageId</code>.
            </p>
          }
        >
          <PreviewBox>
            <JumpToMessageDemo />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Tracking the Reader&apos;s Position"
          description={
            <p>
              <code className="text-foreground">useMessageScrollerVisibility()</code> exposes{" "}
              <code className="text-foreground">currentAnchorId</code> and{" "}
              <code className="text-foreground">visibleMessageIds</code> for outlines and jump menus.
            </p>
          }
        >
          <PreviewBox>
            <VisibilityOutlineDemo />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Reading Scroll State"
          description={
            <p>
              <code className="text-foreground">useMessageScrollerScrollable()</code> reports which
              edges the viewport can still scroll toward.
            </p>
          }
        >
          <PreviewBox>
            <ScrollableStateDemo />
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
