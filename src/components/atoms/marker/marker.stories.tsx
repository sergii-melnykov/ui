import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  BookOpenCheck,
  GitBranch,
  RotateCcw,
  Search
} from "lucide-react"

import { Spinner } from "@/components/atoms/spinner/spinner"

import { MarkerDesignSpec } from "./marker-design-spec"
import { Marker, MarkerContent, MarkerIcon } from "./marker"

const meta: Meta<typeof Marker> = {
  title: "Atoms/Marker",
  component: Marker,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof Marker>

export const DesignSpec: Story = {
  render: () => <MarkerDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => (
    <Marker className="max-w-sm">
      <MarkerContent>A default marker for inline notes.</MarkerContent>
    </Marker>
  )
}

export const Separator: Story = {
  render: () => (
    <Marker variant="separator" className="max-w-sm">
      <MarkerContent>A separator marker</MarkerContent>
    </Marker>
  )
}

export const Border: Story = {
  render: () => (
    <Marker variant="border" className="max-w-sm">
      <MarkerIcon>
        <GitBranch />
      </MarkerIcon>
      <MarkerContent>Switched to release-candidate</MarkerContent>
    </Marker>
  )
}

export const Status: Story = {
  render: () => (
    <Marker role="status" className="max-w-sm">
      <MarkerIcon>
        <Spinner />
      </MarkerIcon>
      <MarkerContent>Compacting conversation</MarkerContent>
    </Marker>
  )
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-8">
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
  )
}

export const AsLink: Story = {
  render: () => (
    <Marker className="max-w-sm">
      <MarkerIcon>
        <GitBranch />
      </MarkerIcon>
      <MarkerContent>
        <a href="https://ui.shadcn.com/docs/components/radix/marker" target="_blank" rel="noreferrer">
          View the pull request
        </a>
      </MarkerContent>
    </Marker>
  )
}

export const AsButton: Story = {
  render: () => (
    <Marker asChild className="max-w-sm">
      <button type="button">
        <MarkerIcon>
          <RotateCcw />
        </MarkerIcon>
        <MarkerContent>Revert this change</MarkerContent>
      </button>
    </Marker>
  )
}
