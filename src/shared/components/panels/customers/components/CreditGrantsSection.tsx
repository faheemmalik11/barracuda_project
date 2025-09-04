import React from 'react';
import { SectionCard } from '../../components/SectionCard';
import { PanelTable } from '../../components/PanelTable';
import { AppStatusBadge } from '@shared/components/ui/status-badge/AppStatusBadge';
import type { PanelTableColumn } from '../../components/PanelTable/types';
import { CREDIT_GRANT_DATA, type CreditGrantData } from '../constants/customer-data';

interface CreditGrantsSectionProps {
  isDetailView?: boolean;
}

const renderAvailable = (value: unknown) => {
  const amount = typeof value === 'string' ? value : '$0';
  return (
    <span className="font-medium">
      {amount}
    </span>
  );
};

const renderStatus = (_: unknown, item: CreditGrantData) => (
  <div className="whitespace-nowrap">
    <AppStatusBadge 
      entityType="credit_grant" 
      status={item.status}
      size="sm"
    />
  </div>
);

const renderPriority = (_: unknown, item: CreditGrantData) => (
  <div className="whitespace-nowrap">
    <AppStatusBadge 
      entityType="priority" 
      status={item.priority.toLowerCase()}
      size="sm"
    />
  </div>
);

export const CreditGrantsSection = React.memo<CreditGrantsSectionProps>(({ isDetailView = false }) => {
  const columns: PanelTableColumn<CreditGrantData>[] = [
    {
      key: 'name',
      label: 'NAME',
      width: '20%',
      cellClassName: 'font-medium'
    },
    {
      key: 'available',
      label: 'AVAILABLE',
      width: '12%',
      render: renderAvailable
    },
    {
      key: 'status',
      label: 'STATUS',
      width: '10%',
      render: renderStatus
    },
    {
      key: 'eligibility',
      label: 'ELIGIBILITY',
      width: '18%'
    },
    {
      key: 'priority',
      label: 'PRIORITY',
      width: '12%',
      render: renderPriority
    },
    {
      key: 'effectiveDate',
      label: 'EFFECTIVE DATE',
      width: '14%',
      cellClassName: 'whitespace-nowrap'
    },
    {
      key: 'expiryDate',
      label: 'EXPIRY DATE',
      width: '14%',
      cellClassName: 'whitespace-nowrap'
    }
  ];

  const rowActions = (item: CreditGrantData) => [
    {
      key: 'update',
      label: 'Update',
      onClick: () => console.log('Update credit grant', item)
    },
    {
      key: 'void',
      label: 'Void',
      onClick: () => console.log('Void credit grant', item)
    }
  ];

  return (
    <SectionCard title="Credit Grants" layout="down">
      <PanelTable
        data={CREDIT_GRANT_DATA}
        columns={columns}
        variant={isDetailView ? 'full' : 'panel'}
        emptyMessage="No credit grants found"
        pageSize={5}
        rowActions={rowActions}
      />
    </SectionCard>
  );
});

CreditGrantsSection.displayName = 'CreditGrantsSection';