import * as React from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/utils/index"

/**
 * Loading indicator for async UI states. Compose with `data-icon` inside buttons and badges.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-spinner--docs
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Button disabled>
 *   <Spinner data-icon="inline-start" />
 *   Loading
 * </Button>
 * ```
 */
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
