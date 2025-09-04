import React, { useState, useCallback } from 'react';
import { DollarSign, Settings } from 'lucide-react';
import { Card, CardContent } from '@shared/components/ui/card';
import { Button } from '@shared/components/ui/button';
import { INVOICE_BALANCE_DATA } from '../constants/customer-data';

const formatCurrency = (amount: number): string => {
  return `$${Math.abs(amount).toFixed(2)}`;
};

const generateRandomBalance = (): number => {
  const randomBalance = (Math.random() - 0.5) * 1000;
  return Math.round(randomBalance * 100) / 100;
};

export const InvoiceBalanceSection = React.memo(() => {
  const [balance, setBalance] = useState<number>(INVOICE_BALANCE_DATA.availableAmount);

  const handleAdjustBalance = useCallback(() => {
    setBalance(generateRandomBalance());
  }, []);

  const isNegative = balance < 0;
  const balanceColorClass = isNegative ? 'text-red-600' : 'text-green-600';
  const iconColorClass = isNegative ? 'text-red-600' : 'text-green-600';
  const iconBgColorClass = isNegative ? 'bg-red-100' : 'bg-green-100';

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Header with title and button aligned */}
          <div className="flex items-center justify-between w-full">
            <h3 className="text-base font-semibold text-card-foreground leading-6">
              Invoice Balance
            </h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 px-2 text-xs rounded-lg"
              onClick={handleAdjustBalance}
              aria-label="Adjust invoice balance"
            >
              <Settings className="w-3 h-3" />
              Adjust balance
            </Button>
          </div>

          {/* Balance display content */}
          <div className="flex items-center gap-8">
            <div className={`flex-shrink-0 w-12 h-12 ${iconBgColorClass} rounded-lg flex items-center justify-center`}>
              <DollarSign className={`w-6 h-6 ${iconColorClass}`} />
            </div>
            
            <div className="flex-1">
              <div className="mb-2">
                <span className="text-card-foreground text-base font-semibold mr-2">
                  Available:
                </span>
                <span className={`font-bold text-xl ${balanceColorClass}`}>
                  {isNegative ? '-' : ''}{formatCurrency(balance)}
                </span>
              </div>
              
              <p className="text-muted-foreground text-xs mb-3">
                {INVOICE_BALANCE_DATA.description}
              </p>
              
              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <div>
                  <span className="font-medium">Last updated:</span> {INVOICE_BALANCE_DATA.lastUpdated}
                </div>
                <div>
                  <span className="font-medium">Next invoice:</span> {INVOICE_BALANCE_DATA.nextInvoice}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

InvoiceBalanceSection.displayName = 'InvoiceBalanceSection';