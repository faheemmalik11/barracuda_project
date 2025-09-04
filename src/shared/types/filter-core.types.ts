import type React from "react"
import type { AmountFilterValue } from "./amountFilter"
import type { DateFilterValue } from "./dateFilter"


export interface FilterOption {
  value: string
  label: string
  icon?: React.ReactNode
  description?: string
  color?: string
  category?: string
}

export interface StatusFilter {
  value: string
  label: string
  count?: number
  color?: string
  icon?: React.ReactNode
}

export type FilterType = 
  | "search"
  | "text"
  | "select"
  | "multiSelect"
  | "searchableMultiSelect"
  | "combobox"
  | "checkbox"
  | "switch"
  | "date"
  | "dateRange"
  | "dateFilter"
  | "amountRange"
  | "advancedAmount"
  | "numberRange"
  | "currency"
  | "status"
  | "transactionStatus"
  | "slider"
  | "merchant"
  | "customer"
  | "program"
  | "organization"
  | "productPlatform"
  | "processor"
  | "bank"
  | "location"
  | "store"
  | "channel"
  | "paymentMethod"

export interface FilterConfig {
  type: FilterType
  key: string
  label: string
  placeholder?: string
  searchPlaceholder?: string
  options?: readonly FilterOption[]
  icon?: React.ReactNode
  min?: number
  max?: number
  defaultValue?: unknown
  description?: string
  isVisible?: boolean
  searchable?: boolean
  clearable?: boolean
  currency?: string
}


export interface NumberRangeValue {
  min?: number
  max?: number
}

export interface DateRangeValue {
  startDate?: Date
  endDate?: Date
}

export type FilterValue = 
  | string 
  | string[] 
  | number 
  | boolean 
  | Date 
  | DateFilterValue 
  | AmountFilterValue 
  | NumberRangeValue 
  | DateRangeValue 
  | null 
  | undefined

export interface FilterState {
  [key: string]: FilterValue
}