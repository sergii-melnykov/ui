/**
 * Storybook-only layout mirroring the Figma KBD documentation page.
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import { ArrowUpRight, Search } from "lucide-react"

import { ButtonGroup } from "@/components/atoms/button-group/button-group"
import { Button } from "@/components/atoms/button/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "@/components/atoms/input-group/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/atoms/tooltip/tooltip"

import { Kbd, KbdGroup } from "./kbd"

function PreviewBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-border p-10">
      {children}
    </div>
  )
}

function ExampleIntro({
  title,
  description
}: {
  title: string
  description: React.ReactNode
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h4 className="w-full text-lg font-semibold text-foreground">{title}</h4>
      <p className="w-full pt-4 text-base text-muted-foreground">{description}</p>
    </div>
  )
}

export function KbdDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex gap-4 items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">KBD</h1>
          <p className="text-base text-muted-foreground">
            Used to display textual user input from keyboard.
          </p>
        </div>
        <Button variant="outline" className="h-8 shrink-0 rounded-xl px-3 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/kbd"
            target="_blank"
            rel="noreferrer"
          >
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <section className="flex flex-col gap-10">
        <h3 className="text-xl font-semibold text-foreground">KBD</h3>
        <Kbd>⇧</Kbd>
      </section>

      <section className="flex w-full flex-col">
        <h3 className="text-xl font-semibold text-foreground">Examples</h3>
        <div className="flex w-full flex-col items-center justify-center pt-6">
          <h4 className="w-full text-lg font-semibold text-foreground">Group</h4>
          <p className="w-full pt-4 text-base text-muted-foreground">
            Use the KbdGroup component to group keyboard keys together.
          </p>
        </div>
      </section>

      <PreviewBox>
        <p className="flex flex-wrap items-center justify-center gap-1 text-sm text-muted-foreground">
          <span>Use</span>
          <KbdGroup>
            <Kbd>Ctrl+B</Kbd>
            <Kbd>Ctrl+K</Kbd>
          </KbdGroup>
          <span>to open the command palette</span>
        </p>
      </PreviewBox>

      <ExampleIntro
        title="Button"
        description="Use the Kbd component inside a Button component to display a keyboard key inside a button."
      />

      <PreviewBox>
        <Button variant="outline" className="h-8 gap-1 rounded-lg px-2.5">
          Accept
          <Kbd>⏎</Kbd>
        </Button>
      </PreviewBox>

      <ExampleIntro
        title="Tooltip"
        description="You can use the Kbd component inside a Tooltip component to display a tooltip with a keyboard key."
      />

      <PreviewBox>
        <TooltipProvider>
          <div className="flex flex-col items-end gap-2">
            <ButtonGroup>
              <Tooltip defaultOpen>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="h-8 px-2.5">
                    Save
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8} className="flex items-center gap-2">
                  Save changes
                  <Kbd>S</Kbd>
                </TooltipContent>
              </Tooltip>
              <Button variant="outline" className="h-8 px-2.5">
                Print
              </Button>
            </ButtonGroup>
          </div>
        </TooltipProvider>
      </PreviewBox>

      <ExampleIntro
        title="Input Group"
        description="You can use the Kbd component inside a InputGroupAddon component to display a keyboard key inside an input group."
      />

      <PreviewBox>
        <InputGroup className="h-8 w-full max-w-md rounded-lg">
          <InputGroupAddon align="inline-start" className="pl-2 py-1.5">
            <Search className="size-4 text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." className="py-1.5" />
          <InputGroupAddon align="inline-end" className="gap-2 pr-2 py-1.5">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </PreviewBox>

      <ExampleIntro
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
      />

      <PreviewBox>
        <div className="flex flex-col items-center gap-4">
          <KbdGroup>
            <Kbd>⌃</Kbd>
            <Kbd>⌥</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>⌘</Kbd>
          </KbdGroup>
          <p className="flex items-center gap-1">
            <Kbd>B</Kbd>
            <span className="font-mono text-[15px] leading-4 text-foreground">+</span>
            <Kbd>Ctrl</Kbd>
          </p>
        </div>
      </PreviewBox>
    </div>
  )
}
