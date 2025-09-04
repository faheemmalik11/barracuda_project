import React from 'react';
import { CollapsibleDetailsSection } from '../../components/CollapsibleDetailsSection';
import { TAX_CALCULATION_DETAILS } from '../constants/payment-data';

interface AutomaticTaxCalculationProps {
  isExpanded: boolean;
  onToggle: () => void;
  isDetailView?: boolean;
}

export const AutomaticTaxCalculation = React.memo<AutomaticTaxCalculationProps>(({ 
  isExpanded, 
  onToggle,
  isDetailView = false 
}) => {
  return (
    <CollapsibleDetailsSection
      title="Automatic Tax Calculation"
      details={TAX_CALCULATION_DETAILS}
      isExpanded={isExpanded}
      onToggle={onToggle}
      visibleCount={4}
      isDetailView={isDetailView}
      emptyMessage="No tax calculation details available"
    />
  );
});

AutomaticTaxCalculation.displayName = 'AutomaticTaxCalculation';
