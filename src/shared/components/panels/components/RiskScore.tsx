import React, { useState, useMemo, useCallback } from 'react';
import { SectionCard } from './SectionCard';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { getRiskBarColor, getRiskTextColor, RISK_SCORING } from '@shared/utils/risk';
import { AppStatusBadge } from '@shared/components/ui/status-badge/AppStatusBadge';
import type { RiskCheck, RiskScoreProps } from '@shared/types/risk.types';

interface RiskMeterProps {
  totalScore: number;
  maxScore: number;
}

const RiskMeter = React.memo(({ totalScore, maxScore }: RiskMeterProps) => {
  const barColor = getRiskBarColor(totalScore);
  const textColor = getRiskTextColor(totalScore);
  const percentage = Math.min((totalScore / maxScore) * 100, 100);
  const segmentPercentage = 100 / RISK_SCORING.SEGMENTS_COUNT;
  
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-baseline">
        <span className={`font-bold text-5xl leading-none ${textColor}`}>
          {totalScore}
        </span>
        <span className="font-medium text-sm text-card-foreground ml-1">/ {maxScore}</span>
      </div>
      <div className="flex gap-1" role="progressbar" aria-valuenow={totalScore} aria-valuemax={maxScore} aria-label={`Risk score: ${totalScore} out of ${maxScore}`}>
        {Array.from({ length: RISK_SCORING.SEGMENTS_COUNT }, (_, i) => (
          <div
            key={i}
            className={`w-1.5 h-9 rounded-full ${
              percentage >= (i + 1) * segmentPercentage ? barColor : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
});

RiskMeter.displayName = 'RiskMeter';

interface RiskCheckItemProps {
  check: RiskCheck;
  index: number;
  isExpanded: boolean;
  onToggle: (index: number) => void;
}

const RiskCheckItem = React.memo(({ 
  check, 
  index, 
  isExpanded, 
  onToggle 
}: RiskCheckItemProps) => {
  const hasDescription = Boolean(check.description?.trim());
  const riskColor = check.score >= 40 ? 'error' : check.score >= 30 ? 'warning' : 'success';

  const handleClick = useCallback(() => {
    if (hasDescription) onToggle(index);
  }, [hasDescription, onToggle, index]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && hasDescription) {
      e.preventDefault();
      onToggle(index);
    }
  }, [hasDescription, onToggle, index]);

  return (
    <div className="flex gap-3 py-2">
      <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
        <AppStatusBadge 
          variant="generic" 
          text={check.score.toString()}
          color={riskColor}
          size="sm"
        />
      </div>
      <div className="flex-1 min-w-0">
        {hasDescription ? (
          <button
            type="button"
            className="w-full text-left cursor-pointer hover:bg-muted/50 rounded px-2 -mx-2 py-1 -my-1 focus:outline-none"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${check.title}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-card-foreground text-sm leading-6">{check.title}</span>
              <div className="text-muted-foreground hover:text-card-foreground transition-colors shrink-0">
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
            </div>
          </button>
        ) : (
          <div className="px-2 -mx-2 py-1 -my-1">
            <span className="text-card-foreground text-sm leading-6">{check.title}</span>
          </div>
        )}
        {hasDescription && isExpanded && (
          <div className="text-muted-foreground text-sm mt-2 leading-relaxed px-2 -mx-2">
            {check.description}
          </div>
        )}
      </div>
    </div>
  );
});

RiskCheckItem.displayName = 'RiskCheckItem';

interface RiskChecksListProps {
  riskChecks: RiskCheck[];
  expandedItems: Set<number>;
  onToggle: (index: number) => void;
}

const RiskChecksList = React.memo(({ 
  riskChecks,
  expandedItems, 
  onToggle 
}: RiskChecksListProps) => (
  <div>
    {riskChecks.map((check, index) => (
      <RiskCheckItem
        key={`${check.title}-${index}`}
        check={check}
        index={index}
        isExpanded={expandedItems.has(index)}
        onToggle={onToggle}
      />
    ))}
  </div>
));

RiskChecksList.displayName = 'RiskChecksList';

const defaultCalculateScore = (checks: RiskCheck[], maxScore: number): number => {
  if (!checks || !Array.isArray(checks)) {
    return 0;
  }
  const errorChecks = checks.filter(check => check.status === 'error');
  return Math.min(
    Math.round(errorChecks.reduce((sum, check) => sum + check.score, 0) / 2),
    maxScore
  );
};
export const RiskScore = ({ 
  riskChecks,
  isDetailView = false,
  maxScore = 50,
  calculateScore
}: RiskScoreProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const totalScore = useMemo(() => {
    const checks = riskChecks || [];
    return calculateScore ? calculateScore(checks) : defaultCalculateScore(checks, maxScore);
  }, [calculateScore, riskChecks, maxScore]);

  const toggleItem = useCallback((index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const content = (
    <>
      <div className={isDetailView ? "shrink-0 mt-12" : "mb-4"}>
        <RiskMeter totalScore={totalScore} maxScore={maxScore} />
      </div>
      <div className={`flex flex-col gap-1 ${isDetailView ? 'flex-1' : ''}`}>
        <RiskChecksList riskChecks={riskChecks || []} expandedItems={expandedItems} onToggle={toggleItem} />
      </div>
    </>
  );

  return (
    <SectionCard 
      title="Risk score" 
      layout={isDetailView ? "detail" : "down"} 
      contentGap={isDetailView ? "gap-16" : undefined}
    >
      {isDetailView ? content : <div className="flex flex-col gap-4">{content}</div>}
    </SectionCard>
  );
};