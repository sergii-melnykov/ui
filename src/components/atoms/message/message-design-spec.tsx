/**
 * Storybook-only layout mirroring the Figma Message documentation page.
 */

import * as React from "react"
import {
  ArrowUpRight,
  CircleFadingPlus,
  Copy,
  Download,
  FileText,
  RefreshCw,
  ThumbsDown,
  ThumbsUp
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar/avatar"
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle
} from "@/components/atoms/attachment/attachment"
import { Bubble, BubbleContent } from "@/components/atoms/bubble/bubble"
import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"

import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader
} from "./message"

const AVATAR_A = "/message/avatar-1.png"
const AVATAR_B = "/message/avatar-2.png"
const AVATAR_C = "/message/avatar-3.png"
const COVER_IMAGE = "/message/cover.png"

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

function UserAvatar({ src, fallback }: { src: string; fallback: string }) {
  return (
    <Avatar className="size-8">
      <AvatarImage src={src} alt="" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}

export function MessageDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Message</h1>
          <p className="text-base text-muted-foreground">
            Displays a message in a conversation, with optional avatar, header, footer, and
            alignment.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/radix/message"
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
          <h3 className="text-xl font-semibold text-foreground">Message header</h3>
          <div className="pt-4">
            <MessageHeader>Message header</MessageHeader>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">Message footer</h3>
          <div className="pt-4">
            <MessageFooter>
              <span>
                Message <span className="font-normal">footer</span>
              </span>
              <Button variant="ghost" size="icon" className="size-6 shrink-0" aria-label="More">
                <CircleFadingPlus className="size-3" />
              </Button>
            </MessageFooter>
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Avatar"
          description={
            <>
              Use <code className="text-sm">MessageAvatar</code> to render an avatar next to the
              message. Set <code className="text-sm">align=&quot;end&quot;</code> on the message to
              align the avatar to the end of the message.
            </>
          }
        >
          <PreviewBox>
            <MessageGroup className="w-full gap-6">
              <Message>
                <MessageAvatar>
                  <UserAvatar src={AVATAR_A} fallback="A" />
                </MessageAvatar>
                <MessageContent>
                  <Bubble variant="secondary">
                    <BubbleContent>
                      The build failed during dependency installation.
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
              <Message align="end">
                <MessageAvatar>
                  <UserAvatar src={AVATAR_B} fallback="B" />
                </MessageAvatar>
                <MessageContent>
                  <Bubble variant="primary">
                    <BubbleContent>Can you share the exact error?</BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
              <Message>
                <MessageAvatar>
                  <UserAvatar src={AVATAR_A} fallback="A" />
                </MessageAvatar>
                <MessageContent>
                  <Bubble variant="secondary">
                    <BubbleContent>Here&apos;s the error from the logs</BubbleContent>
                  </Bubble>
                  <Bubble variant="secondary">
                    <BubbleContent>
                      Something went wrong with the build. The libraries are not installed
                      correctly. Try running the build again.
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            </MessageGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Group"
          description={
            <>
              Use <code className="text-sm">MessageGroup</code> to stack consecutive messages from
              the same sender. Render an empty <code className="text-sm">MessageAvatar</code> on the
              earlier messages to keep them aligned with the avatar on the last one.
            </>
          }
        >
          <PreviewBox>
            <MessageGroup className="w-full">
              <Message>
                <MessageAvatar aria-hidden />
                <MessageContent>
                  <Bubble variant="secondary">
                    <BubbleContent>I checked the registry addresses.</BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
              <Message>
                <MessageAvatar>
                  <UserAvatar src={AVATAR_C} fallback="C" />
                </MessageAvatar>
                <MessageContent>
                  <Bubble variant="secondary">
                    <BubbleContent>
                      The component and example JSON now live under the UI registry.
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            </MessageGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Header and Footer"
          description={
            <>
              Use <code className="text-sm">MessageHeader</code> for a sender name and{" "}
              <code className="text-sm">MessageFooter</code> for metadata such as a delivery or read
              status.
            </>
          }
        >
          <PreviewBox>
            <MessageGroup className="w-full gap-8">
              <Message>
                <MessageContent>
                  <MessageHeader>Olivia</MessageHeader>
                  <Bubble variant="secondary">
                    <BubbleContent>I already checked the logs.</BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
              <Message align="end">
                <MessageContent>
                  <Bubble variant="primary">
                    <BubbleContent>
                      Send the report to the team. Ping @shadcn if you need help.
                    </BubbleContent>
                  </Bubble>
                  <MessageFooter>
                    <span>
                      Read <span className="font-normal">yesterday</span>
                    </span>
                  </MessageFooter>
                </MessageContent>
              </Message>
            </MessageGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Actions"
          description={
            <>
              Place message-level actions in <code className="text-sm">MessageFooter</code>, such as
              copy, retry, or feedback buttons.
            </>
          }
        >
          <PreviewBox>
            <MessageGroup className="w-full gap-8">
              <Message>
                <MessageContent>
                  <Bubble variant="secondary">
                    <BubbleContent>
                      The install failure is coming from the workspace package.
                    </BubbleContent>
                  </Bubble>
                  <MessageFooter className="gap-0 px-0">
                    <Button variant="ghost" size="icon" className="size-8" aria-label="Copy">
                      <Copy className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8" aria-label="Like">
                      <ThumbsUp className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8" aria-label="Dislike">
                      <ThumbsDown className="size-4" />
                    </Button>
                  </MessageFooter>
                </MessageContent>
              </Message>
              <Message align="end">
                <MessageContent>
                  <Bubble variant="primary">
                    <BubbleContent>Okay drop me a link. Taking a look...</BubbleContent>
                  </Bubble>
                  <MessageFooter>
                    <span className="text-destructive">Failed to send</span>
                    <Button variant="ghost" size="icon" className="size-6" aria-label="Retry">
                      <RefreshCw className="size-3" />
                    </Button>
                  </MessageFooter>
                </MessageContent>
              </Message>
            </MessageGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Attachment" description="Combine bubbles with file and image attachments.">
          <PreviewBox>
            <MessageGroup className="w-full gap-8">
              <Message align="end">
                <MessageContent>
                  <Attachment orientation="vertical">
                    <AttachmentMedia variant="image">
                      <img src={COVER_IMAGE} alt="" className="size-full object-cover" />
                    </AttachmentMedia>
                  </Attachment>
                  <Bubble variant="primary">
                    <BubbleContent>
                      Here&apos;s the image. Can you add it to the PDF? Use it for the cover page.
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
              <Message>
                <MessageContent>
                  <Bubble variant="secondary">
                    <BubbleContent>
                      Done. Here&apos;s the PDF with the image added as the cover page.
                    </BubbleContent>
                  </Bubble>
                  <Attachment>
                    <AttachmentMedia>
                      <FileText />
                    </AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
                      <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
                    </AttachmentContent>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-7 shrink-0 rounded-full"
                      aria-label="Download"
                    >
                      <Download className="size-4" />
                    </Button>
                  </Attachment>
                </MessageContent>
              </Message>
              <Message align="end">
                <MessageContent>
                  <Bubble variant="primary">
                    <BubbleContent>Thanks. Looks good.</BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            </MessageGroup>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
