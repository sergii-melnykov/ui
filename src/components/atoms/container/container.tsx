/**
 * Container is a layout component that provides a centered, max-width wrapper for content.
 * It's designed to create consistent horizontal padding and maximum widths across different screen sizes.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-container--docs
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Container>
 *   <h1>Page Title</h1>
 *   <p>Content goes here...</p>
 * </Container>
 *
 * // With custom max width
 * <Container maxWidth="xl">
 *   <h1>Wider Content</h1>
 * </Container>
 *
 * // Fluid container (no max-width)
 * <Container fluid>
 *   <h1>Full Width Content</h1>
 * </Container>
 *
 * // Without padding
 * <Container disablePadding>
 *   <h1>No Padding Content</h1>
 * </Container>
 * ```
 */
import { cn } from "@/utils"
import * as React from "react"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The maximum width of the container.
   * - "sm": 640px
   * - "md": 768px
   * - "lg": 1024px
   * - "xl": 1280px
   * - "full": 100%
   * - false: No max-width (fluid)
   *
   * @default "lg"
   */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full" | false
  /**
   * Whether to disable the default horizontal padding.
   * When true, removes the default padding (px-4 sm:px-6 lg:px-8).
   *
   * @default false
   */
  disablePadding?: boolean
  /**
   * Whether to make the container fluid (no max-width).
   * When true, the container will expand to fill its parent's width.
   *
   * @default false
   */
  fluid?: boolean
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth = "lg", disablePadding = false, fluid = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "mx-auto w-full",
          // Padding
          !disablePadding && "px-4 sm:px-6 lg:px-8",
          // Max width
          !fluid && {
            "max-w-screen-sm": maxWidth === "sm",
            "max-w-screen-md": maxWidth === "md",
            "max-w-screen-lg": maxWidth === "lg",
            "max-w-screen-xl": maxWidth === "xl",
            "max-w-full": maxWidth === "full"
          },
          className
        )}
        {...props}
      />
    )
  }
)

Container.displayName = "Container"

export { Container }
