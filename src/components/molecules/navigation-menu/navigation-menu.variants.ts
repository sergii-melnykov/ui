import { cva } from "class-variance-authority"

export const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center gap-1 rounded-lg bg-background px-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted data-[state=open]:bg-muted",
  {
    variants: {
      variant: {
        default: "text-foreground",
        ghost: "hover:bg-transparent hover:underline",
        link: "text-primary underline-offset-4 hover:underline",
        mobile: "w-full justify-between border-b border-border py-4 text-base font-medium"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)
