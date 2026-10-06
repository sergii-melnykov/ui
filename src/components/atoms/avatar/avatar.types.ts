import * as AvatarPrimitive from "@radix-ui/react-avatar"
import type { VariantProps } from "class-variance-authority"

import type {
  avatarBadgeVariants,
  avatarGroupCountVariants,
  avatarVariants
} from "./avatar.variants"

export type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>

export type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
export type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>

export type AvatarBadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof avatarBadgeVariants>

export type AvatarGroupCountProps = React.ComponentProps<"div"> &
  VariantProps<typeof avatarGroupCountVariants>

export interface AvatarComponent extends React.ForwardRefExoticComponent<AvatarProps> {
  Image: React.ForwardRefExoticComponent<AvatarImageProps>
  Fallback: React.ForwardRefExoticComponent<AvatarFallbackProps>
}
