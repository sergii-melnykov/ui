"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

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

type Option = {
  id: string
  label: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  className?: string
  disabled?: boolean
}

type SearchableSelectProps = {
  /** Whether the select should take up the full width of its container */
  fullWidth?: boolean
  /** Array of options to display in the select */
  options: Option[]
  /** Currently selected value */
  value: string
  /** Callback fired when the value changes */
  onChange: (value: string) => void
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
}

/**
 * SearchableSelect component that provides a searchable dropdown select input.
 * Built on top of Radix UI's Select primitive.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs-atoms-select--docs
 *
 * @example
 * ```tsx
 * <SearchableSelect
 *   options={[
 *     { id: "1", label: "Option 1" },
 *     { id: "2", label: "Option 2" }
 *   ]}
 *   value="1"
 *   onChange={setValue}
 *   label="Select an option"
 *   required
 * />
 * ```
 */
export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled,
  required,
  error,
  className,
  fullWidth,
  id,
  name,
  label,
  helperText
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false)
  const selectedOption = options.find((option) => option.id === value)

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
          id={id ? `${id}-content` : undefined}
          className={cn(
            "w-[13rem] p-0 rounded-md border bg-popover text-popover-foreground shadow-md",
            fullWidth && "w-full"
          )}
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search..." className="h-9" />
            <CommandList className="max-h-[12rem] overflow-y-auto">
              <CommandEmpty>No items found.</CommandEmpty>
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
