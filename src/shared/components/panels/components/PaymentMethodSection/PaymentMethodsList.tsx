import React, { useState } from 'react';
import { PaymentMethodCard } from './PaymentMethodCard';
import type { PaymentMethodItem } from './types';

interface PaymentMethodsListProps {
  methods: PaymentMethodItem[];
  onAction: (methodId: string, action: string) => void;
}

export const PaymentMethodsList: React.FC<PaymentMethodsListProps> = ({
  methods,
  onAction
}) => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const handleToggle = (methodId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(methodId)) {
        newSet.delete(methodId);
      } else {
        newSet.add(methodId);
      }
      return newSet;
    });
  };

  const handleAction = (methodId: string) => (action: string) => {
    onAction(methodId, action);
  };

  if (methods.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No payment methods available
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {methods.map((method) => (
        <PaymentMethodCard
          key={method.id}
          method={method}
          isExpanded={expandedCards.has(method.id)}
          onToggle={() => handleToggle(method.id)}
          onAction={handleAction(method.id)}
        />
      ))}
    </div>
  );
};