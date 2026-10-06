import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/utils/index"

import type {
  AvatarBadgeProps,
  AvatarFallbackProps,
  AvatarGroupCountProps,
  AvatarImageProps,
  AvatarProps
} from "./avatar.types"
import {
  avatarBadgeVariants,
  avatarGroupCountVariants,
  avatarVariants
} from "./avatar.variants"

/**
 * Avatar component that displays a user's profile picture or fallback.
 * Built on top of Radix UI's Avatar primitive.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-avatar--docs
 *
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/path/to/image.jpg" alt="User avatar" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
const Avatar = React.forwardRef<React.ComponentRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, size, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      className={cn(avatarVariants({ size }), className)}
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
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

/**
 * AvatarFallback component that displays when the image fails to load.
 * Typically shows the user's initials or a placeholder icon.
 */
const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
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

function AvatarBadge({ className, variant, size, ...props }: AvatarBadgeProps) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(avatarBadgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar-group-count]:ring-2 *:data-[slot=avatar-group-count]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({ className, size, ...props }: AvatarGroupCountProps) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(avatarGroupCountVariants({ size }), className)}
      {...props}
    />
  )
}

export { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage }
