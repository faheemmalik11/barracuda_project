import type { Order } from "../types/orders"

export const mockOrders: Order[] = [
  {
    id: "ord_1001",
    customer: { name: "John Doe", email: "john.doe@example.com" },
    amount: 15000, // $150.00
    currency: "USD",
    status: "delivered",
    items: [
      { productId: "prod_A", productName: "Wireless Mouse", quantity: 1, price: 2500 },
      { productId: "prod_B", productName: "Keyboard", quantity: 1, price: 7500 },
      { productId: "prod_C", productName: "Mousepad", quantity: 2, price: 2500 },
    ],
    payment: "payment_ord_1001",
    createdAt: "2024-05-01T10:00:00Z",
    updatedAt: "2024-05-03T14:30:00Z",
    fulfillment: "completed",
    shipping: "123 Main St, Anytown, USA",
  },
  {
    id: "ord_1002",
    customer: { name: "Jane Smith", email: "jane.smith.example@examplecompanyname.com" },
    amount: 7500, // $75.00
    currency: "USD",
    status: "pending",
    items: [{ productId: "prod_D", productName: "USB Hub", quantity: 1, price: 7500 }],
    payment: "payment_ord_1002",
    createdAt: "2024-05-10T11:30:00Z",
    updatedAt: "2024-05-10T11:30:00Z",
    fulfillment: "pending",
    shipping: "456 Oak Ave, Otherville, USA",
  },
  {
    id: "ord_1003",
    customer: { name: "Bob Johnson", email: "bob.johnson@example.com" },
    amount: 29999, // $299.99
    currency: "USD",
    status: "shipped",
    items: [{ productId: "prod_E", productName: "27-inch Monitor", quantity: 1, price: 29999 }],
    payment: "payment_ord_1003",
    createdAt: "2024-05-12T09:15:00Z",
    updatedAt: "2024-05-13T10:00:00Z",
    fulfillment: "in_transit",
    shipping: "789 Pine Ln, Sometown, USA",
  },
  {
    id: "ord_1004",
    customer: { name: "Alice Wilson", email: "alice.wilson@example.com" },
    amount: 4500, // $45.00
    currency: "USD",
    status: "cancelled",
    items: [{ productId: "prod_F", productName: "Webcam", quantity: 1, price: 4500 }],
    payment: "payment_ord_1004",
    createdAt: "2024-05-14T16:00:00Z",
    updatedAt: "2024-05-15T10:00:00Z",
    fulfillment: "cancelled",
    shipping: "pending",
  },
  {
    id: "ord_1005",
    customer: { name: "Charlie Brown", email: "charlie.brown.example@verylongcompanydomainname.com" },
    amount: 12000, // $120.00
    currency: "EUR",
    status: "processing",
    items: [{ productId: "prod_G", productName: "External SSD 1TB", quantity: 1, price: 12000 }],
    payment: "payment_ord_1005",
    createdAt: "2024-05-16T08:20:00Z",
    updatedAt: "2024-05-16T14:00:00Z",
    fulfillment: "processing",
    shipping: "10 Downing St, London, UK",
  },
]
