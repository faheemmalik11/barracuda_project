import type { SettlementEntry } from "@shared/types/settlement"

export const mockSettlement: SettlementEntry[] = [
  {
    id: "set_001",
    batchId: "batch_xyz789",
    amount: 120500.5,
    currency: "USD",
    status: "in_progress",
    settlementBank: "Global Bank Corp",
    initiatedDate: "2024-05-29T08:00:00Z",
    expectedSettlementDate: "2024-05-31T00:00:00Z",
    netAmount: 120450.0,
  },
  {
    id: "set_002",
    batchId: "batch_uvw456",
    amount: 75000.0,
    currency: "EUR",
    status: "settled",
    settlementBank: "Euro Central Bank",
    initiatedDate: "2024-05-27T09:30:00Z",
    expectedSettlementDate: "2024-05-29T00:00:00Z",
    actualSettlementDate: "2024-05-28T23:50:00Z",
    netAmount: 74980.0,
  },
  {
    id: "set_003",
    batchId: "batch_rst123",
    amount: 5000.25,
    currency: "GBP",
    status: "unsettled",
    settlementBank: "UK Financial Services",
    initiatedDate: "2024-05-30T10:15:00Z",
    expectedSettlementDate: "2024-06-03T00:00:00Z",
  },
  {
    id: "set_004",
    batchId: "batch_opq000",
    amount: 9800.0,
    currency: "USD",
    status: "discrepancy",
    settlementBank: "Global Bank Corp",
    initiatedDate: "2024-05-26T11:00:00Z",
    expectedSettlementDate: "2024-05-28T00:00:00Z",
    actualSettlementDate: "2024-05-28T01:00:00Z",
    netAmount: 9750.0, // Original was 9800, discrepancy found
  },
]
