"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"

import { Button } from "@/components/atoms/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/atoms/command"
import { Typography } from "@/components/atoms/typography"
import { cn } from "@/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/atoms/popover"

export type MultiSelectOptionsControlOption = {
  id: string
  label: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  className?: string
  disabled?: boolean
}

export type MultiSelectOptionsControlProps = {
  searchable?: boolean
  fullWidth?: boolean
  options: MultiSelectOptionsControlOption[]
  value: string[]
  onChange: (value: string[]) => void
  renderCommandList?: (options: MultiSelectOptionsControlOption[]) => React.ReactNode
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  className?: string
  id?: string
  maxSelections?: number
  showSelectAll?: boolean
}

/** Internal Popover + Command picker for {@link FormMultiSelect}. */
export function MultiSelectOptionsControl({
  options,
  value,
  onChange,
  placeholder = "Select options",
  disabled,
  required,
  error,
  className,
  fullWidth,
  searchable,
  id,
  maxSelections,
  showSelectAll,
  renderCommandList
}: MultiSelectOptionsControlProps) {
  const [open, setOpen] = React.useState(false)
  const selectedOptions = options.filter((option) => value.includes(option.id))

  const handleSelect = (optionId: string) => {
    if (value.includes(optionId)) {
      onChange(value.filter((selectedId) => selectedId !== optionId))
    } else {
      if (maxSelections && value.length >= maxSelections) {
        return
      }
      onChange([...value, optionId])
    }
  }

  const handleSelectAll = () => {
    const enabledOptions = options.filter((option) => !option.disabled)
    if (value.length === enabledOptions.length) {
      onChange([])
    } else {
      onChange(enabledOptions.map((option) => option.id))
    }
  }

  const handleRemove = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(value.filter((selectedId) => selectedId !== optionId))
  }

  return (
    <div className={cn(fullWidth && "w-full")}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-controls={id ? `${id}-content` : undefined}
            aria-label={placeholder}
            aria-required={required}
            aria-invalid={!!error}
            disabled={disabled}
            id={id}
            className={cn(
              "w-[13rem] justify-between min-h-[2.5rem] h-auto",
              !value.length && "text-muted-foreground",
              fullWidth && "w-full",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
          >
            <div className="flex flex-wrap gap-1">
              {selectedOptions.length > 0 ? (
                selectedOptions.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md text-sm"
                  >
                    <span>{option.label}</span>
                    <span
                      onClick={(e) => {
                        handleRemove(option.id, e)
                      }}
                      className="hover:bg-secondary-foreground/20 rounded-sm"
                    >
                      <X className="h-3 w-3" />
                    </span>
                  </div>
                ))
              ) : (
                <span>{placeholder}</span>
              )}
            </div>
            <ChevronDown className={cn("opacity-50", open && "rotate-180")} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          id={id ? `${id}-content` : undefined}
          className={cn(
            "w-[13rem] p-0 rounded-md border bg-popover text-popover-foreground shadow-md",
            fullWidth && "w-full"
          )}
          align="start"
        >
          <Command>
            {searchable && (
              <CommandInput placeholder="Search..." className="h-9" disabled={disabled} />
            )}
            <CommandList className="max-h-[12rem] overflow-y-auto">
              <CommandEmpty>No items found.</CommandEmpty>
              <CommandGroup>
                {showSelectAll && (
                  <CommandItem
                    onSelect={handleSelectAll}
                    className="flex items-center gap-2 cursor-pointer my-1"
                  >
                    <div className="flex h-4 w-4 items-center justify-center rounded border border-primary">
                      {value.length === options.filter((o) => !o.disabled).length && (
                        <Check className="h-3 w-3" />
                      )}
                    </div>
                    <Typography variant="small">Select All</Typography>
                  </CommandItem>
                )}
                <CommandSeparator />
              </CommandGroup>
              {renderCommandList ? (
                renderCommandList(options)
              ) : (
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      value={option.id}
                      key={option.id}
                      onSelect={() => {
                        handleSelect(option.id)
                      }}
                      disabled={option.disabled}
                      className={cn(
                        "flex items-center justify-between cursor-pointer my-1",
                        option.disabled && "opacity-50 cursor-not-allowed",
                        option.className
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-4 w-4 items-center justify-center rounded border border-primary">
                          {value.includes(option.id) && <Check className="h-3 w-3" />}
                        </div>
                        <div className="flex items-center gap-1">
                          {option.startIcon && option.startIcon}
                          <Typography variant="small">{option.label}</Typography>
                        </div>
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
