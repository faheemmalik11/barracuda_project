
import { FilterButton } from "../base/FilterButton"
import { MultiSelectFilter } from "../base/MultiSelectFilter"
import {
  BankFilter,
  ChannelFilter,
  CurrencyFilter,
  LocationFilter,
  MerchantFilter,
  OrganizationFilter,
  PaymentMethodFilter,
  ProcessorFilter,
  ProductPlatformFilter,
  ProgramFilter,
  StoreFilter,
} from "./FilterFactory"
import { AmountFilterDropdown } from "./amount"
import { DateFilter } from "./date"
import { CustomerFilters } from "./customer"
import type { AmountFilterValue } from "./amount"
import type { DateFilterValue } from "@shared/types/dateFilter"
import type { FilterConfig } from "@shared/types/filters"
import { isValidObjectWithOperator } from "@shared/utils"

type FilterRenderer = (
  filter: FilterConfig,
  value: unknown,
  onChange: (value: unknown) => void
) => React.ReactElement

const renderAmountFilter: FilterRenderer = (filter, value, onChange) => (
  <AmountFilterDropdown
    key={filter.key}
    value={isValidObjectWithOperator(value) ? value as AmountFilterValue : null}
    currency={filter.currency}
    onChange={onChange}
    filterConfig={filter}
  />
)

const renderDateFilter: FilterRenderer = (filter, value, onChange) => (
  <DateFilter
    key={filter.key}
    value={isValidObjectWithOperator(value) ? value as DateFilterValue : null}
    label={filter.label}
    onChange={onChange}
  />
)


const renderSearchableMultiSelectFilter: FilterRenderer = (filter, value, onChange) => {
  if (filter.key === "customers") {
    return (
      <CustomerFilters
        key={filter.key}
        customersValue={value as string[]}
        onCustomersChange={onChange}
      />
    )
  }
  
  // For other searchableMultiSelect types, fallback to regular MultiSelectFilter
  return (
    <MultiSelectFilter
      key={filter.key}
      options={filter.options || []}
      value={value as string[]}
      onChange={onChange}
      filterConfig={filter}
    />
  )
}

const createSingleSelectRenderer = (FilterComponent: React.ComponentType<any>): FilterRenderer => 
  (filter, value, onChange) => (
    <FilterComponent
      key={filter.key}
      value={Array.isArray(value) ? value[0] : value as string}
      onChange={onChange}
      filterConfig={filter}
    />
  )

const createMultiSelectRenderer = (FilterComponent: React.ComponentType<any>): FilterRenderer => 
  (filter, value, onChange) => (
    <FilterComponent
      key={filter.key}
      value={value as string[]}
      onChange={onChange}
      filterConfig={filter}
    />
  )

export const FILTER_RENDERERS: Record<string, FilterRenderer> = {
  advancedAmount: renderAmountFilter,
  amountRange: renderAmountFilter,
  dateRange: renderDateFilter,
  searchableMultiSelect: renderSearchableMultiSelectFilter,
  
  currency: createSingleSelectRenderer(CurrencyFilter),
  paymentMethod: createSingleSelectRenderer(PaymentMethodFilter),
  
  program: createMultiSelectRenderer(ProgramFilter),
  merchant: createMultiSelectRenderer(MerchantFilter),
  bank: createMultiSelectRenderer(BankFilter),
  organization: createMultiSelectRenderer(OrganizationFilter),
  productPlatform: createMultiSelectRenderer(ProductPlatformFilter),
  processor: createMultiSelectRenderer(ProcessorFilter),
  store: createMultiSelectRenderer(StoreFilter),
  channel: createMultiSelectRenderer(ChannelFilter),
  location: createMultiSelectRenderer(LocationFilter),
  
  status: (filter, value, onChange) => (
    <MultiSelectFilter
      key={filter.key}
      options={filter.options || []}
      value={value as string[]}
      onChange={onChange}
      filterConfig={filter}
    />
  ),
}

/**
 * Generic filter renderer that handles fallback to FilterButton with unsupported message
 */
export function renderGenericFilter(
  filter: FilterConfig,
  value: unknown,
  isOpen: boolean,
  onToggle: (open: boolean) => void,
  onClear: () => void,
  displayValue: { label: string; displayValue: string }
) {
  return (
    <FilterButton
      key={filter.key}
      filter={filter}
      isActive={!!value}
      isOpen={isOpen}
      displayValue={displayValue}
      onToggle={onToggle}
      onClear={onClear}
    >
      <div className="p-3">
        <p className="text-xs text-muted-foreground">
          Filter type "{filter.type}" not implemented yet
        </p>
      </div>
    </FilterButton>
  )
}
