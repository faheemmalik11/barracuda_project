
import { toast } from 'sonner'

/**
 * Formats currency amounts into parts for flexible rendering.
 * @param amount Raw amount, potentially in smallest currency unit.
 * @param currency The ISO currency code.
 * @param decimal The number of decimal places for the smallest unit.
 * @returns An object with the formatted amount, currency code, and full string.
 */
export const formatCurrencyParts = (
  amount: number,
  currency: string,
  decimal?: number
): { amount: string; currency: string; full: string } => {
  // Validate inputs
  if (typeof amount !== "number" || isNaN(amount) || !isFinite(amount)) {
    return { amount: "0.00", currency: currency || "USD", full: `0.00 ${currency || "USD"}` };
  }

  if (typeof currency !== "string" || !currency.trim()) {
    currency = "USD";
  }

  if (decimal !== undefined && (typeof decimal !== "number" || decimal < 0 || decimal > 10)) {
    decimal = 2; // Default to 2 decimal places
  }

  const actualAmount = decimal !== undefined ? amount / Math.pow(10, decimal) : amount;
  const displayDecimals = decimal !== undefined ? decimal : 2;
  const formattedAmount = actualAmount.toFixed(displayDecimals);

  return {
    amount: formattedAmount,
    currency: currency.toUpperCase(),
    full: `${formattedAmount} ${currency.toUpperCase()}`,
  };
};

/**
 * Formats currency amounts with proper decimal handling
 * @param amount - Raw amount from backend
 * @param currency - Currency code (e.g., 'USD', 'BGN')
 * @param decimal - Decimal places from backend (required)
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number, 
  currency: string, 
  decimal?: number
): string => {
  return formatCurrencyParts(amount, currency, decimal).full;
}

/**
 * Formats dates consistently across the application
 * @param date - Date object or ISO string
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) return "No Date"
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    
    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
      return "Invalid Date"
    }
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(dateObj)
  } catch {
    return "Invalid Date"
  }
}

/**
 * Formats a number as a percentage
 * @param value The numeric value to format
 * @param decimals Number of decimal places (default: 1)
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, decimals = 1): string => {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    return '0.0%'
  }
  
  const safeDecimals = (typeof decimals === 'number' && decimals >= 0 && decimals <= 10) ? decimals : 1
  return `${value.toFixed(safeDecimals)}%`
}

/**
 * Formats a large number with abbreviations (K, M, B)
 * @param num The number to format
 * @returns Formatted number string
 */
export const formatLargeNumber = (num: number): string => {
  if (typeof num !== 'number' || isNaN(num) || !isFinite(num)) {
    return '0'
  }
  
  const absNum = Math.abs(num)
  const sign = num < 0 ? '-' : ''
  
  if (absNum >= 1000000000) {
    return `${sign}${(absNum / 1000000000).toFixed(1)}B`
  }
  if (absNum >= 1000000) {
    return `${sign}${(absNum / 1000000).toFixed(1)}M`
  }
  if (absNum >= 1000) {
    return `${sign}${(absNum / 1000).toFixed(1)}K`
  }
  return num.toString()
}

/**
 * Calculates conversion rate
 * @param conversions Number of conversions
 * @param views Total number of views
 * @returns Conversion rate as percentage
 */
export const calculateConversionRate = (conversions: number, views: number): number => {
  if (typeof conversions !== 'number' || typeof views !== 'number' || 
      isNaN(conversions) || isNaN(views) || !isFinite(conversions) || !isFinite(views) ||
      conversions < 0 || views <= 0) {
    return 0
  }
  
  return (conversions / views) * 100
}

/**
 * Formats a number with proper locale formatting
 * @param num Number to format
 * @returns Formatted number string
 */
export const formatNumber = (num: number): string => {
  if (typeof num !== 'number' || isNaN(num) || !isFinite(num)) {
    return '0'
  }
  
  return new Intl.NumberFormat("en-US").format(num)
}

/**
 * Formats a percentage change with appropriate sign
 * @param change Percentage change value
 * @returns Formatted percentage string
 */
export const formatPercentageChange = (change: number): string => {
  if (typeof change !== 'number' || isNaN(change) || !isFinite(change)) {
    return '0.0%'
  }
  
  const sign = change > 0 ? '+' : ''
  return `${sign}${change.toFixed(1)}%`
}

/**
 * Copies an entity ID to clipboard with consistent messaging
 * @param id The ID to copy
 * @param entityType The type of entity (e.g., 'Payment', 'Customer', 'Merchant')
 */
export const copyEntityId = async (id: string, entityType: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(id)
    toast.success(`${entityType} ID copied to clipboard`)
  } catch {
    toast.error(`Failed to copy ${entityType} ID`)
  }
}

/**
 * Formats a relative time from a date (e.g., "2 days ago", "Yesterday")
 * @param dateStr Date string or Date object
 * @returns Formatted relative time string
 */
export const formatRelativeTime = (dateStr?: string | Date): string => {
  if (!dateStr) return 'Never'
  
  const date = new Date(dateStr)
  const now = new Date()
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) return 'Today'
  if (diffInDays === 1) return 'Yesterday'
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
  
  return `${Math.floor(diffInDays / 365)} years ago`
}

/**
 * Formats an ID with truncation for display
 * @param id The ID to format
 * @param maxLength Maximum length before truncation
 * @returns Formatted ID string
 */
export const formatId = (id: string, maxLength = 12): string =>
  id.length <= maxLength ? id : `${id.slice(0, maxLength - 3)}...`

/**
 * Formats a payment method (brand and last 4 digits)
 * @param brand Payment method brand
 * @param last4 Last 4 digits
 * @returns Formatted payment method string
 */
export const formatPaymentMethod = (brand: string, last4: string): string => {
  const safeBrand = brand?.trim() || 'CARD'
  const safeLast4 = last4?.trim().slice(-4) || '0000'
  return `${safeBrand.toUpperCase()} •••• ${safeLast4}`
}

/**
 * Creates standardized batch action handlers for entities
 * @param entityType The type of entity (e.g., 'payment', 'customer', 'merchant')
 * @returns Object with common batch action functions
 */
export const createBatchActions = (entityType: string) => {
  return {
    handleBatchFlag: (selectedIds: string[]) => {
      toast.success(`${selectedIds.length} ${entityType}s flagged`)
    },
    handleBatchExport: (selectedIds: string[]) => {
      toast.success(`Exporting ${selectedIds.length} ${entityType}s`)
    },
    handleBatchDelete: (selectedIds: string[]) => {
      toast.success(`${selectedIds.length} ${entityType}s deleted`)
    },
    handleBatchUpdate: (selectedIds: string[], action: string) => {
      toast.success(`${selectedIds.length} ${entityType}s ${action}`)
    }
  }
}
