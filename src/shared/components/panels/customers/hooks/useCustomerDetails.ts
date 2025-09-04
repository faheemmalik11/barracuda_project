import { useState, useCallback } from 'react';

// Following exact pattern from payments/hooks/usePaymentDetails.ts
interface SectionStatesConfig {
  [key: string]: boolean;
}

export const useCustomerDetails = (initialStates: SectionStatesConfig) => {
  const [states, setStates] = useState<SectionStatesConfig>(initialStates);

  const toggleSection = useCallback((sectionKey: string) => {
    setStates(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  }, []);

  const isExpanded = useCallback((sectionKey: string) => {
    return Boolean(states[sectionKey]);
  }, [states]);

  const setSection = useCallback((sectionKey: string, value: boolean) => {
    setStates(prev => ({
      ...prev,
      [sectionKey]: value
    }));
  }, []);

  return {
    states,
    toggleSection,
    isExpanded,
    setSection
  };
};