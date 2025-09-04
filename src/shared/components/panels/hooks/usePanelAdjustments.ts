import { usePanels } from '../providers/usePanels'

/**
 * Calculates layout adjustments for opened panels
 */
export function usePanelAdjustments() {
  const { panels } = usePanels()
  
  // Calculate total width of open panels
  const totalWidth = Object.values(panels)
    .filter(panel => panel.open)
    .reduce((total, panel) => total + panel.width, 0)
  
  return {
    right: totalWidth > 0 ? `${totalWidth}px` : '0',
    width: totalWidth > 0 ? `calc(100% - ${totalWidth}px)` : '100%',
    hasOpenPanels: totalWidth > 0
  }
}