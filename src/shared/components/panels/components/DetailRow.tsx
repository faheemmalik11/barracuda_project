import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { AppStatusBadge } from '@shared/components/ui/status-badge/AppStatusBadge';
import { useResponsive } from '@shared/components/layout/ResponsiveContainer';
import { PANEL_SPACING } from '../constants/spacing';
import { PANEL_TEXT_STYLES } from '../constants/text-styles';

interface DetailRowProps {
  label: string;
  value: string;
  subValue?: string;
  isDetailView?: boolean;
  showBadge?: boolean;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  isCopyable?: boolean;
}

export const DetailRow = React.memo<DetailRowProps>(({ 
  label, 
  value, 
  subValue, 
  isDetailView = false, 
  showBadge = false, 
  badgeVariant = 'secondary',
  isCopyable = false
}) => {
  const { isCompact, isTight } = useResponsive();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const renderValue = (text: string) => {
    if (!text.includes('✓')) return text
    
    const cleanedText = text.replace(/✓\s?/g, '')
    return (
      <span className={`inline-flex items-center ${PANEL_SPACING.FLEX_GAP_SMALL}`}>
        <Check className="h-3 w-3 text-success flex-shrink-0" />
        <span>{cleanedText}</span>
      </span>
    )
  }

  const getBadgeColor = () => {
    if (badgeVariant === 'destructive') return 'error'
    if (badgeVariant === 'secondary') return 'neutral' 
    return 'info'
  }

  const renderContent = () => {
    const content = showBadge ? (
      <AppStatusBadge 
        variant="generic" 
        text={value}
        color={getBadgeColor()}
      />
    ) : (
      <>
        <span>{renderValue(value)}</span>
        {subValue && (
          <>
            <br />
            <span className={PANEL_TEXT_STYLES.mutedValue}>{renderValue(subValue)}</span>
          </>
        )}
      </>
    )

    if (!isCopyable) return content

    return (
      <button
        onClick={handleCopy}
        className={`inline-flex items-center ${PANEL_SPACING.FLEX_GAP_SMALL}`}
        title="Click to copy"
      >
        <span className="text-primary">{content}</span>
        <span className="text-primary">
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </span>
      </button>
    )
  }

  if (isDetailView) {
    const labelWidth = isCompact ? 'w-[120px]' : isTight ? 'w-[150px]' : 'w-[200px]'
    return (
      <div className={`flex items-start ${PANEL_SPACING.DETAIL_ROW_PADDING} w-full`}>
        <div className={`shrink-0 ${labelWidth}`}>
          <p className={PANEL_TEXT_STYLES.label}>{label}</p>
        </div>
        <div className="flex-1">
          <div className={PANEL_TEXT_STYLES.value}>{renderContent()}</div>
        </div>
      </div>
    )
  }

  if (isCompact) {
    return (
      <div className={`flex flex-col ${PANEL_SPACING.DETAIL_ROW_PADDING}`}>
        <p className={PANEL_TEXT_STYLES.label}>{label}</p>
        <div className={PANEL_TEXT_STYLES.value}>{renderContent()}</div>
      </div>
    )
  }

  return (
    <div className={`flex justify-between items-start ${PANEL_SPACING.DETAIL_ROW_PADDING}`}>
      <p className={`${PANEL_TEXT_STYLES.label} min-w-0 pr-4`}>{label}</p>
      <div className={`${PANEL_TEXT_STYLES.value} text-right min-w-0 flex-shrink-0`}>
        {renderContent()}
      </div>
    </div>
  )
});

DetailRow.displayName = 'DetailRow';
