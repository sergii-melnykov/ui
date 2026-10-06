import * as React from "react"

import { cn } from "@/utils/index"

import { TextareaProps } from "./textarea.types"
import { textareaVariants } from "./textarea.variants"

/**
 * Textarea component for creating accessible text areas.
 * Built on top of shadcn/ui's Textarea component.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-textarea--docs
 *
 * @example
 * ```tsx
 * <Textarea placeholder="Enter text" />
 * ```
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoResize = false, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement | null>(null)

    const setTextareaRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref]
    )

    React.useEffect(() => {
      if (!autoResize || !internalRef.current) return undefined

      const textarea = internalRef.current
      const resizeTextarea = () => {
        textarea.style.height = "auto"
        textarea.style.height = `${String(textarea.scrollHeight)}px`
      }

      textarea.addEventListener("input", resizeTextarea)
      resizeTextarea() // Initial resize

      return () => {
        textarea.removeEventListener("input", resizeTextarea)
      }
    }, [autoResize])

    return (
      <textarea
        data-slot="textarea"
        className={cn(textareaVariants(), className)}
        ref={setTextareaRef}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
