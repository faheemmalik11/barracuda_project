import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { AppStatusBadge } from '@shared/components/ui/status-badge/AppStatusBadge';
import { cn } from '@shared/lib/utils';
import { PANEL_TEXT_STYLES } from '../../constants/text-styles';
import { PANEL_SPACING } from '../../constants/spacing';
import { PaymentMethodIcon } from './PaymentMethodIcon';
import { PaymentMethodActions } from './PaymentMethodActions';
import { DetailsList } from '../DetailsList';
import { PAYMENT_METHOD_ACTIONS } from './constants';
import type { PaymentMethodCardProps } from './types';

export const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  method,
  isExpanded,
  onToggle,
  onAction
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  const getStatusBadge = () => {
    if (!method.status) return null;

    return (
      <AppStatusBadge 
        entityType="payment"
        status={method.status}
        size="sm"
      />
    );
  };

  return (
    <div className="rounded-md">
      <div 
        className={cn(
          "flex items-center justify-between cursor-pointer py-2 px-3 transition-colors hover:bg-muted",
          isExpanded ? "rounded-t-md" : "rounded-md"
        )}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
      >
        <div className={cn("flex items-center flex-1 min-w-0", PANEL_SPACING.FLEX_GAP_SMALL)}>
          {/* Expand/Collapse Chevron */}
          <div className="text-muted-foreground shrink-0">
            {isExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </div>

          {/* Payment Method Icon */}
          <div className="shrink-0">
            <PaymentMethodIcon type={method.type} />
          </div>
          
          {/* Card Info */}
          <div className={`flex items-center flex-1 min-w-0 ${PANEL_SPACING.FLEX_GAP_MEDIUM}`}>
            <span className={PANEL_TEXT_STYLES.cardValue}>
              {method.type === 'usd-cash' ? 'USD Cash Balance' : method.maskedNumber}
            </span>
            {getStatusBadge()}
          </div>
        </div>

        {/* Right Side */}
        <div className={cn("flex items-center shrink-0", PANEL_SPACING.FLEX_GAP_SMALL)}>
          {method.expirationDate && (
            <span className={PANEL_TEXT_STYLES.mutedValue}>
              {method.type === 'usd-cash' ? '$0.00 USD' : method.expirationDate}
            </span>
          )}

          {/* Actions Menu */}
          <PaymentMethodActions 
            actions={PAYMENT_METHOD_ACTIONS}
            onAction={onAction}
          />
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && method.details.length > 0 && (
        <div className="bg-muted border-t pt-4 px-6 pb-4 rounded-b-md">
          <div className="max-w-2xl mx-auto">
            <DetailsList 
              details={method.details}
              isDetailView={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};