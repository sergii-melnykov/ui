import * as AvatarPrimitive from "@radix-ui/react-avatar"

export type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
export type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
export type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>

export interface AvatarComponent extends React.ForwardRefExoticComponent<AvatarProps> {
  Image: React.ForwardRefExoticComponent<AvatarImageProps>
  Fallback: React.ForwardRefExoticComponent<AvatarFallbackProps>
}
