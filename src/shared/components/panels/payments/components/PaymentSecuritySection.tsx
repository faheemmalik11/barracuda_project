import React from 'react';
import { CollapsibleDetailsSection } from '../../components/CollapsibleDetailsSection';
import { PAYMENT_SECURITY_DETAILS } from '../constants/payment-data';

interface PaymentSecuritySectionProps {
  isExpanded: boolean;
  onToggle: () => void;
  isDetailView?: boolean;
}

export const PaymentSecuritySection = React.memo<PaymentSecuritySectionProps>(({ 
  isExpanded, 
  onToggle,
  isDetailView = false 
}) => {
  return (
    <CollapsibleDetailsSection
      title="Payment Security"
      details={PAYMENT_SECURITY_DETAILS}
      isExpanded={isExpanded}
      onToggle={onToggle}
      visibleCount={4}
      isDetailView={isDetailView}
      emptyMessage="No payment security details available"
    />
  );
});

PaymentSecuritySection.displayName = 'PaymentSecuritySection';
