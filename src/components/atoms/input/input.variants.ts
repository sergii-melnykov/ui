import { cva } from "class-variance-authority"

export const inputVariants = cva(
  "flex h-8 w-full min-w-0 border border-input bg-background px-2.5 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/50 disabled:opacity-50 dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      shape: {
        default: "rounded-lg",
        pill: "rounded-full"
      }
    },
    defaultVariants: {
      shape: "default"
    }
  }
)

export type InputShape = NonNullable<Parameters<typeof inputVariants>[0]>["shape"]
