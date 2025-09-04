import React, { useMemo } from 'react';
import { CollapsibleDetailsSection, DetailRow } from '../../components';
import { FEES_DETAILS } from '../constants/payment-data';
import type { PaymentDetail } from '../../types/payment-details.types';

// Constants for better maintainability
const ALWAYS_HIDDEN_FEE_LABELS = ['Acquirer fee', 'Scheme fees', 'Interchange', 'Adjustments'];

// Helper function to check if a fee value represents zero
const isZeroValue = (value: string): boolean => {
  // Remove currency symbols and whitespace, then check for zero values
  const cleanValue = value.replace(/[A-Z]{3}|\s|€|£|¥|\$|,/g, '').trim();

  // Check for various zero formats: 0, 0.0, 0.00, etc.
  const numericValue = parseFloat(cleanValue);
  return numericValue === 0 || (cleanValue === '' || cleanValue === '0');
};


interface FeesSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
  isDetailView?: boolean;
}

export const FeesSection = React.memo<FeesSectionProps>(({ isExpanded, onToggle, isDetailView = false }) => {
  // Custom filter function for fees logic
  const customFeesFilter = useMemo(() => {
    return (details: PaymentDetail[]) => {
      // First filter out zero-value fees
      const nonZeroFees = details.filter(fee => !isZeroValue(fee.value));

      // Split fees into visible and hidden, ensuring certain fees are always hidden
      const visible: PaymentDetail[] = [];
      const hidden: PaymentDetail[] = [];

      nonZeroFees.forEach(fee => {
        if (ALWAYS_HIDDEN_FEE_LABELS.includes(fee.label)) {
          // These fees are always hidden
          hidden.push(fee);
        } else {
          // All other non-zero fees are visible
          visible.push(fee);
        }
      });

      return { visible, hidden };
    };
  }, []);

  // Special renderer for Net settlement amount (EUR)
  const feesSpecialRenderer = useMemo(() => {
    return (detail: PaymentDetail) => {
      if (detail.label === 'Net settlement amount (EUR)') {
        // Parse the value to extract amount and conversion info
        // Format: "1,519.20 (1USD = 0.92) EUR"
        const parts = detail.value.match(/^([\d,.\s]+)\s*\((.*?)\)\s*(\w+)$/);
        const mainValue = parts ? `${parts[3]} ${parts[1].trim()}` : detail.value;
        const conversionInfo = parts ? parts[2] : undefined;
        
        // Return JSX for DetailsList to render directly
        return (
          <DetailRow 
            label="Net settlement amount"
            value={mainValue}
            subValue={conversionInfo}
            isDetailView={isDetailView}
          />
        );
      }
      return null;
    };
  }, [isDetailView]);

  return (
    <CollapsibleDetailsSection
      title="Fees"
      details={FEES_DETAILS}
      isExpanded={isExpanded}
      onToggle={onToggle}
      isDetailView={isDetailView}
      emptyMessage="No fee details available"
      customFilter={customFeesFilter}
      specialRenderer={feesSpecialRenderer}
    />
  );
});

FeesSection.displayName = 'FeesSection';
