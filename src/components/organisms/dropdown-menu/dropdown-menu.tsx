import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cn } from "../../../utils/cn"
import { MoreVertical } from "lucide-react"

export interface DropdownMenuItem {
  label: string
  onClick?: () => void
  disabled?: boolean
  icon?: React.ReactNode
  /**
   * Optional description for screen readers
   */
  description?: string
  /**
   * Optional href for link items
   */
  href?: string
}

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The trigger element for the dropdown menu
   * @default <MoreVertical className="h-4 w-4" />
   */
  trigger?: React.ReactNode
  /**
   * The items to display in the dropdown menu
   */
  items: DropdownMenuItem[]
  /**
   * Label for the dropdown menu trigger button
   * @default "Open menu"
   */
  triggerLabel?: string
  /**
   * Label for the dropdown menu content
   * @default "Menu"
   */
  contentLabel?: string
  /**
   * Whether the dropdown menu should take full width
   * @default false
   */
  fullWidth?: boolean
}

export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      className,
      trigger,
      items,
      triggerLabel = "Open menu",
      contentLabel = "Menu",
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <DropdownMenuPrimitive.Root onOpenChange={setIsOpen}>
        <DropdownMenuPrimitive.Trigger asChild>
          <div
            ref={ref}
            role="button"
            tabIndex={0}
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-label={triggerLabel}
            className={cn("cursor-pointer", fullWidth && "w-full", className)}
            {...props}
          >
            {trigger || <MoreVertical className="h-4 w-4" aria-hidden="true" />}
          </div>
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            role="menu"
            aria-label={contentLabel}
            className={cn(
              "z-50 overflow-hidden rounded-md border bg-white p-1 shadow-md",
              fullWidth ? "w-full" : "min-w-[8rem]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
              "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
            )}
          >
            {items.map((item, index) => {
              const content = (
                <>
                  {item.icon && (
                    <span className="mr-2" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </>
              )

              return (
                <DropdownMenuPrimitive.Item
                  key={index}
                  disabled={item.disabled}
                  onClick={item.onClick}
                  role="menuitem"
                  aria-label={item.label}
                  aria-disabled={item.disabled}
                  aria-describedby={item.description ? `item-${index}-desc` : undefined}
                  className={cn(
                    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                    "hover:bg-gray-100 hover:text-gray-900",
                    "focus:bg-gray-100 focus:text-gray-900",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    fullWidth && "w-full"
                  )}
                >
                  {content}
                  {item.description && (
                    <span id={`item-${index}-desc`} className="sr-only">
                      {item.description}
                    </span>
                  )}
                </DropdownMenuPrimitive.Item>
              )
            })}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    )
  }
)

DropdownMenu.displayName = "DropdownMenu"
