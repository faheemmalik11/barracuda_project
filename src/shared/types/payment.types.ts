export enum TransactionState {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  VOIDED = 'VOIDED',
  DECLINED = 'DECLINED',
  CAPTURE_IN_PROGRESS = 'CAPTURE_IN_PROGRESS',
  CAPTURED = 'CAPTURED',
  CAPTURE_FAILED = 'CAPTURE_FAILED',
  SETTLED = 'SETTLED',
  FAILED = 'FAILED'
}

export type PaymentStatus = 
  | 'pending'
  | 'succeeded'
  | 'failed'
  | 'canceled'
  | 'refunded'
  | 'uncaptured';


export interface Amount {
  amount: number;
  decimal: number;
  currency: string;
}

export interface TransactionAmounts {
  original: Amount;
  approved: Amount;
  cashback: Amount;
  billing: Amount;
}



export interface TransactionTimestamps {
  initiated: string;
  authorized: string;
}

export interface PaymentCustomer {
  id: string;
  name: string;
  email?: string;
}

export interface PaymentMethod {
  type: string;
  displayString?: string;
  last4?: string;
  brand?: string;
}


export interface Payment {
  id: string;
  amount: Amount;
  amounts?: TransactionAmounts;
  currency: string;
  status: PaymentStatus;
  description?: string;
  customer?: PaymentCustomer;
  paymentMethod?: PaymentMethod;
  createdAt: string;
  timestamps?: TransactionTimestamps;
  transactionRef: string;
  account?: BackendAccount;
  metadata?: Record<string, unknown>;
  lastUpdated?: Date;
  // Additional optional properties for extended payment data
  channel?: string;
  eligibility?: string;
  store?: string;
  declineReason?: string;
  riskScore?: string | number;
  merchant?: string;
  program?: string;
  organization?: string;
  bank?: string;
  productPlatform?: string;
  processor?: string;
}

export interface BackendAccount {
  accountId: string;
  name: string;
  email?: string;
}


export interface Transaction {
  id: number;
  refId?: number;
  riskScore?: number;
  transactionRef?: string;
  scheme: string;
  channel?: number;
  account: BackendAccount;
  capture?: number;
  state: TransactionState | number;
  acquirerId?: string;
  terminalId: string;
  rrn: string;
  schemeResponseCode?: string;
  authIdentCode?: string;
  transactionIdentifier?: string;
  cvvResultCode?: string;
  avsResultCode?: string;
  aniResultCode?: string;
  panLast4: string;
  threeDSStatusCode?: string;
  binLookupId?: string;
  transactionType: string | number;
  amounts: TransactionAmounts;
  responseCode?: string;
  currencies?: {
    transaction?: string;
  };
  timestamps?: TransactionTimestamps;
  fees?: any[];
  tokenUsed?: boolean;
  clearingData?: any[];
  settlementData?: any[];
  events?: any[];
  description?: string;
}

export interface ListTransactionsResponse {
  results: Transaction[];
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  facets?: Record<string, unknown>;
}

export interface TransactionListParams {
  state?: TransactionState | string;
  page?: number;
  size?: number;
}

export const formatAmount = (amount: Amount): string => {
  const value = amount.amount / Math.pow(10, amount.decimal);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: amount.currency,
    minimumFractionDigits: amount.decimal,
    maximumFractionDigits: amount.decimal,
  }).format(value);
};

