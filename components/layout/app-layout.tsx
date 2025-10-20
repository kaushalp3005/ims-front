"use client"

import type React from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { Breadcrumbs } from "./breadcrumbs"
import type { Company, Module } from "@/types/auth"

interface AppLayoutProps {
  children: React.ReactNode
  company: Company
  module?: Module
  action?: "view" | "edit" | "approve"
}

export function AppLayout({ children, company, module, action = "view" }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar company={company} />
      <div className="lg:pl-64">
        <Header company={company} />
        <Breadcrumbs company={company} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
