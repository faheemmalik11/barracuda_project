import React, { useState, useMemo, useCallback } from 'react';
import { CollapsibleSection } from '@shared/components/ui';
import { ShowMoreButton } from '@shared/components/ui';
import { DetailsList } from './DetailsList';
import { PANEL_TEXT_STYLES } from '../constants/text-styles';
import type { PaymentDetail } from '../types/payment-details.types';
import { PANEL_SPACING } from '../constants/spacing';
import { GPU_ACCELERATION_STYLES } from '@shared/lib/styles/sheet-styles';

interface CollapsibleDetailsSectionProps {
  title: string;
  details: PaymentDetail[];
  isExpanded: boolean;
  onToggle: () => void;
  visibleCount?: number;
  isDetailView?: boolean;
  showCollapse?: boolean;
  className?: string;
  emptyMessage?: string;
  // Custom filtering function for advanced logic (like FeesSection)
  customFilter?: (details: PaymentDetail[]) => { visible: PaymentDetail[]; hidden: PaymentDetail[] };
  // Special renderer for custom components (like NetSettlementEurRow)
  specialRenderer?: (detail: PaymentDetail, index: number, isLast: boolean) => React.ReactNode;
}

export const CollapsibleDetailsSection = React.memo<CollapsibleDetailsSectionProps>(({ 
  title,
  details,
  isExpanded, 
  onToggle,
  visibleCount = 4,
  isDetailView = false,
  showCollapse = false,
  className = "",
  emptyMessage = `No ${title.toLowerCase()} available`,
  customFilter,
  specialRenderer
}) => {
  const [showAllDetails, setShowAllDetails] = useState(false);

  // Memoize the split details to avoid recalculation on each render
  const { visibleDetails, hiddenDetails } = useMemo(() => {
    // Use custom filter if provided (for complex logic like FeesSection)
    if (customFilter) {
      const filtered = customFilter(details);
      return { visibleDetails: filtered.visible, hiddenDetails: filtered.hidden };
    }
    
    // Default behavior: split by count
    const visible = details.slice(0, visibleCount);
    const hidden = details.slice(visibleCount);
    
    return { visibleDetails: visible, hiddenDetails: hidden };
  }, [details, visibleCount, customFilter]);

  // Memoize the toggle handler to prevent unnecessary re-renders
  const handleToggleAllDetails = useCallback(() => {
    setShowAllDetails(prev => !prev);
  }, []);

  // Early return if no details data
  if (!details || details.length === 0) {
    return (
      <CollapsibleSection
        title={title}
        isExpanded={isExpanded}
        onToggle={onToggle}
        showCollapse={showCollapse}
        className={className}
        isDetailView={isDetailView}
      >
        <div className={PANEL_TEXT_STYLES.label}>{emptyMessage}</div>
      </CollapsibleSection>
    );
  }

  return (
    <CollapsibleSection
      title={title}
      isExpanded={isExpanded}
      onToggle={onToggle}
      showCollapse={showCollapse}
      className={className}
      isDetailView={isDetailView}
    >
      <div className="flex flex-col">
        {/* Always visible details */}
        {visibleDetails.length > 0 && (
          <DetailsList 
            details={visibleDetails} 
            isDetailView={isDetailView}
            specialRenderer={specialRenderer}
          />
        )}

        {/* Extra space after visible items */}
        {hiddenDetails.length > 0 && <div className={PANEL_SPACING.SECTION_SEPARATOR_HEIGHT} />}

        {/* Conditionally rendered hidden details with transform-based animation */}
        {(showAllDetails || isDetailView) && hiddenDetails.length > 0 && (
          <div 
            className="transition-all duration-200 ease-out"
            style={GPU_ACCELERATION_STYLES.animated}
          >
            <DetailsList 
              details={hiddenDetails} 
              isDetailView={isDetailView}
              specialRenderer={specialRenderer}
            />
          </div>
        )}

        {/* Toggle button - only show if there are hidden details and not in detail view */}
        {hiddenDetails.length > 0 && !isDetailView && (
          <div className="flex justify-start pt-3 pb-1">
            <ShowMoreButton
              isExpanded={showAllDetails}
              onToggle={handleToggleAllDetails}
              ariaLabel={showAllDetails ? `Show less ${title.toLowerCase()}` : `Show more ${title.toLowerCase()}`}
            />
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
});

CollapsibleDetailsSection.displayName = 'CollapsibleDetailsSection';