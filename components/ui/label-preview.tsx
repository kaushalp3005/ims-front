"use client"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface LabelPreviewProps {
  src?: string | null
  alt?: string
  loading?: boolean
  className?: string
  width?: number
  height?: number
}

export function LabelPreview({
  src,
  alt = "Label preview",
  loading = false,
  className,
  width = 400,
  height = 200,
}: LabelPreviewProps) {
  if (loading) {
    return (
      <div
        className={cn("flex items-center justify-center border rounded-md bg-muted", className)}
        style={{ width, height }}
      >
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Generating label...</p>
        </div>
      </div>
    )
  }

  if (!src) {
    return (
      <div
        className={cn("flex items-center justify-center border border-dashed rounded-md bg-muted/50", className)}
        style={{ width, height }}
      >
        <p className="text-sm text-muted-foreground">No label to preview</p>
      </div>
    )
  }

  return (
    <div className={cn("border rounded-md overflow-hidden bg-white", className)}>
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className="w-full h-full object-contain"
        style={{ maxWidth: width, maxHeight: height }}
      />
    </div>
  )
}
