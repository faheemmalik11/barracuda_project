import { useState, useCallback, useMemo } from 'react'

interface BatchActionHandlers {
  [key: string]: (selectedIds: string[]) => void
}

interface UseEntitySelectionProps {
  batchActions?: BatchActionHandlers
}

export function useEntitySelection({ batchActions = {} }: UseEntitySelectionProps = {}) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleClearSelection = useCallback(() => {
    setSelectedItems([])
  }, [])

  const batchActionHandlers = useMemo(() => {
    const handlers: BatchActionHandlers = {}
    
    Object.entries(batchActions).forEach(([key, action]) => {
      handlers[key] = (selectedIds: string[]) => {
        action(selectedIds)
        handleClearSelection()
      }
    })
    
    return handlers
  }, [batchActions, handleClearSelection])

  const handleBulkAction = useCallback((actionKey: string, selectedIds: string[]) => {
    batchActionHandlers[actionKey]?.(selectedIds)
  }, [batchActionHandlers])

  return {
    selectedItems,
    setSelectedItems,
    handleClearSelection,
    batchActionHandlers,
    handleBulkAction,
    hasSelectedItems: selectedItems.length > 0,
  }
}