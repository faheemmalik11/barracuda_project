import React, { useState, useCallback } from 'react';
import type { PanelState } from '../types/panel.types';

interface PanelStatesConfig {
  [panelId: string]: PanelState;
}

// Helper to create default panel state with sensible defaults
export const createDefaultPanelState = (overrides: Partial<PanelState> = {}): PanelState => ({
  isExpanded: false,
  isLoading: false,
  width: 480,
  position: 'right' as const,
  ...overrides
});

export const usePanelStates = (initialStates: PanelStatesConfig) => {
  // Ensure all panel states have default values
  const normalizedInitialStates = React.useMemo(() => {
    const normalized: PanelStatesConfig = {};
    Object.keys(initialStates).forEach(panelId => {
      normalized[panelId] = createDefaultPanelState(initialStates[panelId]);
    });
    return normalized;
  }, [initialStates]);

  const [states, setStates] = useState<PanelStatesConfig>(normalizedInitialStates);

  const togglePanel = useCallback((panelId: string) => {
    setStates(prev => ({
      ...prev,
      [panelId]: {
        ...prev[panelId],
        isExpanded: !prev[panelId]?.isExpanded
      }
    }));
  }, []);

  const setPanelExpanded = useCallback((panelId: string, isExpanded: boolean) => {
    setStates(prev => ({
      ...prev,
      [panelId]: {
        ...prev[panelId],
        isExpanded
      }
    }));
  }, []);

  const setPanelLoading = useCallback((panelId: string, isLoading: boolean) => {
    setStates(prev => ({
      ...prev,
      [panelId]: {
        ...prev[panelId],
        isLoading
      }
    }));
  }, []);

  // Width management
  const setPanelWidth = useCallback((panelId: string, width: number) => {
    setStates(prev => ({
      ...prev,
      [panelId]: {
        ...prev[panelId],
        width
      }
    }));
  }, []);

  const isPanelExpanded = useCallback((panelId: string) => {
    return Boolean(states[panelId]?.isExpanded);
  }, [states]);

  const isPanelLoading = useCallback((panelId: string) => {
    return Boolean(states[panelId]?.isLoading);
  }, [states]);

  const getPanelWidth = useCallback((panelId: string) => {
    return states[panelId]?.width ?? 480;
  }, [states]);


  // Resize state tracking
  const [resizingPanelId, setResizingPanelId] = useState<string | null>(null);

  const setPanelResizing = useCallback((panelId: string, isResizing: boolean) => {
    if (isResizing) {
      setResizingPanelId(panelId);
    } else {
      setResizingPanelId(null);
    }
  }, []);

  const isPanelResizing = useCallback((panelId: string) => {
    return resizingPanelId === panelId;
  }, [resizingPanelId]);

  return {
    states,
    togglePanel,
    setPanelExpanded,
    setPanelLoading,
    setPanelWidth,
    getPanelWidth,
    setPanelResizing,
    isPanelExpanded,
    isPanelLoading,
    isPanelResizing
  };
};