export type AmountOperator = 'range' | 'equal' | 'less_than' | 'greater_than'

/**
 * Supports different operators for flexible amount filtering
 */
export interface AmountFilterValue {
  /** The comparison operator to use for filtering */
  operator: AmountOperator
  /** Minimum value for range operations */
  min?: number | string
  /** Maximum value for range operations */
  max?: number | string
  /** Single value for equal, less_than, greater_than operations */
  value?: number | string
}
