import { baseFilters } from "./base-filters"
import { createStatusFilter } from "./filter-factories"
import { StatusRegistry } from "./status-registry"

type EntityType = keyof typeof StatusRegistry extends (...args: any[]) => any ? never : Parameters<typeof StatusRegistry.getOptions>[0]

function createEntityStatusFilter(entityType: EntityType) {
  const statusOptions = StatusRegistry.getOptions(entityType)
  return createStatusFilter("status", "Status", statusOptions)
}

const commonEntityFilters = {
  search: baseFilters.search,
  dateRange: baseFilters.dateRange,
  amount: baseFilters.amount,
  currency: baseFilters.currency,
  paymentMethod: baseFilters.paymentMethod,
  monthlyVolume: baseFilters.monthlyVolume,
  location: { type: "select", key: "location", label: "Location" } as const,
  category: { type: "select", key: "category", label: "Category" } as const,
  engagementType: { type: "select", key: "engagementType", label: "Type" } as const,
}

export const entityFilters = {
  payments: [
    commonEntityFilters.dateRange,
    commonEntityFilters.amount,
    commonEntityFilters.currency,
    createEntityStatusFilter('payment'),
    commonEntityFilters.paymentMethod,
  ],
  
  merchants: [
    commonEntityFilters.search,
    createEntityStatusFilter('merchant'),
    commonEntityFilters.dateRange,
    commonEntityFilters.monthlyVolume,
  ],
  
  refunds: [
    commonEntityFilters.search,
    createEntityStatusFilter('refund'),
    commonEntityFilters.amount,
    commonEntityFilters.dateRange,
  ],
  
  disputes: [
    commonEntityFilters.search,
    createEntityStatusFilter('dispute'),
    commonEntityFilters.amount,
    commonEntityFilters.dateRange,
  ],
  
  orders: [
    commonEntityFilters.search,
    createEntityStatusFilter('order'),
    commonEntityFilters.dateRange,
    commonEntityFilters.amount,
  ],
  
  customers: [
    createEntityStatusFilter('customer'),
    commonEntityFilters.dateRange,
    commonEntityFilters.amount,
    { type: "searchableMultiSelect", key: "customers", label: "Customers", searchPlaceholder: "Search customers by name, email, or ID..." },
  ],
  
  terminals: [
    commonEntityFilters.search,
    createEntityStatusFilter('terminal'),
    commonEntityFilters.location,
  ],
  
  products: [
    commonEntityFilters.search,
    createEntityStatusFilter('product'),
    commonEntityFilters.category,
  ],
  
  // Legacy/special entity types - these may need their own status configurations
  members: [
    commonEntityFilters.search,
    commonEntityFilters.dateRange,
  ],
  
  programs: [
    commonEntityFilters.search,
  ],
  
  clearing: [
    commonEntityFilters.dateRange,
  ],
  
  settlement: [
    commonEntityFilters.dateRange,
    commonEntityFilters.amount,
  ],
  
  reconciliations: [
    commonEntityFilters.dateRange,
  ],
  
  digital: [
    commonEntityFilters.search,
  ],
  
  engagement: [
    commonEntityFilters.dateRange,
    commonEntityFilters.engagementType,
  ],

  ecommerce: [
    commonEntityFilters.search,
    createEntityStatusFilter('ecommerce'),
    commonEntityFilters.dateRange,
    { type: "select", key: "type", label: "Type" } as const,
    { type: "select", key: "environment", label: "Environment" } as const,
  ],

  "payment-links": [
    commonEntityFilters.search,
    createEntityStatusFilter('payment'),
    commonEntityFilters.dateRange,
    { type: "select", key: "type", label: "Type" } as const,
  ],
} as const

export function getEntityFilters(entityType: keyof typeof entityFilters) {
  return entityFilters[entityType] || entityFilters.payments
}
