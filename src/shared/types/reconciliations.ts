/**
 * Represents a financial reconciliation record between two data sources
 */
export interface Reconciliation {
  /** Unique identifier for the reconciliation record */
  id: string
  /** Name of the first data source */
  sourceAName: string
  /** Name of the second data source */
  sourceBName: string
  /** Record ID in source A */
  sourceAId: string
  /** Record ID in source B (optional for unmatched records) */
  sourceBId?: string
  /** Current reconciliation status */
  status: "matched" | "unmatched_a" | "unmatched_b" | "discrepancy_found" | "resolved"
  /** Amount of discrepancy found (if any) */
  discrepancyAmount?: number
  /** Currency code for discrepancy amount */
  currency?: string
  /** Date when reconciliation was performed (ISO date string) */
  reconciliationDate: string
  /** Additional notes about the reconciliation */
  notes?: string
}

export type ReconciliationStatus = "all" | Reconciliation["status"]

export const reconciliationStatusOptions = [
  { value: "all", label: "All Reconciliations" },
  { value: "matched", label: "Matched" },
  { value: "unmatched_a", label: "Unmatched (Source A)" },
  { value: "unmatched_b", label: "Unmatched (Source B)" },
  { value: "discrepancy_found", label: "Discrepancy Found" },
  { value: "resolved", label: "Resolved" },
]
