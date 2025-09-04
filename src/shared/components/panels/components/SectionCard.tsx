import React from "react";
import { ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@shared/components/ui/card';
import { cn } from '@shared/lib/utils';
import { PANEL_SPACING } from '../constants/spacing';
import { PANEL_TEXT_STYLES } from '../constants/text-styles';

interface SectionCardProps {
  /** Section title displayed at the top or left */
  title: string;
  /** Main content of the section */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Layout mode: 'down' for stacked, 'detail' for detail view, 'two-column' for fixed left column */
  layout?: 'down' | 'detail' | 'two-column';
  /** Width of left column for two-column layout */
  leftColumnWidth?: string;
  /** Gap between title and content for detail layout */
  contentGap?: string;
  /** Whether the section can be collapsed */
  isCollapsible?: boolean;
  /** Whether the section is currently collapsed */
  isCollapsed?: boolean;
  /** Callback when title is clicked (for collapsible sections) */
  onTitleClick?: () => void;
}

export const SectionCard: React.FC<SectionCardProps> = ({ 
  title, 
  children, 
  className, 
  layout = 'down',
  leftColumnWidth = 'w-48',
  contentGap = 'gap-16',
  isCollapsible = false,
  isCollapsed = false,
  onTitleClick
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onTitleClick?.();
    }
  };

  const titleElement = isCollapsible ? (
    <div 
      className={`${PANEL_TEXT_STYLES.sectionTitle} flex items-center gap-2 cursor-pointer hover:text-gray-700 transition-colors`}
      onClick={onTitleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <span>{title}</span>
      <ChevronDown 
        className={cn(
          "size-3 text-gray-500 transition-transform duration-200",
          isCollapsed && "-rotate-90"
        )} 
      />
    </div>
  ) : (
    <div className={PANEL_TEXT_STYLES.sectionTitle}>
      {title}
    </div>
  );

  const cardContent = (() => {
    switch (layout) {
      case 'detail':
        return (
          <div className="flex flex-col gap-3">
            {titleElement}
            {!isCollapsed && (
              <div className={`flex items-start ${contentGap}`}>
                {children}
              </div>
            )}
          </div>
        );
      
      case 'two-column':
        return (
          <div className="flex">
            <div className={cn(leftColumnWidth, 'px-6 py-6 shrink-0')}>
              {titleElement}
            </div>
            <div className="flex-1 flex justify-center px-6 py-6">
              {children}
            </div>
          </div>
        );
      
      default: // 'down'
        return (
          <div className={`flex flex-col ${PANEL_SPACING.SECTION_CONTENT_GAP}`}>
            {titleElement}
            {!isCollapsed && children}
          </div>
        );
    }
  })();

  return (
    <Card className={cn(PANEL_SPACING.SECTION_BOTTOM_MARGIN, className)}>
      <CardContent className={layout === 'two-column' ? 'p-0' : PANEL_SPACING.CARD_CONTENT_PADDING}>
        {cardContent}
      </CardContent>
    </Card>
  );
};
