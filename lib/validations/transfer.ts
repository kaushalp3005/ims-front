import { z } from "zod"

// Transfer form validation schema
export const transferFormSchema = z
  .object({
    company: z.enum(["CDPL", "CFPL", "JTC", "HOH"], {
      required_error: "Company is required",
    }),
    approved_by: z.string().min(1, "Approved by is required"),
    source_location: z.enum(["W202", "A185", "A101", "A68", "F53"], {
      required_error: "Source location is required",
    }),
    destination_location: z.enum(["W202", "A185", "A101", "A68", "F53", "Savla", "Rishi"], {
      required_error: "Destination location is required",
    }),
    transfer_date: z.string().min(1, "Transfer date is required"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    batch_no: z.string().optional(),
  })
  .refine((data) => data.source_location !== data.destination_location, {
    message: "Source and destination locations must be different",
    path: ["destination_location"],
  })

// Infer TypeScript type from schema
export type TransferFormData = z.infer<typeof transferFormSchema>
