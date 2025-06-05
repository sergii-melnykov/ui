/**
 * Card is a flexible container component that can be used to group related content and actions.
 * It provides a consistent visual style with a subtle border, shadow, and rounded corners.
 *
 */
import * as React from "react"
import { cn } from "@/utils"
import {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps
} from "./card.types"

/**
 * The main card container component.
 * Provides the base styling for the card including border, shadow, and rounded corners.
 * * @url https://sergii-melnykov.github.io/ui/?path=/docs/molecules-card--docs
 *
 * @example
 * ```tsx
 * // Basic card
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content goes here.</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 *
 * // Card with custom styling
 * <Card className="bg-primary text-primary-foreground">
 *   <CardHeader>
 *     <CardTitle>Custom Styled Card</CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     <p>This card has custom background and text colors.</p>
 *   </CardContent>
 * </Card>
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
    {...props}
  />
))
Card.displayName = "Card"

/**
 * Header section of the card.
 * Typically contains the card title and description.
 * Includes padding and spacing for consistent layout.
 */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
)
CardHeader.displayName = "CardHeader"

/**
 * Title component for the card.
 * Should be used within CardHeader.
 * Provides consistent typography styling for card titles.
 */
const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  )
)
CardTitle.displayName = "CardTitle"

/**
 * Description component for the card.
 * Should be used within CardHeader.
 * Provides consistent typography styling for card descriptions.
 */
const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
)
CardDescription.displayName = "CardDescription"

/**
 * Main content section of the card.
 * Includes padding and removes top padding to maintain consistent spacing with the header.
 */
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

/**
 * Footer section of the card.
 * Typically contains action buttons or additional information.
 * Includes padding and removes top padding to maintain consistent spacing with the content.
 */
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
