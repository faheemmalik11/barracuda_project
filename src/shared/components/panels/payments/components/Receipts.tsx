import React, { useMemo } from 'react';
import { RECEIPTS } from '../constants/payment-data';
import { CollapsibleDetailsSection } from '../../components/CollapsibleDetailsSection';
import { RowActionDropdown } from '@shared/components/ui/data-table/RowActions';
import { toast } from 'sonner';
import type { TableAction } from '@shared/types/data-table';
import type { PaymentDetail } from '../../types/payment-details.types';
import { PANEL_SPACING } from '../../constants/spacing';

interface ReceiptsProps {
  isExpanded: boolean;
  onToggle: () => void;
  isDetailView?: boolean;
}

export const Receipts = React.memo<ReceiptsProps>(({ 
  isExpanded, 
  onToggle,
  isDetailView = false 
}) => {
  // Define receipt actions inline
  const receiptActions: TableAction<any>[] = [
    {
      key: 'view',
      label: 'View receipt',
      onClick: () => { toast.info('View receipt functionality coming soon') }
    },
    {
      key: 'download',
      label: 'Download',
      onClick: () => { toast.info('Download functionality coming soon') }
    },
    {
      key: 'share',
      label: 'Share',
      onClick: () => { toast.info('Share functionality coming soon') }
    }
  ];

  // Convert receipts to PaymentDetail format for DetailsList
  const receiptDetails: PaymentDetail[] = useMemo(() => 
    RECEIPTS.map(receipt => ({
      label: receipt.name,
      value: receipt.timestamp
    })), []
  );

  // Custom renderer for receipts with action buttons
  const receiptSpecialRenderer = useMemo(() => {
    return (detail: PaymentDetail, index: number) => {
      const receipt = RECEIPTS[index];
      
      return (
        <div className={`flex items-center justify-between ${PANEL_SPACING.DETAIL_ROW_PADDING}`}>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground truncate" title={detail.label}>
              {detail.label}
            </p>
            <p className="text-xs text-muted-foreground">
              {detail.value}
            </p>
          </div>
          <RowActionDropdown
            actions={receiptActions}
            item={receipt}
            triggerClassName="ml-3"
          />
        </div>
      );
    };
  }, [receiptActions]);

  return (
    <CollapsibleDetailsSection
      title="Receipts"
      details={receiptDetails}
      isExpanded={isExpanded}
      onToggle={onToggle}
      visibleCount={receiptDetails.length}
      isDetailView={isDetailView}
      emptyMessage="No receipts available"
      specialRenderer={receiptSpecialRenderer}
    />
  );
});

Receipts.displayName = 'Receipts';
