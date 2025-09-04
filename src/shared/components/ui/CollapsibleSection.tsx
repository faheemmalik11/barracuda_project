import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';
import { Button } from './button';
import { Z_INDEX_CLASSES } from '@shared/lib/z-index';
import { PANEL_SPACING } from '@shared/components/panels/constants/spacing';
import { PANEL_TEXT_STYLES } from '@shared/components/panels/constants/text-styles';

interface ActionItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  actions?: ActionItem[];
  isDetailView?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
  showCollapse?: boolean;
}

export const CollapsibleSection = React.memo<CollapsibleSectionProps>(({ 
  title, 
  children, 
  className = "",
  actions,
  isDetailView = false
}) => {
  // Side-by-side layout for detail view
  if (isDetailView) {
    return (
      <div className={`bg-white rounded-lg overflow-hidden ${PANEL_SPACING.SECTION_BOTTOM_MARGIN} shadow-sm ${className}`}>
        <div className="flex relative">
          {/* Title column on the left */}
          <div className="w-80 shrink-0 pl-8 pr-16 py-8">
            <div className={PANEL_TEXT_STYLES.sectionTitle}>
              {title}
            </div>
          </div>
          {/* Content column centered with max width */}
          <div className="flex-1 max-w-xl pt-16 pb-8 pr-8">
            {children}
          </div>
          {/* Actions menu positioned absolutely if needed */}
          {actions && actions.length > 0 && (
            <div className={`absolute top-4 right-6 ${Z_INDEX_CLASSES.BASE}`}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-muted"
                  >
                    <MoreHorizontal className="h-2.5 w-2.5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  {actions.map((action, index) => (
                    <DropdownMenuItem
                      key={`action-${index}`}
                      onClick={action.onClick}
                      className="cursor-pointer text-[11px] py-1 px-2"
                    >
                      {action.icon && <span className="mr-1.5">{action.icon}</span>}
                      {action.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Original vertical layout for non-detail view
  return (
    <div className={`bg-white rounded-lg overflow-hidden ${PANEL_SPACING.SECTION_BOTTOM_MARGIN} shadow-sm ${className}`}>
      {/* Header with title and actions */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className={PANEL_TEXT_STYLES.sectionTitle}>
          {title}
        </div>
        {/* Actions menu */}
        {actions && actions.length > 0 && (
          <div className={Z_INDEX_CLASSES.BASE}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-gray-100"
                >
                  <MoreHorizontal className="h-2.5 w-2.5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {actions.map((action, index) => (
                  <DropdownMenuItem
                    key={`action-${index}`}
                    onClick={action.onClick}
                    className="cursor-pointer text-[11px] py-1 px-2"
                  >
                    {action.icon && <span className="mr-1.5">{action.icon}</span>}
                    {action.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      {/* Content area */}
      <div className="px-6 py-4">
        {children}
      </div>
    </div>
  );
});

CollapsibleSection.displayName = 'CollapsibleSection';
