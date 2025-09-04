import { useState } from 'react'

export function useCustomerSheets() {
  const [openSheets, setOpenSheets] = useState<Record<string, boolean>>({
    createCustomer: false
  })

  const openCreateCustomer = () => {
    setOpenSheets(prev => ({ ...prev, createCustomer: true }))
  }

  const closeSheet = (sheetName: keyof typeof openSheets) => {
    setOpenSheets(prev => ({ ...prev, [sheetName]: false }))
  }

  const getSheetProps = (sheetName: 'createCustomer') => ({
    open: openSheets[sheetName],
    onOpenChange: (open: boolean) => {
      if (!open) {
        closeSheet(sheetName)
      }
    }
  })

  return {
    openCreateCustomer,
    getSheetProps
  }
}