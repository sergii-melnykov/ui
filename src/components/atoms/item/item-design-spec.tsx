/**
 * Storybook-only layout mirroring the Figma Item documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import {
  ArrowUpRight,
  BadgeCheckIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  Inbox,
  Plus,
  ShieldAlertIcon
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/atoms/avatar/avatar"
import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle
} from "./item"

const MODELS = [
  {
    name: "v0-1.5-sm",
    description: "Everyday tasks and UI generation.",
    image: "/item/model-thumbnail.png"
  },
  {
    name: "v0-1.5-lg",
    description: "Advanced thinking or reasoning.",
    image:
      "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop"
  },
  {
    name: "v0-2.0-mini",
    description: "Open Source model for everyone.",
    image:
      "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop"
  }
] as const

const PEOPLE = [
  {
    username: "shadcn",
    avatar: "https://github.com/shadcn.png",
    email: "shadcn@vercel.com"
  },
  {
    username: "maxleiter",
    avatar: "https://github.com/maxleiter.png",
    email: "maxleiter@vercel.com"
  },
  {
    username: "evilrabbit",
    avatar: "https://github.com/evilrabbit.png",
    email: "evilrabbit@vercel.com"
  }
] as const

const MUSIC = [
  {
    title: "Midnight City Lights",
    artist: "Neon Dreams",
    album: "Electric Nights",
    duration: "3:45"
  },
  {
    title: "Coffee Shop Conversations",
    artist: "The Morning Brew",
    album: "Urban Stories",
    duration: "4:05"
  }
] as const

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

function MatrixRowLabel({
  label,
  className
}: {
  label: string
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">{label}</span>
      <div className="h-full min-h-9 w-3 border-l border-foreground" aria-hidden />
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

function ItemMatrixCell({
  variant,
  size = "default",
  dir = "ltr",
  state = "default"
}: {
  variant: "default" | "outline" | "muted"
  size?: "default" | "sm"
  dir?: "ltr" | "rtl"
  state?: "default" | "hover"
}) {
  const contentAlign = dir === "rtl" ? "items-end text-right" : undefined

  return (
    <Item
      variant={variant}
      size={size}
      dir={dir}
      className={cn("w-full max-w-[511px]", state === "hover" && "bg-muted")}
    >
      <ItemContent className={contentAlign}>
        <ItemTitle className={cn(dir === "rtl" && "w-full justify-end")}>Item title</ItemTitle>
        <ItemDescription>Item description</ItemDescription>
      </ItemContent>
    </Item>
  )
}

const ITEM_VARIANT_BLOCKS = [
  { label: "Default", variant: "default" as const },
  { label: "Outline", variant: "outline" as const },
  { label: "Muted", variant: "muted" as const }
] as const

const ITEM_MATRIX_ROWS = [
  { label: "Default", size: "default" as const, state: "default" as const },
  { label: "Hover", size: "default" as const, state: "hover" as const },
  { label: "Default", size: "sm" as const, state: "default" as const },
  { label: "Hover", size: "sm" as const, state: "hover" as const }
] as const

function ItemVariantMatrixBlock({
  variantLabel,
  variant
}: {
  variantLabel: string
  variant: "default" | "outline" | "muted"
}) {
  return (
    <div className="flex gap-6">
      <div className="flex w-[100px] shrink-0 items-center pt-14">
        <MatrixRowLabel label={variantLabel} className="min-h-[316px] items-start" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        {ITEM_MATRIX_ROWS.map((row) => (
          <div key={`${variant}-${row.size}-${row.state}`} className="flex items-center gap-6">
            <MatrixRowLabel label={row.label} className="w-[100px] shrink-0" />
            <div className="grid flex-1 grid-cols-2 gap-6">
              <ItemMatrixCell variant={variant} size={row.size} state={row.state} dir="ltr" />
              <ItemMatrixCell variant={variant} size={row.size} state={row.state} dir="rtl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ItemHeaderCard() {
  return (
    <Item variant="outline" className="w-[175px] flex-col flex-nowrap items-start gap-2.5">
      <ItemHeader className="w-full">
        <img
          src="/item/model-thumbnail.png"
          alt=""
          className="aspect-square w-full rounded-sm object-cover"
        />
      </ItemHeader>
      <ItemContent>
        <ItemTitle>{MODELS[0].name}</ItemTitle>
        <ItemDescription>{MODELS[0].description}</ItemDescription>
      </ItemContent>
    </Item>
  )
}

export function ItemDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Item</h1>
          <p className="text-base text-muted-foreground">
            A versatile component for displaying list items with media, content, and actions.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/item" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Item">
          <VariantGrid className="flex-col gap-10 overflow-x-auto">
            <div className="flex gap-6 pl-[calc(100px+1.5rem)]">
              <div className="min-w-0 flex-1">
                <ColumnHeaders />
              </div>
            </div>
            {ITEM_VARIANT_BLOCKS.map(({ label, variant }) => (
              <ItemVariantMatrixBlock key={variant} variantLabel={label} variant={variant} />
            ))}
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Item Header">
          <VariantGrid className="justify-center">
            <ItemHeaderCard />
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10 pt-2">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Variants"
          description="Use the variant prop to change the visual style of the item."
        >
          <PreviewBox>
            <div className="flex w-full max-w-lg flex-col gap-6">
              <Item className="w-full">
                <ItemMedia>
                  <Inbox />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Default Variant</ItemTitle>
                  <ItemDescription>Transparent background with no border.</ItemDescription>
                </ItemContent>
              </Item>
              <Item variant="outline" className="w-full">
                <ItemMedia>
                  <Inbox />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Outline Variant</ItemTitle>
                  <ItemDescription>Outlined appearance with a subtle border.</ItemDescription>
                </ItemContent>
              </Item>
              <Item variant="muted" className="w-full">
                <ItemMedia>
                  <Inbox />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Muted Variant</ItemTitle>
                  <ItemDescription>Muted background for secondary content.</ItemDescription>
                </ItemContent>
              </Item>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Size"
          description="Use the size prop to control spacing and typography density."
        >
          <PreviewBox>
            <div className="flex w-full max-w-md flex-col gap-6">
              <Item variant="outline" className="w-full">
                <ItemMedia>
                  <Inbox />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Default Size</ItemTitle>
                  <ItemDescription>The standard size for most use cases.</ItemDescription>
                </ItemContent>
              </Item>
              <Item variant="outline" size="sm" className="w-full">
                <ItemMedia>
                  <Inbox />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Small Size</ItemTitle>
                  <ItemDescription>Compact spacing for dense layouts.</ItemDescription>
                </ItemContent>
              </Item>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Icon"
          description="Add an icon using ItemMedia or the icon media variant."
        >
          <PreviewBox>
            <Item variant="outline" className="w-full max-w-lg">
              <ItemMedia variant="icon">
                <ShieldAlertIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Security Alert</ItemTitle>
                <ItemDescription>New login detected from unknown device.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" variant="outline">
                  Review
                </Button>
              </ItemActions>
            </Item>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Link"
          description="Render the item as a link using asChild."
        >
          <PreviewBox>
            <div className="flex w-full max-w-md flex-col gap-4">
              <Item asChild className="w-full">
                <a href="#variants">
                  <ItemContent>
                    <ItemTitle>Visit our documentation</ItemTitle>
                    <ItemDescription>
                      Learn how to get started with our components.
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <ChevronRightIcon className="size-4" />
                  </ItemActions>
                </a>
              </Item>
              <Item variant="outline" asChild className="w-full">
                <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer">
                  <ItemContent>
                    <ItemTitle>External resource</ItemTitle>
                    <ItemDescription>
                      Opens in a new tab with security attributes.
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <ExternalLinkIcon className="size-4" />
                  </ItemActions>
                </a>
              </Item>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Image"
          description="Use ItemMedia with the image variant for thumbnails."
        >
          <PreviewBox>
            <ItemGroup className="w-full max-w-md gap-4">
              {MUSIC.map((song) => (
                <Item key={song.title} variant="outline" asChild role="listitem" className="w-full">
                  <a href="#image">
                    <ItemMedia variant="image">
                      <img
                        src={`https://avatar.vercel.sh/${encodeURIComponent(song.title)}`}
                        alt=""
                        className="object-cover grayscale"
                      />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className="line-clamp-1">
                        {song.title} —{" "}
                        <span className="text-muted-foreground">{song.album}</span>
                      </ItemTitle>
                      <ItemDescription>{song.artist}</ItemDescription>
                    </ItemContent>
                    <ItemContent className="flex-none text-center">
                      <ItemDescription>{song.duration}</ItemDescription>
                    </ItemContent>
                  </a>
                </Item>
              ))}
            </ItemGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Avatar"
          description="Compose avatars inside ItemMedia for people and accounts."
        >
          <PreviewBox>
            <Item variant="outline" className="w-full max-w-lg">
              <ItemMedia>
                <Avatar className="size-8">
                  <AvatarImage src="https://github.com/evilrabbit.png" alt="" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Evil Rabbit</ItemTitle>
                <ItemDescription>Last seen 5 months ago</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="icon-sm" variant="outline" className="rounded-full" aria-label="Invite">
                  <Plus />
                </Button>
              </ItemActions>
            </Item>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Header"
          description="Use ItemHeader for full-width media above the title and description."
        >
          <PreviewBox>
            <ItemGroup className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
              {MODELS.map((model) => (
                <Item key={model.name} variant="outline" className="w-full">
                  <ItemHeader>
                    <img
                      src={model.image}
                      alt=""
                      className="aspect-square w-full rounded-sm object-cover"
                    />
                  </ItemHeader>
                  <ItemContent>
                    <ItemTitle>{model.name}</ItemTitle>
                    <ItemDescription>{model.description}</ItemDescription>
                  </ItemContent>
                </Item>
              ))}
            </ItemGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Group"
          description="Group related items with ItemGroup and ItemSeparator."
        >
          <PreviewBox>
            <ItemGroup className="w-full max-w-md">
              {PEOPLE.map((person, index) => (
                <React.Fragment key={person.username}>
                  <Item className="w-full">
                    <ItemMedia>
                      <Avatar>
                        <AvatarImage src={person.avatar} alt="" className="grayscale" />
                        <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </ItemMedia>
                    <ItemContent className="gap-1">
                      <ItemTitle>{person.username}</ItemTitle>
                      <ItemDescription>{person.email}</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Plus />
                      </Button>
                    </ItemActions>
                  </Item>
                  {index !== PEOPLE.length - 1 ? <ItemSeparator /> : null}
                </React.Fragment>
              ))}
            </ItemGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Dropdown"
          description="Items work well as rich menu rows with trailing metadata."
        >
          <PreviewBox>
            <div className="flex w-full max-w-md flex-col gap-2">
              <Item size="sm" className="w-full">
                <ItemMedia>
                  <BadgeCheckIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Your profile has been verified.</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <ChevronRightIcon className="size-4" />
                </ItemActions>
              </Item>
            </div>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
