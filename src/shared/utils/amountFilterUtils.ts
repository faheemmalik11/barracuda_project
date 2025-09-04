import type { AmountFilterValue } from '@shared/types/amountFilter'

/**
 * Generic amount filtering utility that can be used across different entity types
 * Supports various amount comparison operations and presets
 */

// Amount preset constants
export const AMOUNT_PRESETS = {
  SMALL: 'small',      // < $100
  MEDIUM: 'medium',    // $100 - $1000
  LARGE: 'large',      // > $1000
  VERY_LARGE: 'very_large' // > $10000
} as const

export type AmountPreset = typeof AMOUNT_PRESETS[keyof typeof AMOUNT_PRESETS]

// Helper to parse amount value to cents
export const parseAmountValue = (val: string | number | undefined): number | undefined => {
  if (val === undefined) return undefined
  return typeof val === 'number' ? val : parseFloat(val) * 100
}

/**
 * Apply amount filter to an array of items
 * @param items - Array of items to filter
 * @param filter - Amount filter to apply (string preset or AmountFilterValue)
 * @param amountAccessor - Function to extract amount (in cents) from item
 * @returns Filtered array of items
 */
export function applyAmountFilter<T>(
  items: T[],
  filter: string | AmountFilterValue,
  amountAccessor: (item: T) => number | undefined
): T[] {
  if (!filter) return items
  
  return items.filter(item => {
    const amount = amountAccessor(item)
    if (amount === undefined) return false
    
    // Handle string presets
    if (typeof filter === 'string') {
      return matchAmountPreset(amount, filter as AmountPreset)
    }
    
    // Handle AmountFilterValue object
    return matchAmountFilter(amount, filter)
  })
}

/**
 * Check if an amount matches a preset filter
 */
function matchAmountPreset(amount: number, preset: string): boolean {
  switch (preset) {
    case AMOUNT_PRESETS.SMALL:
      return amount < 10000 // < $100
    case AMOUNT_PRESETS.MEDIUM:
      return amount >= 10000 && amount < 100000 // $100-$1000
    case AMOUNT_PRESETS.LARGE:
      return amount >= 100000 && amount < 1000000 // $1000-$10000
    case AMOUNT_PRESETS.VERY_LARGE:
      return amount >= 1000000 // > $10000
    default:
      return true
  }
}

/**
 * Check if an amount matches an AmountFilterValue
 */
function matchAmountFilter(amount: number, filter: AmountFilterValue): boolean {
  const { operator, value, min, max } = filter
  
  switch (operator) {
    case 'equal':
      const targetAmount = parseAmountValue(value)
      return targetAmount !== undefined ? amount === targetAmount : true
      
    case 'range':
      const minAmount = parseAmountValue(min)
      const maxAmount = parseAmountValue(max)
      return (minAmount === undefined || amount >= minAmount) &&
             (maxAmount === undefined || amount <= maxAmount)
      
    case 'greater_than':
      const gtAmount = parseAmountValue(value)
      return gtAmount !== undefined ? amount > gtAmount : true
      
    case 'less_than':
      const ltAmount = parseAmountValue(value)
      return ltAmount !== undefined ? amount < ltAmount : true
      
    default:
      return true
  }
}

/**
 * Get a human-readable label for an amount filter
 */
export function getAmountFilterLabel(filter: string | AmountFilterValue): string {
  if (typeof filter === 'string') {
    const presetLabels: Record<string, string> = {
      [AMOUNT_PRESETS.SMALL]: 'Under $100',
      [AMOUNT_PRESETS.MEDIUM]: '$100 - $1,000',
      [AMOUNT_PRESETS.LARGE]: '$1,000 - $10,000',
      [AMOUNT_PRESETS.VERY_LARGE]: 'Over $10,000'
    }
    return presetLabels[filter] || filter
  }
  
  const { operator, value, min, max } = filter
  const formatAmount = (cents: number) => `$${(cents / 100).toLocaleString()}`
  
  switch (operator) {
    case 'equal':
      const eqAmount = parseAmountValue(value)
      return eqAmount !== undefined ? formatAmount(eqAmount) : 'Any amount'
      
    case 'range':
      const minAmt = parseAmountValue(min)
      const maxAmt = parseAmountValue(max)
      if (minAmt !== undefined && maxAmt !== undefined) {
        return `${formatAmount(minAmt)} - ${formatAmount(maxAmt)}`
      } else if (minAmt !== undefined) {
        return `Over ${formatAmount(minAmt)}`
      } else if (maxAmt !== undefined) {
        return `Under ${formatAmount(maxAmt)}`
      }
      return 'Any amount'
      
    case 'greater_than':
      const gtAmt = parseAmountValue(value)
      return gtAmt !== undefined ? `Over ${formatAmount(gtAmt)}` : 'Any amount'
      
    case 'less_than':
      const ltAmt = parseAmountValue(value)
      return ltAmt !== undefined ? `Under ${formatAmount(ltAmt)}` : 'Any amount'
      
    default:
      return 'Any amount'
  }
}

/**
 * Format cents to dollars for display
 */
export function formatCentsToDisplay(cents: number): string {
  return `$${(cents / 100).toLocaleString()}`
}

/**
 * Convert dollars to cents
 */
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100)
}

/**
 * Convert cents to dollars
 */
export function centsToDollars(cents: number): number {
  return cents / 100
}

/**
 * Converts dollars to cents for API consumption
 * @param amount Amount in dollars
 * @returns Amount in cents
 * @throws Error if amount is not finite
 */
export const toCents = (amount: number | undefined): number => {
  const value = amount || 0
  if (!isFinite(value)) {
    throw new Error(`Invalid amount provided: ${amount}`)
  }
  return Math.round(value * 100)
}

/**
 * Converts cents to dollars from API response
 * @param cents Amount in cents (string or number)
 * @returns Amount in dollars with 2 decimal places
 * @throws Error if cents value is invalid
 */
export const toDollars = (cents: string | number): number => {
  const amount = typeof cents === 'string' ? parseInt(cents, 10) : cents
  if (isNaN(amount) || !isFinite(amount)) {
    throw new Error(`Invalid cents value provided: ${cents}`)
  }
  return Math.round(amount) / 100
}