import type { RiskCheck } from '@shared/types/risk.types';
import type { PaymentMethodItem } from '../../components/PaymentMethodSection/types';
import type { EventData } from '@shared/types/events.types';

export const TIMELINE_EVENTS_DATA = [
  {
    id: 'customer-registered',
    title: 'Account created and verified',
    timestamp: '01/15/2024 09:30',
    iconType: 'customer_registered'
  },
  {
    id: 'first-payment-method',
    title: 'First payment method added',
    timestamp: '01/15/2024 14:22',
    iconType: 'payment_method_added',
    details: [
      { action: 'Visa ending in 4242 added', timestamp: '01/15/2024 14:22' },
      { action: 'Card verification successful', timestamp: '01/15/2024 14:23' },
      { action: 'Set as default payment method', timestamp: '01/15/2024 14:24' }
    ]
  },
  {
    id: 'first-successful-payment',
    title: 'First payment completed',
    timestamp: '01/16/2024 10:15',
    iconType: 'first_payment',
    details: [
      { action: 'Payment amount: USD 125.00', timestamp: '01/16/2024 10:15' },
      { action: 'Transaction ID: TXN-2024-0001', timestamp: '01/16/2024 10:15' },
      { action: 'Payment confirmation sent', timestamp: '01/16/2024 10:16' }
    ]
  },
  {
    id: 'subscription-setup',
    title: 'Monthly subscription activated',
    timestamp: '01/20/2024 16:30',
    iconType: 'subscription_started',
    details: [
      { action: 'Premium plan selected', timestamp: '01/20/2024 16:30' },
      { action: 'Auto-pay enabled', timestamp: '01/20/2024 16:31' },
      { action: 'Next billing: 02/20/2024', timestamp: '01/20/2024 16:32' }
    ]
  },
  {
    id: 'large-purchase',
    title: 'Large transaction processed',
    timestamp: '02/08/2024 11:45',
    iconType: 'large_transaction',
    details: [
      { action: 'Payment amount: USD 2,450.00', timestamp: '02/08/2024 11:45' },
      { action: 'Additional verification completed', timestamp: '02/08/2024 11:43' },
      { action: 'Transaction approved', timestamp: '02/08/2024 11:45' }
    ]
  }
];

export const PROFILE_DETAILS = [
  { label: 'Customer Type', value: 'Business' },
  { label: 'Name', value: 'John Doe' },
  { label: 'Business Name', value: 'Acme Corporation' },
  { label: 'Account Email', value: 'john.doe@acme-corp.com' },
  { label: 'Customer since', value: 'March 15, 2022' },
  { label: 'Language', value: 'English (US)' },
  { label: 'Currency', value: 'USD' },
  { label: 'Timezone', value: 'America/New_York (EST/EDT)' }
];

export type SubscriptionData = {
  id: string;
  risk: number;
  product: string;
  status: string;
  bundle: string;
  frequency: string;
  nextBilling: string;
  amount: string;
};

export const SUBSCRIPTION_DATA: SubscriptionData[] = [
  {
    id: 'sub-001',
    risk: 15,
    product: 'Premium Plan',
    status: 'active',
    bundle: 'Core Suite',
    frequency: 'Monthly',
    nextBilling: 'Dec 15',
    amount: '$29.99'
  },
  {
    id: 'sub-002', 
    risk: 45,
    product: 'Enterprise Suite',
    status: 'active',
    bundle: 'Business Pack',
    frequency: 'Monthly',
    nextBilling: 'Dec 20',
    amount: '$199.99'
  },
  {
    id: 'sub-003',
    risk: 85,
    product: 'Basic Plan',
    status: 'past_due',
    bundle: 'Starter Kit',
    frequency: 'Monthly', 
    nextBilling: 'Dec 10',
    amount: '$9.99'
  },
  {
    id: 'sub-004',
    risk: 25,
    product: 'Pro Plan',
    status: 'trialing',
    bundle: 'Professional',
    frequency: 'Monthly',
    nextBilling: 'Dec 25',
    amount: '$0.00'
  },
  {
    id: 'sub-005',
    risk: 35,
    product: 'Team Plan',
    status: 'active',
    bundle: 'Collaboration',
    frequency: 'Monthly',
    nextBilling: 'Dec 18',
    amount: '$99.99'
  }
];

export type TransactionData = {
  id: string;
  risk: number;
  transactionId: string;
  type: string;
  amount: string;
  paymentMethod: string;
  customer: string;
  date: string;
};

export const TRANSACTION_DATA: TransactionData[] = [
  {
    id: 'txn-001',
    risk: 15,
    transactionId: 'TXN-2024-001',
    type: 'Payment',
    amount: '$1,250.00',
    paymentMethod: 'Visa •••• 4242',
    customer: 'John Smith',
    date: 'Dec 14'
  },
  {
    id: 'txn-002',
    risk: 45,
    transactionId: 'TXN-2024-002',
    type: 'Payment',
    amount: '$850.00',
    paymentMethod: 'Mastercard •••• 5555',
    customer: 'Sarah Johnson',
    date: 'Dec 14'
  },
  {
    id: 'txn-003',
    risk: 25,
    transactionId: 'TXN-2024-003',
    type: 'Refund',
    amount: '-$299.99',
    paymentMethod: 'American Express •••• 3782',
    customer: 'Mike Wilson',
    date: 'Dec 13'
  },
  {
    id: 'txn-004',
    risk: 85,
    transactionId: 'TXN-2024-004',
    type: 'Chargeback',
    amount: '-$1,500.00',
    paymentMethod: 'Visa •••• 4111',
    customer: 'Emily Davis',
    date: 'Dec 13'
  },
  {
    id: 'txn-005',
    risk: 20,
    transactionId: 'TXN-2024-005',
    type: 'Payment',
    amount: '$675.50',
    paymentMethod: 'PayPal',
    customer: 'David Brown',
    date: 'Dec 12'
  },
  {
    id: 'txn-006',
    risk: 30,
    transactionId: 'TXN-2024-006',
    type: 'Payment',
    amount: '$425.75',
    paymentMethod: 'Visa •••• 8888',
    customer: 'Lisa Anderson',
    date: 'Dec 11'
  },
  {
    id: 'txn-007',
    risk: 60,
    transactionId: 'TXN-2024-007',
    type: 'Refund',
    amount: '-$125.00',
    paymentMethod: 'Mastercard •••• 9999',
    customer: 'Robert Taylor',
    date: 'Dec 10'
  }
];

export type InvoiceData = {
  id: string;
  amount: string;
  status: string;
  frequency: string;
  invoiceNumber: string;
  customer: string;
  due: string;
  created: string;
};

export const INVOICE_DATA: InvoiceData[] = [
  {
    id: 'inv-001',
    amount: '$1,250.00',
    status: 'paid',
    frequency: 'Monthly',
    invoiceNumber: 'INV-2024-001',
    customer: 'Acme Corp',
    due: 'Dec 15',
    created: 'Nov 15'
  },
  {
    id: 'inv-002',
    amount: '$850.00',
    status: 'open',
    frequency: 'One-time',
    invoiceNumber: 'INV-2024-002',
    customer: 'Tech Solutions',
    due: 'Dec 20',
    created: 'Nov 20'
  },
  {
    id: 'inv-003',
    amount: '$2,100.00',
    status: 'overdue',
    frequency: 'Quarterly',
    invoiceNumber: 'INV-2024-003',
    customer: 'Global Industries',
    due: 'Dec 05',
    created: 'Nov 05'
  },
  {
    id: 'inv-004',
    amount: '$675.00',
    status: 'draft',
    frequency: 'Monthly',
    invoiceNumber: 'INV-2024-004',
    customer: 'StartupXYZ',
    due: 'Dec 25',
    created: 'Nov 25'
  },
  {
    id: 'inv-005',
    amount: '$1,500.00',
    status: 'paid',
    frequency: 'Monthly',
    invoiceNumber: 'INV-2024-005',
    customer: 'Enterprise LLC',
    due: 'Dec 18',
    created: 'Nov 18'
  },
  {
    id: 'inv-006',
    amount: '$425.00',
    status: 'open',
    frequency: 'Bi-weekly',
    invoiceNumber: 'INV-2024-006',
    customer: 'Creative Studio',
    due: 'Dec 22',
    created: 'Nov 22'
  },
  {
    id: 'inv-007',
    amount: '$3,200.00',
    status: 'overdue',
    frequency: 'Monthly',
    invoiceNumber: 'INV-2024-007',
    customer: 'Manufacturing Co',
    due: 'Dec 08',
    created: 'Nov 08'
  }
];

export type PendingInvoiceItemData = {
  id: string;
  risk: number;
  description: string;
  amount: string;
  qty: number;
  customer: string;
  scheduled: string;
};

export const PENDING_INVOICE_ITEMS_DATA: PendingInvoiceItemData[] = [
  {
    id: 'item-001',
    risk: 20,
    description: 'Monthly subscription charge',
    amount: '$99.99',
    qty: 1,
    customer: 'Alice Johnson',
    scheduled: 'Dec 15'
  },
  {
    id: 'item-002',
    risk: 45,
    description: 'Setup fee',
    amount: '$150.00',
    qty: 1,
    customer: 'Bob Smith',
    scheduled: 'Dec 18'
  },
  {
    id: 'item-003',
    risk: 70,
    description: 'Usage overage',
    amount: '$75.50',
    qty: 3,
    customer: 'Carol Davis',
    scheduled: 'Dec 20'
  },
  {
    id: 'item-004',
    risk: 30,
    description: 'Professional services',
    amount: '$250.00',
    qty: 2,
    customer: 'David Wilson',
    scheduled: 'Dec 22'
  },
  {
    id: 'item-005',
    risk: 15,
    description: 'License renewal',
    amount: '$199.99',
    qty: 1,
    customer: 'Emma Brown',
    scheduled: 'Dec 25'
  },
  {
    id: 'item-006',
    risk: 55,
    description: 'API usage charges',
    amount: '$89.75',
    qty: 4,
    customer: 'Frank Miller',
    scheduled: 'Dec 28'
  },
  {
    id: 'item-007',
    risk: 35,
    description: 'Storage expansion',
    amount: '$125.00',
    qty: 2,
    customer: 'Grace Lee',
    scheduled: 'Dec 30'
  }
];

export type CreditGrantData = {
  id: string;
  name: string;
  available: string;
  eligibility: string;
  priority: string;
  effectiveDate: string;
  expiryDate: string;
  status: string;
};

export const CREDIT_GRANT_DATA: CreditGrantData[] = [
  {
    id: 'cg-001',
    name: 'New Customer Bonus',
    available: '$500',
    eligibility: 'New Customers',
    priority: 'High',
    effectiveDate: 'Jan 15, 2024',
    expiryDate: 'Dec 31, 2024',
    status: 'active'
  },
  {
    id: 'cg-002',
    name: 'Loyalty Reward',
    available: '$250',
    eligibility: 'Returning Customers',
    priority: 'Medium',
    effectiveDate: 'Feb 1, 2024',
    expiryDate: 'Jun 30, 2024',
    status: 'active'
  },
  {
    id: 'cg-003',
    name: 'Seasonal Promotion',
    available: '$100',
    eligibility: 'All Customers',
    priority: 'Low',
    effectiveDate: 'Mar 1, 2024',
    expiryDate: 'May 31, 2024',
    status: 'pending'
  },
  {
    id: 'cg-004',
    name: 'Volume Discount',
    available: '$1,000',
    eligibility: 'Enterprise Customers',
    priority: 'High',
    effectiveDate: 'Jan 1, 2024',
    expiryDate: 'Dec 31, 2024',
    status: 'active'
  },
  {
    id: 'cg-005',
    name: 'Referral Bonus',
    available: '$150',
    eligibility: 'Referred Customers',
    priority: 'Medium',
    effectiveDate: 'Dec 1, 2023',
    expiryDate: 'Feb 28, 2024',
    status: 'expired'
  }
];

export type OrderData = {
  id: string;
  amount: string;
  status: string;
  orderNumber: string;
  customer: string;
  payment: string;
  created: string;
};

export const ORDER_DATA: OrderData[] = [
  {
    id: 'ord-001',
    amount: '$124.50',
    status: 'completed',
    orderNumber: 'ORD-2024-001',
    customer: 'John Smith',
    payment: 'Credit Card',
    created: '01/15/2024'
  },
  {
    id: 'ord-002',
    amount: '$89.25',
    status: 'completed',
    orderNumber: 'ORD-2024-002',
    customer: 'Sarah Johnson',
    payment: 'Debit Card',
    created: '01/15/2024'
  },
  {
    id: 'ord-003',
    amount: '$256.75',
    status: 'pending',
    orderNumber: 'ORD-2024-003',
    customer: 'Mike Chen',
    payment: 'Apple Pay',
    created: '01/15/2024'
  },
  {
    id: 'ord-004',
    amount: '$45.00',
    status: 'canceled',
    orderNumber: 'ORD-2024-004',
    customer: 'Lisa Park',
    payment: 'Cash',
    created: '01/15/2024'
  },
  {
    id: 'ord-005',
    amount: '$178.90',
    status: 'completed',
    orderNumber: 'ORD-2024-005',
    customer: 'David Wilson',
    payment: 'Google Pay',
    created: '01/15/2024'
  },
  {
    id: 'ord-006',
    amount: '$312.40',
    status: 'shipped',
    orderNumber: 'ORD-2024-006',
    customer: 'Emily Davis',
    payment: 'Credit Card',
    created: '01/14/2024'
  },
  {
    id: 'ord-007',
    amount: '$67.85',
    status: 'delivered',
    orderNumber: 'ORD-2024-007',
    customer: 'Robert Taylor',
    payment: 'PayPal',
    created: '01/13/2024'
  }
];

export type QuoteData = {
  id: string;
  amount: string;
  status: string;
  quoteNumber: string;
  customer: string;
  expiration: string;
  created: string;
};

export const QUOTE_DATA: QuoteData[] = [
  {
    id: 'qte-001',
    amount: '$2,500.00',
    status: 'accepted',
    quoteNumber: 'QTE-2024-501',
    customer: 'Alpha Technologies',
    expiration: 'Dec 31',
    created: 'Nov 15'
  },
  {
    id: 'qte-002',
    amount: '$1,875.00',
    status: 'open',
    quoteNumber: 'QTE-2024-502',
    customer: 'Beta Solutions',
    expiration: 'Jan 15',
    created: 'Nov 20'
  },
  {
    id: 'qte-003',
    amount: '$950.00',
    status: 'declined',
    quoteNumber: 'QTE-2024-503',
    customer: 'Gamma Corp',
    expiration: 'Dec 20',
    created: 'Nov 10'
  },
  {
    id: 'qte-004',
    amount: '$3,200.00',
    status: 'draft',
    quoteNumber: 'QTE-2024-504',
    customer: 'Delta Enterprises',
    expiration: 'Jan 30',
    created: 'Dec 01'
  },
  {
    id: 'qte-005',
    amount: '$750.00',
    status: 'expired',
    quoteNumber: 'QTE-2024-505',
    customer: 'Epsilon LLC',
    expiration: 'Dec 01',
    created: 'Oct 15'
  },
  {
    id: 'qte-006',
    amount: '$4,100.00',
    status: 'open',
    quoteNumber: 'QTE-2024-506',
    customer: 'Zeta Industries',
    expiration: 'Feb 15',
    created: 'Dec 05'
  },
  {
    id: 'qte-007',
    amount: '$1,450.00',
    status: 'accepted',
    quoteNumber: 'QTE-2024-507',
    customer: 'Eta Systems',
    expiration: 'Jan 10',
    created: 'Nov 25'
  }
];

export const CUSTOMER_RISK_CHECKS: RiskCheck[] = [
  {
    status: 'error',
    title: 'Identity Verification',
    description: 'Customer identity verification failed. Unable to verify provided government ID document. Document appears to be expired or tampered with. Additional verification documents required to complete KYC process.',
    score: 45
  },
  { 
    status: 'success', 
    title: 'Payment History', 
    description: 'Customer has excellent payment history with 98% on-time payment rate over the past 24 months. No chargebacks or disputes recorded. Average transaction value: $850. Consistent payment patterns indicate reliable customer.',
    score: 12 
  },
  { 
    status: 'success', 
    title: 'Address Verification', 
    description: 'Billing address successfully verified through multiple sources. Address matches bank records, utility bills, and government databases. Customer has maintained stable residence for 3+ years.',
    score: 8 
  },
  { 
    status: 'error', 
    title: 'Device Fingerprinting', 
    description: 'Multiple suspicious device signatures detected. Customer account accessed from 15+ different devices in past 30 days across various geographic locations. Potential account sharing or compromise suspected.',
    score: 38 
  },
  { 
    status: 'success', 
    title: 'Credit Score', 
    description: 'Customer credit score of 742 indicates good creditworthiness. No recent delinquencies or bankruptcies on record. Debt-to-income ratio within acceptable range. Credit utilization below 30%.',
    score: 15 
  },
  { 
    status: 'error', 
    title: 'Behavioral Analysis', 
    description: 'Unusual account activity patterns detected. Significant changes in purchase behavior, login frequency, and transaction amounts in recent weeks. Activity inconsistent with historical customer profile.',
    score: 32 
  }
];

export const CUSTOMER_EVENTS_DATA: EventData[] = [
  {
    id: 'evt_cust_001',
    eventType: 'charge.updated',
    description: 'Customer payment for ch_3Qrh2sLxdSnlxqAY14cC2hSm was updated',
    timestamp: '2/12/25, 4:36:15 PM',
    requestId: 'req_abc123def456',
    status: 'succeeded'
  },
  {
    id: 'evt_cust_002',
    eventType: 'checkout.session.completed',
    description: 'Customer checkout session was completed',
    timestamp: '2/12/25, 4:36:15 PM',
    requestId: 'req_def456ghi789',
    status: 'succeeded'
  },
  {
    id: 'evt_cust_003',
    eventType: 'payment_intent.succeeded',
    description: 'Customer payment pi_3Qrh2sLxdSnlxqAY1sukBfZg succeeded',
    timestamp: '2/12/25, 4:36:15 PM',
    requestId: 'req_ghi789jkl012',
    status: 'succeeded'
  },
  {
    id: 'evt_cust_004',
    eventType: 'charge.succeeded',
    description: 'Charge ch_3Qrh2sLxdSnlxqAY14cC2hSm succeeded',
    timestamp: '2/12/25, 4:36:15 PM',
    requestId: 'req_jkl012mno345',
    status: 'succeeded'
  },
  {
    id: 'evt_cust_005',
    eventType: 'payment_intent.processing',
    description: 'Customer payment intent is being processed',
    timestamp: '2/12/25, 4:36:14 PM',
    requestId: 'req_mno345pqr678',
    status: 'processing'
  },
  {
    id: 'evt_cust_006',
    eventType: 'customer.subscription.updated',
    description: 'Customer subscription plan changed from Basic to Premium',
    timestamp: '2/12/25, 4:36:13 PM',
    requestId: 'req_pqr678stu901',
    status: 'succeeded'
  },
  {
    id: 'evt_cust_007',
    eventType: 'payment_method.attached',
    description: 'New payment method attached to customer account',
    timestamp: '2/12/25, 4:36:12 PM',
    requestId: 'req_stu901vwx234',
    status: 'verified'
  },
  {
    id: 'evt_cust_008',
    eventType: 'invoice.payment_succeeded',
    description: 'Monthly invoice payment of $99.00 completed successfully',
    timestamp: '2/12/25, 4:36:11 PM',
    requestId: 'req_vwx234yza567',
    status: 'succeeded'
  },
  {
    id: 'evt_cust_009',
    eventType: 'customer.created',
    description: 'Customer profile created and verified successfully',
    timestamp: '2/12/25, 4:36:10 PM',
    requestId: 'req_yza567bcd890',
    status: 'verified'
  },
  {
    id: 'evt_cust_010',
    eventType: 'payment_intent.payment_failed',
    description: 'Payment failed due to insufficient funds on linked bank account',
    timestamp: '2/12/25, 4:36:09 PM',
    requestId: 'req_bcd890efg123',
    status: 'failed'
  },
  {
    id: 'evt_cust_011',
    eventType: 'customer.discount.created',
    description: 'Loyalty discount of 15% applied to customer account for 6 months',
    timestamp: '2/12/25, 4:36:08 PM',
    requestId: 'req_efg123hij456',
    status: 'approved'
  },
  {
    id: 'evt_cust_012',
    eventType: 'subscription.trial_will_end',
    description: 'Customer trial period ending in 3 days - notification sent',
    timestamp: '2/12/25, 4:36:07 PM',
    requestId: 'req_hij456klm789',
    status: 'pending'
  }
];

export const CUSTOMER_PAYMENT_METHODS: PaymentMethodItem[] = [
  {
    id: 'cust_pm_001',
    type: 'visa',
    maskedNumber: '•••• 1247',
    status: 'default',
    expirationDate: '09/2027',
    cardholderName: 'John Doe',
    isExpired: false,
    details: [
      { label: 'Payment method', value: 'Visa Credit Card' },
      { label: 'Cardholder', value: 'John Doe' },
      { label: 'Card number', value: 'ending in 1247' },
      { label: 'Expires', value: '09/2027' },
      { label: 'Billing address', value: '123 Main St, New York, NY 10001' },
      { label: 'Issuer', value: 'Bank of America (US)' },
      { label: 'Currency', value: 'USD' },
      { label: 'Added on', value: 'January 15, 2024' },
      { label: 'Last used', value: 'December 20, 2024' },
      { label: 'Usage count', value: '47 transactions' },
      { label: 'Payment method ID', value: 'CPMID_1247_ba_us', isCopyable: true },
      { label: 'Fingerprint', value: 'fp_1a2b3c4d5e6f7g8h', isCopyable: true },
      { label: 'Status', value: 'Default' },
      { label: 'Auto-pay enabled', value: 'Yes' },
      { label: 'Verified', value: 'Yes' }
    ]
  },
  {
    id: 'cust_pm_002',
    type: 'mastercard',
    maskedNumber: '•••• 8891',
    status: 'active',
    expirationDate: '12/2026',
    cardholderName: 'John Doe',
    isExpired: false,
    details: [
      { label: 'Payment method', value: 'Mastercard Debit Card' },
      { label: 'Cardholder', value: 'John Doe' },
      { label: 'Card number', value: 'ending in 8891' },
      { label: 'Expires', value: '12/2026' },
      { label: 'Billing address', value: '123 Main St, New York, NY 10001' },
      { label: 'Issuer', value: 'Chase Bank (US)' },
      { label: 'Currency', value: 'USD' },
      { label: 'Added on', value: 'March 22, 2024' },
      { label: 'Last used', value: 'December 18, 2024' },
      { label: 'Usage count', value: '23 transactions' },
      { label: 'Payment method ID', value: 'CPMID_8891_chase_us', isCopyable: true },
      { label: 'Status', value: 'Active' },
      { label: 'Verified', value: 'Yes' }
    ]
  },
  {
    id: 'cust_pm_003',
    type: 'paypal',
    maskedNumber: 'john.doe@email.com',
    status: 'active',
    cardholderName: 'John Doe',
    isExpired: false,
    details: [
      { label: 'Payment method', value: 'PayPal Account' },
      { label: 'Account holder', value: 'John Doe' },
      { label: 'Email', value: 'john.doe@email.com' },
      { label: 'Account type', value: 'Personal' },
      { label: 'Currency', value: 'USD' },
      { label: 'Added on', value: 'May 10, 2024' },
      { label: 'Last used', value: 'December 15, 2024' },
      { label: 'Usage count', value: '12 transactions' },
      { label: 'PayPal ID', value: 'pp_johndoe_2024_us', isCopyable: true },
      { label: 'Status', value: 'Active' },
      { label: 'Verified', value: 'Yes' }
    ]
  },
  {
    id: 'cust_pm_004',
    type: 'amex',
    maskedNumber: '•••• 3456',
    status: 'expired',
    expirationDate: '08/2024',
    cardholderName: 'John Doe',
    isExpired: true,
    details: [
      { label: 'Payment method', value: 'American Express Credit Card' },
      { label: 'Cardholder', value: 'John Doe' },
      { label: 'Card number', value: 'ending in 3456' },
      { label: 'Expires', value: '08/2024' },
      { label: 'Billing address', value: '123 Main St, New York, NY 10001' },
      { label: 'Issuer', value: 'American Express (US)' },
      { label: 'Currency', value: 'USD' },
      { label: 'Added on', value: 'August 15, 2022' },
      { label: 'Last used', value: 'July 30, 2024' },
      { label: 'Usage count', value: '156 transactions' },
      { label: 'Status', value: 'Expired', showBadge: true, badgeVariant: 'destructive' }
    ]
  }
];

export type InvoiceBalanceData = {
  availableAmount: number;
  description: string;
  lastUpdated: string;
  nextInvoice: string;
};

export const INVOICE_BALANCE_DATA: InvoiceBalanceData = {
  availableAmount: 125.50,
  description: 'Balance will decrease the amount due on the customer\'s next invoice.',
  lastUpdated: 'Jan 10, 2024',
  nextInvoice: 'Jan 30, 2024'
};

export type BalanceData = {
  id: string;
  label: string;
  totalBalance: string;
  balances: { currency: string; amount: number; formatted: string }[];
  status: string;
  bgColor: string;
  textColor: string;
};

export const BALANCE_DATA: BalanceData[] = [
  {
    id: 'pending',
    label: 'Pending',
    totalBalance: '$103,679.14',
    balances: [
      { currency: 'USD', amount: 46077.55, formatted: '$46,077.55' },
      { currency: 'GBP', amount: 23653.14, formatted: '£23,653.14' },
      { currency: 'EUR', amount: 18431.02, formatted: '€18,431.02' },
      { currency: 'USDC', amount: 5119.73, formatted: '5,119.73' }
    ],
    status: 'pending',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-900'
  },
  {
    id: 'operations',
    label: 'Operations',
    totalBalance: '$519,974.00',
    balances: [
      { currency: 'USD', amount: 260358.60, formatted: '$260,358.60' },
      { currency: 'GBP', amount: 108625.51, formatted: '£108,625.51' },
      { currency: 'EUR', amount: 76178.93, formatted: '€76,178.93' },
      { currency: 'USDC', amount: 28234.42, formatted: '28,234.42' }
    ],
    status: 'operations',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-950'
  },
  {
    id: 'marketing',
    label: 'Marketing',
    totalBalance: '$49,625.00',
    balances: [
      { currency: 'GBP', amount: 37218.75, formatted: '£37,218.75' },
      { currency: 'EUR', amount: 11406.25, formatted: '€11,406.25' }
    ],
    status: 'marketing',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-900'
  }
];

