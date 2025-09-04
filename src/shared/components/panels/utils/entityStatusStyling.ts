import { useMemo } from 'react';
import { StatusRegistry } from '@shared/lib/filters/status-registry';
export const getVariantColors = (variant: string) => {
  const colorMap: Record<string, { bgColor: string; textColor: string }> = {
    success: { bgColor: 'bg-green-50', textColor: 'text-green-700' },
    error: { bgColor: 'bg-red-50', textColor: 'text-red-700' },
    warning: { bgColor: 'bg-yellow-50', textColor: 'text-yellow-700' },
    info: { bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
    neutral: { bgColor: 'bg-gray-50', textColor: 'text-gray-700' },
    pending: { bgColor: 'bg-orange-50', textColor: 'text-orange-700' }
  };
  
  return colorMap[variant] || colorMap.neutral;
};

export const useEntityStatusStyling = (entityType: string, status: string) => {
  return useMemo(() => {
    const statusOptions = StatusRegistry.getOptions(entityType as any);
    const statusOption = statusOptions.find(option => option.value === status);
    
    if (!statusOption) {
      return {
        ...getVariantColors('neutral'),
        label: status || 'Unknown'
      };
    }

    return {
      ...getVariantColors(statusOption.color || 'neutral'),
      label: statusOption.label
    };
  }, [entityType, status]);
};

