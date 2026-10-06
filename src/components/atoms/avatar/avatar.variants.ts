import { cva } from "class-variance-authority"

export const avatarVariants = cva("relative flex shrink-0 overflow-hidden rounded-full", {
  variants: {
    size: {
      sm: "size-6",
      default: "size-8",
      lg: "size-10"
    }
  },
  defaultVariants: {
    size: "default"
  }
})

export const avatarBadgeVariants = cva(
  "absolute bottom-0 end-0 box-content rounded-full border border-background",
  {
    variants: {
      variant: {
        icon: "flex items-center justify-center bg-primary text-primary-foreground [&>svg]:pointer-events-none",
        status: "bg-green-500"
      },
      size: {
        xs: "size-2 [&>svg]:size-1.5",
        default: "size-2.5 [&>svg]:size-2",
        lg: "size-3 [&>svg]:size-2.5"
      }
    },
    defaultVariants: {
      variant: "status",
      size: "default"
    }
  }
)

export const avatarGroupCountVariants = cva(
  "relative flex shrink-0 items-center justify-center rounded-full border border-background bg-muted font-normal text-muted-foreground [&>svg]:text-muted-foreground",
  {
    variants: {
      size: {
        sm: "size-6 text-xs [&>svg]:size-3.5",
        default: "size-8 text-sm [&>svg]:size-4",
        lg: "size-10 text-sm [&>svg]:size-4"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
)

export type AvatarSize = NonNullable<Parameters<typeof avatarVariants>[0]>["size"]
export type AvatarBadgeVariant = NonNullable<Parameters<typeof avatarBadgeVariants>[0]>["variant"]
export type AvatarBadgeSize = NonNullable<Parameters<typeof avatarBadgeVariants>[0]>["size"]
export type AvatarGroupCountSize = NonNullable<Parameters<typeof avatarGroupCountVariants>[0]>["size"]
