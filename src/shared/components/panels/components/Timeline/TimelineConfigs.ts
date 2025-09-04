import { 
  CreditCard,
  RefreshCw,
  AlertCircle,
  Lock,
  XCircle,
  AlertTriangle,
  Check,
  RotateCcw,
  Shield,
  X,
  Info,
  Clock,
  CheckCircle,
  Ban,
  FileText,
  Star,
  Repeat,
  TrendingUp,
  UserPlus,
  Calendar,
  CreditCard as Card,
  Bell,
} from 'lucide-react';
import type { TimelineIconConfig } from './types';

export const TIMELINE_ICONS: Record<string, TimelineIconConfig> = {
  authorized: {
    icon: Lock,
    backgroundColor: '#3b82f6',
    iconColor: '#ffffff',
    size: 'md'
  },
  captured: {
    icon: CreditCard,
    backgroundColor: '#059669',
    iconColor: '#ffffff',
    size: 'md'
  },
  settled: {
    icon: CreditCard,
    backgroundColor: '#10b981',
    iconColor: '#ffffff',
    size: 'md'
  },
  refunded: {
    icon: RefreshCw,
    backgroundColor: '#0ea5e9',
    iconColor: '#ffffff',
    size: 'md'
  },
  partially_refunded: {
    icon: RefreshCw,
    backgroundColor: '#06b6d4',
    iconColor: '#ffffff',
    size: 'md'
  },
  disputed: {
    icon: AlertCircle,
    backgroundColor: '#dc2626',
    iconColor: '#ffffff',
    size: 'md'
  },
  chargeback: {
    icon: AlertCircle,
    backgroundColor: '#991b1b',
    iconColor: '#ffffff',
    size: 'md'
  },
  voided: {
    icon: XCircle,
    backgroundColor: '#9ca3af',
    iconColor: '#ffffff',
    size: 'md'
  },
  under_review: {
    icon: AlertTriangle,
    backgroundColor: '#ef4444',
    iconColor: '#ffffff',
    size: 'sm'
  },
  processing_refund: {
    icon: RefreshCw,
    backgroundColor: '#fbbf24',
    iconColor: '#ffffff',
    size: 'md'
  },
  
  success: {
    icon: Check,
    backgroundColor: '#198754',
    iconColor: '#ffffff',
    size: 'md'
  },
  approved: {
    icon: CheckCircle,
    backgroundColor: '#10b981',
    iconColor: '#ffffff',
    size: 'md'
  },
  completed: {
    icon: CheckCircle,
    backgroundColor: '#059669',
    iconColor: '#ffffff',
    size: 'md'
  },
  process: {
    icon: RotateCcw,
    backgroundColor: '#6b7280',
    iconColor: '#ffffff',
    size: 'md'
  },
  pending: {
    icon: Clock,
    backgroundColor: '#fbbf24',
    iconColor: '#ffffff',
    size: 'md'
  },
  in_progress: {
    icon: RotateCcw,
    backgroundColor: '#3b82f6',
    iconColor: '#ffffff',
    size: 'md'
  },
  security: {
    icon: Shield,
    backgroundColor: '#64748b',
    iconColor: '#ffffff',
    size: 'md'
  },
  warning: {
    icon: AlertTriangle,
    backgroundColor: '#f59e0b',
    iconColor: '#ffffff',
    size: 'md'
  },
  attention: {
    icon: AlertCircle,
    backgroundColor: '#eab308',
    iconColor: '#ffffff',
    size: 'md'
  },
  error: {
    icon: X,
    backgroundColor: '#ef4444',
    iconColor: '#ffffff',
    size: 'md'
  },
  declined: {
    icon: XCircle,
    backgroundColor: '#dc2626',
    iconColor: '#ffffff',
    size: 'md'
  },
  failed: {
    icon: XCircle,
    backgroundColor: '#b91c1c',
    iconColor: '#ffffff',
    size: 'md'
  },
  info: {
    icon: Info,
    backgroundColor: '#3b82f6',
    iconColor: '#ffffff',
    size: 'md'
  },
  cancelled: {
    icon: Ban,
    backgroundColor: '#6b7280',
    iconColor: '#ffffff',
    size: 'md'
  },
  default: {
    icon: FileText,
    backgroundColor: '#9ca3af',
    iconColor: '#ffffff',
    size: 'md'
  },
  
  // Customer payment-related icons - from customer perspective
  customer_registered: {
    icon: UserPlus,
    backgroundColor: '#16a34a',
    iconColor: '#ffffff',
    size: 'md'
  },
  first_payment: {
    icon: CreditCard,
    backgroundColor: '#059669',
    iconColor: '#ffffff',
    size: 'md'
  },
  payment_method_added: {
    icon: Card,
    backgroundColor: '#3b82f6',
    iconColor: '#ffffff',
    size: 'md'
  },
  subscription_started: {
    icon: Repeat,
    backgroundColor: '#7c3aed',
    iconColor: '#ffffff',
    size: 'md'
  },
  payment_failed: {
    icon: XCircle,
    backgroundColor: '#dc2626',
    iconColor: '#ffffff',
    size: 'md'
  },
  refund_received: {
    icon: RefreshCw,
    backgroundColor: '#0ea5e9',
    iconColor: '#ffffff',
    size: 'md'
  },
  chargeback_initiated: {
    icon: AlertTriangle,
    backgroundColor: '#f59e0b',
    iconColor: '#ffffff',
    size: 'md'
  },
  payment_disputed: {
    icon: AlertCircle,
    backgroundColor: '#ef4444',
    iconColor: '#ffffff',
    size: 'md'
  },
  large_transaction: {
    icon: TrendingUp,
    backgroundColor: '#9333ea',
    iconColor: '#ffffff',
    size: 'md'
  },
  automatic_payment: {
    icon: RotateCcw,
    backgroundColor: '#10b981',
    iconColor: '#ffffff',
    size: 'md'
  },
  payment_reminder: {
    icon: Bell,
    backgroundColor: '#f59e0b',
    iconColor: '#ffffff',
    size: 'md'
  },
  fraud_alert: {
    icon: Shield,
    backgroundColor: '#dc2626',
    iconColor: '#ffffff',
    size: 'md'
  },
  payment_plan_setup: {
    icon: Calendar,
    backgroundColor: '#6366f1',
    iconColor: '#ffffff',
    size: 'md'
  },
  loyalty_cashback: {
    icon: Star,
    backgroundColor: '#ca8a04',
    iconColor: '#ffffff',
    size: 'md'
  }
};

export function getTimelineIcon(type: string): TimelineIconConfig {
  return TIMELINE_ICONS[type] || TIMELINE_ICONS.default;
}
