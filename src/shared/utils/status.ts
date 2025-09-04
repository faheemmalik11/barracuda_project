// Utility functions for status management
export const getStatusPriority = (status: string): number => {
  const paymentConfig = {
    succeeded: 1,
    paid: 2,
    pending: 3,
    uncaptured: 3,
    requires_capture: 3,
    canceled: 4,
    cancelled: 4,
    requires_action: 4,
    failed: 5,
    declined: 5,
    disputed: 6,
    flagged: 6,
  }
  return paymentConfig[status as keyof typeof paymentConfig] || 999
}

export const getStatusCategory = (status: string): string => {
  const categories = {
    succeeded: "completed",
    paid: "completed",
    approved: "completed",
    pending: "processing",
    uncaptured: "pending",
    requires_capture: "action_required",
    requires_action: "action_required",
    failed: "failed",
    declined: "failed",
    canceled: "canceled",
    cancelled: "canceled",
    voided: "canceled",
    disputed: "disputed",
    flagged: "flagged",
    refunded: "refunded",
  }
  return categories[status as keyof typeof categories] || "unknown"
}

export const isActionableStatus = (status: string): boolean => {
  const actionableStatuses = [
    "failed",
    "declined",
    "disputed",
    "flagged",
    "uncaptured",
    "requires_action",
    "requires_capture",
  ]
  return actionableStatuses.includes(status.toLowerCase())
} 
