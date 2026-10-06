import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/utils/index"
import { ButtonProps, buttonVariants } from "@/components/atoms/button"

import type { PaginationNavButtonProps } from "./pagination.types"

/**
 * Pagination component that provides navigation controls for paginated content.
 * Built on top of shadcn/ui's button component.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-pagination--docs
 *
 * @example
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious href="#" />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#" isActive>1</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationEllipsis />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationNext href="#" />
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-0.5", className)} {...props} />
  )
)
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />
)
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  children,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size
      }),
      isActive && "shadow-none",
      className
    )}
    {...props}
  >
    {children}
  </a>
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  showIcon = true,
  children,
  ...props
}: PaginationNavButtonProps) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("h-8 gap-1 rounded-full px-2.5", className)}
    {...props}
  >
    {showIcon ? <ChevronLeft className="size-4" /> : null}
    <span>{children ?? "Previous"}</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  showIcon = true,
  children,
  ...props
}: PaginationNavButtonProps) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("h-8 gap-1 rounded-full px-2.5", className)}
    {...props}
  >
    <span>{children ?? "Next"}</span>
    {showIcon ? <ChevronRight className="size-4" /> : null}
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex size-8 items-center justify-center rounded-lg", className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
}
