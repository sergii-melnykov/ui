import * as React from "react"

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: React.ReactNode
}

export type BreadcrumbListProps = React.ComponentPropsWithoutRef<"ol">

export type BreadcrumbItemProps = React.ComponentPropsWithoutRef<"li">

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean
}

export type BreadcrumbPageProps = React.ComponentPropsWithoutRef<"span">

export type BreadcrumbSeparatorProps = React.ComponentProps<"li">

export type BreadcrumbEllipsisProps = React.ComponentProps<"span">
