import type { PaymentMethodItem, ActionItem } from './types';

export const PAYMENT_METHODS_DATA: PaymentMethodItem[] = [
  {
    id: 'card_1234',
    type: 'visa',
    maskedNumber: '•••• 1234',
    status: 'default',
    expirationDate: '8/2026',
    cardholderName: 'John Smith',
    isExpired: false,
    details: [
      { label: 'Payment method', value: 'Visa Credit Card' },
      { label: 'Cardholder', value: 'John Doe' },
      { label: 'Card number', value: 'ending in 1234' },
      { label: 'Expires', value: '08/2026' },
      { label: 'Funding source', value: 'Bank Account' },
      { label: 'Issuer', value: 'Chase Bank (US)' },
      { label: 'Currency', value: 'USD' },
      { label: 'Entry method', value: 'Manual' },
      { label: 'Source', value: 'Online Purchase' },
      { label: 'Wallet', value: 'Apple Pay' },
      { label: 'Payment method ID', value: 'PMID_89b7x1ajhsd2q3', isCopyable: true },
      { label: 'Fingerprint', value: '7ac45d9f5b2e3a77', isCopyable: true },
      { label: 'Native token', value: 'NTw121e23r32r23r', isCopyable: true },
      { label: 'Network token', value: 'VS123428345359', isCopyable: true },
      { label: 'Status', value: 'Default' },
      { label: 'Set up for future use', value: 'Yes' }
    ]
  },
  {
    id: 'card_4242',
    type: 'visa',
    maskedNumber: '•••• 4242',
    status: 'active',
    expirationDate: '11/2025',
    cardholderName: 'John Smith',
    isExpired: false,
    details: [
      { label: 'Payment method', value: 'Card' },
      { label: 'Card number', value: '•••• •••• •••• 4242' },
      { label: 'Card type', value: 'Visa' },
      { label: 'Expiry date', value: '11/2025' },
      { label: 'Cardholder name', value: 'John Smith' },
      { label: 'Billing address', value: '456 Oak St, Los Angeles, CA 90001' }
    ]
  },
  {
    id: 'card_0259',
    type: 'visa',
    maskedNumber: '•••• 0259',
    status: 'expired',
    expirationDate: '11/2023',
    cardholderName: 'John Smith',
    isExpired: true,
    details: [
      { label: 'Payment method', value: 'Card' },
      { label: 'Card number', value: '•••• •••• •••• 0259' },
      { label: 'Card type', value: 'Visa' },
      { label: 'Expiry date', value: '11/2023' },
      { label: 'Cardholder name', value: 'John Smith' },
      { label: 'Status', value: 'Expired', showBadge: true, badgeVariant: 'destructive' }
    ]
  },
  {
    id: 'usd_cash',
    type: 'usd-cash',
    maskedNumber: 'USD Cash Balance',
    status: 'active',
    cardholderName: 'Cash Balance',
    isExpired: false,
    details: [
      { label: 'Payment method', value: 'USD Cash Balance' },
      { label: 'Available balance', value: '$0.00 USD available' },
      { label: 'Currency', value: 'USD' },
      { label: 'Status', value: 'Active', showBadge: true, badgeVariant: 'default' }
    ]
  }
];

export const PAYMENT_METHOD_ACTIONS: ActionItem[] = [
  { id: 'edit', label: 'Edit payment method' },
  { id: 'set-default', label: 'Set as default' },
  { id: 'disable', label: 'Disable payment method' },
  { id: 'remove', label: 'Remove payment method', variant: 'destructive' }
];