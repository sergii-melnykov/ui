import { cn } from "@/utils/index"

/**
 * Skeleton component for creating a loading state.
 * Built on top of shadcn/ui's Skeleton component.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-skeleton--docs
 *
 * @example
 * ```tsx
 * <Skeleton className="w-10 h-10" />
 * ```
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-primary/10", className)} {...props} />
}

export { Skeleton }
