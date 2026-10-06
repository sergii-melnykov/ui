/**
 * Storybook-only layout mirroring the Figma Avatar documentation page.
 */

import * as React from "react"
import { ArrowUpRight, Plus } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/organisms/dropdown-menu"
import { cn } from "@/utils/index"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage
} from "./avatar"
import type { AvatarBadgeSize, AvatarSize } from "./avatar.variants"

const AVATAR_SRC = "https://github.com/shadcn.png"
const AVATAR_SRC_ALT = "https://avatars.githubusercontent.com/u/124599?v=4"

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

function MatrixLabels({ rows, rowClassName }: { rows: string[]; rowClassName?: string }) {
  return (
    <div className="flex min-w-[280px] flex-col gap-6 pt-14">
      {rows.map((row) => (
        <div key={row} className={cn("flex h-[70px] items-center gap-2.5", rowClassName)}>
          <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">{row}</span>
          <div className="h-full w-3 border-l border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function ColumnHeaders({ labels }: { labels: readonly string[] }) {
  return (
    <div
      className={cn("grid gap-6", labels.length === 2 && "grid-cols-2", labels.length === 3 && "grid-cols-3")}
    >
      {labels.map((label) => (
        <div key={label} className="flex flex-col items-center gap-2.5">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <div className="h-3 w-full border-b border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function badgeSizeForAvatar(size: AvatarSize): AvatarBadgeSize {
  if (size === "sm") return "xs"
  if (size === "lg") return "lg"
  return "default"
}

function DemoAvatar({
  className,
  size = "default",
  dir,
  badge,
  src = AVATAR_SRC
}: {
  className?: string
  size?: AvatarSize
  dir?: "ltr" | "rtl"
  badge?: boolean
  src?: string
}) {
  return (
    <Avatar className={className} size={size} dir={dir}>
      <AvatarImage src={src} alt="User" />
      <AvatarFallback>CN</AvatarFallback>
      {badge ? (
        <AvatarBadge variant="status" size={badgeSizeForAvatar(size ?? "default")} />
      ) : null}
    </Avatar>
  )
}

function AvatarBadgeSpec({
  variant,
  size
}: {
  variant: "icon" | "status"
  size: AvatarBadgeSize
}) {
  return (
    <AvatarBadge variant={variant} size={size}>
      {variant === "icon" ? <Plus aria-hidden /> : null}
    </AvatarBadge>
  )
}

function AvatarGroupDemo({ dir, count = true }: { dir?: "ltr" | "rtl"; count?: boolean }) {
  return (
    <AvatarGroup dir={dir} className={dir === "rtl" ? "flex-row-reverse space-x-reverse" : undefined}>
      <DemoAvatar />
      <DemoAvatar src={AVATAR_SRC_ALT} />
      <DemoAvatar src="https://avatars.githubusercontent.com/u/69631?v=4" />
      {count ? <AvatarGroupCount>+3</AvatarGroupCount> : null}
    </AvatarGroup>
  )
}

export function AvatarDesignSpec() {
  const badgeSizes = ["xs", "default", "lg"] as const
  const avatarSizes = ["sm", "default", "lg"] as const
  const groupCountSizes = ["sm", "default", "lg"] as const

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Avatar</h1>
          <p className="text-base text-muted-foreground">
            An image element with a fallback for representing the user.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/avatar" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Avatar Badge">
          <VariantGrid>
            <MatrixLabels rows={["Icon", "Status"]} />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <ColumnHeaders labels={["Extra small", "Default", "Large"]} />
              <div className="grid grid-cols-3 gap-6">
                {(["icon", "status"] as const).flatMap((variant) =>
                  badgeSizes.map((size) => (
                    <div
                      key={`${variant}-${size}`}
                      className="flex h-[70px] items-center justify-center"
                    >
                      <AvatarBadgeSpec variant={variant} size={size} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Avatar">
          <VariantGrid>
            <MatrixLabels rows={["Small", "Default", "Large"]} />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <ColumnHeaders labels={["LTR", "RTL"]} />
              <div className="grid grid-cols-2 gap-6">
                {avatarSizes.flatMap((size) => [
                  <div key={`${size}-ltr`} className="flex h-[70px] items-center justify-center">
                    <DemoAvatar size={size} badge />
                  </div>,
                  <div key={`${size}-rtl`} className="flex h-[70px] items-center justify-center">
                    <DemoAvatar size={size} badge dir="rtl" />
                  </div>
                ])}
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Avatar Group Count">
          <VariantGrid>
            <MatrixLabels rows={["Small", "Default", "Large"]} />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <ColumnHeaders labels={["Icon", "Count"]} />
              <div className="grid grid-cols-2 gap-6">
                {groupCountSizes.flatMap((size) => [
                  <div key={`${size}-icon`} className="flex h-[70px] items-center justify-center">
                    <AvatarGroupCount size={size}>
                      <Plus aria-hidden />
                    </AvatarGroupCount>
                  </div>,
                  <div key={`${size}-count`} className="flex h-[70px] items-center justify-center">
                    <AvatarGroupCount size={size}>+3</AvatarGroupCount>
                  </div>
                ])}
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="AvatarGroup">
          <VariantGrid className="flex-col">
            <ColumnHeaders labels={["LTR", "RTL"]} />
            <div className="grid w-full grid-cols-2 gap-6">
              <div className="flex h-[70px] items-center justify-center">
                <AvatarGroupDemo />
              </div>
              <div className="flex h-[70px] items-center justify-center">
                <AvatarGroupDemo dir="rtl" />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Basic"
          description="A basic avatar component with an image and a fallback."
        >
          <PreviewBox>
            <DemoAvatar />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Badge"
          description="Use the AvatarBadge component to add a badge to the avatar. The badge is positioned at the bottom right of the avatar."
        >
          <PreviewBox>
            <DemoAvatar badge src={AVATAR_SRC_ALT} />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Badge with Icon"
          description="You can also use an icon inside AvatarBadge."
        >
          <PreviewBox>
            <Avatar size="default">
              <AvatarImage src="https://avatars.githubusercontent.com/u/139426?v=4" alt="User" />
              <AvatarFallback>CN</AvatarFallback>
              <AvatarBadge variant="icon" size="default">
                <Plus aria-hidden />
              </AvatarBadge>
            </Avatar>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Avatar Group" description="Use the AvatarGroup component to add a group of avatars.">
          <PreviewBox>
            <AvatarGroupDemo count={false} />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Avatar Group Count"
          description="Use AvatarGroupCount to add a count to the group."
        >
          <PreviewBox>
            <AvatarGroupDemo />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Avatar Group with Icon"
          description="You can also use an icon inside AvatarGroupCount."
        >
          <PreviewBox>
            <AvatarGroup className="-space-x-2">
              <DemoAvatar />
              <DemoAvatar src={AVATAR_SRC_ALT} />
              <DemoAvatar src="https://avatars.githubusercontent.com/u/69631?v=4" />
              <AvatarGroupCount>
                <Plus aria-hidden />
              </AvatarGroupCount>
            </AvatarGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Sizes" description="Use the size prop to change the size of the avatar.">
          <PreviewBox>
            <div className="flex items-center gap-2">
              <DemoAvatar size="sm" />
              <DemoAvatar size="default" />
              <DemoAvatar size="lg" />
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Dropdown" description="Use the avatar as a menu trigger.">
          <PreviewBox>
            <DropdownMenu defaultOpen>
              <DropdownMenuTrigger asChild>
                <button type="button" className="rounded-full outline-none focus-visible:ring-2">
                  <DemoAvatar badge src={AVATAR_SRC_ALT} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-32">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            <div className="flex flex-wrap items-center justify-center gap-6">
              <AvatarGroupDemo dir="rtl" />
              <DemoAvatar badge dir="rtl" src="https://avatars.githubusercontent.com/u/69631?v=4" />
              <DemoAvatar />
            </div>
          </PreviewBox>
        </ExampleBlock>
      </div>

      <Separator />
    </div>
  )
}
