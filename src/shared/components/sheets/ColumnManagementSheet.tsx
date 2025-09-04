import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@shared/components/ui/sheet"
import { Badge } from "@shared/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/components/ui/tabs"
import { ColumnItem } from "@shared/components/ui/ColumnItem"
import { Search, Eye, EyeOff, RotateCcw, Settings2, X } from "lucide-react"
import { SHEET_BUTTON_STYLES } from "@shared/lib/styles/sheet-styles"
import type { ColumnManagementSheetProps, ManagedColumn } from "@shared/types/sheets"



const EmptyState = ({ message }: { message: string }) => (
  <div className="p-8 text-center text-muted-foreground">
    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
    <p className="text-sm">{message}</p>
  </div>
)

export default function ColumnManagementSheet({
  open,
  onOpenChange,
  columns: initialColumns = [],
  onColumnsChange,
}: ColumnManagementSheetProps) {
  const [columns, setColumns] = useState<ManagedColumn[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [dragOverItem, setDragOverItem] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"active" | "available">("active")

  useEffect(() => {
    const sortedColumns = initialColumns
      .map((col, index) => ({ ...col, order: col.order ?? index }))
      .sort((a, b) => a.order - b.order)
    setColumns(sortedColumns)
  }, [initialColumns])

  const { activeColumns, availableColumns, filteredActiveColumns, filteredAvailableColumns, hasChanges } = useMemo(() => {
    const active = columns.filter(col => col.visible)
    const available = columns.filter(col => !col.visible)
    const searchLower = searchQuery.toLowerCase()
    
    return {
      activeColumns: active,
      availableColumns: available,
      filteredActiveColumns: active.filter(col => col.label.toLowerCase().includes(searchLower)),
      filteredAvailableColumns: available.filter(col => col.label.toLowerCase().includes(searchLower)),
      hasChanges: columns.length !== initialColumns.length || 
        columns.some((col, index) => {
          const initial = initialColumns[index]
          return !initial || col.id !== initial.id || col.visible !== initial.visible || col.order !== (initial.order ?? index)
        })
    }
  }, [columns, searchQuery, initialColumns])

  const toggleColumn = useCallback((columnId: string) => {
    setColumns(prev =>
      prev.map(col =>
        col.id === columnId && !col.required ? { ...col, visible: !col.visible } : col
      )
    )
  }, [])

  const reorderColumns = useCallback((draggedId: string, targetId: string) => {
    if (draggedId === targetId) return
    
    setColumns(prev => {
      const newColumns = [...prev]
      const draggedIndex = newColumns.findIndex(col => col.id === draggedId)
      const targetIndex = newColumns.findIndex(col => col.id === targetId)
      
      if (draggedIndex === -1 || targetIndex === -1) return prev
      
      const [draggedColumn] = newColumns.splice(draggedIndex, 1)
      newColumns.splice(targetIndex, 0, draggedColumn)
      
      return newColumns.map((col, index) => ({ ...col, order: index }))
    })
  }, [])

  const showAll = useCallback(() => {
    setColumns(prev => prev.map(col => ({ ...col, visible: true })))
  }, [])

  const hideOptional = useCallback(() => {
    setColumns(prev => prev.map(col => ({ ...col, visible: !!col.required })))
  }, [])

  const resetToDefault = useCallback(() => {
    setColumns(initialColumns.map((col, index) => ({ ...col, order: index })))
    setSearchQuery("")
  }, [initialColumns])

  const applyChanges = useCallback(() => {
    onColumnsChange?.(columns)
    onOpenChange(false)
  }, [columns, onColumnsChange, onOpenChange])

  const clearSearch = useCallback(() => setSearchQuery(""), [])

  const handleDragStart = useCallback((e: React.DragEvent, columnId: string) => {
    e.dataTransfer.setData("text/plain", columnId)
    e.dataTransfer.effectAllowed = "move"
    setDraggedItem(columnId)
  }, [])

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null)
    setDragOverItem(null)
  }, [])

  const handleDragEnter = useCallback((e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (draggedItem && draggedItem !== targetId) {
      setDragOverItem(targetId)
    }
  }, [draggedItem])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }, [])

  const handleDrop = useCallback((e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    const draggedId = e.dataTransfer.getData("text/plain")
    reorderColumns(draggedId, targetId)
  }, [reorderColumns])

  const renderColumnItem = useCallback((column: ManagedColumn) => (
    <ColumnItem
      key={column.id}
      column={column}
      isDragging={draggedItem === column.id}
      isDragOver={dragOverItem === column.id}
      onToggleColumn={toggleColumn}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    />
  ), [draggedItem, dragOverItem, toggleColumn, handleDragStart, handleDragEnd, handleDragEnter, handleDragOver, handleDrop])

  const renderTabContent = useCallback((columns: ManagedColumn[], emptyMessage: string) => (
    <div className="h-full border rounded-lg overflow-hidden flex flex-col bg-card">
      {columns.length === 0 ? (
        <EmptyState message={emptyMessage} />
      ) : (
        <div className="flex-1 divide-y overflow-y-auto">
          {columns.map(renderColumnItem)}
        </div>
      )}
    </div>
  ), [renderColumnItem])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[440px] sm:max-w-[440px] flex flex-col h-full max-h-screen select-none bg-card">
        <SheetHeader className="pb-4 flex-shrink-0">
          <SheetTitle className="flex items-center justify-between pr-6">
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              Manage Columns
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="whitespace-nowrap">
                {activeColumns.length} of {columns.length} visible
              </span>
              {hasChanges && (
                <Badge variant="secondary" className="text-xs px-2 py-1 whitespace-nowrap">
                  Modified
                </Badge>
              )}
            </div>
          </SheetTitle>
          <SheetDescription>
            Configure which columns are visible in the table and reorder them by dragging.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          <div className="relative flex-shrink-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search columns..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 h-9 border-border"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className={SHEET_BUTTON_STYLES.clear}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            <Button variant="outline" size="sm" onClick={showAll} className={SHEET_BUTTON_STYLES.action}>
              <Eye className="mr-1.5 h-3 w-3" />
              Show All
            </Button>
            <Button variant="outline" size="sm" onClick={hideOptional} className={SHEET_BUTTON_STYLES.action}>
              <EyeOff className="mr-1.5 h-3 w-3" />
              Hide Optional
            </Button>
            <Button variant="outline" size="sm" onClick={resetToDefault} disabled={!hasChanges} className={SHEET_BUTTON_STYLES.action}>
              <RotateCcw className="mr-1.5 h-3 w-3" />
              Reset
            </Button>
          </div>
          
          <Tabs
            value={activeTab}
            onValueChange={value => setActiveTab(value as "active" | "available")}
            className="flex-1 flex flex-col min-h-0"
          >
            <TabsList className="grid w-full grid-cols-2 flex-shrink-0 bg-muted">
              <TabsTrigger value="active" className="text-xs">
                Active Columns ({activeColumns.length})
              </TabsTrigger>
              <TabsTrigger value="available" className="text-xs">
                Available Columns ({availableColumns.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="flex-1 mt-3 min-h-0">
              {renderTabContent(
                filteredActiveColumns,
                searchQuery ? "No active columns found" : "No active columns"
              )}
            </TabsContent>
            
            <TabsContent value="available" className="flex-1 mt-3 min-h-0">
              {renderTabContent(
                filteredAvailableColumns,
                searchQuery ? "No available columns found" : "No available columns"
              )}
            </TabsContent>
          </Tabs>
          
          <div className="flex gap-3 pt-4 border-t flex-shrink-0 border-border">
            <Button
              onClick={applyChanges}
              disabled={!hasChanges}
              className="flex-1 h-9 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {hasChanges ? "Apply Changes" : "No Changes"}
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-9 px-4 border-border"
            >
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}