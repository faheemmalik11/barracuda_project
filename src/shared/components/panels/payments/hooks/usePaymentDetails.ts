import { useState, useCallback } from 'react';

interface SectionStatesConfig {
  [key: string]: boolean;
}

export const usePaymentDetails = (initialStates: SectionStatesConfig) => {
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
