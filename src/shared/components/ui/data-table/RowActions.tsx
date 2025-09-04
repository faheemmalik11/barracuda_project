import { Button } from "@shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu"
import { cn } from "@shared/lib/utils"
import { MoreHorizontal } from "lucide-react"
import type { TableAction } from "@shared/types/data-table"

interface RowActionDropdownProps<T> {
  actions: TableAction<T>[]
  item: T
  triggerClassName?: string
}

export function RowActionDropdown<T>({ actions, item, triggerClassName }: RowActionDropdownProps<T>) {
  if (actions.length === 0) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-6 w-6", triggerClassName)}
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-2.5 w-2.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 max-h-64 overflow-y-auto p-1">
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={action.key || action.label || index}
            disabled={action.disabled?.(item)}
            onClick={(e) => {
              e.stopPropagation()
              action.onClick(item)
            }}
            className={cn(
              "cursor-pointer py-1 px-2 text-xs h-8 rounded-sm",
              action.variant === "destructive" && "text-destructive focus:text-destructive"
            )}
          >
            <div className="flex items-center gap-2">
              {action.icon && <span className="h-2.5 w-2.5 shrink-0 flex items-center justify-center">{action.icon}</span>}
              <span className="leading-none">{action.label}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
