"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { authApi } from "@/lib/api"
import { PermissionGuard } from "@/components/auth/permission-gate"
import Link from "next/link"
import { ArrowDownToLine, ArrowRightLeft, Package, TrendingUp, Clock, Loader2, AlertCircle } from "lucide-react"
import type { Company } from "@/types/auth"

interface DashboardPageProps {
  params: {
    company: Company
  }
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { company } = params

  // State management
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    totalInward: 0,
    totalTransfers: 0,
    pendingLabels: 0,
    activeItems: 0,
    weeklyInwardChange: 0,
    weeklyTransferChange: 0
  })
  const [recentInward, setRecentInward] = useState<any[]>([])
  const [recentTransfers, setRecentTransfers] = useState<any[]>([])

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch all dashboard data in parallel
        const [statsData, inwardData, transfersData] = await Promise.allSettled([
          authApi.fetchDashboardStats(company),
          authApi.fetchRecentInward(company, 5),
          authApi.fetchRecentTransfers(company, 5)
        ])

        // Handle stats
        if (statsData.status === 'fulfilled') {
          setStats(statsData.value)
        } else {
          console.warn('Failed to fetch stats:', statsData.reason)
        }

        // Handle recent inward
        if (inwardData.status === 'fulfilled') {
          setRecentInward(inwardData.value)
        } else {
          console.warn('Failed to fetch recent inward:', inwardData.reason)
        }

        // Handle recent transfers
        if (transfersData.status === 'fulfilled') {
          setRecentTransfers(transfersData.value)
        } else {
          console.warn('Failed to fetch recent transfers:', transfersData.reason)
        }

      } catch (err) {
        console.error('Dashboard data fetch error:', err)
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [company])

  const quickActions = [
    {
      title: "New Inward Entry",
      description: "Create a new inward inventory record",
      href: `/${company}/inward/new`,
      icon: ArrowDownToLine,
      module: "inward" as const,
      action: "edit" as const,
    },
    {
      title: "New Transfer",
      description: "Transfer items between locations",
      href: `/${company}/transfer/new`,
      icon: ArrowRightLeft,
      module: "transfer" as const,
      action: "edit" as const,
    },
    {
      title: "View Inventory",
      description: "Check current inventory levels",
      href: `/${company}/inventory-ledger`,
      icon: Package,
      module: "inventory-ledger" as const,
      action: "view" as const,
    },
  ]

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Welcome to {company}</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your inventory operations from this dashboard</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0">
              <CardTitle className="text-sm font-medium">Total Inward</CardTitle>
              <ArrowDownToLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-0 pt-2">
              <div className="text-xl sm:text-2xl font-bold">
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.totalInward}
              </div>
              <p className="text-xs text-muted-foreground">
                {loading ? "Loading..." : `${stats.weeklyInwardChange >= 0 ? '+' : ''}${stats.weeklyInwardChange} from last week`}
              </p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0">
              <CardTitle className="text-sm font-medium">Total Transfers</CardTitle>
              <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-0 pt-2">
              <div className="text-xl sm:text-2xl font-bold">
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.totalTransfers}
              </div>
              <p className="text-xs text-muted-foreground">
                {loading ? "Loading..." : `${stats.weeklyTransferChange >= 0 ? '+' : ''}${stats.weeklyTransferChange} from last week`}
              </p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0">
              <CardTitle className="text-sm font-medium">Pending Labels</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-0 pt-2">
              <div className="text-xl sm:text-2xl font-bold">
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.pendingLabels}
              </div>
              <p className="text-xs text-muted-foreground">
                {loading ? "Loading..." : "Awaiting QR generation"}
              </p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0">
              <CardTitle className="text-sm font-medium">Active Items</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-0 pt-2">
              <div className="text-xl sm:text-2xl font-bold">
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.activeItems.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {loading ? "Loading..." : "In inventory"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Quick Actions</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => (
              <PermissionGuard 
                key={action.href}
                module={action.module} 
                action={action.action}
                fallback={
                  <Card className="opacity-50 p-1">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        <action.icon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                        <CardTitle className="text-base sm:text-lg text-muted-foreground">{action.title}</CardTitle>
                      </div>
                      <CardDescription className="text-sm">No permission to access this feature</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button disabled className="w-full h-9">
                        Access Denied
                      </Button>
                    </CardContent>
                  </Card>
                }
              >
                <Card className="hover:shadow-md transition-shadow p-1">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      <action.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      <CardTitle className="text-base sm:text-lg">{action.title}</CardTitle>
                    </div>
                    <CardDescription className="text-sm">{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button asChild className="w-full h-9">
                      <Link href={action.href}>Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              </PermissionGuard>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
          {/* Recent Inward */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base">
                <ArrowDownToLine className="h-4 w-4" />
                <span>Recent Inward</span>
              </CardTitle>
              <CardDescription className="text-sm">Latest inventory receipts</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span className="text-sm text-muted-foreground">Loading recent inward...</span>
                </div>
              ) : recentInward.length > 0 ? (
                <div className="space-y-3">
                  {recentInward.map((record) => (
                    <div
                      key={record.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg space-y-2 sm:space-y-0"
                    >
                      <div className="flex-1 min-w-0 w-full sm:w-auto">
                        <p className="font-medium text-sm truncate">{record.item_description}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {record.invoice_number && `Invoice: ${record.invoice_number}`}
                          {record.po_number && ` • PO: ${record.po_number}`}
                          {record.quantity_units && record.uom && ` • ${record.quantity_units} ${record.uom}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Entry Date: {new Date(record.entry_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={record.status === "Completed" ? "default" : "secondary"} className="text-xs">
                          {record.status}
                        </Badge>
                        <Button variant="ghost" size="sm" asChild className="h-7 text-xs">
                          <Link href={`/${company}/inward/${record.transaction_id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent h-8 text-sm" asChild>
                    <Link href={`/${company}/inward`}>View All Inward</Link>
                  </Button>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4 text-sm">No inward records yet</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Transfers */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base">
                <ArrowRightLeft className="h-4 w-4" />
                <span>Recent Transfers</span>
              </CardTitle>
              <CardDescription className="text-sm">Latest location transfers</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span className="text-sm text-muted-foreground">Loading recent transfers...</span>
                </div>
              ) : recentTransfers.length > 0 ? (
                <div className="space-y-3">
                  {recentTransfers.map((record) => (
                    <div key={record.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg space-y-2 sm:space-y-0">
                      <div className="flex-1 min-w-0 w-full sm:w-auto">
                        <p className="font-medium text-sm">
                          {record.source_location} → {record.destination_location}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {record.approved_by} • {new Date(record.transfer_date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Status: {record.status}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={record.status === "Completed" ? "default" : "secondary"} className="text-xs">
                          {record.status}
                        </Badge>
                        <Button variant="ghost" size="sm" asChild className="h-7 text-xs">
                          <Link href={`/${company}/transfer/${record.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent h-8 text-sm" asChild>
                    <Link href={`/${company}/transfer`}>View All Transfers</Link>
                  </Button>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4 text-sm">No transfers yet</p>
              )}
            </CardContent>
          </Card>
        </div>
    </div>
  )
}
