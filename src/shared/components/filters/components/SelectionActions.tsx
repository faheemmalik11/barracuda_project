import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@shared/components/ui/button'
import { Flag, Ban, X, Download, Settings, ShieldCheck } from 'lucide-react'
import { cn } from '@shared/lib/utils'

interface SelectionActionsProps {
  selectedCount: number
  entityType?: string
  onCancel: () => void
  onFlag: () => void
  onExport?: () => void
  onClearSelection: () => void
  onUpdateStatus?: () => void
  onUpdateCapabilities?: () => void
}

const ANIMATION_CONFIG = {
  container: {
    initial: { opacity: 0, y: -5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 },
    transition: { duration: 0.15, ease: "easeOut" }
  },
  button: {
    initial: { opacity: 0, x: -3 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.1 }
  }
} as const

const ACTION_CONFIGS = {
  cancel: { icon: Ban, label: 'Cancel', variant: 'destructive' as const },
  export: { icon: Download, label: 'Export', variant: 'default' as const },
  updateStatus: { icon: Settings, label: 'Update Status', variant: 'default' as const },
  updateCapabilities: { icon: ShieldCheck, label: 'Update Capabilities', variant: 'default' as const },
  flag: { icon: Flag, label: 'Flag', variant: 'default' as const },
} as const

export const SelectionActions = memo<SelectionActionsProps>(({
  selectedCount,
  entityType = 'item',
  onCancel,
  onFlag,
  onExport,
  onClearSelection,
  onUpdateStatus,
  onUpdateCapabilities,
}) => {
  const pluralizedEntity = selectedCount === 1 ? entityType : `${entityType}s`
  const isMerchant = entityType === 'merchant'
  
  const actions = [
    { key: 'cancel', onClick: onCancel, config: ACTION_CONFIGS.cancel },
    ...(onExport ? [{ key: 'export', onClick: onExport, config: ACTION_CONFIGS.export }] : []),
    ...(isMerchant && onUpdateStatus ? [{ key: 'updateStatus', onClick: onUpdateStatus, config: ACTION_CONFIGS.updateStatus }] : []),
    ...(isMerchant && onUpdateCapabilities ? [{ key: 'updateCapabilities', onClick: onUpdateCapabilities, config: ACTION_CONFIGS.updateCapabilities }] : []),
    { key: 'flag', onClick: onFlag, config: ACTION_CONFIGS.flag },
  ]
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        {...ANIMATION_CONFIG.container}
        className={cn(
          "bg-card border border-border rounded-lg shadow-sm px-3 py-2",
          "flex items-center gap-3 select-none min-h-[40px]",
          isMerchant ? 'min-w-[480px]' : 'min-w-[320px]'
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-primary">{selectedCount}</span>
          <span className="text-xs text-muted-foreground">
            {pluralizedEntity} selected
          </span>
        </div>
        
        <div className="w-px h-4 bg-border" />
        
        <div className="flex items-center gap-1">
          {actions.map((action, index) => {
            const Icon = action.config.icon
            return (
              <motion.div
                key={action.key}
                {...ANIMATION_CONFIG.button}
                transition={{ ...ANIMATION_CONFIG.button.transition, delay: index * 0.03 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={action.onClick}
                  className={cn(
                    "h-8 px-3 text-xs font-medium",
                    action.config.variant === "destructive" 
                      ? "text-destructive hover:text-destructive hover:bg-destructive/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="mr-1.5 h-3.5 w-3.5" />
                  {action.config.label}
                </Button>
              </motion.div>
            )
          })}
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-px h-4 bg-border" />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            aria-label="Clear selection"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
})

SelectionActions.displayName = 'SelectionActions'