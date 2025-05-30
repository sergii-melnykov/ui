"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"

import { cn } from "@/utils"

import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Button } from "../button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "../command"
import { Typography } from "../typography"

export type MultiSelectOption = {
  id: string
  label: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  className?: string
  disabled?: boolean
}

export type MultiSelectProps = {
  /** Whether the select is searchable */
  searchable?: boolean
  /** Whether the select should take up the full width of its container */
  fullWidth?: boolean
  /** Array of options to display in the select */
  options: MultiSelectOption[]
  /** Currently selected values */
  value: string[]
  /** Callback fired when the values change */
  onChange: (value: string[]) => void
  /** Placeholder text to show when no value is selected */
  placeholder?: string
  /** Whether the select is disabled */
  disabled?: boolean
  /** Whether the select is required */
  required?: boolean
  /** Error message to display */
  error?: string
  /** Additional class name for the select */
  className?: string
  /** ID for the select element */
  id?: string
  /** Name for the select element */
  name?: string
  /** Label for the select element */
  label?: string
  /** Helper text to display below the select */
  helperText?: string
  /** Maximum number of selections allowed */
  maxSelections?: number
  /** Whether to show the select all option */
  showSelectAll?: boolean
}

/**
 * MultiSelect component that provides a searchable dropdown select input with multiple selection.
 * Built on top of Radix UI's Select primitive.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs-atoms-multiselect--docs
 *
 * @example
 * ```tsx
 * <MultiSelect
 *   options={[
 *     { id: "1", label: "Option 1" },
 *     { id: "2", label: "Option 2" }
 *   ]}
 *   value={["1"]}
 *   onChange={setValue}
 *   label="Select options"
 *   showSelectAll
 * />
 * ```
 */
export function MultiSelect({
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
  name,
  label,
  helperText,
  maxSelections,
  showSelectAll
}: MultiSelectProps) {
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
    <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
      {label && (
        <Typography
          variant="small"
          className={cn(
            "font-medium",
            error && "text-destructive",
            disabled && "text-muted-foreground"
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Typography>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-controls={id ? `${id}-content` : undefined}
            aria-label={label || placeholder}
            aria-required={required}
            aria-invalid={!!error}
            disabled={disabled}
            id={id}
            name={name}
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
                    <button
                      type="button"
                      onClick={(e) => handleRemove(option.id, e)}
                      className="hover:bg-secondary-foreground/20 rounded-sm"
                    >
                      <X className="h-3 w-3" />
                    </button>
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
                {options.map((option) => (
                  <CommandItem
                    value={option.id}
                    key={option.id}
                    onSelect={() => handleSelect(option.id)}
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
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {(error || helperText) && (
        <Typography
          variant="small"
          className={cn("text-sm", error ? "text-destructive" : "text-muted-foreground")}
        >
          {error || helperText}
        </Typography>
      )}
    </div>
  )
}
