import type { Company } from "./auth"

export type SourceLocation = "W202" | "A185" | "A101" | "A68" | "F53"
export type DestinationLocation = "W202" | "A185" | "A101" | "A68" | "F53" | "Savla" | "Rishi"

export interface TransferRecord {
  id: string // TX-YYYYMMDDHHMM-n
  company: Company
  source_location: SourceLocation
  destination_location: DestinationLocation
  approved_by?: string
  transfer_date?: string // ISO date
  batch_no?: string
  date?: string // ISO date
  time?: string // HH:mm
  created_at: string
}
