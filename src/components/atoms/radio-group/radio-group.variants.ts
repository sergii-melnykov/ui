import { cva } from "class-variance-authority"

export const radioGroupItemVariants = cva(
  "peer aspect-square size-4 shrink-0 rounded-full border border-input bg-background text-primary shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground aria-invalid:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary",
  {
    variants: {},
    defaultVariants: {}
  }
)
