import React from 'react';
import { DetailRow } from './DetailRow';
import type { PaymentDetail } from '../types/payment-details.types';
import { PANEL_SPACING } from '../constants/spacing';

interface DetailsListProps {
  details: PaymentDetail[];
  isDetailView?: boolean;
  specialRenderer?: (detail: PaymentDetail, index: number, isLast: boolean) => React.ReactNode;
}

export const DetailsList = React.memo<DetailsListProps>(({ 
  details, 
  isDetailView = false,
  specialRenderer 
}) => {
  return (
    <div className={`flex flex-col ${PANEL_SPACING.FLEX_GAP_MEDIUM}`}>
      {details.map((detail, index) => {
        // Use special renderer if provided
        if (specialRenderer) {
          const isLast = index === details.length - 1;
          const specialContent = specialRenderer(detail, index, isLast);
          if (specialContent) {
            return <React.Fragment key={detail.label}>{specialContent}</React.Fragment>;
          }
        }
        
        // Default rendering with DetailRow - no wrapper needed
        return (
          <DetailRow 
            key={detail.label}
            label={detail.label} 
            value={detail.value} 
            isDetailView={isDetailView}
            showBadge={detail.showBadge}
            badgeVariant={detail.badgeVariant}
            isCopyable={detail.isCopyable}
          />
        );
      })}
    </div>
  );
});

DetailsList.displayName = 'DetailsList';