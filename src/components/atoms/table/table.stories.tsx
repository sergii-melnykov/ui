import type { Meta, StoryObj } from "@storybook/react-vite"
import { TableDesignSpec } from "./table-design-spec"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption
} from "@/components/atoms/table"
import {
  useTable,
  flexRender,
  createColumnHelper,
  tableOptions,
  stockFeatures,
  createCoreRowModel,
  createSortedRowModel,
  createPaginatedRowModel,
  createFilteredRowModel
} from "@tanstack/react-table"
import type { SortingState } from "@tanstack/table-core"
import { useState } from "react"

const meta: Meta<typeof Table> = {
  title: "Atoms/Table",
  component: Table,
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof Table>

export const DesignSpec: Story = {
  render: () => <TableDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
      <TableCaption>A list of your recent invoices.</TableCaption>
    </Table>
  )
}

export const WithCustomStyling: Story = {
  render: () => (
    <Table className="border-collapse border border-slate-400">
      <TableHeader>
        <TableRow className="bg-slate-100">
          <TableHead className="border border-slate-300">Name</TableHead>
          <TableHead className="border border-slate-300">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="border border-slate-300">John Doe</TableCell>
          <TableCell className="border border-slate-300">Developer</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border border-slate-300">Jane Smith</TableCell>
          <TableCell className="border border-slate-300">Designer</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

type Person = {
  id: string
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const data: Person[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    age: 32,
    visits: 10,
    status: "Active",
    progress: 75
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    age: 28,
    visits: 15,
    status: "Inactive",
    progress: 45
  },
  {
    id: "3",
    firstName: "Bob",
    lastName: "Johnson",
    age: 45,
    visits: 8,
    status: "Active",
    progress: 90
  },
  {
    id: "4",
    firstName: "Alice",
    lastName: "Brown",
    age: 35,
    visits: 12,
    status: "Pending",
    progress: 60
  }
]

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
      status === "Active"
        ? "bg-green-100 text-green-800"
        : status === "Inactive"
          ? "bg-red-100 text-red-800"
          : "bg-yellow-100 text-yellow-800"
    }`}
  >
    {status}
  </span>
)

const ProgressBar = ({ value }: { value: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${String(value)}%` }} />
  </div>
)

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor("firstName", {
    header: "First Name",
    cell: (info) => String(info.getValue())
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name",
    cell: (info) => String(info.getValue())
  }),
  columnHelper.accessor("age", {
    header: "Age",
    cell: (info) => String(info.getValue())
  }),
  columnHelper.accessor("visits", {
    header: "Visits",
    cell: (info) => String(info.getValue())
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => <StatusBadge status={String(info.getValue())} />
  }),
  columnHelper.accessor("progress", {
    header: "Progress",
    cell: (info) => <ProgressBar value={Number(info.getValue())} />
  })
]

/* TanStack Table v9: useTable instance types are not resolved in the ESLint TS program. */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/restrict-plus-operands */
const TanStackTableDemo = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const table = useTable<Person>(
    tableOptions({
      features: stockFeatures,
      data,
      columns,
      state: {
        sorting,
        globalFilter
      },
      onSortingChange: setSorting,
      onGlobalFilterChange: setGlobalFilter,
      rowModels: {
        core: createCoreRowModel(),
        sorted: createSortedRowModel(),
        paginated: createPaginatedRowModel(),
        filtered: createFilteredRowModel()
      }
    })
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => {
            setGlobalFilter(e.target.value)
          }}
          className="px-3 py-2 border rounded-md"
          placeholder="Search all columns..."
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="cursor-pointer select-none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: " 🔼",
                    desc: " 🔽"
                  }[header.column.getIsSorted() as string] ?? null}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-1 border rounded-md"
            onClick={() => {
              table.setPageIndex(0)
            }}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            type="button"
            className="px-3 py-1 border rounded-md"
            onClick={() => {
              table.previousPage()
            }}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            type="button"
            className="px-3 py-1 border rounded-md"
            onClick={() => {
              table.nextPage()
            }}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            type="button"
            className="px-3 py-1 border rounded-md"
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1)
            }}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {String(table.getState().pagination.pageIndex + 1)} of {String(table.getPageCount())}
          </strong>
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
          className="px-3 py-1 border rounded-md"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/restrict-plus-operands */

export const WithTanStackTable: Story = {
  render: () => <TanStackTableDemo />
}
