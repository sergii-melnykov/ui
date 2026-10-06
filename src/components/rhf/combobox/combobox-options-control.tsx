"use client"

import * as React from "react"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue
} from "@/components/atoms/combobox/combobox"
import { cn } from "@/utils/cn"

import type { FormComboboxOption } from "./combobox.types"

export type ComboboxOptionsControlProps<TOptionId extends string | number = string | number> = {
  options: FormComboboxOption<TOptionId>[]
  value: TOptionId | TOptionId[] | null | undefined
  onChange: (value: TOptionId | TOptionId[] | null) => void
  multiple?: boolean
  placeholder?: string
  disabled?: boolean
  required?: boolean
  showClear?: boolean
  fullWidth?: boolean
  error?: boolean
  className?: string
  id?: string
}

function toItemKey(id: string | number): string {
  return String(id)
}

function findOption<TOptionId extends string | number>(
  options: FormComboboxOption<TOptionId>[],
  itemKey: string
): FormComboboxOption<TOptionId> | undefined {
  return options.find((option) => toItemKey(option.id) === itemKey)
}

/** Searchable combobox for {@link FormCombobox}. */
export function ComboboxOptionsControl<TOptionId extends string | number = string | number>({
  options,
  value,
  onChange,
  multiple = false,
  placeholder = "Select…",
  disabled,
  required,
  showClear,
  fullWidth,
  error,
  className,
  id
}: ComboboxOptionsControlProps<TOptionId>) {
  const itemKeys = React.useMemo(() => options.map((option) => toItemKey(option.id)), [options])

  const singleValue = multiple
    ? null
    : value != null && value !== ""
      ? toItemKey(value as TOptionId)
      : null

  const multiValue = multiple ? (Array.isArray(value) ? value.map((v) => toItemKey(v)) : []) : []

  if (multiple) {
    return (
      <div className={cn(fullWidth && "w-full", className)} id={id}>
        <Combobox
          items={itemKeys}
          multiple
          value={multiValue}
          onValueChange={(next) => {
            const ids = next.map((key) => {
              const option = findOption(options, key)
              return option?.id ?? key
            })
            onChange(ids as TOptionId[])
          }}
          disabled={disabled}
        >
          <ComboboxChips aria-invalid={error} aria-required={required}>
            <ComboboxValue>
              {multiValue.map((itemKey) => {
                const option = findOption(options, itemKey)
                return <ComboboxChip key={itemKey}>{option?.label ?? itemKey}</ComboboxChip>
              })}
            </ComboboxValue>
            <ComboboxChipsInput placeholder={placeholder} disabled={disabled} />
          </ComboboxChips>
          <ComboboxContent>
            <ComboboxEmpty>No results.</ComboboxEmpty>
            <ComboboxList>
              {(itemKey: string) => {
                const option = findOption(options, itemKey)
                return (
                  <ComboboxItem key={itemKey} value={itemKey} disabled={option?.disabled}>
                    {option?.label ?? itemKey}
                  </ComboboxItem>
                )
              }}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    )
  }

  return (
    <div className={cn(fullWidth && "w-full", className)} id={id}>
      <Combobox
        items={itemKeys}
        value={singleValue}
        onValueChange={(next) => {
          if (next == null) {
            onChange(null)
            return
          }
          const option = findOption(options, next)
          onChange((option?.id ?? next) as TOptionId)
        }}
        disabled={disabled}
      >
        <ComboboxInput
          placeholder={placeholder}
          showClear={showClear}
          disabled={disabled}
          aria-invalid={error}
          aria-required={required}
          className={cn(fullWidth && "w-full")}
        />
        <ComboboxContent>
          <ComboboxEmpty>No results.</ComboboxEmpty>
          <ComboboxList>
            {(itemKey: string) => {
              const option = findOption(options, itemKey)
              return (
                <ComboboxItem key={itemKey} value={itemKey} disabled={option?.disabled}>
                  {option?.label ?? itemKey}
                </ComboboxItem>
              )
            }}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
