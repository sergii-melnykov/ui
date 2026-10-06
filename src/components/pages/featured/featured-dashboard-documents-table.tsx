"use client"

import * as React from "react"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleCheck,
  Loader2,
  MoreVertical,
  Plus
} from "lucide-react"

import { Badge } from "@/components/atoms/badge/badge"
import { Button } from "@/components/atoms/button/button"
import { Checkbox } from "@/components/atoms/checkbox/checkbox"
import { Input } from "@/components/atoms/input/input"
import { Label } from "@/components/atoms/label/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/atoms/table/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/molecules/tabs/tabs"

type DocumentRow = {
  id: number
  header: string
  type: string
  status: "Done" | "In Process"
  target: string
  limit: string
  reviewer: string
}

const documentRows: DocumentRow[] = [
  {
    id: 1,
    header: "Cover page",
    type: "Cover page",
    status: "In Process",
    target: "18",
    limit: "5",
    reviewer: "Eddie Lake"
  },
  {
    id: 2,
    header: "Table of contents",
    type: "Table of contents",
    status: "Done",
    target: "29",
    limit: "24",
    reviewer: "Eddie Lake"
  },
  {
    id: 3,
    header: "Executive summary",
    type: "Narrative",
    status: "Done",
    target: "10",
    limit: "13",
    reviewer: "Eddie Lake"
  },
  {
    id: 4,
    header: "Technical approach",
    type: "Narrative",
    status: "Done",
    target: "27",
    limit: "23",
    reviewer: "Jamik Tashpulatov"
  },
  {
    id: 5,
    header: "Design",
    type: "Narrative",
    status: "In Process",
    target: "2",
    limit: "16",
    reviewer: "Jamik Tashpulatov"
  },
  {
    id: 6,
    header: "Capabilities",
    type: "Narrative",
    status: "In Process",
    target: "20",
    limit: "8",
    reviewer: "Jamik Tashpulatov"
  },
  {
    id: 7,
    header: "Integration with existing systems",
    type: "Narrative",
    status: "In Process",
    target: "19",
    limit: "21",
    reviewer: "Jamik Tashpulatov"
  },
  {
    id: 8,
    header: "Innovation and Advantages",
    type: "Narrative",
    status: "Done",
    target: "25",
    limit: "26",
    reviewer: "Assign reviewer"
  },
  {
    id: 9,
    header: "Overview of EMR's Innovative Solutions",
    type: "Technical content",
    status: "Done",
    target: "7",
    limit: "23",
    reviewer: "Assign reviewer"
  },
  {
    id: 10,
    header: "Advanced Algorithms and Machine Learning",
    type: "Narrative",
    status: "Done",
    target: "30",
    limit: "28",
    reviewer: "Assign reviewer"
  }
]

function StatusBadge({ status }: { status: DocumentRow["status"] }) {
  if (status === "Done") {
    return (
      <Badge variant="outline" className="text-muted-foreground">
        <CircleCheck className="size-3 fill-green-500 text-green-500" />
        Done
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="text-muted-foreground">
      <Loader2 className="size-3 animate-spin" />
      In Process
    </Badge>
  )
}

function DocumentsTableBody() {
  const [selected, setSelected] = React.useState<Record<number, boolean>>({})

  const allSelected =
    documentRows.length > 0 && documentRows.every((row) => selected[row.id])

  return (
    <>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox
              checked={allSelected}
              onCheckedChange={(value) => {
                const next: Record<number, boolean> = {}
                if (value) {
                  for (const row of documentRows) {
                    next[row.id] = true
                  }
                }
                setSelected(next)
              }}
              aria-label="Select all"
            />
          </TableHead>
          <TableHead>Header</TableHead>
          <TableHead>Section Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Target</TableHead>
          <TableHead className="text-right">Limit</TableHead>
          <TableHead>Reviewer</TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {documentRows.map((row) => (
          <TableRow key={row.id} data-state={selected[row.id] ? "selected" : undefined}>
            <TableCell>
              <Checkbox
                checked={selected[row.id] ?? false}
                onCheckedChange={(value) => {
                  setSelected((current) => ({ ...current, [row.id]: Boolean(value) }))
                }}
                aria-label={`Select ${row.header}`}
              />
            </TableCell>
            <TableCell className="font-medium">{row.header}</TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell>
              <StatusBadge status={row.status} />
            </TableCell>
            <TableCell className="text-right">{row.target}</TableCell>
            <TableCell className="text-right">{row.limit}</TableCell>
            <TableCell>{row.reviewer}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreVertical className="size-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  )
}

export function FeaturedDashboardDocumentsTable() {
  return (
    <div className="flex w-full flex-col gap-4 px-4 lg:px-6">
      <Tabs defaultValue="outline">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="outline">Outline</TabsTrigger>
            <TabsTrigger value="past">Past Performance</TabsTrigger>
            <TabsTrigger value="personnel">Key Personnel</TabsTrigger>
            <TabsTrigger value="focus">Focus Documents</TabsTrigger>
          </TabsList>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm">
              Customize Columns
            </Button>
            <Button size="sm">
              <Plus />
              Add Section
            </Button>
          </div>
        </div>
        <TabsContent value="outline" className="mt-4">
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <DocumentsTableBody />
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <DocumentsTableBody />
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="personnel" className="mt-4">
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <DocumentsTableBody />
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="focus" className="mt-4">
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <DocumentsTableBody />
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">0 of 68 row(s) selected.</p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="featured-rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Input id="featured-rows-per-page" className="h-8 w-16" defaultValue="10" />
          </div>
          <p className="text-sm font-medium">Page 1 of 7</p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="size-8" disabled>
              <ChevronsLeft />
              <span className="sr-only">First page</span>
            </Button>
            <Button variant="outline" size="icon" className="size-8" disabled>
              <ChevronLeft />
              <span className="sr-only">Previous page</span>
            </Button>
            <Button variant="outline" size="icon" className="size-8">
              <ChevronRight />
              <span className="sr-only">Next page</span>
            </Button>
            <Button variant="outline" size="icon" className="size-8">
              <ChevronsRight />
              <span className="sr-only">Last page</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
