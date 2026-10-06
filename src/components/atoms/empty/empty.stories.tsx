import type { Meta, StoryObj } from "@storybook/react-vite"
import { Cloud } from "lucide-react"

import { Button } from "@/components/atoms/button/button"

import { EmptyDesignSpec } from "./empty-design-spec"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "./empty"

const meta: Meta<typeof Empty> = {
  title: "Atoms/Empty",
  component: Empty,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof Empty>

export const DesignSpec: Story = {
  render: () => <EmptyDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => (
    <Empty className="max-w-md gap-4 border border-dashed p-6 md:p-6">
      <EmptyHeader className="gap-2">
        <EmptyMedia variant="icon" className="mb-0 size-8 [&_svg:not([class*='size-'])]:size-4">
          <Cloud />
        </EmptyMedia>
        <EmptyTitle>Cloud Storage Empty</EmptyTitle>
        <EmptyDescription>
          Upload files to your cloud storage to access them anywhere.
        </EmptyDescription>
      </EmptyHeader>
      <Button variant="outline" size="sm">
        Upload Files
      </Button>
    </Empty>
  )
}
