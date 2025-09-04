import { motion, AnimatePresence } from 'framer-motion'
import { usePanels } from '../providers/usePanels'
import { cn } from '@shared/lib/utils'
import { getZIndexClass } from '@shared/lib/z-index'
import { PANEL_ANIMATIONS } from '@shared/lib/animations'

interface PanelContainerProps {
  id: string
  children: React.ReactNode
  className?: string
}

const ResizeHandle = ({ 
  isResizing, 
  onStartResize,
  panelId 
}: {
  isResizing: boolean
  onStartResize: () => void
  panelId: string
}) => (
  <div
    role="separator"
    aria-orientation="vertical"
    aria-label={`Resize ${panelId} panel`}
    tabIndex={0}
    className={cn(
      'absolute inset-y-0 left-0 w-3 bg-transparent hover:bg-border transition-colors cursor-ew-resize',
      'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
      getZIndexClass('POPOVER'),
      isResizing && 'bg-border'
    )}
    onMouseDown={(e) => {
      e.preventDefault()
      onStartResize()
    }}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onStartResize()
      }
    }}
    style={{ touchAction: 'none' }}
  />
)

export function PanelContainer({ id, children, className }: PanelContainerProps) {
  const { getPanel, startResize } = usePanels()
  const panel = getPanel(id)
  
  return (
    <AnimatePresence mode="wait">
      {panel?.open && (
        <motion.div
          key={id}
          role="complementary"
          aria-label={`${id} panel`}
          className={cn(
            'fixed top-0 right-0 h-screen bg-background overflow-hidden border-l shadow-sm',
            getZIndexClass('PANEL'),
            className
          )}
          style={{
            width: `${panel.width}px`
          }}
          {...PANEL_ANIMATIONS.slideIn}
        >
          <ResizeHandle 
            isResizing={panel.isResizing}
            onStartResize={() => startResize(id)}
            panelId={id}
          />
          <div className="h-full overflow-y-auto">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}