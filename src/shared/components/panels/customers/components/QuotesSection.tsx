import React from 'react';
import { SectionCard } from '../../components/SectionCard';
import { PanelTable } from '../../components/PanelTable';
import { AppStatusBadge } from '@shared/components/ui/status-badge/AppStatusBadge';
import type { PanelTableColumn } from '../../components/PanelTable/types';
import { QUOTE_DATA, type QuoteData } from '../constants/customer-data';

interface QuotesSectionProps {
  isDetailView?: boolean;
}

const renderAmount = (value: unknown) => {
  const amount = typeof value === 'string' ? value : '$0.00';
  return (
    <span className="font-medium">
      {amount}
    </span>
  );
};

const renderStatus = (_: unknown, item: QuoteData) => (
  <div className="whitespace-nowrap">
    <AppStatusBadge 
      entityType="quote" 
      status={item.status}
      size="sm"
    />
  </div>
);

export const QuotesSection = React.memo<QuotesSectionProps>(({ isDetailView = false }) => {
  const columns: PanelTableColumn<QuoteData>[] = [
    {
      key: 'amount',
      label: 'AMOUNT',
      width: '15%',
      render: renderAmount
    },
    {
      key: 'status',
      label: 'STATUS',
      width: '12%',
      render: renderStatus
    },
    {
      key: 'quoteNumber',
      label: 'QUOTE #',
      width: '18%',
      cellClassName: 'font-medium'
    },
    {
      key: 'customer',
      label: 'CUSTOMER',
      width: '20%'
    },
    {
      key: 'expiration',
      label: 'EXPIRATION',
      width: '17%',
      cellClassName: 'whitespace-nowrap'
    },
    {
      key: 'created',
      label: 'CREATED',
      width: '18%',
      cellClassName: 'whitespace-nowrap'
    }
  ];

  const rowActions = (item: QuoteData) => [
    {
      key: 'view-quote',
      label: 'View quote',
      onClick: () => console.log('View quote', item)
    },
    {
      key: 'duplicate-quote',
      label: 'Duplicate quote',
      onClick: () => console.log('Duplicate quote', item)
    },
    {
      key: 'cancel-quote',
      label: 'Cancel quote',
      onClick: () => console.log('Cancel quote', item)
    },
    {
      key: 'edit-quote',
      label: 'Edit quote',
      onClick: () => console.log('Edit quote', item)
    },
    {
      key: 'view-subscription',
      label: 'View subscription',
      onClick: () => console.log('View subscription', item)
    },
    {
      key: 'view-invoice',
      label: 'View invoice',
      onClick: () => console.log('View invoice', item)
    }
  ];

  return (
    <SectionCard title="Quotes" layout="down">
      <PanelTable
        data={QUOTE_DATA}
        columns={columns}
        variant={isDetailView ? 'full' : 'panel'}
        emptyMessage="No quotes found"
        pageSize={5}
        rowActions={rowActions}
      />
    </SectionCard>
  );
});

QuotesSection.displayName = 'QuotesSection';