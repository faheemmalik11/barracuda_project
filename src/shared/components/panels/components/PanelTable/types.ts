import type { ReactNode } from 'react';
import type { TableAction } from '@shared/types/data-table';

export interface PanelTableColumn<T> {
  key: keyof T | string;
  label: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  hideInPanel?: boolean;
  render?: (value: unknown, item: T) => ReactNode;
  cellClassName?: string;
  headerClassName?: string;
  align?: 'left' | 'center' | 'right';
}

export interface PanelTableProps<T = Record<string, unknown>> {
  data: T[];
  columns: PanelTableColumn<T>[];
  pageSize?: number;
  variant?: 'panel' | 'full';
  onRowClick?: (item: T) => void;
  rowActions?: (item: T) => TableAction<T>[];
  className?: string;
  emptyMessage?: string;
  loading?: boolean;
  showPagination?: boolean;
}

