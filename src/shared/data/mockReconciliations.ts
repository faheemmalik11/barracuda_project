import type { Reconciliation } from "@shared/types/reconciliations"

export const mockReconciliations: Reconciliation[] = [
  {
    id: "rec_001",
    sourceAName: "Internal Ledger",
    sourceBName: "Bank Statement",
    sourceAId: "ledger_tx_1001",
    sourceBId: "bank_stmt_tx_5005",
    status: "matched",
    reconciliationDate: "2024-05-28T00:00:00Z",
  },
  {
    id: "rec_002",
    sourceAName: "Internal Ledger",
    sourceBName: "Bank Statement",
    sourceAId: "ledger_tx_1002",
    status: "unmatched_a",
    reconciliationDate: "2024-05-28T00:00:00Z",
    notes: "Item present in ledger, not in bank statement.",
  },
  {
    id: "rec_003",
    sourceAName: "Payment Gateway",
    sourceBName: "Order System",
    sourceAId: "pg_abc",
    sourceBId: "order_xyz",
    status: "discrepancy_found",
    discrepancyAmount: 10.5,
    currency: "USD",
    reconciliationDate: "2024-05-29T00:00:00Z",
    notes: "Payment gateway amount higher than order system.",
  },
  {
    id: "rec_004",
    sourceAName: "Payment Gateway",
    sourceBName: "Order System",
    sourceAId: "pg_def",
    sourceBId: "order_uvw",
    status: "resolved",
    discrepancyAmount: -5.0, // Initially a discrepancy
    currency: "USD",
    reconciliationDate: "2024-05-27T00:00:00Z",
    notes: "Resolved: Refund processed for overcharge.",
  },
  {
    id: "rec_005",
    sourceAName: "Inventory System",
    sourceBName: "Sales Records",
    sourceBId: "sale_ghi", // Item present in sales, not in inventory (Source B perspective)
    status: "unmatched_b",
    reconciliationDate: "2024-05-30T00:00:00Z",
    notes: "Item sold but not found in inventory system.",
    sourceAId: ""
  },
]
