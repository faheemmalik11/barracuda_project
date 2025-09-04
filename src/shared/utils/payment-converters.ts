import type { Payment, TransactionAmounts, Customer, Account } from '@shared/types/payment.types'
import type { TransactionStatus } from '@shared/types/payment-status.types'
import type { PaymentInfo } from '@shared/components/panels/types/payment-details.types'
import { formatCurrency, formatDate } from '@shared/utils/formatters'

interface PaymentWithExtensions extends Payment {
  timestamps?: {
    initiated?: string;
    authorized?: string;
  };
  created?: string;
  account?: Account;
  risk?: string | { level?: string };
  state?: string;
}

export const convertPaymentToPaymentInfo = (payment: PaymentWithExtensions): PaymentInfo => {
  const amounts: Partial<TransactionAmounts> = payment.amounts || {}
  const amount = amounts.original?.amount ?? payment.amount?.amount ?? 0
  const decimal = amounts.original?.decimal
  const currency = amounts.original?.currency ?? payment.currency ?? 'USD'
  const formattedAmount = formatCurrency(amount, currency, decimal)
  const timestamps = payment.timestamps || {}
  const displayDate = payment.created || timestamps.initiated

  const customer: Partial<Customer> = payment.customer || {}
  const account: Partial<Account> = payment.account || {}
  const customerName = customer.email || customer.name || account.name || 'Unknown Customer'

  const paymentMethod = typeof payment.paymentMethod === 'string' 
    ? payment.paymentMethod 
    : payment.paymentMethod?.type || 'Unknown'

  const risk = payment.risk || {}
  const riskScore = typeof risk === 'string' ? risk : risk.level || '2'

  return {
    id: String(payment.transactionRef),
    amount: formattedAmount,
    lastUpdate: formatDate(displayDate),
    customer: customerName,
    paymentMethod: paymentMethod,
    risk: riskScore,
    channel: 'ECOM',
    status: (payment.status ?? payment.state ?? 'failed') as TransactionStatus,
    statusDetails: {
      category: 'success',
      priority: 'low'
    }
  }
}