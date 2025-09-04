import React from 'react';
import { SectionCard } from '../SectionCard';
import { PaymentMethodsList } from './PaymentMethodsList';
import { PAYMENT_METHODS_DATA } from './constants';
import type { PaymentMethodSectionProps } from './types';

export const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({
  methods = PAYMENT_METHODS_DATA,
  className
}) => {
  const handleAction = (methodId: string, action: string) => {
    // Handle payment method actions here
    // This could be passed as a prop in the future for more flexibility
  };

  return (
    <SectionCard 
      title="Payment methods" 
      layout="down"
      className={className}
    >
      <PaymentMethodsList 
        methods={methods}
        onAction={handleAction}
      />
    </SectionCard>
  );
};