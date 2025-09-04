import { Copy, Check, ChevronUp, ChevronDown, ChevronLeft, Maximize2, type LucideIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '@shared/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@shared/components/ui/tooltip';
import { cn } from '@shared/lib/utils';
import { PANEL_SPACING } from '../../../constants/spacing';
import { useClipboard } from '@shared/hooks/useClipboard';
import { createEntityUrl } from '@shared/utils';

const NAVIGATION_TRANSITION = 'transition-all duration-150';

const ENTITY_CONFIG = {
  customer: { display: 'customer', url: 'customers' },
  payment: { display: 'payment', url: 'payments' },
  order: { display: 'order', url: 'orders' },
  merchant: { display: 'merchant', url: 'merchants' }
} as const;

const getEntityConfig = (entityType: string) => {
  return ENTITY_CONFIG[entityType as keyof typeof ENTITY_CONFIG] || {
    display: 'item',
    url: entityType
  };
};

interface NavigationButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel: string;
  tooltip: string;
}

function NavigationButton({ 
  icon: Icon, 
  onClick, 
  disabled, 
  ariaLabel, 
  tooltip 
}: NavigationButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={onClick}
          disabled={disabled}
          aria-label={ariaLabel}
          className={cn("h-5 w-5 p-0", NAVIGATION_TRANSITION)}
        >
          <Icon className="!h-3 !w-3" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
}

interface NavigationHeaderProps {
  onBack?: () => void;
  currentEntityId: string;
  entityType: string;
  onOpenFullDetails?: () => void;
  isDetailView?: boolean;
  totalItems: number;
  navigatePrevious?: () => void;
  navigateNext?: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
}

export function NavigationHeader({
  onBack,
  currentEntityId,
  entityType,
  onOpenFullDetails,
  isDetailView = false,
  totalItems,
  navigatePrevious,
  navigateNext,
  canGoPrevious = false,
  canGoNext = false
}: NavigationHeaderProps) {
  const entityConfig = useMemo(() => getEntityConfig(entityType), [entityType]);
  const fullUrl = useMemo(() => createEntityUrl(entityConfig.url, currentEntityId), [entityConfig.url, currentEntityId]);
  const clipboard = useClipboard(fullUrl);

  return (
    <div className={cn("h-14 flex items-center justify-between px-4 py-2")}>
      <div className={cn("flex items-center", PANEL_SPACING.NAV_ITEM_GAP)}>
        <div className={cn("flex", PANEL_SPACING.NAV_ITEM_GAP)}>
          <NavigationButton
            icon={ChevronLeft}
            onClick={onBack}
            ariaLabel="Back"
            tooltip="Back"
          />
          
          {onOpenFullDetails && !isDetailView && (
            <NavigationButton
              icon={Maximize2}
              onClick={onOpenFullDetails}
              ariaLabel="Open full details"
              tooltip="Open full details"
            />
          )}
        </div>
        
        {totalItems > 1 && (
          <div className={cn("flex items-center", PANEL_SPACING.NAV_ITEM_GAP)}>
            <NavigationButton
              icon={ChevronUp}
              onClick={navigatePrevious}
              disabled={!canGoPrevious || !navigatePrevious}
              ariaLabel={`Previous ${entityConfig.display}`}
              tooltip={`Previous ${entityConfig.display}`}
            />
            
            <NavigationButton
              icon={ChevronDown}
              onClick={navigateNext}
              disabled={!canGoNext || !navigateNext}
              ariaLabel={`Next ${entityConfig.display}`}
              tooltip={`Next ${entityConfig.display}`}
            />
          </div>
        )}
      </div>

      <div className={cn("flex items-center gap-4")}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={clipboard.copy}
              aria-label={`Copy ${entityConfig.display} URL`}
              className={cn(
                "h-auto px-2 py-1 gap-1.5",
                NAVIGATION_TRANSITION,
                clipboard.copied && "bg-accent hover:bg-accent/80"
              )}
            >
              {clipboard.copied ? (
                <Check className="!h-3 !w-3 text-green-600" />
              ) : (
                <Copy className="!h-3 !w-3 text-muted-foreground" />
              )}
              <span className={cn(
                "text-xs",
                clipboard.copied ? "text-green-600" : "text-muted-foreground"
              )}>
                {clipboard.copied ? 'Copied!' : 'Copy URL'}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {clipboard.copied ? `${entityConfig.display.charAt(0).toUpperCase() + entityConfig.display.slice(1)} URL copied to clipboard!` : `Click to copy ${entityConfig.display} URL`}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
