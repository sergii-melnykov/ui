import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/utils/index"
import type { AvatarProps, AvatarImageProps, AvatarFallbackProps } from "./avatar.types"

/**
 * Avatar component that displays a user's profile picture or fallback.
 * Built on top of Radix UI's Avatar primitive.
 *
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/path/to/image.jpg" alt="User avatar" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    />
  )
)
Avatar.displayName = AvatarPrimitive.Root.displayName

/**
 * AvatarImage component that displays the user's profile picture.
 * Falls back to AvatarFallback if the image fails to load.
 */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

/**
 * AvatarFallback component that displays when the image fails to load.
 * Typically shows the user's initials or a placeholder icon.
 */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
