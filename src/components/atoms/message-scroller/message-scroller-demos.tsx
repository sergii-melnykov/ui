"use client"

import * as React from "react"
import {
  ArrowUp,
  MessageCircleDashed,
  Plus,
  RotateCcw
} from "lucide-react"

import { Bubble, BubbleContent } from "@/components/atoms/bubble/bubble"
import { Button } from "@/components/atoms/button/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "@/components/atoms/empty/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea
} from "@/components/atoms/input-group/input-group"
import { Marker, MarkerContent } from "@/components/atoms/marker/marker"
import { Message, MessageContent, MessageHeader } from "@/components/atoms/message/message"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/organisms/dropdown-menu"
import { Slider } from "@/components/atoms/slider/slider"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/molecules/card/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/molecules/tabs/tabs"
import { cn } from "@/utils/index"

import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility
} from "./message-scroller"

type ChatRow = {
  id: string
  role: "user" | "assistant" | "marker"
  text: string
  author?: string
  plain?: boolean
}

function DemoCard({
  title,
  description,
  onReset,
  children,
  footer,
  className
}: {
  title: string
  description: string
  onReset?: () => void
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}) {
  return (
    <Card className={cn("w-full max-w-sm overflow-hidden py-5", className)}>
      <CardHeader className="border-b pb-5">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {onReset ? (
          <CardAction>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="rounded-full"
              onClick={onReset}
              aria-label="Reset demo"
            >
              <RotateCcw className="size-4" />
            </Button>
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
      {footer ? (
        <CardFooter className="flex flex-col gap-2 border-t bg-transparent px-5 pt-5">
          {footer}
        </CardFooter>
      ) : null}
    </Card>
  )
}

function MessageRow({ row }: { row: ChatRow }) {
  if (row.role === "marker") {
    return (
      <Marker variant="separator" className="w-full max-w-none px-5">
        <MarkerContent>{row.text}</MarkerContent>
      </Marker>
    )
  }

  const align = row.role === "user" ? "end" : "start"
  const variant = row.role === "user" ? "secondary" : "secondary"

  if (row.plain) {
    return (
      <Message align={align} className="px-5">
        <MessageContent className="max-w-[85%]">
          {row.author ? <MessageHeader>{row.author}</MessageHeader> : null}
          <p className="px-3 text-sm leading-5 text-secondary-foreground">{row.text}</p>
        </MessageContent>
      </Message>
    )
  }

  return (
    <Message align={align} className="px-5">
      <MessageContent className="max-w-[85%]">
        {row.author ? <MessageHeader>{row.author}</MessageHeader> : null}
        <Bubble variant={variant} align={align === "end" ? "end" : "start"}>
          <BubbleContent>{row.text}</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}

function Transcript({
  rows,
  anchorRole,
  emptyTitle,
  emptyDescription,
  className
}: {
  rows: ChatRow[]
  anchorRole: "user" | "assistant" | "marker"
  emptyTitle: string
  emptyDescription: string
  className?: string
}) {
  return (
    <MessageScroller className={cn("h-[310px]", className)}>
      <MessageScrollerViewport>
        <MessageScrollerContent className="gap-8 py-5">
          {rows.length === 0 ? (
            <Empty className="min-h-[260px] border-0">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MessageCircleDashed className="size-5" />
                </EmptyMedia>
                <EmptyTitle>{emptyTitle}</EmptyTitle>
                <EmptyDescription>{emptyDescription}</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            rows.map((row) => (
              <MessageScrollerItem
                key={row.id}
                messageId={row.id}
                scrollAnchor={
                  row.role === "marker"
                    ? anchorRole === "marker"
                    : row.role === anchorRole
                }
              >
                <MessageRow row={row} />
              </MessageScrollerItem>
            ))
          )}
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton />
    </MessageScroller>
  )
}

export function AnchoringTurnsDemo() {
  const [resetKey, setResetKey] = React.useState(0)
  const [anchorRole, setAnchorRole] = React.useState<"user" | "assistant">("user")
  const [rows, setRows] = React.useState<ChatRow[]>([])

  const send = () => {
    const userId = `user-${String(rows.length + 1)}`
    const assistantId = `assistant-${String(rows.length + 1)}`
    setRows((current) => [
      ...current,
      {
        id: userId,
        role: "user",
        text: "Can you summarize the launch metrics from yesterday?"
      },
      {
        id: assistantId,
        role: "assistant",
        text: "Workspace creation rose 8%, but first invite completion only rose 2%. The sharpest drop is between creating the workspace and inviting the first teammate."
      }
    ])
  }

  return (
    <MessageScrollerProvider key={`${String(resetKey)}-${anchorRole}`}>
      <DemoCard
        title="Anchoring Turns"
        description="Choose which role settles near the top edge."
        onReset={() => {
          setRows([])
          setResetKey((value) => value + 1)
        }}
        footer={
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant={anchorRole === "user" ? "secondary" : "ghost"}
                className="rounded-full"
                onClick={() => {
                  setAnchorRole("user")
                }}
              >
                User
              </Button>
              <Button
                type="button"
                size="sm"
                variant={anchorRole === "assistant" ? "secondary" : "ghost"}
                className="rounded-full"
                onClick={() => {
                  setAnchorRole("assistant")
                }}
              >
                Assistant
              </Button>
            </div>
            <Button type="button" size="icon-sm" className="rounded-full" onClick={send}>
              <ArrowUp className="size-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        }
      >
        <Transcript
          rows={rows}
          anchorRole={anchorRole}
          emptyTitle="No anchored messages yet"
          emptyDescription="Send the first message to see the selected role anchor."
        />
      </DemoCard>
    </MessageScrollerProvider>
  )
}

export function GroupChatDemo() {
  const [rows, setRows] = React.useState<ChatRow[]>([
    {
      id: "mary-prompt",
      role: "user",
      text: "@mary, the astrophage line keeps matching Venus energy output. Can you check my math?"
    },
    {
      id: "mary-reply",
      role: "assistant",
      author: "Mary (Agent)",
      plain: true,
      text: "Yes. Confirmed. The curve points to a microorganism harvesting stellar energy and breeding near carbon dioxide. If @rocky agrees, this is the clue we need."
    },
    {
      id: "ping",
      role: "user",
      text: "ping @rocky"
    }
  ])

  return (
    <MessageScrollerProvider>
      <DemoCard
        title="Group Chat"
        description="A group chat with several participants and an assistant. The Marker is marked as a turn."
        footer={
          <div className="flex w-full flex-col items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              className="w-full rounded-full"
              onClick={() => {
                setRows((current) => [
                  ...current,
                  {
                    id: `marker-${String(current.length)}`,
                    role: "marker",
                    text: "Rocky joined the chat"
                  }
                ])
              }}
            >
              Add Rocky
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              This will create a marker and make it the anchor
            </p>
          </div>
        }
      >
        <Transcript
          rows={rows}
          anchorRole="marker"
          emptyTitle="No messages yet"
          emptyDescription="Send a message to start the thread."
        />
      </DemoCard>
    </MessageScrollerProvider>
  )
}

export function ContextPeekDemo() {
  const [peek, setPeek] = React.useState(64)
  const [draft, setDraft] = React.useState(
    "Okay, but when someone sends a new message the view still feels jarring — like the whole conversation reloads from the top."
  )
  const [rows, setRows] = React.useState<ChatRow[]>([
    {
      id: "u1",
      role: "user",
      text: "I'm building a chat for our app and the scroll behavior is driving me nuts. Every time the AI streams a reply, the whole thread jumps around."
    },
    {
      id: "a1",
      role: "assistant",
      text: "That's the classic streaming scroll problem. Wrap your message list in MessageScroller and turn on autoScroll — the viewport pins to the bottom as tokens arrive, so users always see the latest text land in place."
    }
  ])

  return (
    <MessageScrollerProvider scrollPreviousItemPeek={peek}>
      <DemoCard
        title="Keeping Context Visible"
        description="Adjust scrollPreviousItemPeek to keep part of the previous turn visible."
        footer={
          <InputGroup className="h-auto flex-col items-stretch rounded-xl border-input">
            <InputGroupTextarea
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value)
              }}
              className="min-h-20 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
            <InputGroupAddon align="block-end" className="justify-between border-t px-2.5 py-1">
              <div className="flex items-center gap-3">
                <InputGroupButton size="icon-sm" variant="ghost" className="rounded-full">
                  <Plus className="size-4" />
                </InputGroupButton>
                <InputGroupText className="text-xs tabular-nums">{peek}px</InputGroupText>
                <Slider
                  value={[peek]}
                  min={0}
                  max={128}
                  step={8}
                  className="w-[75px]"
                  onValueChange={(value) => {
                    setPeek(value[0] ?? 64)
                  }}
                />
              </div>
              <InputGroupButton
                size="icon-sm"
                className="rounded-full"
                onClick={() => {
                  const id = `u-${String(rows.length + 1)}`
                  setRows((current) => [
                    ...current,
                    { id, role: "user", text: draft },
                    {
                      id: `a-${String(rows.length + 1)}`,
                      role: "assistant",
                      text: "The important part: auto-scroll only runs while the reader is already at the bottom. Scroll away and their position is preserved."
                    }
                  ])
                  setDraft("")
                }}
              >
                <ArrowUp className="size-4" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        }
      >
        <Transcript
          rows={rows}
          anchorRole="user"
          emptyTitle="No messages yet"
          emptyDescription="Send a message to try the peek amount."
        />
      </DemoCard>
    </MessageScrollerProvider>
  )
}

export function AutoScrollDemo() {
  const [streaming, setStreaming] = React.useState(false)
  const [rows, setRows] = React.useState<ChatRow[]>([])
  const streamRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    return () => {
      if (streamRef.current) {
        window.clearInterval(streamRef.current)
      }
    }
  }, [])

  const startStream = () => {
    if (streaming) return
    setStreaming(true)
    const userId = `user-${String(Date.now())}`
    const id = `stream-${String(Date.now())}`
    const full =
      "Wrap the transcript in MessageScroller with autoScroll enabled. While you stay at the live edge, streamed tokens stay in view. Scroll up and the viewport holds your place until you jump back."
    let index = 0
    setRows((current) => [
      ...current,
      {
        id: userId,
        role: "user",
        text: "I'm building a chat for our app and the scroll behavior is driving me nuts. Every time the AI streams a reply, the whole thread jumps around."
      },
      { id, role: "assistant", text: "" }
    ])
    streamRef.current = window.setInterval(() => {
      index += 3
      setRows((current) =>
        current.map((row) =>
          row.id === id ? { ...row, text: full.slice(0, index) } : row
        )
      )
      if (index >= full.length) {
        if (streamRef.current) window.clearInterval(streamRef.current)
        setStreaming(false)
      }
    }, 40)
  }

  return (
    <MessageScrollerProvider autoScroll>
      <DemoCard
        title="Following the Live Edge"
        description="autoScroll keeps streamed replies in view while the reader stays at the bottom."
        footer={
          <InputGroup className="h-auto flex-col items-stretch rounded-xl border-input">
            <InputGroupTextarea
              readOnly
              defaultValue="I'm building a chat for our app and the scroll behavior is driving me nuts. Every time the AI streams a reply, the whole thread jumps around."
              className="min-h-16 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
            <InputGroupAddon align="block-end" className="justify-end border-t px-2.5 py-1">
              <InputGroupButton size="icon-sm" className="rounded-full" onClick={startStream}>
                <ArrowUp className="size-4" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        }
      >
        <Transcript
          rows={rows}
          anchorRole="user"
          emptyTitle="No messages yet"
          emptyDescription="Press send to stream a scripted launch summary."
        />
      </DemoCard>
    </MessageScrollerProvider>
  )
}

const OPENING_TRANSCRIPT: ChatRow[] = [
  {
    id: "first-user",
    role: "user",
    text: "This is the first message the user sent in the conversation."
  },
  {
    id: "first-assistant",
    role: "assistant",
    text: "Workspace creation rose 8%, but first invite completion only rose 2%."
  },
  {
    id: "last-user",
    role: "user",
    text: "This is the last message the user sent in the conversation."
  },
  {
    id: "last-assistant",
    role: "assistant",
    text: "Start with the invite step. Teams are creating workspaces but waiting to add collaborators.\n\nRecommended follow-up:\n1. Compare invite drop-off by account size.\n2. Check whether users who skip invites still return within 24 hours.\n3. Review the empty-state copy on the first project screen."
  }
]

export function OpeningPositionDemo() {
  const [mode, setMode] = React.useState<"start" | "end" | "last-anchor">("last-anchor")

  return (
    <MessageScrollerProvider key={mode} defaultScrollPosition={mode}>
      <Tabs
        value={mode}
        onValueChange={(value) => {
          setMode(value as typeof mode)
        }}
        className="w-full max-w-sm"
      >
        <DemoCard
          title="Opening Position"
          description="Choose where a saved transcript opens."
          footer={
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="start">Start</TabsTrigger>
              <TabsTrigger value="last-anchor">Last anchor</TabsTrigger>
              <TabsTrigger value="end">End</TabsTrigger>
            </TabsList>
          }
        >
          <Transcript
            rows={OPENING_TRANSCRIPT}
            anchorRole="user"
            emptyTitle="No transcript"
            emptyDescription=""
          />
        </DemoCard>
      </Tabs>
    </MessageScrollerProvider>
  )
}

const HISTORY_SEED: ChatRow[] = [
  {
    id: "h1",
    role: "user",
    text: "Only the export queue worker changed. The deploy moved large CSV jobs onto the shared retry policy."
  },
  {
    id: "h2",
    role: "assistant",
    text: "The app deploy did not include checkout, pricing, or billing API changes."
  },
  {
    id: "h3",
    role: "user",
    text: "Do we need to roll back?"
  },
  {
    id: "h4",
    role: "assistant",
    text: "Not yet. Queue depth is recovering after we reduced retry concurrency."
  }
]

const HISTORY_PREPEND: ChatRow[] = [
  {
    id: "older-1",
    role: "user",
    text: "Earlier: latency spiked on the export queue for about twelve minutes."
  },
  {
    id: "older-2",
    role: "assistant",
    text: "Support saw two delayed download reports, but no data loss."
  }
]

export function PrependHistoryDemo() {
  const [rows, setRows] = React.useState(HISTORY_SEED)
  const [prepended, setPrepended] = React.useState(false)

  return (
    <MessageScrollerProvider>
      <DemoCard
        title="Loading Earlier Messages"
        description="Prepending history preserves the reader's place in the viewport."
        footer={
          <div className="flex w-full flex-col gap-2">
            <Button
              type="button"
              className="w-full"
              disabled={prepended}
              onClick={() => {
                setRows((current) => [...HISTORY_PREPEND, ...current])
                setPrepended(true)
              }}
            >
              Restore earlier messages
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Restore earlier messages while keeping your place.
            </p>
          </div>
        }
      >
        <Transcript
          rows={rows}
          anchorRole="user"
          emptyTitle="No messages"
          emptyDescription=""
        />
      </DemoCard>
    </MessageScrollerProvider>
  )
}

const JUMP_TRANSCRIPT: ChatRow[] = [
  {
    id: "jump-1",
    role: "user",
    text: "We're seeing activation dip after workspace creation. Can you help me find the likely step?"
  },
  {
    id: "jump-2",
    role: "assistant",
    text: "The sharpest drop is between creating the workspace and inviting the first teammate."
  },
  {
    id: "jump-3",
    role: "user",
    text: "What should I compare before we change the onboarding flow?"
  },
  {
    id: "jump-4",
    role: "assistant",
    text: "Compare template users, blank workspace users, and users who skip invites but return within 24 hours."
  }
]

function JumpMenu() {
  const { scrollToMessage } = useMessageScroller()
  const turns = JUMP_TRANSCRIPT.filter((row) => row.role === "user")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="secondary" className="rounded-full">
          Jump to turn
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>User turns</DropdownMenuLabel>
        {turns.map((row, index) => (
          <DropdownMenuItem
            key={row.id}
            onClick={() => {
              scrollToMessage(row.id)
            }}
          >
            Turn {index + 1}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function JumpToMessageDemo() {
  return (
    <MessageScrollerProvider>
      <DemoCard
        title="Jumping to Messages"
        description="Use scrollToMessage from controls outside the transcript."
        footer={<JumpMenu />}
      >
        <Transcript
          rows={JUMP_TRANSCRIPT}
          anchorRole="user"
          emptyTitle="No messages yet"
          emptyDescription="Click the button below to send the first message."
        />
      </DemoCard>
    </MessageScrollerProvider>
  )
}

function OutlineMenu() {
  const { currentAnchorId } = useMessageScrollerVisibility()
  const { scrollToMessage } = useMessageScroller()

  const anchors = [
    { id: "vis-1", label: "Incident summary" },
    { id: "vis-2", label: "Customer impact" },
    { id: "vis-3", label: "Follow-up checklist" }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="absolute end-3 top-3 z-10 rounded-full"
          aria-label="Open transcript outline"
        >
          <span className="flex flex-col gap-0.5 px-0.5" aria-hidden>
            <span className="h-px w-4 bg-foreground" />
            <span className="h-px w-4 bg-foreground" />
            <span className="h-px w-4 bg-foreground" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>On screen</DropdownMenuLabel>
        {anchors.map((item) => (
          <DropdownMenuItem
            key={item.id}
            data-active={currentAnchorId === item.id}
            className="data-[active=true]:bg-accent"
            onClick={() => {
              scrollToMessage(item.id)
            }}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function VisibilityOutlineDemo() {
  const rows: ChatRow[] = [
    {
      id: "vis-1",
      role: "user",
      text: "Review the incident handoff and tell me what to read first."
    },
    {
      id: "vis-1a",
      role: "assistant",
      text: "Start with the summary and the impact section."
    },
    {
      id: "vis-2",
      role: "user",
      text: "What was the customer impact?"
    },
    {
      id: "vis-2a",
      role: "assistant",
      text: "Impact was limited to delayed processing. No records were dropped."
    },
    {
      id: "vis-3",
      role: "user",
      text: "Give me the follow-up checklist."
    },
    {
      id: "vis-3a",
      role: "assistant",
      text: "Keep the retry window enabled until the next deploy, then add a queue-depth alert."
    }
  ]

  return (
    <MessageScrollerProvider>
      <div className="relative w-full max-w-sm">
        <DemoCard
          className="relative"
          title="Transcript Outline"
          description="Track the current anchored turn with useMessageScrollerVisibility."
        >
          <OutlineMenu />
          <Transcript
            rows={rows}
            anchorRole="user"
            emptyTitle="No messages"
            emptyDescription=""
          />
        </DemoCard>
      </div>
    </MessageScrollerProvider>
  )
}

function ScrollableFooter() {
  const { start, end } = useMessageScrollerScrollable()

  let message = "Scroll the transcript to see the footer update."
  if (start && !end) {
    message = "You are at the top. You can only scroll down."
  } else if (!start && end) {
    message = "You are at the bottom. You can only scroll up."
  } else if (!start && !end) {
    message = "You are in the middle. You can scroll in both directions."
  }

  return <p className="w-full text-center text-sm text-muted-foreground">{message}</p>
}

const SCROLL_STATE_ROWS: ChatRow[] = Array.from({ length: 12 }, (_, index) => ({
  id: `checkpoint-${String(index + 1)}`,
  role: index % 2 === 0 ? "user" : "assistant",
  text: `Checkpoint ${String(index + 1)} is synced. The scrollable hook updates as the viewport moves.`
}))

export function ScrollableStateDemo() {
  return (
    <MessageScrollerProvider>
      <DemoCard
        title="Reading Scroll State"
        description="useMessageScrollerScrollable reports which edges are still reachable."
        footer={<ScrollableFooter />}
      >
        <Transcript
          rows={SCROLL_STATE_ROWS}
          anchorRole="user"
          emptyTitle="No messages"
          emptyDescription=""
        />
      </DemoCard>
    </MessageScrollerProvider>
  )
}
