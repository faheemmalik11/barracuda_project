import { useState, useEffect, useMemo, useCallback } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@shared/components/ui/table';
import { RowActionDropdown } from '@shared/components/ui/data-table/RowActions';
import { SkeletonBox } from '@shared/components/ui/skeleton';
import { cn } from '@shared/lib/utils';
import { Pagination } from '@shared/components/ui/data-table/Pagination';
import type { PanelTableProps } from './types';

const DEFAULT_PAGE_SIZE = 5;
const PANEL_MIN_WIDTH = 'min-w-[500px]';
const HEADER_CELL_CLASS = 'text-[10px] text-foreground/60 uppercase tracking-wider font-semibold px-4 opacity-70';
const TABLE_CELL_CLASS = 'text-xs px-4 opacity-80';
const ACTIONS_COLUMN_WIDTH = 'w-10';

function getItemProperty(item: unknown, key: string): unknown {
  return typeof item === 'object' && item !== null && key in item 
    ? (item as Record<string, unknown>)[key] 
    : undefined;
}

function getItemId(item: unknown): string {
  return typeof item === 'object' && item !== null && 'id' in item 
    ? String((item as { id: unknown }).id) 
    : '';
}
export function PanelTable<T = Record<string, unknown>>({
  data,
  columns,
  pageSize = DEFAULT_PAGE_SIZE,
  variant = 'full',
  onRowClick,
  rowActions,
  className,
  emptyMessage = 'No data available',
  loading = false,
  showPagination = true
}: PanelTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  useEffect(() => {
    if (data.length === 0) return;
    
    const totalPages = Math.ceil(data.length / pageSize);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, data.length, pageSize]);

  const paginationData = useMemo(() => {
    if (data.length === 0) {
      return { totalPages: 0, paginatedData: [] };
    }

    const totalPages = Math.ceil(data.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = showPagination ? data.slice(startIndex, startIndex + pageSize) : data;
    
    return { totalPages, paginatedData };
  }, [data, currentPage, pageSize, showPagination]);

  const visibleColumns = useMemo(() => 
    columns.filter(column => variant === 'full' || !column.hideInPanel),
    [columns, variant]
  );

  const handleRowKeyDown = useCallback((item: T) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onRowClick?.(item);
    }
  }, [onRowClick]);

  if (loading) {
    return (
      <div className={cn('w-full', className)}>
        <div className="space-y-2 p-4">
          {Array.from({ length: pageSize }, (_, i) => (
            <SkeletonBox key={i} className="h-10" />
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={cn('w-full', className)}>
        <div className="flex items-center justify-center p-8 text-sm text-muted-foreground">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <div className={cn(
        'overflow-x-auto px-2',
        variant === 'panel' && 'min-w-0'
      )}>
        <Table 
          className={cn(
            'w-full [&_tbody_tr:last-child]:border-b-0',
            variant === 'panel' && PANEL_MIN_WIDTH
          )}
        >
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {visibleColumns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  className={cn(
                    HEADER_CELL_CLASS,
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.headerClassName
                  )}
                  style={{
                    width: column.width,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth
                  }}
                  scope="col"
                >
                  {column.label}
                </TableHead>
              ))}
              {rowActions && <TableHead className={ACTIONS_COLUMN_WIDTH} />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginationData.paginatedData.map((item, index) => {
              const key = getItemId(item) || `row-${index}`;
              const actions = rowActions?.(item);
              
              return (
                <TableRow
                  key={key}
                  className={cn(
                    onRowClick && 'cursor-pointer hover:bg-muted/50 transition-colors'
                  )}
                  onClick={onRowClick ? () => onRowClick(item) : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  onKeyDown={onRowClick ? handleRowKeyDown(item) : undefined}
                >
                  {visibleColumns.map((column) => {
                    const value = getItemProperty(item, column.key as string);
                    const cellContent = column.render 
                      ? column.render(value, item)
                      : value?.toString() || '-';
                    
                    return (
                      <TableCell
                        key={`${key}-${String(column.key)}`}
                        className={cn(
                          TABLE_CELL_CLASS,
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right',
                          column.cellClassName
                        )}
                      >
                        {cellContent}
                      </TableCell>
                    );
                  })}
                  {actions && (
                    <TableCell 
                      className="p-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-center">
                        <RowActionDropdown
                          actions={actions}
                          item={item}
                          aria-label={`More actions for row ${index + 1}`}
                        />
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      {showPagination && paginationData.totalPages > 1 && (
        <div className="px-2">
          <Pagination
            currentPage={currentPage}
            totalPages={paginationData.totalPages}
            totalItems={data.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            variant="compact"
          />
        </div>
      )}
    </div>
  );
}
