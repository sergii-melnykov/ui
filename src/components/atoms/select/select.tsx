"use client"

import * as React from "react"
import * as Select from "@radix-ui/react-select"
import { ChevronDown } from "lucide-react"
import clsx from "clsx"
import { Dispatch, SetStateAction } from "react"
import { Input } from "../input"

type Option = {
  id: string
  label: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

type Props = {
  fullWidth?: boolean
  options: Option[]
  value: string
  onChange: Dispatch<SetStateAction<string | null>>
}

export default function SearchableSelect({ fullWidth, options, value, onChange }: Props) {
  const [search, setSearch] = React.useState("")

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Select.Root
      value={value}
      onValueChange={(val) => {
        onChange(val)
      }}
      onOpenChange={() => setSearch("")}
    >
      <Select.Trigger
        className={clsx(
          "inline-flex items-center justify-between rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
          fullWidth && "w-full"
        )}
        aria-label="Movie"
      >
        <Select.Value placeholder="Select a movie" />
        <Select.Icon className="ml-2">
          <ChevronDown className="w-4 h-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Content
        className="z-50 overflow-hidden rounded-md border border-gray-200 bg-white shadow-md"
        position="popper"
      >
        <div className="p-2">
          <Input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        <Select.Viewport className="max-h-60 overflow-y-auto p-1" autoFocus={false}>
          {filteredOptions.map((option) => (
            <Select.Item
              key={option.id}
              value={option.id}
              className={clsx(
                "relative flex cursor-pointer select-none items-center hover:border-none rounded-md px-3 py-1 my-1 text-sm text-gray-800 hover:bg-blue-100 radix-disabled:opacity-50",
                "flex items-center justify-between",
                value === option.id && "bg-blue-100"
              )}
            >
              <div className="flex items-center gap-1">
                {option.startIcon && option.startIcon}
                <Select.ItemText>{option.label}</Select.ItemText>
              </div>
              {option.endIcon && <div className="ml-2">{option.endIcon}</div>}
            </Select.Item>
          ))}

          {filteredOptions.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-500">No results</div>
          )}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  )
}
