import type { Order } from '@features/in-stores/types/order.types';

export interface OrderInfo {
  id: string;
  orderId: string;
  description: string;
  status: string;
  totalAmount: number;
  itemCount: number;
  orderDate: string;
  expectedDelivery: string;
  priority: string;
  store?: string;
  customer?: string;
  lastUpdated?: string;
  trackingNumber?: string;
  paymentStatus?: string;
}

export function convertOrderToOrderInfo(order: Order): OrderInfo {
  return {
    id: order.id,
    orderId: order.orderId,
    description: order.description,
    status: order.status,
    totalAmount: order.totalAmount,
    itemCount: order.itemCount,
    orderDate: order.orderDate,
    expectedDelivery: order.expectedDelivery,
    priority: order.priority,
    store: order.store,
    customer: order.customer,
    lastUpdated: order.lastUpdated,
    trackingNumber: order.trackingNumber,
    paymentStatus: order.paymentStatus
  };
}
