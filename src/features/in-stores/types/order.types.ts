export interface Order extends Record<string, unknown> {
  id: string;
  transactionRef: string;
  orderId: string;
  description: string;
  status: 'pending' | 'confirmed' | 'fulfilled' | 'cancelled' | 'returned';
  totalAmount: number;
  itemCount: number;
  orderDate: string;
  expectedDelivery: string;
  priority: 'low' | 'medium' | 'high';
  store?: string;
  customer?: string;
  lastUpdated?: string;
  trackingNumber?: string;
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded';
}

export interface OrderFilters {
  status: string;
  priority: string;
  store: string;
  orderDate: string;
  search: string;
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
}

export interface OrderTableProps {
  data: Order[];
  onView: (order: Order) => void;
  onCancel?: (id: string) => void;
  onReturn?: (id: string) => void;
}
