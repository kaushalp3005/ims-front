"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// TODO: Replace with real backend API calls
// import { getTransferList } from "@/lib/api/transfer"
import Link from "next/link"
import { Plus, Eye, Search, ArrowRightLeft } from "lucide-react"
import { format } from "date-fns"
import type { Company } from "@/types/auth"

interface TransferListPageProps {
  params: {
    company: Company
  }
}

export default function TransferListPage({ params }: TransferListPageProps) {
  const { company } = params
  // TODO: Fetch from real API
  // const [records, setRecords] = useState([])
  // const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   fetchTransferList(company).then(setRecords).finally(() => setLoading(false))
  // }, [company])
  
  // Placeholder data for demo
  const records: any[] = [
    {
      id: "1",
      company,
      source_location: "W202",
      destination_location: "A185",
      transfer_date: "2024-01-15",
      status: "Completed"
    }
  ]

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <ArrowRightLeft className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold tracking-tight">Transfer Records</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Manage location transfers for {company}</p>
            </div>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link href={`/${company}/transfer/new`}>
              <Plus className="mr-2 h-4 w-4" />
              New Transfer
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Filters</CardTitle>
            <CardDescription className="text-sm">Search and filter transfer records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search transfers..." className="pl-8 sm:pl-10 text-xs sm:text-sm" />
              </div>
              <Input type="date" placeholder="From date" className="text-xs sm:text-sm" />
              <Input type="date" placeholder="To date" className="text-xs sm:text-sm" />
              <Button variant="outline" className="text-xs sm:text-sm h-9">Apply Filters</Button>
            </div>
          </CardContent>
        </Card>

        {/* Records Table */}
        <Card>
          <CardHeader>
            <CardTitle>Records ({records.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {records.length > 0 ? (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transfer ID</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Batch No</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Approved By</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-mono text-sm">{record.id}</TableCell>
                        <TableCell>
                          <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium inline-block">
                            {record.source_location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium inline-block">
                            {record.destination_location}
                          </div>
                        </TableCell>
                        <TableCell>{record.batch_no || "-"}</TableCell>
                        <TableCell>
                          {record.transfer_date ? format(new Date(record.transfer_date), "MMM dd, yyyy") : "-"}
                        </TableCell>
                        <TableCell>{record.time || "-"}</TableCell>
                        <TableCell>{record.approved_by || "-"}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/${company}/transfer/${record.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <ArrowRightLeft className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No transfer records found</p>
                <Button asChild>
                  <Link href={`/${company}/transfer/new`}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Transfer
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
    </div>
  )
}
