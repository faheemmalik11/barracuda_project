import React from 'react';
import { SectionCard } from '../../components/SectionCard';
import { PanelTable } from '../../components/PanelTable';
import { AppStatusBadge } from '@shared/components/ui/status-badge/AppStatusBadge';
import { getRiskConfig } from '@shared/utils/risk';
import type { PanelTableColumn } from '../../components/PanelTable/types';
import { TRANSACTION_DATA, type TransactionData } from '../constants/customer-data';

interface TransactionsSectionProps {
  isDetailView?: boolean;
}

const renderRisk = (value: unknown) => {
  const riskValue = typeof value === 'number' ? value : 0;
  return (
    <span 
      className={`inline-flex items-center justify-center w-5 h-5 rounded-sm text-xs font-medium border ${getRiskConfig(riskValue).colorClasses}`}
      title={getRiskConfig(riskValue).label}
    >
      {riskValue}
    </span>
  );
};

const renderType = (_: unknown, item: TransactionData) => {
  const statusMap: Record<string, string> = {
    'payment': 'succeeded',
    'refund': 'refunded', 
    'chargeback': 'disputed'
  };
  
  const status = statusMap[item.type.toLowerCase()] || item.type.toLowerCase();
  
  return (
    <div className="whitespace-nowrap">
      <AppStatusBadge 
        entityType="payment" 
        status={status}
        size="sm"
      />
    </div>
  );
};

const renderAmount = (value: unknown) => {
  const amount = typeof value === 'string' ? value : '$0.00';
  const isNegative = amount.startsWith('-');
  return (
    <span className={`font-medium ${isNegative ? 'text-red-600' : 'text-foreground'}`}>
      {amount}
    </span>
  );
};

export const TransactionsSection = React.memo<TransactionsSectionProps>(({ isDetailView = false }) => {
  const columns: PanelTableColumn<TransactionData>[] = [
    {
      key: 'risk',
      label: 'RISK',
      width: '8%',
      render: renderRisk
    },
    {
      key: 'transactionId',
      label: 'TRANSACTION ID',
      width: '18%',
      cellClassName: 'font-medium'
    },
    {
      key: 'type',
      label: 'TYPE',
      width: '12%',
      render: renderType
    },
    {
      key: 'amount',
      label: 'AMOUNT',
      width: '14%',
      render: renderAmount
    },
    {
      key: 'paymentMethod',
      label: 'PAYMENT METHOD',
      width: '20%'
    },
    {
      key: 'customer',
      label: 'CUSTOMER',
      width: '16%'
    },
    {
      key: 'date',
      label: 'DATE',
      width: '12%',
      cellClassName: 'whitespace-nowrap'
    }
  ];

  const rowActions = (item: TransactionData) => [
    {
      key: 'view-details',
      label: 'View details',
      onClick: () => console.log('View details', item)
    },
    {
      key: 'download-receipt',
      label: 'Download receipt',
      onClick: () => console.log('Download receipt', item)
    },
    {
      key: 'process-refund',
      label: 'Process refund',
      onClick: () => console.log('Process refund', item)
    },
    {
      key: 'dispute-transaction',
      label: 'Dispute transaction',
      onClick: () => console.log('Dispute transaction', item)
    },
    {
      key: 'export-data',
      label: 'Export data',
      onClick: () => console.log('Export data', item)
    },
    {
      key: 'mark-fraud',
      label: 'Mark as fraud',
      onClick: () => console.log('Mark as fraud', item)
    }
  ];

  return (
    <SectionCard title="Transactions" layout="down">
      <PanelTable
        data={TRANSACTION_DATA}
        columns={columns}
        variant={isDetailView ? 'full' : 'panel'}
        emptyMessage="No transactions found"
        pageSize={5}
        rowActions={rowActions}
      />
    </SectionCard>
  );
});

TransactionsSection.displayName = 'TransactionsSection';