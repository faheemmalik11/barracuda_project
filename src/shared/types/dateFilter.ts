/**
 * Represents the value structure for date-based filters
 * Supports various date comparison operations
 */
export interface DateFilterValue {
  /** The comparison operator to use for date filtering */
  operator: "last" | "equal" | "between" | "before" | "after"
  /** Single date value for equal, before, after operations */
  value?: Date
  /** Start date for between operations */
  startDate?: Date
  /** End date for between operations */
  endDate?: Date
  /** Number value for "last" operations (e.g., last 5 days) */
  lastNumber?: number
  /** Time unit for "last" operations */
  lastUnit?: "h" | "d" | "m"
}

export const DATE_OPERATORS = [
  { value: "last", label: "is in the last" },
  { value: "equal", label: "is equal to" },
  { value: "between", label: "is between" },
  { value: "before", label: "is before or on" },
  { value: "after", label: "is on or after" },
] as const

export const TIME_UNITS = [
  { value: "h", label: "hours" },
  { value: "d", label: "days" },
  { value: "m", label: "months" },
] as const 
