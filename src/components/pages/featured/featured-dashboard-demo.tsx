"use client"

import * as React from "react"

import { ChartInteractiveArea } from "@/components/atoms/chart/chart-interactive-area"
import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/organisms/sidebar/sidebar"

import { FeaturedDashboardDocumentsTable } from "./featured-dashboard-documents-table"
import { FeaturedDashboardSectionCards } from "./featured-dashboard-section-cards"
import { FeaturedDashboardSidebar } from "./featured-dashboard-sidebar"

function FeaturedDashboardSiteHeader() {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">Documents</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}

export function FeaturedDashboardDemo() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)"
        } as React.CSSProperties
      }
    >
      <FeaturedDashboardSidebar />
      <SidebarInset>
        <FeaturedDashboardSiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <FeaturedDashboardSectionCards />
              <div className="px-4 lg:px-6">
                <ChartInteractiveArea />
              </div>
              <FeaturedDashboardDocumentsTable />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
