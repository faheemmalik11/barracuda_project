import { formatCurrency, formatPaymentMethod, formatId } from '@shared/utils/formatters'

export const formatCurrencyAmount = formatCurrency

export { formatPaymentMethod }

export const formatPaymentStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    succeeded: 'Succeeded',
    pending: 'Pending',
    failed: 'Failed',
    canceled: 'Canceled',
    refunded: 'Refunded',
    uncaptured: 'Uncaptured',
    requires_capture: 'Requires Capture',
  }
  return statusMap[status.toLowerCase()] || status
}

export const formatPaymentId = formatId

export const formatTransactionRef = (ref?: string): string =>
  ref?.toUpperCase() || 'N/A'