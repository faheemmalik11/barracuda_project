export interface EventData {
  id: string;
  eventType: string;
  description: string;
  timestamp: string;
  requestId: string;
  status: 'succeeded' | 'approved' | 'verified' | 'processing' | 'failed' | 'pending';
}