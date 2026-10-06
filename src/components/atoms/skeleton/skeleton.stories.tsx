import type { Meta, StoryObj } from "@storybook/react-vite"

import { SkeletonDesignSpec } from "./skeleton-design-spec"
import { Skeleton } from "./skeleton"

const meta: Meta<typeof Skeleton> = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text"
    }
  }
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const DesignSpec: Story = {
  render: () => <SkeletonDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-[250px]" />
}

export const Avatar: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  )
}

export const Card: Story = {
  render: () => (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card py-4">
      <div className="flex flex-col gap-1 px-4">
        <Skeleton className="h-4 w-[192px]" />
        <Skeleton className="h-4 w-[144px]" />
      </div>
      <div className="px-4">
        <Skeleton className="h-[162px] w-72" />
      </div>
    </div>
  )
}

export const Text: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-80" />
      <Skeleton className="h-4 w-80" />
      <Skeleton className="h-4 w-60" />
    </div>
  )
}

export const Form: Story = {
  render: () => (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-80" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-80" />
      </div>
      <Skeleton className="h-8 w-24" />
    </div>
  )
}

export const Table: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex w-96 gap-4">
          <Skeleton className="h-4 w-44 shrink-0" />
          <Skeleton className="h-4 w-[90px] shrink-0" />
          <Skeleton className="h-4 w-[86px] shrink-0" />
        </div>
      ))}
    </div>
  )
}

export const List: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-end">
        <div className="pb-2">
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <Skeleton className="size-10 rounded-full" />
    </div>
  )
}
