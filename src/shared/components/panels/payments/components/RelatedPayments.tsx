import { RELATED_PAYMENTS } from '../constants/payment-data';
import { SectionCard } from '../../components/SectionCard';
import { PanelTable } from '../../components/PanelTable';
import { toast } from 'sonner';
import type { TableAction } from '@shared/types/data-table';
import { getRiskConfig } from '@shared/utils/risk';
import { AppStatusBadge } from '@shared/components/ui/status-badge/AppStatusBadge';
import type { RelatedPayment } from '../../types/payment-details.types';
import type { PanelTableColumn } from '../../components/PanelTable';

const columns: PanelTableColumn<RelatedPayment>[] = [
  {
    key: 'risk',
    label: 'RISK',
    width: '10%',
    render: (value: unknown) => {
      const riskValue = typeof value === 'number' ? value : 0;
      return (
        <span 
          className={`inline-flex items-center justify-center w-5 h-5 rounded-sm text-xs font-medium border ${getRiskConfig(riskValue).colorClasses}`}
          title={getRiskConfig(riskValue).label}
        >
          {riskValue}
        </span>
      );
    }
  },
  {
    key: 'amount',
    label: 'AMOUNT',
    width: '18%',
    cellClassName: 'font-medium whitespace-nowrap'
  },
  {
    key: 'status',
    label: 'STATUS',
    width: '18%',
    render: (value: unknown) => {
      const statusValue = typeof value === 'string' ? value : 'unknown';
      return (
        <AppStatusBadge 
          entityType="payment" 
          status={statusValue}
          size="sm"
        />
      );
    }
  },
  {
    key: 'customer',
    label: 'CUSTOMER',
    width: '22%'
  },
  {
    key: 'paymentMethod',
    label: 'PAYMENT METHOD',
    width: '22%'
  },
  {
    key: 'date',
    label: 'DATE',
    width: '10%',
    cellClassName: 'text-muted-foreground',
    hideInPanel: true
  }
];

const createRelatedPaymentActions = (): TableAction<RelatedPayment>[] => [
  {
    key: 'view-details',
    label: 'View details',
    onClick: () => { toast.info('View details functionality coming soon') }
  },
  {
    key: 'refund',
    label: 'Refund',
    onClick: () => { toast.info('Refund functionality coming soon') }
  },
  {
    key: 'export',
    label: 'Export',
    onClick: () => { toast.info('Export functionality coming soon') }
  }
];

export function RelatedPayments() {
  return (
    <SectionCard title="Related payments" layout="down">
      <PanelTable<RelatedPayment>
        data={RELATED_PAYMENTS}
        columns={columns}
        rowActions={createRelatedPaymentActions}
      />
    </SectionCard>
  );
}
