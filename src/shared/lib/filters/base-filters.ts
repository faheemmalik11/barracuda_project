import type { FilterConfig } from "@shared/types/filters"
import { commonOptions } from "./common-options"

export const baseFilters = {
  search: {
    type: "search",
    key: "search",
    label: "Search",
    placeholder: "Search payments, customers, IDs...",
  } as FilterConfig,

  amount: {
    type: "amountRange",
    key: "amount",
    label: "Amount",
    min: 0,
    max: 1000000,
  } as FilterConfig,

  monthlyVolume: {
    type: "amountRange",
    key: "monthlyVolume",
    label: "Monthly Volume",
    min: 0,
    max: 1000000,
  } as FilterConfig,

  currency: {
    type: "select",
    key: "currency",
    label: "Currency",
    placeholder: "Select currency",
    options: commonOptions.currency,
  } as FilterConfig,

  paymentMethod: {
    type: "select",
    key: "paymentMethod",
    label: "Payment Method",
    placeholder: "Select payment method",
    options: commonOptions.paymentMethod,
  } as FilterConfig,

  dateRange: {
    type: "dateRange",
    key: "dateRange",
    label: "Date and time",
    placeholder: "Select date range",
  } as FilterConfig,

  status: {
    type: "status",
    key: "status",
    label: "Status",
    placeholder: "Select statuses",
    searchable: true,
    clearable: true,
  } as FilterConfig,

  customer: {
    type: "searchableMultiSelect",
    key: "customer",
    label: "Customer",
    placeholder: "Search customers...",
    searchPlaceholder: "Search by name, email, or ID",
  } as FilterConfig,
} as const
