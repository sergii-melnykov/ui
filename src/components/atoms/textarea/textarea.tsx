import * as React from "react"
import { cn } from "@/utils/index"
import { TextareaProps } from "./textarea.types"

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
    const internalRef = React.useRef<HTMLTextAreaElement>(null)

    React.useEffect(() => {
      if (!autoResize || !internalRef.current) return

      const textarea = internalRef.current
      const resizeTextarea = () => {
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
      }

      textarea.addEventListener("input", resizeTextarea)
      resizeTextarea() // Initial resize

      return () => textarea.removeEventListener("input", resizeTextarea)
    }, [autoResize])

    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
