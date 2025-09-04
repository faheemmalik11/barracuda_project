import { RowActionDropdown } from '@shared/components/ui/data-table/RowActions';
import type { PaymentMethodActionsProps } from './types';
import type { TableAction } from '@shared/types/data-table';

export const PaymentMethodActions = ({ actions, onAction }: PaymentMethodActionsProps) => {
  const tableActions: TableAction<Record<string, unknown>>[] = actions.map(action => ({
    key: action.id,
    label: action.label,
    onClick: () => onAction(action.id),
    variant: action.variant === 'destructive' ? 'destructive' as const : undefined
  }));

  return (
    <RowActionDropdown
      actions={tableActions}
      item={{}}
      triggerClassName="h-8 w-8 p-0 hover:bg-muted/50"
    />
  );
};