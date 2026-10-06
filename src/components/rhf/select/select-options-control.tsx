"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/atoms/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/atoms/command"
import { Typography } from "@/components/atoms/typography"
import { cn } from "@/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/atoms/popover"

export type SelectOptionsControlOption<T extends string | number = string | number> = {
  id: T
  label: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  className?: string
  disabled?: boolean
}

export type SelectOptionsControlProps<T extends string | number = string | number> = {
  searchable?: boolean
  fullWidth?: boolean
  value: T
  options: SelectOptionsControlOption<T>[]
  onChange: (value: T) => void
  renderCommandList?: (options: SelectOptionsControlOption<T>[]) => React.ReactNode
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  className?: string
  id?: string
}

/** Internal Popover + Command picker for {@link FormSelect}. */
export function SelectOptionsControl<T extends string | number = string | number>({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled,
  required,
  error,
  className,
  fullWidth,
  searchable,
  id,
  renderCommandList
}: SelectOptionsControlProps<T>) {
  const [open, setOpen] = React.useState(false)
  const [triggerWidth, setTriggerWidth] = React.useState<number | undefined>(undefined)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const selectedOption = options.find((option) => option.id === value)

  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth)
    }
  }, [])

  return (
    <div className={cn(fullWidth && "w-full")}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-controls={id ? `${id}-content` : undefined}
            aria-required={required}
            aria-invalid={!!error}
            disabled={disabled}
            className={cn(
              "w-[13rem] justify-between",
              !value && "text-muted-foreground",
              fullWidth && "w-full",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronDown className={cn("opacity-50", open && "rotate-180")} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "p-0 rounded-md border bg-popover text-popover-foreground shadow-md",
            fullWidth && "w-full"
          )}
          style={{ width: triggerWidth }}
          align="start"
        >
          <Command>
            {searchable && (
              <CommandInput placeholder="Search..." className="h-9" disabled={disabled} />
            )}
            <CommandList className="max-h-[12rem] overflow-y-auto">
              <CommandEmpty>No items found.</CommandEmpty>
              {renderCommandList ? (
                renderCommandList(options)
              ) : (
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      value={option.label}
                      key={option.id}
                      onSelect={() => {
                        onChange(option.id)
                        setOpen(false)
                      }}
                      disabled={option.disabled}
                      className={cn(
                        "flex items-center justify-between cursor-pointer my-1",
                        value === option.id && "bg-accent text-accent-foreground",
                        option.disabled && "opacity-50 cursor-not-allowed",
                        option.className
                      )}
                    >
                      <div className="flex items-center gap-1">
                        {option.startIcon && option.startIcon}
                        <Typography variant="small">{option.label}</Typography>
                      </div>
                      {option.endIcon && <div className="ml-2">{option.endIcon}</div>}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
