import { useEditor, EditorContent } from "@tiptap/react"
import Placeholder from "@tiptap/extension-placeholder"
import StarterKit from "@tiptap/starter-kit"
import { Markdown } from "tiptap-markdown"
import { useEffect, forwardRef } from "react"
import { cn } from "@/utils"
import { MarkdownEditorProps } from "./markdown-editor.types"

export const MarkdownEditor = forwardRef<HTMLDivElement, MarkdownEditorProps>(
  (
    {
      value,
      onChange,
      className,
      placeholder,
      disabled,
      onKeyDown,
      autoFocus,
      immediatelyRender,
      onBlur,
      onFocus
    },
    ref
  ) => {
    const editor = useEditor({
      extensions: [
        StarterKit,
        Markdown,
        Placeholder.configure({
          placeholder: placeholder ?? "Write something..."
        })
      ],
      content: value,
      editable: !disabled,
      autofocus: autoFocus,
      immediatelyRender: immediatelyRender || false,
      onUpdate: ({ editor: e }) => {
        onChange?.((e.storage as any).markdown.getMarkdown())
      },
      onBlur: ({ event }) => {
        onBlur?.(event)
      },
      onFocus: ({ event }) => {
        onFocus?.(event)
      },
      editorProps: {
        attributes: {
          class: cn(
            "prose prose-sm dark:prose-invert max-w-none w-full min-h-[60px] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )
        },
        handleKeyDown: (view, event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            onKeyDown?.(event)
            return true
          }
          onKeyDown?.(event)
          return false
        }
      }
    })

    // Sync value changes from outside
    useEffect(() => {
      if (
        editor &&
        value !== undefined &&
        value !== (editor.storage as any).markdown.getMarkdown()
      ) {
        editor.commands.setContent(value)
      }
    }, [value, editor])

    useEffect(() => {
      editor?.setEditable(!disabled)
    }, [editor, disabled])

    if (!editor) {
      return null
    }

    return <EditorContent editor={editor} ref={ref} />
  }
)

MarkdownEditor.displayName = "MarkdownEditor"
