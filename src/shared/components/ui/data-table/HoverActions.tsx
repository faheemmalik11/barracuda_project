import { Button } from "@shared/components/ui/button"
import { cn } from "@shared/lib/utils"
import type { TableAction } from "@shared/types/data-table"

interface HoverActionsProps<T> {
  actions: TableAction<T>[]
  item: T
  className?: string
}

export function HoverActions<T>({ actions, item, className }: HoverActionsProps<T>) {
  if (!actions.length) return null

  return (
    <div className={cn(
      "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
      className
    )}>
      {actions.map((action, index) => (
        <Button
          key={action.id || index}
          variant={action.variant || "ghost"}
          size="sm"
          className="h-7 w-7 p-0 hover:bg-accent"
          onClick={(e) => {
            e.stopPropagation()
            action.onClick(item)
          }}
          disabled={action.disabled?.(item)}
          title={action.label}
        >
          {action.icon}
        </Button>
      ))}
    </div>
  )
}