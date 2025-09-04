import { Button } from "@shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@shared/components/ui/dropdown-menu"
import { MoreHorizontal, Download, Columns, Rows, X } from "lucide-react"
import type { FilterConfig } from "@shared/types/filters"

interface FilterActionsMenuProps {
  availableHiddenFilters: FilterConfig[]
  activatedHiddenFilterConfigs: FilterConfig[]
  onExportOpen: (open: boolean) => void
  onColumnOpen: (open: boolean) => void
  onActivateHiddenFilter: (key: string) => void
  onRemoveAllAdditionalFilters: () => void
  currentPageSize?: number
  onPageSizeChange?: (pageSize: number) => void
  availablePageSizes?: number[]
}

export function FilterActionsMenu({
  availableHiddenFilters,
  activatedHiddenFilterConfigs,
  onExportOpen,
  onColumnOpen,
  onActivateHiddenFilter,
  onRemoveAllAdditionalFilters,
  currentPageSize = 20,
  onPageSizeChange,
  availablePageSizes = [20, 30, 40, 50],
}: FilterActionsMenuProps) {
  const sortedAvailableFilters = [...availableHiddenFilters].sort((a, b) => 
    a.label.localeCompare(b.label)
  )
  const hasAdditionalFilters = availableHiddenFilters.length > 0 || activatedHiddenFilterConfigs.length > 0

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0 rounded-full hover:bg-accent/50"
          aria-label="Filter actions menu"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 select-none max-h-96 overflow-y-auto">
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Actions
        </DropdownMenuLabel>
        
        <DropdownMenuItem onClick={() => onExportOpen(true)}>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onColumnOpen(true)}>
          <Columns className="h-4 w-4 mr-2" />
          Manage Columns
        </DropdownMenuItem>

        {onPageSizeChange && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Rows className="h-4 w-4 mr-2" />
              Page Size ({currentPageSize})
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {availablePageSizes.map((pageSize) => {
                const isSelected = currentPageSize === pageSize
                
                return (
                  <DropdownMenuItem
                    key={pageSize}
                    onClick={() => onPageSizeChange(pageSize)}
                    className={isSelected ? "bg-accent" : ""}
                  >
                    <span>{pageSize} rows</span>
                    {isSelected && (
                      <span className="ml-auto text-primary">✓</span>
                    )}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}

        {hasAdditionalFilters && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Additional Filters
            </DropdownMenuLabel>
            
            {activatedHiddenFilterConfigs.length > 0 && (
              <DropdownMenuItem onClick={onRemoveAllAdditionalFilters}>
                <X className="h-4 w-4 mr-2 text-destructive" />
                <span className="text-destructive">Remove All Additional</span>
              </DropdownMenuItem>
            )}

            {sortedAvailableFilters.map((filter) => (
              <DropdownMenuItem
                key={filter.key}
                onClick={() => onActivateHiddenFilter(filter.key)}
              >
                {filter.label}
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
