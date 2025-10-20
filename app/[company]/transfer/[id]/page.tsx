"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit, ArrowRightLeft, MapPin, Clock, User, Calendar, Package } from "lucide-react"
import { format } from "date-fns"
import type { Company } from "@/types/auth"

interface TransferDetailPageProps {
  params: {
    company: Company
    id: string
  }
}

export default function TransferDetailPage({ params }: TransferDetailPageProps) {
  const { company, id } = params
  
  // Temporary placeholder data for demo
  const record = {
    id,
    company,
    source_location: "Sample Source",
    destination_location: "Sample Destination", 
    transfer_date: "2024-01-15T10:30:00Z",
    date: "2024-01-15T10:30:00Z",
    time: "10:00 AM",
    approved_by: "Sample User",
    batch_no: "BT-001",
    created_at: "2024-01-15T10:30:00Z"
  }

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/${company}/transfer`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to List
            </Link>
          </Button>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <ArrowRightLeft className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Transfer Details</h1>
              <p className="text-muted-foreground">Transfer ID: {record.id}</p>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>

      {/* Transfer Flow Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Transfer Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-sm text-muted-foreground">From</p>
                <p className="font-semibold text-lg">{record.source_location}</p>
              </div>

              <div className="flex flex-col items-center">
                <ArrowRightLeft className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">Transfer</p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-sm text-muted-foreground">To</p>
                <p className="font-semibold text-lg">{record.destination_location}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Location Details */}
        <Card>
          <CardHeader>
            <CardTitle>Location Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Source Location</p>
                  <p className="font-semibold">{record.source_location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Destination Location</p>
                  <p className="font-semibold">{record.destination_location}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timing Details */}
        <Card>
          <CardHeader>
            <CardTitle>Timing Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Transfer Date</p>
                <p className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(record.transfer_date), "PPP")}</span>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date</p>
                <p className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(record.date), "PPP")}</span>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Time</p>
                <p className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{record.time || "-"}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Approval Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Approval Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved By</p>
                <p className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{record.approved_by || "Not specified"}</span>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Batch Number</p>
                <p className="font-mono">{record.batch_no || "No batch number specified"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created At</p>
                <p>{format(new Date(record.created_at), "PPp")}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Record Status</p>
                <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium inline-block">
                  Completed
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
