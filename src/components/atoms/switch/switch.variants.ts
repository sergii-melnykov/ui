import { cva } from "class-variance-authority"

export const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent p-px shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  {
    variants: {
      size: {
        default: "h-[18px] w-8",
        sm: "h-[14px] w-6"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
)

export const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        default: "size-4 data-[state=checked]:translate-x-3.5",
        sm: "size-3 data-[state=checked]:translate-x-2.5"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
)
