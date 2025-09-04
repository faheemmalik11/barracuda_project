import type { TransactionStatus, StatusDetails } from '@shared/types/payment-status.types';
import type { BaseEntity } from '@shared/components/EntityListPage/types';

export interface PaymentInfo extends BaseEntity {
  amount: string;
  lastUpdate: string;
  customer: string;
  paymentMethod: string;
  risk: string;
  channel: string;
  status: TransactionStatus;
  statusDetails?: StatusDetails;
}

export interface PaymentDetail {
  label: string;
  value: string;
  showBadge?: boolean;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  isCopyable?: boolean;
}

export interface Receipt {
  name: string;
  timestamp: string;
}

// Re-export timeline types from the base timeline component  
export type { BaseTimelineEvent } from '../components/Timeline';

export interface RelatedPayment {
  id: string;
  risk: number;
  riskLevel: 'low' | 'medium' | 'high';
  amount: string;
  status: TransactionStatus;
  customer: string;
  paymentMethod: string;
  date: string;
}

export interface MenuItem {
  name: string;
  icon: string;
  active?: boolean;
  children?: string[];
}

