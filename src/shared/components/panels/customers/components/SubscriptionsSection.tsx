import React from 'react';
import { SectionCard } from '../../components/SectionCard';
import { PanelTable } from '../../components/PanelTable';
import { AppStatusBadge } from '@shared/components/ui/status-badge/AppStatusBadge';
import { getRiskConfig } from '@shared/utils/risk';
import type { PanelTableColumn } from '../../components/PanelTable/types';
import { SUBSCRIPTION_DATA, type SubscriptionData } from '../constants/customer-data';

interface SubscriptionsSectionProps {
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

const renderStatus = (_: unknown, item: SubscriptionData) => (
  <div className="whitespace-nowrap">
    <AppStatusBadge 
      entityType="subscription" 
      status={item.status}
      size="sm"
    />
  </div>
);

const renderNextBilling = (_: unknown, item: SubscriptionData) => (
  <div className="text-xs">
    <span className="font-medium">{item.nextBilling}</span>
    <span className="text-muted-foreground ml-2">{item.amount}</span>
  </div>
);

export const SubscriptionsSection = React.memo<SubscriptionsSectionProps>(({ isDetailView = false }) => {
  const columns: PanelTableColumn<SubscriptionData>[] = [
    {
      key: 'risk',
      label: 'RISK',
      width: '10%',
      render: renderRisk
    },
    {
      key: 'product',
      label: 'PRODUCT',
      width: '20%',
      cellClassName: 'font-medium'
    },
    {
      key: 'status',
      label: 'STATUS', 
      width: '15%',
      render: renderStatus
    },
    {
      key: 'bundle',
      label: 'BUNDLE',
      width: '20%'
    },
    {
      key: 'frequency',
      label: 'FREQUENCY',
      width: '15%',
      cellClassName: 'text-muted-foreground'
    },
    {
      key: 'nextBilling',
      label: 'NEXT BILLING',
      width: '20%',
      cellClassName: 'whitespace-nowrap',
      render: renderNextBilling
    }
  ];

  const rowActions = (item: SubscriptionData) => [
    {
      key: 'update-subscription',
      label: 'Update subscription',
      onClick: () => console.log('Update subscription', item)
    },
    {
      key: 'cancel-subscription',
      label: 'Cancel subscription',
      onClick: () => console.log('Cancel subscription', item)
    },
    {
      key: 'pause-payment',
      label: 'Pause payment collection',
      onClick: () => console.log('Pause payment collection', item)
    },
    {
      key: 'share-link',
      label: 'Share payment update link',
      onClick: () => console.log('Share payment update link', item)
    },
    {
      key: 'view-subscription',
      label: 'View subscription',
      onClick: () => console.log('View subscription', item)
    },
    {
      key: 'view-invoice',
      label: 'View upcoming invoice',
      onClick: () => console.log('View upcoming invoice', item)
    }
  ];

  return (
    <SectionCard title="Subscriptions" layout="down">
      <PanelTable
        data={SUBSCRIPTION_DATA}
        columns={columns}
        variant={isDetailView ? 'full' : 'panel'}
        emptyMessage="No subscriptions found"
        pageSize={5}
        rowActions={rowActions}
      />
    </SectionCard>
  );
});

SubscriptionsSection.displayName = 'SubscriptionsSection';