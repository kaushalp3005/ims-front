"use client"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface SimpleDropdownOption {
  value: string
  label: string
}

export interface SimpleDropdownProps {
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  options: SimpleDropdownOption[]
  loading?: boolean
  error?: string | null
  disabled?: boolean
  className?: string
}

export function SimpleDropdown({
  value,
  onValueChange,
  placeholder = "Select option...",
  options = [],
  loading = false,
  error = null,
  disabled = false,
  className,
}: SimpleDropdownProps) {
  if (loading) {
    return (
      <div className={cn("flex items-center gap-2 h-10 px-3 py-2 border rounded-md bg-muted", className)}>
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn("flex items-center h-10 px-3 py-2 border border-red-500 rounded-md bg-red-50", className)}>
        <span className="text-sm text-red-600">{error}</span>
      </div>
    )
  }

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {Array.isArray(options) && options.length > 0 ? (
          options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))
        ) : (
          <div className="px-2 py-1.5 text-sm text-muted-foreground">No options available</div>
        )}
      </SelectContent>
    </Select>
  )
}
