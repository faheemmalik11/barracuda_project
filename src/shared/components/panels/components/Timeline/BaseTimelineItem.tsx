import React, { useState, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@shared/lib/utils';
import { BaseTimelineEvent, TimelineIconConfig } from './types';
import { GPU_ACCELERATION_STYLES } from '@shared/lib/styles/sheet-styles';
import { PANEL_TEXT_STYLES } from '../../constants/text-styles';
const TimelineIcon: React.FC<{ config: TimelineIconConfig }> = ({ config }) => {
  const { icon: IconComponent, backgroundColor, iconColor, size = 'md' } = config;
  const sizeClasses = {
    sm: { container: 'size-6', icon: 'size-3' },
    md: { container: 'size-8', icon: 'size-4' },
    lg: { container: 'size-10', icon: 'size-5' }
  };
  const sizes = sizeClasses[size];
  
  return (
    <div
      className={cn('rounded-full flex items-center justify-center', sizes.container)}
      style={{ backgroundColor }}
    >
      <IconComponent className={sizes.icon} style={{ color: iconColor }} />
    </div>
  );
};

interface BaseTimelineItemProps {
  event: BaseTimelineEvent;
  isLast?: boolean;
  showLine?: boolean;
  renderContent?: (event: BaseTimelineEvent) => React.ReactNode;
  className?: string;
}

export const BaseTimelineItem: React.FC<BaseTimelineItemProps> = ({
  event,
  isLast = false,
  showLine = true,
  renderContent,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDetails = Boolean(event.details?.length);

  const handleToggle = useCallback(() => {
    if (hasDetails) {
      setIsExpanded(prev => !prev);
    }
  }, [hasDetails]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  }, [handleToggle]);

  const timelineLineHeight = isExpanded && hasDetails 
    ? `${88 + (event.details?.length || 0) * 32}px`
    : '72px';

  return (
    <div className={cn('flex gap-3', className)}>
      <div className="relative flex flex-col items-start shrink-0 pt-2">
        {event.iconConfig && <TimelineIcon config={event.iconConfig} />}
        {showLine && !isLast && (
          <div 
            className="absolute top-10 left-4 w-0.5 bg-gray-200" 
            style={{ height: timelineLineHeight }}
          />
        )}
      </div>

      <div className="flex-1 min-w-0 pb-6">
        {renderContent ? (
          renderContent(event)
        ) : (
          <>
            <div
              className={cn(
                'flex items-center justify-between py-1 px-3 rounded-lg transition-all duration-200',
                hasDetails && 'cursor-pointer hover:bg-gray-50',
                isExpanded && hasDetails && 'bg-muted'
              )}
              style={hasDetails ? GPU_ACCELERATION_STYLES.base : undefined}
              onClick={handleToggle}
              role={hasDetails ? 'button' : undefined}
              aria-expanded={hasDetails ? isExpanded : undefined}
              tabIndex={hasDetails ? 0 : undefined}
              onKeyDown={hasDetails ? handleKeyDown : undefined}
            >
              <div className="flex flex-col min-w-0 flex-1">
                <div className={PANEL_TEXT_STYLES.cardValue}>
                  {event.title}
                </div>
                <div className={cn(PANEL_TEXT_STYLES.label, "mt-0.5")}>
                  {event.timestamp}
                </div>
              </div>
              
              {hasDetails && (
                <div className="shrink-0 ml-2">
                  <ChevronRight 
                    className={cn(
                      'size-3 text-gray-500 transition-transform duration-200',
                      isExpanded ? 'rotate-90' : 'rotate-0'
                    )} 
                  />
                </div>
              )}
            </div>

            {hasDetails && isExpanded && (
              <div 
                className="mt-2 ml-3 space-y-2 transition-all duration-200 ease-out bg-muted rounded-lg p-3"
                style={GPU_ACCELERATION_STYLES.animated}
              >
                {event.details!.map((detail, detailIndex) => (
                  <div
                    key={`${event.id || event.title}-detail-${detailIndex}`}
                    className="flex items-center justify-between py-2"
                  >
                    <div className={PANEL_TEXT_STYLES.largeValue}>
                      {detail.action}
                    </div>
                    <div className={cn(PANEL_TEXT_STYLES.label, "ml-2 shrink-0")}>
                      {detail.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

BaseTimelineItem.displayName = 'BaseTimelineItem';