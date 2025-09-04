// ================================
// ENTITY TYPES
// ================================

export type EntityType = 
  | "payments"
  | "orders"
  | "refunds" 
  | "disputes"
  | "customers"
  | "terminals"
  | "merchants"
  | "members"
  | "programs"
  | "clearing"
  | "settlement"
  | "digital"

export type UserType = "default" | "merchant" | "bank" | "admin"