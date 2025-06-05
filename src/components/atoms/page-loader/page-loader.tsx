import { cn } from "@/utils"
import { Loader2 } from "lucide-react"

export type PageLoaderProps = {
  /**
   * Optional className to extend the component's styles
   */
  className?: string
  /**
   * Optional size of the loader (default: "default")
   */
  size?: "sm" | "default" | "lg"
  /**
   * Optional text to display below the loader
   */
  text?: string
  /**
   * Optional color of the loader (default: "primary")
   */
  color?: "primary" | "secondary" | "accent" | "muted" | "destructive" | string
}

/**
 * PageLoader component for displaying a loading indicator.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-page-loader--docs
 *
 */

export function PageLoader({
  className,
  size = "default",
  text,
  color = "primary"
}: PageLoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-8 w-8",
    lg: "h-12 w-12"
  }

  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    muted: "text-muted-foreground",
    destructive: "text-destructive"
  }

  const loaderColor = colorClasses[color as keyof typeof colorClasses] || `text-[${color}]`

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-background/80 backdrop-blur-sm",
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <Loader2 className={cn("animate-spin", loaderColor, sizeClasses[size])} aria-hidden="true" />
      {text && (
        <p className="mt-4 text-sm text-muted-foreground" aria-label={text}>
          {text}
        </p>
      )}
    </div>
  )
}
