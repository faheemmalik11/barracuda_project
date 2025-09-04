import { useCallback } from "react"
import { Button } from "@shared/components/ui/button"
import { AppStatusBadge } from '@shared/components/ui/status-badge/AppStatusBadge'
import { Eye, EyeOff, GripVertical, Check } from "lucide-react"
import { cn } from "@shared/lib/utils"
import { SHEET_DRAG_STYLES, SHEET_BUTTON_STYLES } from "@shared/lib/styles/sheet-styles"
import type { ManagedColumn } from "@shared/types/sheets"

interface ColumnItemProps {
  column: ManagedColumn
  isDragging: boolean
  isDragOver: boolean
  onToggleColumn: (columnId: string) => void
  onDragStart: (e: React.DragEvent, columnId: string) => void
  onDragEnd: () => void
  onDragEnter: (e: React.DragEvent, targetId: string) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, targetId: string) => void
}

export function ColumnItem({
  column,
  isDragging,
  isDragOver,
  onToggleColumn,
  onDragStart,
  onDragEnd,
  onDragEnter,
  onDragOver,
  onDrop,
}: ColumnItemProps) {
  const { required: isRequired, visible, label, id } = column

  const containerClassName = cn(
    SHEET_DRAG_STYLES.base,
    isDragging && SHEET_DRAG_STYLES.dragging,
    isDragOver && SHEET_DRAG_STYLES.dragOver,
    !isDragging && !isDragOver && (isRequired ? SHEET_DRAG_STYLES.required : SHEET_DRAG_STYLES.optional)
  )

  const handleDragStart = useCallback((e: React.DragEvent) => onDragStart(e, id), [onDragStart, id])
  const handleDragEnter = useCallback((e: React.DragEvent) => onDragEnter(e, id), [onDragEnter, id])
  const handleDrop = useCallback((e: React.DragEvent) => onDrop(e, id), [onDrop, id])
  const handleToggle = useCallback(() => onToggleColumn(id), [onToggleColumn, id])

  return (
    <div
      className={containerClassName}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onDragEnter={handleDragEnter}
      onDragOver={onDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "transition-colors duration-200 text-muted-foreground",
          isDragging ? "cursor-grabbing" : "cursor-grab hover:text-foreground"
        )}>
          <GripVertical className="h-4 w-4" />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggle}
          disabled={isRequired}
          className={SHEET_BUTTON_STYLES.toggle}
        >
          {visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{label}</span>
          {isRequired && (
            <AppStatusBadge 
              variant="generic" 
              text="Required"
              color="info"
              size="sm"
            />
          )}
        </div>
      </div>
      <div className="text-xs">
        {visible ? (
          <div className="flex items-center gap-1 text-primary">
            <Check className="h-3 w-3" />
            Visible
          </div>
        ) : (
          <span className="text-muted-foreground">Hidden</span>
        )}
      </div>
    </div>
  )
}