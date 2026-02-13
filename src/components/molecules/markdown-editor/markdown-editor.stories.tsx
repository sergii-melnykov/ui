import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { MarkdownEditor } from "./markdown-editor"

const meta: Meta<typeof MarkdownEditor> = {
  title: "Molecules/MarkdownEditor",
  component: MarkdownEditor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof MarkdownEditor>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "")
    return <div className="w-[800px]"><MarkdownEditor {...args} value={value} onChange={setValue} /></div>
  },
  args: {
    placeholder: "Type some markdown here...",

  },
}

export const WithContent: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "")
    return <div className="w-[800px]"><MarkdownEditor {...args} value={value} onChange={setValue} /></div>
  },
  args: {
    placeholder: "Type some markdown here...",
    value: "# Hello World\n\nThis is a *markdown* editor.\n\n- List item 1\n- List item 2\n\n```tsx\nconst foo = 'bar';\n```",
  },
}
