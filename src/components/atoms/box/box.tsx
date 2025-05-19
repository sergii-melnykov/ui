/**
 * Box is a fundamental layout component that serves as a building block for other components.
 * It's a polymorphic component that can render as different HTML elements while maintaining
 * consistent styling and behavior.
 *
 * @url https://segiimelnykov.github.io/ui/?path=/docs/atoms-box--docs
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
 *
 * // With custom dimensions
 * <Box width="100px" height="200px">Fixed size content</Box>
 * <Box width="50%" height="auto">Responsive content</Box>
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

type DimensionValue = string | number

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The HTML element to render the Box as.
   * This allows for semantic HTML while maintaining consistent styling.
   *
   * @default "div"
   */
  as?: BoxComponent

  /**
   * The width of the Box component.
   * Can be a number (interpreted as pixels) or a string (e.g., "100%", "50px", "10rem").
   */
  width?: DimensionValue

  /**
   * The height of the Box component.
   * Can be a number (interpreted as pixels) or a string (e.g., "100%", "50px", "10rem").
   */
  height?: DimensionValue
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ as: Component = "div", className, width, height, style, ...props }, ref) => {
    const dimensionStyles = {
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
      ...style
    }

    return <Component ref={ref} className={cn(className)} style={dimensionStyles} {...props} />
  }
)

Box.displayName = "Box"

export { Box }
