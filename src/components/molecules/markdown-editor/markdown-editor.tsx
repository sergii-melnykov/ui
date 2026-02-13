import { useEditor, EditorContent } from "@tiptap/react"
import Placeholder from "@tiptap/extension-placeholder"
import { useEffect } from "react"
import { cn } from "@/utils"
import { MarkdownEditorProps } from "./markdown-editor.types"
import { extensions } from "./extensions"

export function MarkdownEditor({
  value,
  onChange,
  className,
  placeholder,
  disabled
}: MarkdownEditorProps) {
  const editor = useEditor({
    extensions: [
      ...extensions,
      Placeholder.configure({
        placeholder: placeholder ?? "Write something..."
      })
    ],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor: e }) => {
      onChange?.((e.storage as any).markdown.getMarkdown())
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm dark:prose-invert max-w-none w-full min-h-[60px] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )
      }
    }
  })

  // Sync value changes from outside
  useEffect(() => {
    if (editor && value !== undefined && value !== (editor.storage as any).markdown.getMarkdown()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) {
    return null
  }

  return <EditorContent editor={editor} />
}
