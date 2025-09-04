export interface Ecommerce extends Record<string, unknown> {
  id: string;
  transactionRef: string;
  name: string;
  status: 'active' | 'inactive';
  type: 'hosted_checkout' | 'api' | 'drops' | 'elements' | 'link';
  environment: 'live' | 'test';
  description: string;
  transactions30d: number;
  volume30d: number;
  successRate: number;
  lastUsed: string;
  created: string;
}

export interface EcommerceFilters {
  status: string;
  type: string;
  environment: string;
  search: string;
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
}

export interface EcommerceTableProps {
  data: Ecommerce[];
  onView: (ecommerce: Ecommerce) => void;
  onCopyId: (id: string) => void;
}
