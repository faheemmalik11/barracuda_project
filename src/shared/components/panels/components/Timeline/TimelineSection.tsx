import React, { useState, useCallback, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { BaseTimelineItem } from './BaseTimelineItem';
import { getTimelineIcon } from './TimelineConfigs';
import type { BaseTimelineEvent } from './types';
import { Card, CardContent } from '@shared/components/ui/card';
import { SectionCard } from '../SectionCard';
import { cn } from '@shared/lib/utils';
import { PANEL_SPACING } from '../../constants/spacing';
import { PANEL_TEXT_STYLES } from '../../constants/text-styles';
import { TIMELINE_EVENTS_DATA } from '../../payments/constants/payment-data';

interface TimelineSectionProps {
  events?: BaseTimelineEvent[];
  isCollapsed?: boolean;
  onToggle?: () => void;
  className?: string;
  isDetailView?: boolean;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  events = [],
  isCollapsed = true,
  onToggle: _onToggle,
  className = '',
  isDetailView = false
}) => {
  const [isTimelineCollapsed, setIsTimelineCollapsed] = useState(isCollapsed);

  const handleToggleTimeline = useCallback(() => {
    setIsTimelineCollapsed(prev => !prev);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggleTimeline();
    }
  }, [handleToggleTimeline]);

  const defaultEvents = useMemo((): BaseTimelineEvent[] => {
    return TIMELINE_EVENTS_DATA.map(event => ({
      ...event,
      iconConfig: getTimelineIcon((event as any).iconType || 'default')
    }));
  }, []);

  const timelineEvents = events.length > 0 ? events : defaultEvents;
  
  const visibleEvents = isTimelineCollapsed ? [timelineEvents[0]] : timelineEvents;

  const timelineContent = (
    <div className="w-full max-w-2xl flex flex-col">
      {visibleEvents.map((event, index) => {
        const isLast = isTimelineCollapsed ? true : index === visibleEvents.length - 1;
        
        return (
          <BaseTimelineItem
            key={event.id || index}
            event={event}
            isLast={isLast}
            showLine={!isLast}
          />
        );
      })}
    </div>
  );

  if (!isDetailView) {
    return (
      <Card className={cn(PANEL_SPACING.SECTION_BOTTOM_MARGIN, className)}>
        <CardContent className={PANEL_SPACING.CARD_CONTENT_PADDING}>
          <div className={`flex flex-col ${PANEL_SPACING.SECTION_CONTENT_GAP}`}>
            <div 
              className="inline-flex items-center gap-2 cursor-pointer"
              onClick={handleToggleTimeline}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              aria-expanded={!isTimelineCollapsed}
              aria-label={`${isTimelineCollapsed ? 'Expand' : 'Collapse'} timeline`}
            >
              <span className={PANEL_TEXT_STYLES.sectionTitle}>Timeline</span>
              <ChevronDown 
                className={cn(
                  'size-3 text-gray-500 transition-transform duration-200',
                  isTimelineCollapsed ? '-rotate-90' : 'rotate-0'
                )} 
              />
            </div>
            
            {timelineContent}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <SectionCard
      title="Timeline"
      layout="two-column"
      leftColumnWidth="w-32"
      className={className}
      isCollapsible={true}
      isCollapsed={isTimelineCollapsed}
      onTitleClick={handleToggleTimeline}
    >
      {timelineContent}
    </SectionCard>
  );
};

TimelineSection.displayName = 'TimelineSection';