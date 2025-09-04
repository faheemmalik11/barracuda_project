import type { TableFiltersConfig, FilterConfig } from "../../types/filters"
import { entityFilters, getEntityFilters } from "./entity-filters"
import { createSearchFilter, createSelectFilter } from "./filter-factories"

import { getPaymentBulkActions } from "../tables/actions/payment-actions"
import { getMerchantBulkActions } from "../tables/actions/merchant-actions"
import { getOrderBulkActions } from "../tables/actions/order-actions"
import { getRefundBulkActions } from "../tables/actions/refund-actions"
import { getDisputeBulkActions } from "../tables/actions/dispute-actions"
import { getCustomerBulkActions } from "../tables/actions/customer-actions"
import { getTerminalBulkActions } from "../tables/actions/terminal-actions"
import { getMemberBulkActions } from "../tables/actions/member-actions"
import { getProgramBulkActions } from "../tables/actions/program-actions"
import { getEngagementBulkActions } from "../tables/actions/engagement-actions"
import { clearingBulkActions } from "../tables/actions/clearing-actions"
import { settlementBulkActions } from "../tables/actions/settlement-actions"
import { reconciliationsBulkActions } from "../tables/actions/reconciliations-actions"
import { digitalBulkActions } from "../tables/actions/digital-actions"
import { getProductBulkActions } from "../tables/actions/product-actions"
import { getMerchantColumnConfig } from "../tables/columns/merchant-columns"
import { getPaymentColumnConfig } from "../tables/columns/payment-columns"
import { getCustomerColumnConfig } from "../tables/columns/customer-columns"

const DEFAULT_CONFIG: Partial<TableFiltersConfig> = {
  visibleFilters: 5,
  enableSessionPersistence: true,
}

export function createTableConfig(
  entityType: keyof typeof entityFilters,
  options: Partial<TableFiltersConfig> = {}
): TableFiltersConfig {
  const allFilters = getEntityFilters(entityType)
  const entityName = entityType.charAt(0).toUpperCase() + entityType.slice(1)
  
  return {
    title: `${entityName} Filters`,
    filters: [...allFilters],
    sessionKey: `${entityType}-filters`,
    entityType,
    ...DEFAULT_CONFIG,
    ...options,
  }
}

const COMMON_FILTER_GROUPS = {
  business: [
    "merchant", "program", "organization", "productPlatform", "processor", "bank"
  ].map(key => ({ type: key as FilterConfig['type'], key, label: key.charAt(0).toUpperCase() + key.slice(1) })),
  
  customer: [
    createSearchFilter("customer", "Customer", "Search customers..."),
    createSelectFilter("customerType", "Customer Type", [
      { value: "new", label: "New" },
      { value: "returning", label: "Returning" },
    ]),
  ],
  
  location: [
    "store", "channel", "location"
  ].map(key => ({ type: key as FilterConfig['type'], key, label: key.charAt(0).toUpperCase() + key.slice(1) })),
  
  
  dateRanges: [
    "created", "terminated", "lastActive", "lastUpdated", "verificationDeadline", "restricted", "rejected"
  ].map(key => ({ 
    type: "dateRange" as FilterConfig['type'], 
    key, 
    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1') 
  })),
  
  amounts: [
    { type: "amountRange", key: "monthlyVolume", label: "Monthly Volume", min: 0, max: 1000000 },
    { type: "amountRange", key: "totalRevenue", label: "Total Revenue", min: 0, max: 10000000 },
    { type: "amountRange", key: "averageTransaction", label: "Average Transaction", min: 0, max: 100000 },
  ],
  
  risk: [
    createSelectFilter("risk", "Risk Level", [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
    ]),
    { type: "slider", key: "riskScore", label: "Risk Score", min: 0, max: 100 },
    { type: "multiSelect", key: "businessType", label: "Business Type (MCC)" },
  ],
} as const

export const tableConfigs = {
  payments: createTableConfig("payments", {
    additionalFilters: [
      ...COMMON_FILTER_GROUPS.customer,
      ...COMMON_FILTER_GROUPS.location,
      ...COMMON_FILTER_GROUPS.business,
    ],
    bulkActions: getPaymentBulkActions(),
    getColumnsForStatus: getPaymentColumnConfig,
  }),
  
  orders: createTableConfig("orders", { 
    visibleFilters: 4,
    bulkActions: getOrderBulkActions(),
  }),
  
  refunds: createTableConfig("refunds", { 
    visibleFilters: 4,
    bulkActions: getRefundBulkActions(),
  }),
  
  disputes: createTableConfig("disputes", {
    bulkActions: getDisputeBulkActions(),
  }),
  customers: createTableConfig("customers", {
    bulkActions: getCustomerBulkActions(),
    visibleFilters: 5,
    getColumnsForStatus: getCustomerColumnConfig,
  }),
  terminals: createTableConfig("terminals", {
    bulkActions: getTerminalBulkActions(),
  }),
  
  merchants: createTableConfig("merchants", {
    additionalFilters: [
      ...COMMON_FILTER_GROUPS.dateRanges,
      ...COMMON_FILTER_GROUPS.location,
      ...COMMON_FILTER_GROUPS.risk,
      ...COMMON_FILTER_GROUPS.business,
    ],
    bulkActions: getMerchantBulkActions(),
    getColumnsForStatus: getMerchantColumnConfig,
  }),
  
  members: createTableConfig("members", {
    bulkActions: getMemberBulkActions(),
  }),
  programs: createTableConfig("programs", {
    bulkActions: getProgramBulkActions(),
  }),
  products: createTableConfig("products", {
    bulkActions: getProductBulkActions(),
  }),
  clearing: createTableConfig("clearing", {
    bulkActions: clearingBulkActions,
  }),
  settlement: createTableConfig("settlement", {
    bulkActions: settlementBulkActions,
  }),
  reconciliations: createTableConfig("reconciliations", {
    bulkActions: reconciliationsBulkActions,
  }),
  digital: createTableConfig("digital", {
    bulkActions: digitalBulkActions,
  }),
  engagement: createTableConfig("engagement", {
    bulkActions: getEngagementBulkActions(),
  }),
  ecommerce: createTableConfig("ecommerce", {
    visibleFilters: 4,
  }),
  "payment-links": createTableConfig("payment-links", {
    visibleFilters: 4,
  }),
} as const

export function getTableConfig(entityType: keyof typeof tableConfigs): TableFiltersConfig {
  return tableConfigs[entityType] || tableConfigs.payments
}

export function getEntityTypes(): (keyof typeof tableConfigs)[] {
  return Object.keys(tableConfigs) as (keyof typeof tableConfigs)[]
}

export type TableConfigKey = keyof typeof tableConfigs
