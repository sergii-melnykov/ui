import { cva } from "class-variance-authority"

export const toggleGroupVariants = cva(
  "group/toggle-group flex w-fit gap-[--spacing(var(--gap))] rounded-lg data-[spacing=default]:data-[variant=outline]:shadow-xs",
  {
    variants: {
      orientation: {
        horizontal: "flex-row items-center",
        vertical: "flex-col items-stretch"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
)

export const toggleGroupItemVariants = cva(
  "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10 data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l",
  {
    variants: {
      orientation: {
        horizontal:
          "data-[spacing=0]:first:rounded-l-lg data-[spacing=0]:last:rounded-r-lg group-data-[size=sm]/toggle-group:data-[spacing=0]:first:rounded-l-md group-data-[size=sm]/toggle-group:data-[spacing=0]:last:rounded-r-md",
        vertical:
          "data-[spacing=0]:data-[variant=outline]:border-l data-[spacing=0]:data-[variant=outline]:border-t-0 data-[spacing=0]:data-[variant=outline]:first:border-t data-[spacing=0]:first:rounded-t-lg data-[spacing=0]:last:rounded-b-lg group-data-[size=sm]/toggle-group:data-[spacing=0]:first:rounded-t-md group-data-[size=sm]/toggle-group:data-[spacing=0]:last:rounded-b-md"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
)
