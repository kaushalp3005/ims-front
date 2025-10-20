"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Construction, Calendar, Wrench } from "lucide-react"
interface ReorderingPageProps {
  params: {
    company: string
  }
}

export default function ReorderingPage({ params }: ReorderingPageProps) {
  return (
    <div className="container mx-auto p-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Construction className="h-16 w-16 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl">Reordering System</CardTitle>
            <CardDescription className="text-lg">Automate reorder processes and supplier management</CardDescription>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                UNDER DEVELOPMENT
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Coming Soon
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-3">Module Under Construction</h3>
              <p className="text-muted-foreground">
                This module is currently being developed. It will include reorder automation, 
                supplier management, and procurement workflows.
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Development Status</h4>
              <p className="text-sm text-muted-foreground">
                The Reordering module is being built to provide automated reorder processes 
                and supplier management capabilities.
              </p>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" disabled>
                Under Development
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
