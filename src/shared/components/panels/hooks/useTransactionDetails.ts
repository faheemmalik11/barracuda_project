import { useState, useEffect, useCallback } from 'react'
import { paymentsService } from '@shared/services/payments.service'
import type { Transaction } from '@shared/types/payment.types'

interface UseTransactionDetailsProps {
  transactionRef?: string
  enabled?: boolean
}

interface UseTransactionDetailsResult {
  transaction: Transaction | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useTransactionDetails({ 
  transactionRef, 
  enabled = true 
}: UseTransactionDetailsProps): UseTransactionDetailsResult {
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTransaction = useCallback(async () => {
    if (!transactionRef || !enabled) return

    setIsLoading(true)
    setError(null)
    
    try {
      const data = await paymentsService.getSingleTransaction(transactionRef)
      setTransaction(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch transaction details'
      setError(errorMessage)
      console.error('Error fetching transaction:', err)
    } finally {
      setIsLoading(false)
    }
  }, [transactionRef, enabled])

  useEffect(() => {
    if (transactionRef && enabled) {
      fetchTransaction()
    } else {
      // Clear data when disabled or no transactionRef
      setTransaction(null)
      setError(null)
    }
  }, [transactionRef, enabled, fetchTransaction])

  return {
    transaction,
    isLoading,
    error,
    refetch: fetchTransaction
  }
}
