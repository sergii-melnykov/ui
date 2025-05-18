/**
 * Box is a fundamental layout component that serves as a building block for other components.
 * It's a polymorphic component that can render as different HTML elements while maintaining
 * consistent styling and behavior.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Box>Content</Box>
 *
 * // As a different element
 * <Box as="section">Section content</Box>
 *
 * // With custom className
 * <Box className="bg-primary text-white p-4">Styled content</Box>
 * ```
 */
import * as React from "react"
import { cn } from "@/utils"

type BoxComponent =
  | "div"
  | "span"
  | "section"
  | "article"
  | "main"
  | "aside"
  | "header"
  | "footer"
  | "nav"

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The HTML element to render the Box as.
   * This allows for semantic HTML while maintaining consistent styling.
   *
   * @default "div"
   */
  as?: BoxComponent
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ as: Component = "div", className, ...props }, ref) => {
    return <Component ref={ref} className={cn(className)} {...props} />
  }
)

Box.displayName = "Box"

export { Box }
