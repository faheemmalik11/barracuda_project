// Sample events data for EventsLogsSection
// This will be replaced with real API data in the future

import type { EventData } from '@shared/types/events.types';

export const SAMPLE_EVENTS: EventData[] = [
  {
    id: 'evt_1',
    eventType: 'payment.authorized',
    description: 'Payment of $2,450.00 authorized successfully via Visa ending in 4242',
    timestamp: '2/12/25, 4:36:18 PM',
    requestId: 'req_7k8m9n0p1q2r',
    status: 'approved'
  },
  {
    id: 'evt_2',
    eventType: 'fraud_check.completed',
    description: 'Risk assessment completed with score 0.15 - Low risk transaction',
    timestamp: '2/12/25, 4:36:17 PM',
    requestId: 'req_3s4t5u6v7w8x',
    status: 'verified'
  },
  {
    id: 'evt_3',
    eventType: 'payment.captured',
    description: 'Payment captured and funds transferred to merchant account',
    timestamp: '2/12/25, 4:36:16 PM',
    requestId: 'req_9y0z1a2b3c4d',
    status: 'succeeded'
  },
  {
    id: 'evt_4',
    eventType: 'webhook.sent',
    description: 'Payment confirmation webhook delivered to merchant endpoint',
    timestamp: '2/12/25, 4:36:15 PM',
    requestId: 'req_5e6f7g8h9i0j',
    status: 'succeeded'
  },
  {
    id: 'evt_5',
    eventType: 'settlement.initiated',
    description: 'Settlement batch processing initiated for $2,450.00',
    timestamp: '2/12/25, 4:36:14 PM',
    requestId: 'req_1k2l3m4n5o6p',
    status: 'processing'
  },
  {
    id: 'evt_6',
    eventType: 'customer.created',
    description: 'New customer profile created for john.doe@example.com',
    timestamp: '2/12/25, 4:36:13 PM',
    requestId: 'req_7q8r9s0t1u2v',
    status: 'succeeded'
  },
  {
    id: 'evt_7',
    eventType: 'card.validated',
    description: 'Card validation completed for Visa **** 4242',
    timestamp: '2/12/25, 4:36:12 PM',
    requestId: 'req_3w4x5y6z7a8b',
    status: 'verified'
  },
  {
    id: 'evt_8',
    eventType: 'payment.initiated',
    description: 'Payment request initiated for $2,450.00 from checkout session',
    timestamp: '2/12/25, 4:36:10 PM',
    requestId: 'req_9c0d1e2f3g4h',
    status: 'pending'
  },
  {
    id: 'evt_9',
    eventType: 'error.processing',
    description: 'Transaction processing failed during payment authorization. AVS validation timeout from upstream processor. Customer used card ending in 4532 for $1,247.89 transaction.',
    timestamp: '2/12/25, 4:36:09 PM',
    requestId: 'req_error_long_desc_123',
    status: 'failed'
  },
  {
    id: 'evt_10',
    eventType: 'compliance.check',
    description: 'KYC and AML compliance verification completed successfully. Customer John Smith verified through multiple data sources and approved for high-value transactions.',
    timestamp: '2/12/25, 4:36:08 PM',
    requestId: 'req_compliance_detailed_456',
    status: 'approved'
  },
  {
    id: 'evt_11',
    eventType: 'webhook.retry',
    description: 'Webhook delivery retry #3 failed with HTTP 500 error. Merchant endpoint: https://api.merchant-example.com/payments/webhook',
    timestamp: '2/12/25, 4:36:07 PM',
    requestId: 'req_webhook_retry_789',
    status: 'processing'
  }
];