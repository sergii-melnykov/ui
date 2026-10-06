import { cva } from "class-variance-authority"

export const toggleVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap font-medium transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-accent hover:text-accent-foreground",
        outline:
          "border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        sm: "h-7 min-w-7 rounded-md px-2 text-xs",
        default: "h-8 min-w-8 rounded-lg px-2.5 text-sm",
        lg: "h-9 min-w-9 rounded-lg px-2.5 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)
