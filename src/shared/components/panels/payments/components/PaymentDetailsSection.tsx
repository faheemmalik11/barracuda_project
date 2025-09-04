import React, { useMemo } from 'react';
import { CollapsibleDetailsSection } from '../../components/CollapsibleDetailsSection';
import { PAYMENT_DETAILS } from '../constants/payment-data';
import { mapTransactionToPaymentDetails } from '../utils/transaction-data-mapper';

interface PaymentDetailsSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
  isDetailView?: boolean;
  transactionData?: any;
}

export const PaymentDetailsSection = React.memo<PaymentDetailsSectionProps>(({ 
  isExpanded, 
  onToggle,
  isDetailView = false,
  transactionData
}) => {
  // Use transaction data if available, otherwise fall back to mockup data
  const details = useMemo(() => {
    if (transactionData) {
      return mapTransactionToPaymentDetails(transactionData);
    }
    return PAYMENT_DETAILS;
  }, [transactionData]);

  return (
    <CollapsibleDetailsSection
      title="Payment details"
      details={details}
      isExpanded={isExpanded}
      onToggle={onToggle}
      visibleCount={8}
      isDetailView={isDetailView}
      emptyMessage="No payment details available"
    />
  );
});

PaymentDetailsSection.displayName = 'PaymentDetailsSection';