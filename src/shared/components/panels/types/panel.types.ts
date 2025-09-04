export interface PanelState {
  open: boolean
  width: number
  isResizing: boolean
  isClosing: boolean
}

export interface PanelContextType {
  panels: Record<string, PanelState>
  openPanel: (id: string) => void
  closePanel: (id: string) => void
  setWidth: (id: string, width: number) => void
  startResize: (id: string) => void
  stopResize: (id: string) => void
  getPanel: (id: string) => PanelState | undefined
}