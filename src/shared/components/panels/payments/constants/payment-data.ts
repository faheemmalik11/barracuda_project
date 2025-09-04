import { PaymentInfo, PaymentDetail, Receipt, RelatedPayment, MenuItem } from "../types/payment-details.types";
import type { RiskCheck } from "@shared/types/risk.types";

export const PAYMENTS_DATA: PaymentInfo[] = [
  {
    id: 'payment_001',
    amount: "USD 4,235.00",
    lastUpdate: "01/15/2024, 14:30:15",
    customer: "acme@corp.com",
    paymentMethod: "Stripe",
    risk: "2",
    channel: "ECOM",
    status: "succeeded",
    statusDetails: {
      category: 'success',
      priority: 'low',
      canRefund: true
    }
  },
  {
    id: 'payment_002',
    amount: "USD 2,150.50",
    lastUpdate: "01/14/2024, 09:22:41",
    customer: "contact@techsolutions.com",
    paymentMethod: "PayPal",
    risk: "1",
    channel: "API",
    status: "processing",
    statusDetails: {
      category: 'processing',
      priority: 'medium',
      requiresAction: false
    }
  },
  {
    id: 'payment_003',
    amount: "USD 875.25",
    lastUpdate: "01/13/2024, 16:45:33",
    customer: "info@globalservices.com",
    paymentMethod: "Bank Transfer",
    risk: "5",
    channel: "POS",
    status: "declined",
    statusDetails: {
      category: 'failed',
      priority: 'medium',
      canRetry: true,
      reason: "Insufficient funds"
    }
  },
  {
    id: 'payment_004',
    amount: "USD 750.50",
    lastUpdate: "01/07/2024, 12:15:45",
    customer: "payments@consultingfirm.com",
    paymentMethod: "Credit Card",
    risk: "9",
    channel: "ECOM",
    status: "blocked",
    statusDetails: {
      category: 'failed',
      priority: 'high',
      requiresAction: true,
      reason: "Flagged by fraud prevention system"
    }
  },
  {
    id: 'payment_005',
    amount: "USD 1,250.00",
    lastUpdate: "09/24/2024, 12:41:00",
    customer: "underreview@example.com",
    paymentMethod: "Credit Card",
    risk: "9",
    channel: "ECOM",
    status: "under_review",
    statusDetails: {
      category: 'warning',
      priority: 'high',
      requiresAction: true,
      reason: "Payment flagged for manual review due to high risk score"
    }
  },
  {
    id: 'payment_006',
    amount: "USD 3,200.00",
    lastUpdate: "09/18/2024, 14:20:00",
    customer: "chargeback@example.com",
    paymentMethod: "Visa",
    risk: "7",
    channel: "ECOM",
    status: "chargeback",
    statusDetails: {
      category: 'dispute',
      priority: 'high',
      requiresAction: true,
      reason: "Chargeback initiated by cardholder's bank"
    }
  }
];

export const PAYMENT_INFO: PaymentInfo = PAYMENTS_DATA[0];

export const PAYMENT_DETAILS: PaymentDetail[] = [
  { label: 'Payment Reference', value: 'PAYREF7g82k1m3q9z4' },
  { label: 'Execution date', value: '09/28/2024 18:00' },
  { label: 'Card Network Reference', value: 'MC 817289471294124' },
  { label: 'ARN', value: '68764873264527365423' },
  { label: 'Authorization code', value: '647283' },
  { label: 'Response code', value: '00 (Approved)' },
  { label: 'PAN sequence number', value: '1234' },
  { label: 'Retry', value: 'Single' },
  
  { label: 'Description', value: 'Monthly subscription fee' },
  { label: 'Statement on card', value: 'BRIK*SUBSCRIPTION' },
  { label: 'Order', value: 'ORD-00842' },
  { label: 'Subscription', value: 'SUBC-00847' },
  
  { label: 'Bank', value: 'Chase Bank' },
  { label: 'Organization', value: 'BrikLabs' },
  { label: 'Product platform', value: 'Core Commerce' },
  { label: 'Program', value: 'Recurring Billing Program' },
  { label: 'Processor', value: 'Stripe' },
  
  { label: 'Merchant', value: 'BRIK US' },
  { label: 'MID', value: 'MID-219389' },
  { label: 'Checkout source', value: 'API via Hosted Page' }
];

export const CUSTOMER_DETAILS: PaymentDetail[] = [
  { label: 'Account', value: 'user_9847abx52q' },
  { label: 'Name', value: 'John Doe' },
  { label: 'Email', value: 'johndoe@example.com' },
  { label: 'Shipping address', value: '123 Main St, New York, NY 10001, United States' },
  { label: 'Risk', value: '4/50 (Low Risk)' },
  { label: 'Last activity', value: '09/28/2024 18:00' }
];

export const TIMELINE_EVENTS_DATA = [
  {
    id: 'payment-successful',
    title: 'Payment successful',
    timestamp: '09/24/2024 12:41',
    iconType: 'success'
  },
  {
    id: 'recurring-payments',
    title: 'Set for recurring payments',
    timestamp: '09/24/2024 12:41',
    iconType: 'process'
  },
  {
    id: '3ds-auth',
    title: '3DS Authentication',
    timestamp: '09/24/2024 12:41',
    iconType: 'security',
    details: [
      { action: 'Challenge initiated', timestamp: '09/24/2024 12:40' },
      { action: 'Customer authenticated', timestamp: '09/24/2024 12:40' },
      { action: 'Authentication successful', timestamp: '09/24/2024 12:41' }
    ]
  },
  {
    id: 'payment-processing',
    title: 'Payment Processing',
    timestamp: '09/24/2024 12:42',
    iconType: 'process'
  },
  {
    id: 'security-check',
    title: 'Security Check',
    timestamp: '09/24/2024 12:43',
    iconType: 'security',
    details: [
      { action: 'Risk assessment', timestamp: '09/24/2024 12:38' }
    ]
  },
  {
    id: 'payment-completed',
    title: 'Payment Completed',
    timestamp: '09/24/2024 12:44',
    iconType: 'success'
  },
  {
    id: 'payment-initiated',
    title: 'Payment initiated',
    timestamp: '09/24/2024 12:37',
    iconType: 'process'
  }
];

export const RELATED_PAYMENTS: RelatedPayment[] = [
  {
    id: 'rel_payment_001',
    risk: 9,
    riskLevel: 'high',
    amount: 'USD 128.00',
    status: 'failed',
    customer: '165276531',
    paymentMethod: 'POS',
    date: '09/24/2024 15:40:12'
  },
  {
    id: 'rel_payment_002',
    risk: 3,
    riskLevel: 'low',
    amount: 'USD 420.50',
    status: 'processing',
    customer: '165276531',
    paymentMethod: 'ECOM',
    date: '09/24/2024 15:40:12'
  },
  {
    id: 'rel_payment_003',
    risk: 7,
    riskLevel: 'medium',
    amount: 'USD 1,250.75',
    status: 'succeeded',
    customer: '298765432',
    paymentMethod: 'Stripe',
    date: '09/24/2024 14:30:45'
  }
];

export const RISK_CHECKS: RiskCheck[] = [
  {
    status: 'error',
    title: 'Bank Verification',
    description: 'Bank verification failed due to insufficient funds or account restrictions. The issuing bank declined the transaction with response code 05 (Do Not Honor). This indicates potential account issues or spending limits that prevent processing.',
    score: 4
  },
  { 
    status: 'success', 
    title: '3DS Status and Details', 
    description: '3D Secure authentication completed successfully. Customer was challenged and provided valid authentication through their bank\'s verification system. Payment authenticated with liability shift to issuer. Authentication method: SMS OTP verification.',
    score: 85 
  },
  { 
    status: 'success', 
    title: 'Postal Code Verification', 
    description: 'Postal code verification passed successfully. The provided ZIP/postal code matches the billing address on file with the card issuer. AVS response: Z (ZIP matches, address does not match). This provides additional validation of cardholder identity.',
    score: 8 
  },
  { 
    status: 'success', 
    title: 'Card Verification', 
    description: 'Card verification value (CVV) check passed. The 3-digit security code provided matches the code on file with the issuing bank. Card is valid and not reported as lost, stolen, or fraudulent. Last 4 digits: 1234, expires 08/2026.',
    score: 12 
  },
  { 
    status: 'success', 
    title: 'Address Verification', 
    description: 'Address verification system (AVS) check completed with partial match. Street address matches billing records, but ZIP code verification returned a mismatch. This is common with recent moves or PO Box addresses. Risk level remains low.',
    score: 5 
  }
];

export const RECEIPTS: Receipt[] = [
  {
    name: 'Refund from farecloud',
    timestamp: '09/28/2024 15:30'
  },
  {
    name: 'Refund from wordpress.com',
    timestamp: '09/27/2024 11:45'
  },
  {
    name: 'Receipt for refund from company',
    timestamp: '09/26/2024 14:20'
  },
  {
    name: 'Receipt for payment from company',
    timestamp: '09/25/2024 10:15'
  },
  {
    name: 'Invoice from company',
    timestamp: '09/24/2024 09:30'
  }
];

export const FEES_DETAILS: PaymentDetail[] = [
  { label: 'Original amount', value: 'USD 1,680.00' },
  { label: 'Captured', value: 'USD 1,680.00' },
  { label: 'Refunded', value: 'USD 0.00' },
  { label: 'Tax', value: 'USD 134.40' },
  { label: 'Tip', value: 'USD 0.00' },
  { label: 'Surcharge', value: 'USD 0.00' },
  { label: 'Total fees', value: 'USD 28.70' },
  { label: 'Net accepted amount', value: 'USD 1,651.30' },
  { label: 'Net settlement amount (EUR)', value: '1,519.20 (1USD = 0.92) EUR' },
  { label: 'Refundable balance', value: 'USD 1,680.00' },
  { label: 'Acquirer fee', value: 'USD 11.76' },
  { label: 'Scheme fees', value: 'USD 3.46' },
  { label: 'Interchange', value: 'USD 18.48' },
  { label: 'Adjustments', value: 'USD 5.00' }
];

export const TAX_CALCULATION_DETAILS: PaymentDetail[] = [
  { label: 'Tax location', value: 'AL Albania' },
  { label: 'Tax amount', value: '$0.00 USD' },
  { label: 'Customer Tax ID', value: 'No Tax ID provided' },
  { 
    label: 'Taxability', 
    value: 'Not registered',
    showBadge: true,
    badgeVariant: 'destructive'
  },
  { label: 'Shipping address', value: 'No address' },
  { label: 'Customer billing address', value: 'Albania' },
  { label: 'Customer IP address', value: 'No IP address provided' }
];

export const PAYMENT_METHOD_DETAILS: PaymentDetail[] = [
  { label: 'Payment method', value: 'Card' },
  { label: 'Card number', value: '•••• •••• •••• 1234' },
  { label: 'Card type', value: 'Visa' },
  { label: 'Expiry date', value: '08/2026' },
  { label: 'Cardholder name', value: 'John Smith' },
  { label: 'Billing address', value: '123 Main St, New York, NY 10001' },
  { label: 'CVV verification', value: 'Passed' },
  { label: 'Address verification', value: 'Partial match' },
  { label: 'Issuing bank', value: 'Chase Bank' },
  { label: 'Card country', value: 'United States' }
];

export const PAYMENT_SECURITY_DETAILS: PaymentDetail[] = [
  { label: 'Postal Code', value: '10001' },
  { label: 'Country of origin', value: 'United States (US)' },
  { label: 'AVS Check', value: '✓ Match' },
  { label: 'CVV/CVC check', value: '✓ Match' },
  { label: '3DS required', value: '✓ Yes' },
  { label: '3DS status', value: '✓ Successful' },
  { label: '3DS retries', value: '0' },
  { label: 'Liability shift', value: '✓ Yes, issuer accepted fraud risk' },
  { label: 'Merchant requested 3DS', value: '✓ Yes (via Dynamic 3DS)' },
  { label: 'Dynamic 3DS trigger', value: 'Default rule triggered: "Always propose 3DS"' },
  { label: 'Exemption', value: 'None' },
  { label: 'Exemption reason', value: 'None' },
  { label: '3DS Version', value: 'None' }
];

export const MENU_ITEMS: MenuItem[] = [
  { name: 'Home', icon: 'home' },
  {
    name: 'Payments',
    icon: 'transactions',
    active: true,
    children: ['Payments', 'Collections', 'Payouts', 'Operations', 'Refunds', 'Disputes']
  },
  { name: 'Customers', icon: 'user' },
  { name: 'Wallets', icon: 'wallet' },
  { name: 'Reports', icon: 'pie-chart' }
];

