import React from 'react';
import { SectionCard } from '../../components/SectionCard';
import { PanelTable } from '../../components/PanelTable';
import { AppStatusBadge } from '@shared/components/ui/status-badge/AppStatusBadge';
import type { PanelTableColumn } from '../../components/PanelTable/types';
import { ORDER_DATA, type OrderData } from '../constants/customer-data';

interface OrdersSectionProps {
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

const renderStatus = (_: unknown, item: OrderData) => (
  <div className="whitespace-nowrap">
    <AppStatusBadge 
      entityType="order" 
      status={item.status}
      size="sm"
    />
  </div>
);

export const OrdersSection = React.memo<OrdersSectionProps>(({ isDetailView = false }) => {
  const columns: PanelTableColumn<OrderData>[] = [
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
      key: 'orderNumber',
      label: 'ORDER #',
      width: '18%',
      cellClassName: 'font-medium'
    },
    {
      key: 'customer',
      label: 'CUSTOMER',
      width: '20%'
    },
    {
      key: 'payment',
      label: 'PAYMENT',
      width: '18%'
    },
    {
      key: 'created',
      label: 'CREATED',
      width: '17%',
      cellClassName: 'whitespace-nowrap'
    }
  ];

  const rowActions = (item: OrderData) => [
    {
      key: 'view-order-details',
      label: 'View order details',
      onClick: () => console.log('View order details', item)
    },
    {
      key: 'print-receipt',
      label: 'Print receipt',
      onClick: () => console.log('Print receipt', item)
    },
    {
      key: 'process-refund',
      label: 'Process refund',
      onClick: () => console.log('Process refund', item)
    },
    {
      key: 'contact-customer',
      label: 'Contact customer',
      onClick: () => console.log('Contact customer', item)
    },
    {
      key: 'export-order-data',
      label: 'Export order data',
      onClick: () => console.log('Export order data', item)
    }
  ];

  return (
    <SectionCard title="Orders" layout="down">
      <PanelTable
        data={ORDER_DATA}
        columns={columns}
        variant={isDetailView ? 'full' : 'panel'}
        emptyMessage="No orders found"
        pageSize={5}
        rowActions={rowActions}
      />
    </SectionCard>
  );
});

OrdersSection.displayName = 'OrdersSection';