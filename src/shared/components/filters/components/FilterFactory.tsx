import { commonOptions } from "@shared/lib/filters/common-options"
import { createFilterComponent } from "../utils/createFilterComponent"

/**
 * Pre-built filter components using factory pattern
 */
export const BankFilter = createFilterComponent(
  "bank",
  "Bank",
  "singleSelect",
  commonOptions.bank
)

export const ChannelFilter = createFilterComponent(
  "channel",
  "Channel",
  "multiSelect",
  commonOptions.channel
)

export const LocationFilter = createFilterComponent(
  "location",
  "Location",
  "singleSelect",
  commonOptions.country
)


export const MerchantFilter = createFilterComponent(
  "merchant",
  "Merchant",
  "singleSelect",
  [] // Placeholder - merchant options should be fetched from API
)

export const OrganizationFilter = createFilterComponent(
  "organization",
  "Organization",
  "singleSelect",
  commonOptions.organization
)

export const ProcessorFilter = createFilterComponent(
  "processor",
  "Processor",
  "multiSelect",
  commonOptions.processor
)

export const ProductPlatformFilter = createFilterComponent(
  "productPlatform",
  "Product Platform",
  "multiSelect",
  commonOptions.productPlatform
)

export const ProgramFilter = createFilterComponent(
  "program",
  "Program",
  "singleSelect",
  commonOptions.programType
)

export const StoreFilter = createFilterComponent(
  "store",
  "Store",
  "multiSelect",
  commonOptions.store
)

// Status filters are now created using the factory pattern in filter-factories.ts
// Use createStatusFilter("status", "Status", getStatusOptions(entityType)) instead

// Single select filters
export const CurrencyFilter = createFilterComponent(
  "currency",
  "Currency",
  "singleSelect",
  commonOptions.currency
)

export const PaymentMethodFilter = createFilterComponent(
  "paymentMethod",
  "Payment Method",
  "singleSelect",
  commonOptions.paymentMethod
)
