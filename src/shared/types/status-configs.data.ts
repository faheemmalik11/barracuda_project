import type { TransactionStatus, StatusConfig } from './payment-status.types';

// Enhanced Status Mappings with all missing statuses
export const STATUS_CONFIGS: Record<TransactionStatus, StatusConfig> = {
  // Success States
  authorized: {
    label: 'Authorized',
    description: 'Payment has been authorized and funds are reserved',
    category: 'success',
    priority: 'low',
    color: {
      background: '#f0f9f4',
      text: '#166534',
      border: '#bbf7d0'
    },
    actions: [
      { label: 'Capture', type: 'primary', action: 'capture' },
      { label: 'Cancel', type: 'secondary', action: 'cancel' }
    ]
  },
  
  succeeded: {
    label: 'Succeeded',
    description: 'Payment completed successfully',
    category: 'success',
    priority: 'low',
    color: {
      background: '#f0f9f4',
      text: '#166534',
      border: '#bbf7d0'
    },
    actions: [
      { label: 'Refund', type: 'secondary', action: 'refund' },
      { label: 'Download Receipt', type: 'secondary', action: 'download_receipt' }
    ]
  },
  
  verified: {
    label: 'Verified',
    description: 'Payment method has been verified',
    category: 'success',
    priority: 'low',
    color: {
      background: '#eff6ff',
      text: '#1d4ed8',
      border: '#bfdbfe'
    },
    actions: [
      { label: 'Process Payment', type: 'primary', action: 'process' }
    ]
  },

  // Pre-authorization States
  preauthorized: {
    label: 'Pre-authorized',
    description: 'Payment is pre-authorized and awaiting capture',
    category: 'authorization',
    priority: 'medium',
    color: {
      background: '#fef3c7',
      text: '#92400e',
      border: '#fcd34d'
    },
    actions: [
      { label: 'Capture', type: 'primary', action: 'capture' },
      { label: 'Cancel', type: 'secondary', action: 'cancel' }
    ]
  },
  
  partially_authorized: {
    label: 'Partially Authorized',
    description: 'Only part of the payment amount was authorized',
    category: 'authorization',
    priority: 'medium',
    color: {
      background: '#fef3c7',
      text: '#92400e',
      border: '#fcd34d'
    },
    actions: [
      { label: 'Capture Partial', type: 'primary', action: 'capture_partial' },
      { label: 'Retry Full Amount', type: 'secondary', action: 'retry' },
      { label: 'Cancel', type: 'secondary', action: 'cancel' }
    ]
  },

  // Processing States
  processing: {
    label: 'Processing',
    description: 'Payment is currently being processed',
    category: 'processing',
    priority: 'medium',
    color: {
      background: '#eff6ff',
      text: '#1d4ed8',
      border: '#bfdbfe'
    },
    actions: [
      { label: 'View Details', type: 'secondary', action: 'view_details' }
    ]
  },
  
  processing_partial_capture: {
    label: 'Processing (Partial Capture)',
    description: 'Partial capture is being processed',
    category: 'processing',
    priority: 'medium',
    color: {
      background: '#eff6ff',
      text: '#1d4ed8',
      border: '#bfdbfe'
    },
    actions: [
      { label: 'View Progress', type: 'secondary', action: 'view_progress' }
    ]
  },
  
  paying_out: {
    label: 'Paying Out',
    description: 'Funds are being transferred to merchant account',
    category: 'processing',
    priority: 'low',
    color: {
      background: '#eff6ff',
      text: '#1d4ed8',
      border: '#bfdbfe'
    },
    actions: [
      { label: 'Track Payout', type: 'secondary', action: 'track_payout' }
    ]
  },
  
  partially_paid: {
    label: 'Partially Paid',
    description: 'Payment was only partially completed',
    category: 'warning',
    priority: 'medium',
    color: {
      background: '#fef3c7',
      text: '#92400e',
      border: '#fcd34d'
    },
    actions: [
      { label: 'Complete Payment', type: 'primary', action: 'complete_payment' },
      { label: 'Refund Partial', type: 'secondary', action: 'refund_partial' }
    ]
  },

  // Expiring States
  expiring: {
    label: 'Expiring',
    description: 'Authorization will expire soon',
    category: 'warning',
    priority: 'high',
    color: {
      background: '#fef3c7',
      text: '#92400e',
      border: '#fcd34d'
    },
    actions: [
      { label: 'Capture Now', type: 'primary', action: 'capture' },
      { label: 'Extend Authorization', type: 'secondary', action: 'extend' }
    ]
  },
  
  expired: {
    label: 'Expired',
    description: 'Authorization has expired and cannot be captured',
    category: 'failed',
    priority: 'low',
    color: {
      background: '#fef2f2',
      text: '#dc2626',
      border: '#fecaca'
    },
    actions: [
      { label: 'Create New Payment', type: 'primary', action: 'create_new' }
    ]
  },

  // Failed States
  declined: {
    label: 'Declined',
    description: 'Payment was declined by the bank or card issuer',
    category: 'failed',
    priority: 'medium',
    color: {
      background: '#fef2f2',
      text: '#dc2626',
      border: '#fecaca'
    },
    actions: [
      { label: 'Retry Payment', type: 'primary', action: 'retry' },
      { label: 'Try Different Method', type: 'secondary', action: 'change_method' }
    ]
  },
  
  failed: {
    label: 'Failed',
    description: 'Payment failed due to technical or other issues',
    category: 'failed',
    priority: 'medium',
    color: {
      background: '#fef2f2',
      text: '#dc2626',
      border: '#fecaca'
    },
    actions: [
      { label: 'Retry Payment', type: 'primary', action: 'retry' },
      { label: 'Contact Support', type: 'secondary', action: 'contact_support' }
    ]
  },
  
  blocked: {
    label: 'Blocked',
    description: 'Payment was blocked due to fraud prevention or compliance',
    category: 'failed',
    priority: 'high',
    color: {
      background: '#fef2f2',
      text: '#dc2626',
      border: '#fecaca'
    },
    actions: [
      { label: 'Review Block Reason', type: 'secondary', action: 'review_block' },
      { label: 'Request Unblock', type: 'secondary', action: 'request_unblock' }
    ]
  },
  
  denied: {
    label: 'Denied',
    description: 'Payment was denied by risk management system',
    category: 'failed',
    priority: 'high',
    color: {
      background: '#fef2f2',
      text: '#dc2626',
      border: '#fecaca'
    },
    actions: [
      { label: 'Review Denial', type: 'secondary', action: 'review_denial' },
      { label: 'Appeal Decision', type: 'secondary', action: 'appeal' }
    ]
  },

  // Canceled States
  canceled: {
    label: 'Canceled',
    description: 'Payment was canceled by merchant or customer',
    category: 'canceled',
    priority: 'low',
    color: {
      background: '#f3f4f6',
      text: '#374151',
      border: '#d1d5db'
    },
    actions: [
      { label: 'Create New Payment', type: 'primary', action: 'create_new' }
    ]
  },
  
  partially_canceled: {
    label: 'Partially Canceled',
    description: 'Part of the payment was canceled',
    category: 'canceled',
    priority: 'medium',
    color: {
      background: '#f3f4f6',
      text: '#374151',
      border: '#d1d5db'
    },
    actions: [
      { label: 'Complete Cancellation', type: 'secondary', action: 'complete_cancel' },
      { label: 'Process Remaining', type: 'primary', action: 'process_remaining' }
    ]
  },

  // Refund States
  refund_processing: {
    label: 'Refund Processing',
    description: 'Refund is currently being processed',
    category: 'refund',
    priority: 'medium',
    color: {
      background: '#f0f9ff',
      text: '#0369a1',
      border: '#bae6fd'
    },
    actions: [
      { label: 'Track Refund', type: 'secondary', action: 'track_refund' }
    ]
  },
  
  refund_declined: {
    label: 'Refund Declined',
    description: 'Refund was declined by the payment processor',
    category: 'refund',
    priority: 'high',
    color: {
      background: '#fef2f2',
      text: '#dc2626',
      border: '#fecaca'
    },
    actions: [
      { label: 'Retry Refund', type: 'primary', action: 'retry_refund' },
      { label: 'Manual Refund', type: 'secondary', action: 'manual_refund' }
    ]
  },
  
  refund_failed: {
    label: 'Refund Failed',
    description: 'Refund failed due to technical issues',
    category: 'refund',
    priority: 'high',
    color: {
      background: '#fef2f2',
      text: '#dc2626',
      border: '#fecaca'
    },
    actions: [
      { label: 'Retry Refund', type: 'primary', action: 'retry_refund' },
      { label: 'Contact Support', type: 'secondary', action: 'contact_support' }
    ]
  },
  
  refund_blocked: {
    label: 'Refund Blocked',
    description: 'Refund was blocked due to compliance or fraud prevention',
    category: 'refund',
    priority: 'high',
    color: {
      background: '#fef2f2',
      text: '#dc2626',
      border: '#fecaca'
    },
    actions: [
      { label: 'Review Block', type: 'secondary', action: 'review_refund_block' },
      { label: 'Request Override', type: 'secondary', action: 'request_override' }
    ]
  },
  
  sending_for_refund: {
    label: 'Sending for Refund',
    description: 'Refund request is being submitted to payment processor',
    category: 'refund',
    priority: 'medium',
    color: {
      background: '#f0f9ff',
      text: '#0369a1',
      border: '#bae6fd'
    },
    actions: [
      { label: 'View Progress', type: 'secondary', action: 'view_refund_progress' }
    ]
  },
  
  refunded: {
    label: 'Refunded',
    description: 'Payment has been successfully refunded',
    category: 'refund',
    priority: 'low',
    color: {
      background: '#f0f9ff',
      text: '#0369a1',
      border: '#bae6fd'
    },
    actions: [
      { label: 'Download Refund Receipt', type: 'secondary', action: 'download_refund_receipt' }
    ]
  },
  
  partially_refunded: {
    label: 'Partially Refunded',
    description: 'Part of the payment has been refunded',
    category: 'refund',
    priority: 'medium',
    color: {
      background: '#f0f9ff',
      text: '#0369a1',
      border: '#bae6fd'
    },
    actions: [
      { label: 'Refund Remaining', type: 'primary', action: 'refund_remaining' },
      { label: 'View Refund History', type: 'secondary', action: 'view_refund_history' }
    ]
  },
  
  refund_denied: {
    label: 'Refund Denied',
    description: 'Refund request was denied by risk management',
    category: 'refund',
    priority: 'high',
    color: {
      background: '#fef2f2',
      text: '#dc2626',
      border: '#fecaca'
    },
    actions: [
      { label: 'Review Denial Reason', type: 'secondary', action: 'review_refund_denial' },
      { label: 'Appeal Denial', type: 'secondary', action: 'appeal_refund_denial' }
    ]
  },

  // Additional States
  under_review: {
    label: 'Under Review',
    description: 'Payment is being manually reviewed for risk assessment',
    category: 'warning',
    priority: 'high',
    color: {
      background: '#fef3c7',
      text: '#92400e',
      border: '#fcd34d'
    },
    actions: [
      { label: 'Review Details', type: 'secondary', action: 'review_details' },
      { label: 'Expedite Review', type: 'primary', action: 'expedite_review' }
    ]
  },

  refund_requested: {
    label: 'Refund Requested',
    description: 'Customer has requested a refund, awaiting approval',
    category: 'warning',
    priority: 'high',
    color: {
      background: '#fef3c7',
      text: '#92400e',
      border: '#fcd34d'
    },
    actions: [
      { label: 'Approve Refund', type: 'primary', action: 'approve_refund' },
      { label: 'Deny Request', type: 'danger', action: 'deny_refund' },
      { label: 'Contact Customer', type: 'secondary', action: 'contact_customer' }
    ]
  },

  chargeback: {
    label: 'Chargeback',
    description: 'Chargeback has been initiated by the cardholder',
    category: 'dispute',
    priority: 'critical',
    color: {
      background: '#fef2f2',
      text: '#dc2626',
      border: '#fecaca'
    },
    actions: [
      { label: 'Dispute Chargeback', type: 'primary', action: 'dispute_chargeback' },
      { label: 'Accept Chargeback', type: 'secondary', action: 'accept_chargeback' },
      { label: 'Upload Evidence', type: 'secondary', action: 'upload_evidence' }
    ]
  },

  dispute: {
    label: 'Disputed',
    description: 'Payment is being disputed, evidence submission required',
    category: 'dispute',
    priority: 'high',
    color: {
      background: '#fef2f2',
      text: '#dc2626',
      border: '#fecaca'
    },
    actions: [
      { label: 'Submit Evidence', type: 'primary', action: 'submit_evidence' },
      { label: 'Accept Dispute', type: 'secondary', action: 'accept_dispute' },
      { label: 'Contact Legal', type: 'secondary', action: 'contact_legal' }
    ]
  },

  disputed: {
    label: 'Transaction Disputed',
    description: 'Transaction has been disputed by the cardholder',
    category: 'dispute',
    priority: 'high',
    color: {
      background: '#fef2f2',
      text: '#dc2626',
      border: '#fecaca'
    },
    actions: [
      { label: 'Defend Transaction', type: 'primary', action: 'defend_transaction' },
      { label: 'Settle Dispute', type: 'secondary', action: 'settle_dispute' },
      { label: 'Review Evidence', type: 'secondary', action: 'review_evidence' }
    ]
  }
};