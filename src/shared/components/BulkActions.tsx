import { useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@shared/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@shared/lib/utils"
import type { BulkAction } from "@shared/types/data-table"

interface BulkActionsProps {
  actions: BulkAction[]
  selectedItems: string[]
  onBulkAction: (actionKey: string, selectedItems: string[]) => void
  onClearSelection?: () => void
  className?: string
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

export const BulkActions = ({
  actions,
  selectedItems,
  onBulkAction,
  onClearSelection,
  className,
}: BulkActionsProps) => {
  const selectedCount = selectedItems.length

  const handleBulkAction = useCallback(
    (actionKey: string) => onBulkAction(actionKey, selectedItems),
    [onBulkAction, selectedItems]
  )

  if (!actions?.length || selectedCount === 0) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        {...ANIMATION_CONFIG.container}
        className={cn(
          "bg-card border border-border rounded-lg shadow-sm px-2 py-1.5",
          "flex items-center gap-3 min-h-[40px] select-none",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-primary">{selectedCount}</span>
          <span className="text-xs text-muted-foreground">
            {selectedCount === 1 ? 'item' : 'items'} selected
          </span>
        </div>

        <div className="flex items-center gap-1">
          {actions.map((action, index) => (
            <motion.div
              key={action.key}
              {...ANIMATION_CONFIG.button}
              transition={{ ...ANIMATION_CONFIG.button.transition, delay: index * 0.03 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleBulkAction(action.key)}
                className={cn(
                  "h-8 px-3 text-xs font-medium",
                  action.variant === "destructive" 
                    ? "text-destructive hover:text-destructive hover:bg-destructive/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {action.icon && <span className="mr-1.5 [&_svg]:size-3.5">{action.icon}</span>}
                {action.label}
              </Button>
            </motion.div>
          ))}
          
          {onClearSelection && (
            <>
              <div className="w-px h-4 bg-border mx-1" />
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearSelection}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                aria-label="Clear selection"
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
} 
