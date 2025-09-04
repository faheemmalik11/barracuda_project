import React from 'react'
import { useLocation } from 'react-router-dom'
import type { PanelState, PanelContextType } from '../types/panel.types'
import { ANIMATION_CLEANUP_MS } from '@shared/lib/animations'
import { PanelsContext } from './usePanels'

const MIN_WIDTH = 420
const getMaxWidth = () => Math.floor(window.innerWidth * 0.5)

const RESIZE_DEBOUNCE_MS = 100

function loadPanelWidth(id: string): number {
  try {
    const stored = localStorage.getItem(`panel-${id}-width`)
    return stored ? Math.max(MIN_WIDTH, parseInt(stored, 10)) : MIN_WIDTH
  } catch {
    return MIN_WIDTH
  }
}

function savePanelWidth(id: string, width: number): void {
  try {
    localStorage.setItem(`panel-${id}-width`, width.toString())
  } catch {
    // Ignore localStorage errors
  }
}

interface PanelsProviderProps {
  children: React.ReactNode
}

export function PanelsProvider({ children }: PanelsProviderProps) {
  const [panels, setPanels] = React.useState<Record<string, PanelState>>({})
  const [resizingPanel, setResizingPanel] = React.useState<string | null>(null)
  const timeoutRefs = React.useRef<Record<string, NodeJS.Timeout>>({})
  const location = useLocation()
  const prevBasePathRef = React.useRef<string>('')
  
  const openPanel = React.useCallback((id: string) => {
    if (timeoutRefs.current[id]) {
      clearTimeout(timeoutRefs.current[id])
      delete timeoutRefs.current[id]
    }
    
    setPanels(prev => ({
      ...prev,
      [id]: {
        open: true,
        width: prev[id]?.width ?? loadPanelWidth(id),
        isResizing: false,
        isClosing: false
      }
    }))
  }, [])

  const closePanel = React.useCallback((id: string) => {
    setPanels(prev => {
      const panel = prev[id]
      if (!panel || panel.isClosing) return prev
      
      return {
        ...prev,
        [id]: { ...panel, open: false, isClosing: true }
      }
    })
    
    if (timeoutRefs.current[id]) {
      clearTimeout(timeoutRefs.current[id])
    }
    
    timeoutRefs.current[id] = setTimeout(() => {
      setPanels(prev => {
        const { [id]: removed, ...rest } = prev
        void removed // Mark as intentionally unused
        return rest
      })
      delete timeoutRefs.current[id]
    }, ANIMATION_CLEANUP_MS)
  }, [])

  const setWidth = React.useCallback((id: string, width: number) => {
    const constrainedWidth = Math.max(MIN_WIDTH, Math.min(getMaxWidth(), width))
    savePanelWidth(id, constrainedWidth)
    
    setPanels(prev => {
      const panel = prev[id]
      if (!panel) return prev
      return { ...prev, [id]: { ...panel, width: constrainedWidth } }
    })
  }, [])

  const startResize = React.useCallback((id: string) => {
    setResizingPanel(id)
    setPanels(prev => {
      const panel = prev[id]
      if (!panel) return prev
      return {
        ...prev,
        [id]: { ...panel, isResizing: true }
      }
    })
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'ew-resize'
  }, [])

  const stopResize = React.useCallback((id: string) => {
    setResizingPanel(null)
    setPanels(prev => {
      const panel = prev[id]
      if (!panel) return prev
      return {
        ...prev,
        [id]: { ...panel, isResizing: false }
      }
    })
    document.body.style.userSelect = ''
    document.body.style.cursor = ''
  }, [])

  const getPanel = React.useCallback((id: string) => panels[id], [panels])

  React.useEffect(() => {
    if (!resizingPanel) return

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      setWidth(resizingPanel, window.innerWidth - e.clientX)
    }

    const handleMouseUp = () => stopResize(resizingPanel)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') stopResize(resizingPanel)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [resizingPanel, setWidth, stopResize])

  React.useEffect(() => {
    let resizeTimeout: NodeJS.Timeout
    
    const handleWindowResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        const maxWidth = getMaxWidth()
        setPanels(prev => {
          let hasChanges = false
          const updated = { ...prev }
          
          Object.keys(updated).forEach(id => {
            if (updated[id].width > maxWidth) {
              updated[id] = { ...updated[id], width: maxWidth }
              savePanelWidth(id, maxWidth)
              hasChanges = true
            }
          })
          
          return hasChanges ? updated : prev
        })
      }, RESIZE_DEBOUNCE_MS)
    }

    window.addEventListener('resize', handleWindowResize)
    return () => {
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  // Clean up panels when navigating to a different base route
  React.useEffect(() => {
    const currentBasePath = location.pathname.split('/')[1] || ''
    
    // Only close panels if we're actually changing base routes
    if (prevBasePathRef.current && prevBasePathRef.current !== currentBasePath) {
      // Close all open panels gracefully
      setPanels(prev => {
        const newPanels = { ...prev }
        Object.keys(newPanels).forEach(id => {
          if (newPanels[id]?.open && !newPanels[id]?.isClosing) {
            newPanels[id] = { ...newPanels[id], open: false, isClosing: true }
            
            // Schedule cleanup
            if (timeoutRefs.current[id]) {
              clearTimeout(timeoutRefs.current[id])
            }
            timeoutRefs.current[id] = setTimeout(() => {
              setPanels(p => {
                const { [id]: removed, ...rest } = p
                void removed
                return rest
              })
              delete timeoutRefs.current[id]
            }, ANIMATION_CLEANUP_MS)
          }
        })
        return newPanels
      })
    }
    
    prevBasePathRef.current = currentBasePath
  }, [location.pathname])
  
  // Clean up timeouts on unmount
  React.useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(clearTimeout)
      timeoutRefs.current = {}
    }
  }, [])

  const contextValue = React.useMemo<PanelContextType>(() => ({
    panels,
    openPanel,
    closePanel,
    setWidth,
    startResize,
    stopResize,
    getPanel
  }), [panels, openPanel, closePanel, setWidth, startResize, stopResize, getPanel])

  return (
    <PanelsContext.Provider value={contextValue}>
      {children}
    </PanelsContext.Provider>
  )
}