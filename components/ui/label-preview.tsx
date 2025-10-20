"use client"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface LabelPreviewProps {
  imageUrl: string | null
  isGenerating?: boolean
  className?: string
  width?: number
  height?: number
}

export function LabelPreview({
  imageUrl,
  isGenerating = false,
  className,
  width = 400,
  height = 200,
}: LabelPreviewProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <div
          className="relative flex items-center justify-center bg-muted rounded-md"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            maxWidth: "100%",
          }}
        >
          {isGenerating ? (
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Generating label...</p>
            </div>
          ) : imageUrl ? (
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Label preview"
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm">No label preview available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
