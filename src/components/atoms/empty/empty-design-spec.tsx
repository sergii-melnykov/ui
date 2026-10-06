/**
 * Storybook-only layout mirroring the Figma Empty documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import {
  ArrowUpLeft,
  ArrowUpRight,
  Bell,
  Cloud,
  FolderCode,
  Plus,
  RefreshCw,
  Search
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage
} from "@/components/atoms/avatar/avatar"
import { Button } from "@/components/atoms/button/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "@/components/atoms/input-group/input-group"
import { Kbd } from "@/components/atoms/kbd/kbd"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "./empty"

const AVATAR_IMAGES = [
  "/empty/avatar-1.png",
  "/empty/avatar-2.png",
  "/empty/avatar-3.png"
] as const

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

export function EmptyDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Empty</h1>
          <p className="text-base text-muted-foreground">
            Use the Empty component to display a empty state.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/empty" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Outline"
          description="Use the border utility class to create an outline empty state."
        >
          <PreviewBox>
            <Empty className="w-full max-w-[558px] gap-4 border border-dashed p-6 md:p-6">
              <EmptyHeader className="max-w-sm gap-2">
                <EmptyMedia variant="icon" className="mb-0 size-8 [&_svg:not([class*='size-'])]:size-4">
                  <Cloud />
                </EmptyMedia>
                <EmptyTitle>Cloud Storage Empty</EmptyTitle>
                <EmptyDescription>
                  Upload files to your cloud storage
                  <br />
                  to access them anywhere.
                </EmptyDescription>
              </EmptyHeader>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Upload Files
              </Button>
            </Empty>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Background"
          description="Use the bg-* and bg-gradient-* utilities to add a background to the empty state."
        >
          <PreviewBox>
            <Empty className="h-96 w-full max-w-[638px] gap-4 border border-solid bg-muted/30 p-6 md:p-6">
              <EmptyHeader className="max-w-xs gap-2">
                <EmptyMedia variant="icon" className="mb-0">
                  <Bell />
                </EmptyMedia>
                <EmptyTitle>No Notifications</EmptyTitle>
                <EmptyDescription>
                  You&apos;re all caught up. New notifications will appear here.
                </EmptyDescription>
              </EmptyHeader>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                <RefreshCw />
                Refresh
              </Button>
            </Empty>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Avatar"
          description="Use the EmptyMedia component to display an avatar in the empty state."
        >
          <PreviewBox>
            <Empty className="w-full max-w-[638px] gap-4 border-0 p-6 md:p-6">
              <EmptyHeader className="max-w-sm gap-2">
                <EmptyMedia className="mb-0 pb-2">
                  <Avatar className="size-10">
                    <AvatarImage src={AVATAR_IMAGES[0]} alt="User avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </EmptyMedia>
                <EmptyTitle>User Offline</EmptyTitle>
                <EmptyDescription>
                  This user is currently offline. You can leave
                  <br />
                  a message to notify them or try again later.
                </EmptyDescription>
              </EmptyHeader>
              <Button size="sm" className="h-7 text-xs">
                Leave Message
              </Button>
            </Empty>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Avatar Group"
          description="Use the EmptyMedia component to display an avatar group in the empty state."
        >
          <PreviewBox>
            <Empty className="w-full max-w-[638px] gap-4 border-0 p-6 md:p-6">
              <EmptyHeader className="max-w-sm gap-2">
                <EmptyMedia className="mb-0 pb-2">
                  <AvatarGroup>
                    {AVATAR_IMAGES.map((src, index) => (
                      <Avatar key={src} className="size-8">
                        <AvatarImage src={src} alt="" />
                        <AvatarFallback>{String.fromCharCode(65 + index)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </EmptyMedia>
                <EmptyTitle>No Team Members</EmptyTitle>
                <EmptyDescription>Invite your team to collaborate on this project.</EmptyDescription>
              </EmptyHeader>
              <Button size="sm" className="h-7 text-xs">
                <Plus />
                Invite Members
              </Button>
            </Empty>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="InputGroup"
          description="You can add an InputGroup component to the EmptyContent component."
        >
          <PreviewBox>
            <Empty className="w-full max-w-[638px] gap-4 border-0 p-6 md:p-6">
              <EmptyHeader className="max-w-sm gap-2">
                <EmptyTitle>404 - Not Found</EmptyTitle>
                <EmptyDescription>
                  The page you&apos;re looking for doesn&apos;t exist.
                  <br />
                  Try searching for what you need below.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent className="max-w-sm gap-2.5">
                <InputGroup className="h-8 w-72">
                  <InputGroupAddon align="inline-start" className="pl-2">
                    <Search />
                  </InputGroupAddon>
                  <InputGroupInput readOnly placeholder="Input group control" className="h-8" />
                  <InputGroupAddon align="inline-end" className="pr-2">
                    <Kbd>/</Kbd>
                  </InputGroupAddon>
                </InputGroup>
                <EmptyDescription>
                  Need help?{" "}
                  <a href="https://ui.shadcn.com/docs/components/empty" target="_blank" rel="noreferrer">
                    Contact support
                  </a>
                </EmptyDescription>
              </EmptyContent>
            </Empty>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="RTL"
          description={
            <>
              To enable RTL support in shadcn/ui, see the{" "}
              <a
                href="https://ui.shadcn.com/docs/rtl"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                RTL configuration guide
              </a>
              .
            </>
          }
        >
          <PreviewBox>
            <Empty
              dir="rtl"
              className="w-full max-w-[558px] gap-4 border border-dashed p-6 md:p-6"
            >
              <EmptyHeader className="max-w-sm gap-2">
                <EmptyMedia variant="icon" className="mb-0 size-8 [&_svg:not([class*='size-'])]:size-4">
                  <FolderCode />
                </EmptyMedia>
                <EmptyTitle dir="auto">لا توجد مشاريع بعد</EmptyTitle>
                <EmptyDescription dir="rtl">
                  لم تقم بإنشاء أي مشاريع بعد. ابدأ بإنشاء مشروعك الأول.
                </EmptyDescription>
              </EmptyHeader>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  استيراد مشروع
                </Button>
                <Button size="sm" className="h-7 text-xs">
                  إنشاء مشروع
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                <ArrowUpLeft />
                تعرف على المزيد
              </Button>
            </Empty>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
