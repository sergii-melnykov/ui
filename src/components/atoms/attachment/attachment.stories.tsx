import type { Meta, StoryObj } from "@storybook/react-vite"
import { Check, Ellipsis, FileText, X } from "lucide-react"

import { Button } from "@/components/atoms/button/button"

import { AttachmentDesignSpec } from "./attachment-design-spec"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle
} from "./attachment"

const meta: Meta = {
  title: "Atoms/Attachment",
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj

export const DesignSpec: Story = {
  render: () => <AttachmentDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: { disable: true }
  }
}

export const Default: Story = {
  render: () => (
    <Attachment className="w-96">
      <AttachmentMedia>
        <FileText />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>report.pdf</AttachmentTitle>
        <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Complete">
          <Check className="size-4" />
        </AttachmentAction>
        <AttachmentAction aria-label="Remove">
          <X className="size-4" />
        </AttachmentAction>
        <Button variant="secondary" size="icon" className="size-7" aria-label="More">
          <Ellipsis className="size-4" />
        </Button>
      </AttachmentActions>
    </Attachment>
  )
}
