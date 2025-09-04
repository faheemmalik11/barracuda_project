import { useState, useCallback, useMemo } from 'react'
import type { UsePaymentActionsReturn } from './usePaymentActions'

interface UsePaymentSelectionProps {
  actions: UsePaymentActionsReturn
}

export function usePaymentSelection({ actions }: UsePaymentSelectionProps) {
  const [selectedPaymentIds, setSelectedPaymentIds] = useState<string[]>([])

  const handleClearSelection = useCallback(() => {
    setSelectedPaymentIds([])
  }, [])

  const batchActionHandlers = useMemo(
    () => ({
      handleBatchCancel: (selectedIds: string[]) => {
        actions.handleBatchCancel(selectedIds)
        handleClearSelection()
      },
      handleBatchFlag: (selectedIds: string[]) => {
        actions.handleBatchFlag(selectedIds)
        handleClearSelection()
      },
      handleBatchExport: (selectedIds: string[]) => {
        actions.handleBatchExport(selectedIds)
        handleClearSelection()
      },
    }),
    [actions, handleClearSelection]
  )

  return {
    selectedPaymentIds,
    setSelectedPaymentIds,
    handleClearSelection,
    batchActionHandlers,
    hasSelectedItems: selectedPaymentIds.length > 0,
  }
}
