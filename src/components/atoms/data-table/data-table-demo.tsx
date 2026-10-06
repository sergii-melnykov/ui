"use client"

import * as React from "react"
import { useState } from "react"
import {
  createColumnHelper,
  createCoreRowModel,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  flexRender,
  stockFeatures,
  tableFeatures,
  useTable
} from "@tanstack/react-table"
import type {
  Column,
  ColumnFiltersState,
  ColumnVisibilityState,
  RowSelectionState,
  SortingState
} from "@tanstack/table-core"
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Checkbox } from "@/components/atoms/checkbox/checkbox"
import { Input } from "@/components/atoms/input/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/atoms/table/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/organisms/dropdown-menu/dropdown-menu"
import { cn } from "@/utils/index"

export type Payment = {
  id: string
  status: string
  email: string
  amount: number
}

export const paymentsDemoData: Payment[] = [
  { id: "pay-1", status: "Success", email: "ken99@yahoo.com", amount: 316 },
  { id: "pay-2", status: "Success", email: "abe45@gmail.com", amount: 242 },
  { id: "pay-3", status: "Processing", email: "monserrat44@gmail.com", amount: 837 },
  { id: "pay-4", status: "Success", email: "silas22@gmail.com", amount: 874 },
  { id: "pay-5", status: "Failed", email: "carmella@hotmail.com", amount: 721 }
]

const dataTableFeatures = tableFeatures({
  ...stockFeatures,
  coreRowModel: createCoreRowModel(),
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel()
})

const columnHelper = createColumnHelper<typeof dataTableFeatures, Payment>()

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount)
}

function DataTableColumnHeader<TValue>({
  column,
  title,
  className
}: {
  column: Column<typeof dataTableFeatures, Payment, TValue>
  title: string
  className?: string
}) {
  if (!column.getCanSort()) {
    return <span className={cn("text-sm font-medium", className)}>{title}</span>
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-2.5 h-8 px-2.5 font-medium text-foreground hover:bg-transparent"
      onClick={() => {
        column.toggleSorting()
      }}
    >
      {title}
      <ArrowUpDown className="size-4" />
    </Button>
  )
}

const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(value === true)
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(value === true)
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  }),
  columnHelper.accessor("status", {
    header: () => <span className="text-sm font-medium">Status</span>,
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor("amount", {
    header: () => <span className="ml-auto block text-right text-sm font-medium">Amount</span>,
    cell: (info) => (
      <span className="block text-right font-normal">{formatAmount(info.getValue())}</span>
    )
  }),
  columnHelper.display({
    id: "actions",
    header: () => null,
    cell: () => null,
    enableSorting: false,
    enableHiding: false
  })
])

export function DataTableDemo({ className }: { className?: string }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const table = useTable<typeof dataTableFeatures, Payment>({
    features: dataTableFeatures,
    data: paymentsDemoData,
    columns,
    getRowId: (row) => row.id,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5
      }
    }
  })

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string | undefined) ?? ""}
          onChange={(event) => {
            table.getColumn("email")?.setFilterValue(event.target.value)
          }}
          className="h-8 w-[320px] max-w-full shadow-xs"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="default" className="h-8 shadow-xs">
              Columns
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => {
                    column.toggleVisibility(value)
                  }}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "h-10 text-foreground",
                      header.column.id === "amount" && "text-right",
                      header.column.id === "actions" && "w-full"
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn("text-sm", cell.column.id === "actions" && "w-full")}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between gap-4 py-4">
        <p className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage()
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage()
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
