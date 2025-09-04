import React from 'react';
import { SectionCard } from '../../components/SectionCard';
import { PanelTable } from '../../components/PanelTable';
import { AppStatusBadge } from '@shared/components/ui/status-badge/AppStatusBadge';
import type { PanelTableColumn } from '../../components/PanelTable/types';
import { INVOICE_DATA, type InvoiceData } from '../constants/customer-data';

interface InvoicesSectionProps {
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

const renderStatus = (_: unknown, item: InvoiceData) => (
  <div className="whitespace-nowrap">
    <AppStatusBadge 
      entityType="invoice" 
      status={item.status}
      size="sm"
    />
  </div>
);

export const InvoicesSection = React.memo<InvoicesSectionProps>(({ isDetailView = false }) => {
  const columns: PanelTableColumn<InvoiceData>[] = [
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
      key: 'frequency',
      label: 'FREQUENCY',
      width: '13%'
    },
    {
      key: 'invoiceNumber',
      label: 'INVOICE #',
      width: '18%',
      cellClassName: 'font-medium'
    },
    {
      key: 'customer',
      label: 'CUSTOMER',
      width: '18%'
    },
    {
      key: 'due',
      label: 'DUE',
      width: '12%',
      cellClassName: 'whitespace-nowrap'
    },
    {
      key: 'created',
      label: 'CREATED',
      width: '12%',
      cellClassName: 'whitespace-nowrap'
    }
  ];

  const rowActions = (item: InvoiceData) => {
    const baseActions = [
      {
        key: 'view-invoice',
        label: 'View invoice',
        onClick: () => console.log('View invoice', item)
      },
      {
        key: 'duplicate-invoice',
        label: 'Duplicate invoice',
        onClick: () => console.log('Duplicate invoice', item)
      },
      {
        key: 'download-pdf',
        label: 'Download PDF',
        onClick: () => console.log('Download PDF', item)
      },
      {
        key: 'view-subscription',
        label: 'View subscription',
        onClick: () => console.log('View subscription', item)
      }
    ];

    // Add status-specific actions
    if (item.status === 'open' || item.status === 'overdue') {
      baseActions.splice(2, 0, {
        key: 'mark-paid',
        label: 'Mark as paid',
        onClick: () => console.log('Mark as paid', item)
      });
      baseActions.splice(3, 0, {
        key: 'void-invoice',
        label: 'Void invoice',
        onClick: () => console.log('Void invoice', item)
      });
      baseActions.splice(4, 0, {
        key: 'delete-invoice',
        label: 'Delete invoice',
        onClick: () => console.log('Delete invoice', item)
      });
    }

    return baseActions;
  };

  return (
    <SectionCard title="Invoices" layout="down">
      <PanelTable
        data={INVOICE_DATA}
        columns={columns}
        variant={isDetailView ? 'full' : 'panel'}
        emptyMessage="No invoices found"
        pageSize={5}
        rowActions={rowActions}
      />
    </SectionCard>
  );
});

InvoicesSection.displayName = 'InvoicesSection';