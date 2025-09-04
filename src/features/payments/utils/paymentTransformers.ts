import type { Transaction } from '@shared/types/payment.types'
import { TransactionState } from '@shared/types/payment.types'
import type { PaymentStatus } from '@shared/types/payment.types'
import type { Payment as FeaturePayment } from '../types/payments.types'
import type { EntityFacets } from '@shared/types/status-filter.types'
import { PAYMENT_TRANSACTION_TYPES } from '../constants'

const STATE_MAPPINGS: Record<number, TransactionState> = {
  1: TransactionState.APPROVED,
  2: TransactionState.PENDING,
  3: TransactionState.FAILED,
  4: TransactionState.DECLINED,
  5: TransactionState.VOIDED,
  6: TransactionState.CAPTURED,
  7: TransactionState.SETTLED,
  8: TransactionState.CAPTURE_IN_PROGRESS,
  9: TransactionState.CAPTURE_FAILED,
}

const TYPE_MAPPINGS: Record<number, string> = {
  1: PAYMENT_TRANSACTION_TYPES.ESTIMATED_AUTHORIZATION,
  2: PAYMENT_TRANSACTION_TYPES.VERIFICATION,
  3: PAYMENT_TRANSACTION_TYPES.REFUND,
  9: PAYMENT_TRANSACTION_TYPES.REFUND,
  10: PAYMENT_TRANSACTION_TYPES.VERIFICATION,
}

const STATUS_MAPPINGS: Record<TransactionState, PaymentStatus> = {
  [TransactionState.PENDING]: 'pending',
  [TransactionState.APPROVED]: 'succeeded',
  [TransactionState.VOIDED]: 'canceled',
  [TransactionState.DECLINED]: 'failed',
  [TransactionState.CAPTURE_IN_PROGRESS]: 'uncaptured',
  [TransactionState.CAPTURED]: 'succeeded',
  [TransactionState.CAPTURE_FAILED]: 'failed',
  [TransactionState.SETTLED]: 'succeeded',
  [TransactionState.FAILED]: 'failed',
}

export const mapTransactionToPaymentStatus = (state: TransactionState | number, transactionType?: string | number): PaymentStatus => {
  const typeValue = typeof transactionType === 'number' ? TYPE_MAPPINGS[transactionType] : transactionType
  if (typeValue === PAYMENT_TRANSACTION_TYPES.REFUND) return 'refunded'
  
  const stateValue = typeof state === 'number' ? STATE_MAPPINGS[state] : state
  return stateValue ? STATUS_MAPPINGS[stateValue] || 'pending' : 'pending'
}


export const transactionToPayment = (transaction: Transaction): FeaturePayment => {
  const paymentMethodDisplay = `${transaction.scheme} •••• ${transaction.panLast4}`
  const createdDate = transaction.timestamps?.initiated || new Date().toISOString()
  
  return {
    id: transaction.id.toString(),
    amount: transaction.amounts.original,
    currency: transaction.amounts.original.currency,
    status: mapTransactionToPaymentStatus(transaction.state, transaction.transactionType),
    customer: {
      id: transaction.account.accountId,
      name: transaction.account.name,
      email: transaction.account.email || ''
    },
    createdAt: createdDate,
    timestamps: transaction.timestamps,
    transactionRef: transaction.transactionRef,
    account: transaction.account,
    paymentMethod: {
      type: paymentMethodDisplay,
      displayString: paymentMethodDisplay,
      last4: transaction.panLast4,
      brand: transaction.scheme
    },
    description: transaction.transactionRef || `Transaction ${transaction.id}`,
    amounts: transaction.amounts,
    lastUpdated: new Date(transaction.timestamps?.authorized || createdDate),
    metadata: {
      rrn: transaction.rrn,
      terminalId: transaction.terminalId
    }
  }
}

export const transactionsToPayments = (transactions: Transaction[]): FeaturePayment[] =>
  transactions.map(transactionToPayment)

export const transformBackendFacetsToPaymentFacets = (backendFacets: Record<string, unknown>): EntityFacets => {
  if (!backendFacets?.status || !Array.isArray(backendFacets.status)) {
    return { status: [] }
  }

  const statusCounts: Record<string, number> = {}
  
  for (const facet of backendFacets.status as Array<{value: string | number, count: number}>) {
    const state = typeof facet.value === 'number' ? STATE_MAPPINGS[facet.value] : facet.value as TransactionState
    const paymentStatus = state ? STATUS_MAPPINGS[state] || 'pending' : 'pending'
    
    statusCounts[paymentStatus] = (statusCounts[paymentStatus] || 0) + facet.count
  }

  return {
    status: Object.entries(statusCounts).map(([value, count]) => ({ value, count }))
  }
} 
