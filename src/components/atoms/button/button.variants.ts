import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap font-medium transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
        outline:
          "border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      } as const,
      size: {
        xs: "h-6 rounded-sm px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 rounded-sm px-2.5 text-xs",
        default: "h-8 rounded-lg px-2.5 text-sm",
        lg: "h-9 rounded-lg px-2.5 text-sm",
        icon: "size-8 shrink-0 rounded-lg p-0",
        "icon-xs": "size-6 shrink-0 rounded-sm p-0 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 shrink-0 rounded-sm p-0",
        "icon-lg": "size-9 shrink-0 rounded-lg p-0"
      } as const
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export type ButtonVariant = NonNullable<Parameters<typeof buttonVariants>[0]>["variant"]
export type ButtonSize = NonNullable<Parameters<typeof buttonVariants>[0]>["size"]
