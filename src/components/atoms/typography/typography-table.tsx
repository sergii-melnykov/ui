import * as React from "react"

import { cn } from "@/utils"
import { typographyTableClasses } from "./typography.variants"

function TypographyTable({
  className,
  tableClassName,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement> & {
  tableClassName?: string
}) {
  return (
    <div className={cn(typographyTableClasses.root, className)}>
      <table className={cn(typographyTableClasses.table, tableClassName)} {...props} />
    </div>
  )
}

function TypographyTableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn(typographyTableClasses.row, className)} {...props} />
}

function TypographyTableHead({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn(typographyTableClasses.headCell, className)} {...props} />
}

function TypographyTableCell({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn(typographyTableClasses.cell, className)} {...props} />
}

export { TypographyTable, TypographyTableCell, TypographyTableHead, TypographyTableRow }
