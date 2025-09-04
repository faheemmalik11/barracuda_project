import type { EntityActionsConfig } from '../components/EntityActions'

// Payment Actions Configuration
export const PAYMENT_ACTIONS_CONFIG: EntityActionsConfig = {
  statusActions: {
    succeeded: [
      { key: 'refund', label: 'Refund payment' }
    ],
    failed: [
      { key: 'retry', label: 'Retry payment' }
    ],
    processing: [
      { key: 'cancel', label: 'Cancel payment', variant: 'destructive' }
    ]
  },
  commonActions: [
    { key: 'send-receipt', label: 'Send receipt' },
    { key: 'view-payment-history', label: 'View payment history' },
    { key: 'flag-for-review', label: 'Flag for review' },
    { key: 'export-payment-data', label: 'Export payment data' }
  ]
}

// Customer Actions Configuration  
export const CUSTOMER_ACTIONS_CONFIG: EntityActionsConfig = {
  statusActions: {
    active: [
      { key: 'create-payment', label: 'Create payment' },
      { key: 'create-subscription', label: 'Create subscription' }
    ],
    risky: [
      { key: 'flag-for-review', label: 'Flag for review' },
      { key: 'add-note', label: 'Add note' }
    ],
    restricted: [
      { key: 'review-restrictions', label: 'Review restrictions' },
      { key: 'add-note', label: 'Add note' }
    ],
    terminated: [
      { key: 'view-termination-reason', label: 'View termination reason' }
    ]
  },
  commonActions: [
    { key: 'edit-customer', label: 'Edit customer' },
    { key: 'view-transactions', label: 'View transactions' },
    { key: 'send-email', label: 'Send email' },
    { key: 'view-profile', label: 'View profile' },
    { key: 'export-data', label: 'Export customer data' }
  ]
}

// Ecommerce Actions Configuration
export const ECOMMERCE_ACTIONS_CONFIG: EntityActionsConfig = {
  statusActions: {
    active: [
      { key: 'configure', label: 'Configure integration' },
      { key: 'test-connection', label: 'Test connection' },
      { key: 'view-analytics', label: 'View analytics' }
    ],
    inactive: [
      { key: 'activate', label: 'Activate integration' },
      { key: 'configure', label: 'Configure integration' }
    ]
  },
  commonActions: [
    { key: 'edit-settings', label: 'Edit settings' },
    { key: 'view-transactions', label: 'View transactions' },
    { key: 'download-logs', label: 'Download logs' },
    { key: 'regenerate-keys', label: 'Regenerate API keys' },
    { key: 'export-data', label: 'Export integration data' }
  ]
}

// Inventory Actions Configuration
export const INVENTORY_ACTIONS_CONFIG: EntityActionsConfig = {
  statusActions: {
    active: [
      { key: 'deactivate', label: 'Deactivate terminal' },
      { key: 'update-firmware', label: 'Update firmware' },
      { key: 'restart', label: 'Restart terminal' }
    ],
    inactive: [
      { key: 'activate', label: 'Activate terminal' },
      { key: 'return', label: 'Return terminal' }
    ],
    pending: [
      { key: 'activate', label: 'Activate terminal' },
      { key: 'cancel-order', label: 'Cancel order' }
    ]
  },
  commonActions: [
    { key: 'change-location', label: 'Change location' },
    { key: 'view-activity', label: 'View activity log' },
    { key: 'download-logs', label: 'Download logs' },
    { key: 'check-status', label: 'Check status' },
    { key: 'export-data', label: 'Export terminal data' }
  ]
}

// Terminal Actions Configuration
export const TERMINAL_ACTIONS_CONFIG: EntityActionsConfig = {
  statusActions: {
    active: [
      { key: 'deactivate', label: 'Deactivate terminal' },
      { key: 'restart', label: 'Restart terminal' },
      { key: 'update-firmware', label: 'Update firmware' }
    ],
    inactive: [
      { key: 'activate', label: 'Activate terminal' },
      { key: 'configure', label: 'Configure terminal' }
    ],
    maintenance: [
      { key: 'complete-maintenance', label: 'Complete maintenance' },
      { key: 'extend-maintenance', label: 'Extend maintenance' }
    ]
  },
  commonActions: [
    { key: 'change-location', label: 'Change location' },
    { key: 'view-activity', label: 'View activity log' },
    { key: 'download-logs', label: 'Download logs' },
    { key: 'check-connectivity', label: 'Check connectivity' },
    { key: 'export-data', label: 'Export terminal data' }
  ]
}
