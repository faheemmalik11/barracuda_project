import type { Transaction } from '@shared/types/payment.types'

export interface PaymentDetail {
  label: string
  value: string
  type?: 'text' | 'currency' | 'date' | 'status'
}

export function mapTransactionToPaymentDetails(transactionData: Transaction): PaymentDetail[] {
  const details: PaymentDetail[] = []

  // Transaction Reference
  if (transactionData.transactionRef) {
    details.push({
      label: 'Transaction Reference',
      value: transactionData.transactionRef,
      type: 'text'
    })
  }

  // Amount
  if (transactionData.amounts?.original) {
    const amount = transactionData.amounts.original
    const formattedAmount = (amount.amount / Math.pow(10, amount.decimal)).toFixed(amount.decimal)
    details.push({
      label: 'Amount',
      value: `${formattedAmount} ${amount.currency}`,
      type: 'currency'
    })
  }

  // State
  if (transactionData.state !== undefined) {
    const stateMap: Record<number, string> = {
      1: 'Approved',
      2: 'Declined',
      3: 'Pending',
      4: 'Captured',
      5: 'Voided'
    }
    details.push({
      label: 'Status',
      value: stateMap[transactionData.state as number] || `State ${transactionData.state}`,
      type: 'status'
    })
  }

  // Scheme
  if (transactionData.scheme) {
    details.push({
      label: 'Card Scheme',
      value: transactionData.scheme,
      type: 'text'
    })
  }

  // PAN Last 4
  if (transactionData.panLast4) {
    details.push({
      label: 'Card Number',
      value: `****${transactionData.panLast4}`,
      type: 'text'
    })
  }

  // RRN
  if (transactionData.rrn) {
    details.push({
      label: 'RRN',
      value: transactionData.rrn,
      type: 'text'
    })
  }

  // Terminal ID
  if (transactionData.terminalId) {
    details.push({
      label: 'Terminal ID',
      value: transactionData.terminalId,
      type: 'text'
    })
  }

  // Auth Code
  if (transactionData.authIdentCode) {
    details.push({
      label: 'Auth Code',
      value: transactionData.authIdentCode,
      type: 'text'
    })
  }

  // Response Code
  if (transactionData.responseCode) {
    details.push({
      label: 'Response Code',
      value: transactionData.responseCode,
      type: 'text'
    })
  }

  // Timestamps
  if (transactionData.timestamps?.initiated) {
    details.push({
      label: 'Initiated',
      value: new Date(transactionData.timestamps.initiated).toLocaleString(),
      type: 'date'
    })
  }

  if (transactionData.timestamps?.authorized) {
    details.push({
      label: 'Authorized',
      value: new Date(transactionData.timestamps.authorized).toLocaleString(),
      type: 'date'
    })
  }

  // Account
  if (transactionData.account?.name) {
    details.push({
      label: 'Account',
      value: transactionData.account.name,
      type: 'text'
    })
  }

  // Risk Score
  if (transactionData.riskScore !== undefined) {
    details.push({
      label: 'Risk Score',
      value: transactionData.riskScore.toString(),
      type: 'text'
    })
  }

  // 3DS Status
  if (transactionData.threeDSStatusCode) {
    details.push({
      label: '3DS Status',
      value: transactionData.threeDSStatusCode,
      type: 'text'
    })
  }

  return details
}
