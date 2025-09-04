import React from 'react'
import { PanelContainer } from './PanelContainer'
import { usePanels } from '../providers/usePanels'

interface PanelProps {
  id: string
  open: boolean
  children: React.ReactNode
  className?: string
}

export const Panel: React.FC<PanelProps> = ({
  id,
  open,
  children,
  className
}) => {
  const panelsContext = usePanels()
  
  // Sync external state with internal panel context
  React.useLayoutEffect(() => {
    const panel = panelsContext.getPanel(id)
    const internalOpen = panel?.open ?? false
    
    if (open !== internalOpen) {
      if (open) {
        panelsContext.openPanel(id)
      } else {
        panelsContext.closePanel(id)
      }
    }
  }, [id, open, panelsContext])
  
  return (
    <PanelContainer id={id} className={className}>
      {children}
    </PanelContainer>
  )
}