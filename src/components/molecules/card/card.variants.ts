import { cva } from "class-variance-authority"

export const cardVariants = cva(
  "group/card flex flex-col gap-4 rounded-xl border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      size: {
        default: "pt-4",
        sm: "gap-3 pt-3"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
)
