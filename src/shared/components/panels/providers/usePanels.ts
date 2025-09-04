import React from 'react'
import type { PanelContextType } from '../types/panel.types'

const PanelsContext = React.createContext<PanelContextType | null>(null)

export function usePanels() {
  const context = React.useContext(PanelsContext)
  if (!context) {
    throw new Error('usePanels must be used within a PanelsProvider')
  }
  return context
}

export { PanelsContext }