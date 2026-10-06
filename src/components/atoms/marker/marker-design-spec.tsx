/**
 * Storybook-only layout mirroring the Figma Marker documentation page.
 */

import * as React from "react"
import {
  ArrowUpRight,
  BookOpenCheck,
  ChevronDown,
  FileText,
  GitBranch,
  RotateCcw,
  Search
} from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import { Spinner } from "@/components/atoms/spinner/spinner"

import { Marker, MarkerContent, MarkerIcon } from "./marker"

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

const previewColumnClass = "flex w-full max-w-sm flex-col gap-8"

export function MarkerDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Marker</h1>
          <p className="text-base text-muted-foreground">
            Displays an inline status, system note, bordered row, or labeled separator in a
            conversation.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/radix/marker"
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
        <p className="text-xl font-semibold text-foreground">Marker</p>
        <div className="flex max-w-xs flex-col items-center gap-2">
          <MarkerIcon>
            <ChevronDown />
          </MarkerIcon>
          <Marker variant="separator" className="w-full">
            <MarkerIcon>
              <ChevronDown />
            </MarkerIcon>
            <MarkerContent>Marker content</MarkerContent>
          </Marker>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Variants"
          description="Use variant to switch between an inline marker, bordered row, and labeled separator."
        >
          <PreviewBox>
            <div className={previewColumnClass}>
              <Marker>
                <MarkerContent>A default marker for inline notes.</MarkerContent>
              </Marker>
              <Marker variant="separator">
                <MarkerContent>A separator marker</MarkerContent>
              </Marker>
              <Marker variant="border">
                <MarkerContent>A border marker for row boundaries.</MarkerContent>
              </Marker>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Status"
          description={
            <>
              Set <code className="text-sm">role=&quot;status&quot;</code> and include a{" "}
              <a
                className="underline underline-offset-4"
                href="https://ui.shadcn.com/docs/components/spinner"
                target="_blank"
                rel="noreferrer"
              >
                Spinner
              </a>{" "}
              for streaming or in-progress markers so updates are announced.
            </>
          }
        >
          <PreviewBox>
            <div className={previewColumnClass}>
              <Marker role="status">
                <MarkerIcon>
                  <Spinner />
                </MarkerIcon>
                <MarkerContent>Compacting conversation</MarkerContent>
              </Marker>
              <Marker variant="separator" role="status">
                <MarkerIcon>
                  <Spinner />
                </MarkerIcon>
                <MarkerContent>Running tests</MarkerContent>
              </Marker>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Shimmer"
          description={
            <>
              Add the shimmer utility class to MarkerContent for an animated streaming-text effect.
              The utility ships with the shadcn package — see the shimmer docs for installation.
            </>
          }
        >
          <PreviewBox>
            <div className={previewColumnClass}>
              <Marker>
                <MarkerContent className="shimmer">Thinking...</MarkerContent>
              </Marker>
              <Marker variant="separator">
                <MarkerContent className="shimmer">Reading 4 files</MarkerContent>
              </Marker>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Separator"
          description="Use the separator variant for labeled dividers, such as dates or section breaks, in a conversation."
        >
          <PreviewBox>
            <div className={previewColumnClass}>
              <Marker variant="separator">
                <MarkerContent>Today</MarkerContent>
              </Marker>
              <Marker variant="separator">
                <MarkerContent>Worked for 42s</MarkerContent>
              </Marker>
              <Marker variant="separator">
                <MarkerContent>Conversation compacted</MarkerContent>
              </Marker>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Border"
          description="Use the border variant for status rows that should keep the default marker alignment while separating the next row."
        >
          <PreviewBox>
            <div className="flex w-full max-w-sm flex-col gap-3">
              <Marker variant="border">
                <MarkerIcon>
                  <GitBranch />
                </MarkerIcon>
                <MarkerContent>Switched to release-candidate</MarkerContent>
              </Marker>
              <Marker variant="border">
                <MarkerIcon>
                  <Search />
                </MarkerIcon>
                <MarkerContent>Reviewed 8 related files</MarkerContent>
              </Marker>
              <Marker variant="border">
                <MarkerIcon>
                  <FileText />
                </MarkerIcon>
                <MarkerContent>Opened implementation notes</MarkerContent>
              </Marker>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="With Icon"
          description="Use MarkerIcon to render an icon alongside the content. Use flex-col to stack the icon above the content."
        >
          <PreviewBox>
            <div className={previewColumnClass}>
              <Marker>
                <MarkerIcon>
                  <GitBranch />
                </MarkerIcon>
                <MarkerContent>Switched to a new branch</MarkerContent>
              </Marker>
              <Marker variant="separator">
                <MarkerIcon>
                  <Search />
                </MarkerIcon>
                <MarkerContent>Explored 4 files</MarkerContent>
              </Marker>
              <Marker className="flex-col">
                <MarkerIcon>
                  <BookOpenCheck />
                </MarkerIcon>
                <MarkerContent>Syncing completed</MarkerContent>
              </Marker>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Links and Buttons"
          description="Turn a marker into a link or button with the asChild prop on Marker."
        >
          <PreviewBox>
            <div className={previewColumnClass}>
              <Marker>
                <MarkerIcon>
                  <GitBranch />
                </MarkerIcon>
                <MarkerContent>
                  <a
                    href="https://ui.shadcn.com/docs/components/radix/marker#links-and-buttons"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View the pull request
                  </a>
                </MarkerContent>
              </Marker>
              <Marker asChild>
                <button type="button">
                  <MarkerIcon>
                    <RotateCcw />
                  </MarkerIcon>
                  <MarkerContent>Revert this change</MarkerContent>
                </button>
              </Marker>
            </div>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
