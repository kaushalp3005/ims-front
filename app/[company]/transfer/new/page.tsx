"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// Database operations will be handled by backend API
import { transferFormSchema, type TransferFormData } from "@/lib/validations/transfer"
import { useAuthStore } from "@/lib/stores/auth"
import { useToast } from "@/hooks/use-toast"
import { Save, ArrowRightLeft } from "lucide-react"
import type { Company } from "@/types/auth"
import type { SourceLocation, DestinationLocation } from "@/types/transfer"

interface NewTransferPageProps {
  params: {
    company: Company
  }
}

const sourceLocations: SourceLocation[] = ["W202", "A185", "A101", "A68", "F53"]
const destinationLocations: DestinationLocation[] = ["W202", "A185", "A101", "A68", "F53", "Savla", "Rishi"]

export default function NewTransferPage({ params }: NewTransferPageProps) {
  const { company: urlCompany } = params
  const { currentCompany } = useAuthStore()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Use currentCompany from auth store (header selection) if available, otherwise fall back to URL param
  const company = currentCompany || urlCompany

  const form = useForm<TransferFormData>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: {
      company,
      transfer_date: new Date().toISOString().slice(0, 10),
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toTimeString().slice(0, 5),
    },
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form
  const watchedValues = watch()

  const onSubmit = async (data: TransferFormData) => {
    setIsSubmitting(true)

    try {
      // TODO: Replace with real backend API call
      // const record = await createTransfer(data)
      const record = { id: `TR-${Date.now()}` } // Temporary placeholder

      toast({
        title: "Transfer Record Created",
        description: `Transfer ID: ${record.id}`,
      })

      // TODO: Once real API is integrated, use: router.push(`/${company}/transfer/${record.id}`)
      router.push(`/${company}/transfer`) // Temporary redirect to list page
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create transfer record",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <ArrowRightLeft className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Transfer</h1>
          <p className="text-muted-foreground">Transfer items between locations for {company}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Transfer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Transfer Information</CardTitle>
            <CardDescription>Specify the source and destination locations for this transfer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={company}
                  readOnly
                  className="bg-muted"
                  placeholder="Company"
                />
              </div>
              <div>
                <Label htmlFor="approved_by">Approved By *</Label>
                <Input id="approved_by" {...register("approved_by")} placeholder="Enter approver name" />
                {errors.approved_by && <p className="text-sm text-red-600">{errors.approved_by.message}</p>}
              </div>
            </div>

            {/* Location Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="source_location">Source Location *</Label>
                <Select
                  value={watchedValues.source_location}
                  onValueChange={(value: SourceLocation) => setValue("source_location", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source location" />
                  </SelectTrigger>
                  <SelectContent>
                    {sourceLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.source_location && <p className="text-sm text-red-600">{errors.source_location.message}</p>}
              </div>
              <div>
                <Label htmlFor="destination_location">Destination Location *</Label>
                <Select
                  value={watchedValues.destination_location}
                  onValueChange={(value: DestinationLocation) => setValue("destination_location", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination location" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinationLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.destination_location && (
                  <p className="text-sm text-red-600">{errors.destination_location.message}</p>
                )}
              </div>
            </div>

            {/* Visual Transfer Flow */}
            {watchedValues.source_location && watchedValues.destination_location && (
              <div className="flex items-center justify-center p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium">
                    {watchedValues.source_location}
                  </div>
                  <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
                  <div className="px-3 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                    {watchedValues.destination_location}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Date and Time Information */}
        <Card>
          <CardHeader>
            <CardTitle>Date & Time Information</CardTitle>
            <CardDescription>Specify when this transfer is taking place</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="transfer_date">Transfer Date *</Label>
                <Input id="transfer_date" type="date" {...register("transfer_date")} />
                {errors.transfer_date && <p className="text-sm text-red-600">{errors.transfer_date.message}</p>}
              </div>
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input id="date" type="date" {...register("date")} />
                {errors.date && <p className="text-sm text-red-600">{errors.date.message}</p>}
              </div>
              <div>
                <Label htmlFor="time">Time *</Label>
                <Input id="time" type="time" {...register("time")} />
                {errors.time && <p className="text-sm text-red-600">{errors.time.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Batch Information */}
        <Card>
          <CardHeader>
            <CardTitle>Batch Information</CardTitle>
            <CardDescription>Optional batch number for tracking purposes</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="batch_no">Batch Number</Label>
              <Input id="batch_no" {...register("batch_no")} placeholder="Enter batch number (optional)" />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Creating..." : "Create Transfer"}
          </Button>
        </div>
      </form>
    </div>
  )
}
