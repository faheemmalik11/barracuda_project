/**
 * Represents a financial clearing entry in the payment processing system
 */
export interface ClearingEntry {
  /** Unique identifier for the clearing entry */
  id: string
  /** Associated transaction identifier */
  transactionId: string
  /** Amount being cleared */
  amount: number
  /** Currency code (ISO 4217) */
  currency: string
  /** Current status of the clearing process */
  status: "pending" | "processing" | "cleared" | "failed"
  /** Name of the clearing house processing this entry */
  clearingHouse: string
  /** Date when the clearing was submitted (ISO date string) */
  submissionDate: string
  /** Expected date for clearing completion (ISO date string) */
  expectedClearingDate: string
  /** Actual date when clearing was completed (ISO date string) */
  actualClearingDate?: string
}

export type ClearingStatus = "all" | ClearingEntry["status"]

export const clearingStatusOptions = [
  { value: "all", label: "All Clearing Entries" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "cleared", label: "Cleared" },
  { value: "failed", label: "Failed" },
]
