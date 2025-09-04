import React from 'react';
import { SectionCard } from '../../components/SectionCard';
import { PanelTable } from '../../components/PanelTable';
import { getRiskConfig } from '@shared/utils/risk';
import type { PanelTableColumn } from '../../components/PanelTable/types';
import { PENDING_INVOICE_ITEMS_DATA, type PendingInvoiceItemData } from '../constants/customer-data';

interface PendingInvoiceItemsSectionProps {
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

const renderAmount = (value: unknown) => {
  const amount = typeof value === 'string' ? value : '$0.00';
  return (
    <span className="font-medium">
      {amount}
    </span>
  );
};

const renderQty = (value: unknown) => {
  const qty = typeof value === 'number' ? value : 0;
  return (
    <span className="text-center">
      {qty}
    </span>
  );
};

export const PendingInvoiceItemsSection = React.memo<PendingInvoiceItemsSectionProps>(({ isDetailView = false }) => {
  const columns: PanelTableColumn<PendingInvoiceItemData>[] = [
    {
      key: 'risk',
      label: 'RISK',
      width: '10%',
      render: renderRisk
    },
    {
      key: 'description',
      label: 'DESCRIPTION',
      width: '25%',
      cellClassName: 'font-medium'
    },
    {
      key: 'amount',
      label: 'AMOUNT',
      width: '15%',
      render: renderAmount
    },
    {
      key: 'qty',
      label: 'QTY',
      width: '10%',
      render: renderQty,
      align: 'center'
    },
    {
      key: 'customer',
      label: 'CUSTOMER',
      width: '20%'
    },
    {
      key: 'scheduled',
      label: 'SCHEDULED',
      width: '20%',
      cellClassName: 'whitespace-nowrap'
    }
  ];

  const rowActions = (item: PendingInvoiceItemData) => [
    {
      key: 'view-details',
      label: 'View details',
      onClick: () => console.log('View details', item)
    },
    {
      key: 'edit-item',
      label: 'Edit item',
      onClick: () => console.log('Edit item', item)
    },
    {
      key: 'remove-item',
      label: 'Remove item',
      onClick: () => console.log('Remove item', item)
    },
    {
      key: 'invoice-now',
      label: 'Invoice now',
      onClick: () => console.log('Invoice now', item)
    },
    {
      key: 'duplicate',
      label: 'Duplicate',
      onClick: () => console.log('Duplicate', item)
    },
    {
      key: 'export',
      label: 'Export',
      onClick: () => console.log('Export', item)
    }
  ];

  return (
    <SectionCard title="Pending invoice items" layout="down">
      <PanelTable
        data={PENDING_INVOICE_ITEMS_DATA}
        columns={columns}
        variant={isDetailView ? 'full' : 'panel'}
        emptyMessage="No pending invoice items found"
        pageSize={5}
        rowActions={rowActions}
      />
    </SectionCard>
  );
});

PendingInvoiceItemsSection.displayName = 'PendingInvoiceItemsSection';