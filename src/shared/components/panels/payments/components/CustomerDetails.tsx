import React from 'react';
import { CollapsibleDetailsSection } from '../../components/CollapsibleDetailsSection';
import { CUSTOMER_DETAILS } from '../constants/payment-data';

interface CustomerDetailsProps {
  isExpanded: boolean;
  onToggle: () => void;
  isDetailView?: boolean;
}

export const CustomerDetails = React.memo<CustomerDetailsProps>(({ 
  isExpanded, 
  onToggle,
  isDetailView = false 
}) => {
  return (
    <CollapsibleDetailsSection
      title="Customer details"
      details={CUSTOMER_DETAILS}
      isExpanded={isExpanded}
      onToggle={onToggle}
      visibleCount={6}
      isDetailView={isDetailView}
      emptyMessage="No customer details available"
    />
  );
});

CustomerDetails.displayName = 'CustomerDetails';
