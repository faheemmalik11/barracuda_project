// Enhanced Transaction Status Types with all missing statuses
export type TransactionStatus = 
  // Success States
  | 'authorized'
  | 'succeeded'
  | 'verified'
  
  // Pre-authorization States  
  | 'preauthorized'
  | 'partially_authorized'
  
  // Processing States
  | 'processing'
  | 'processing_partial_capture'
  | 'paying_out'
  | 'partially_paid'
  
  // Expiring States
  | 'expiring'
  | 'expired'
  
  // Failed States
  | 'declined'
  | 'failed'
  | 'blocked'
  | 'denied'
  
  // Canceled States
  | 'canceled'
  | 'partially_canceled'
  
  // Refund States
  | 'refund_processing'
  | 'refund_declined'
  | 'refund_failed'
  | 'refund_blocked'
  | 'sending_for_refund'
  | 'refunded'
  | 'partially_refunded'
  | 'refund_denied'
  
  // Additional States
  | 'under_review'
  | 'refund_requested'
  | 'chargeback'
  | 'dispute'
  | 'disputed';

export interface StatusDetails {
  category: StatusCategory;
  priority: StatusPriority;
  canRefund?: boolean;
  canCapture?: boolean;
  canCancel?: boolean;
  canRetry?: boolean;
  requiresAction?: boolean;
  expiresAt?: string;
  reason?: string;
  nextAction?: string;
}

export type StatusCategory = 
  | 'success'
  | 'processing' 
  | 'authorization'
  | 'warning'
  | 'failed'
  | 'refund'
  | 'canceled'
  | 'dispute';

export type StatusPriority = 'low' | 'medium' | 'high' | 'critical';

export interface StatusConfig {
  label: string;
  description: string;
  category: StatusCategory;
  priority: StatusPriority;
  color: {
    background: string;
    text: string;
    border: string;
  };
  icon?: string;
  actions: StatusAction[];
}

export interface StatusAction {
  label: string;
  type: 'primary' | 'secondary' | 'danger';
  action: string;
  requiresConfirmation?: boolean;
  disabled?: boolean;
}

// Type utilities for better type safety
export type SuccessStatus = Extract<TransactionStatus, 'authorized' | 'succeeded' | 'verified'>;
export type FailedStatus = Extract<TransactionStatus, 'declined' | 'failed' | 'blocked' | 'denied' | 'expired'>;
export type RefundStatus = Extract<TransactionStatus, 'refund_processing' | 'refund_declined' | 'refund_failed' | 'refund_blocked' | 'sending_for_refund' | 'refunded' | 'partially_refunded' | 'refund_denied' | 'refund_requested'> | 'pending' | 'succeeded' | 'failed' | 'canceled';
export type DisputeStatus = Extract<TransactionStatus, 'chargeback' | 'dispute' | 'disputed'>;
export type ProcessingStatus = Extract<TransactionStatus, 'processing' | 'processing_partial_capture' | 'paying_out'>;