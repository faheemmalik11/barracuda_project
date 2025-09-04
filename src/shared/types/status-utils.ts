import type { TransactionStatus, StatusCategory, StatusPriority, SuccessStatus, FailedStatus, RefundStatus, DisputeStatus, ProcessingStatus } from './payment-status.types';
import { STATUS_CONFIGS } from './status-configs.data';

// Status utility functions for better type safety and business logic

export function getStatusConfig(status: TransactionStatus) {
  return STATUS_CONFIGS[status];
}

export function getStatusCategory(status: TransactionStatus): StatusCategory {
  return STATUS_CONFIGS[status].category;
}

export function getStatusPriority(status: TransactionStatus): StatusPriority {
  return STATUS_CONFIGS[status].priority;
}

export function isSuccessStatus(status: TransactionStatus): status is SuccessStatus {
  return ['authorized', 'succeeded', 'verified'].includes(status);
}

export function isFailedStatus(status: TransactionStatus): status is FailedStatus {
  return ['declined', 'failed', 'blocked', 'denied', 'expired'].includes(status);
}

export function isRefundStatus(status: TransactionStatus): status is RefundStatus {
  return getStatusCategory(status) === 'refund';
}

export function isDisputeStatus(status: TransactionStatus): status is DisputeStatus {
  return getStatusCategory(status) === 'dispute';
}

export function isProcessingStatus(status: TransactionStatus): status is ProcessingStatus {
  return getStatusCategory(status) === 'processing';
}

export function canRefund(status: TransactionStatus): boolean {
  return STATUS_CONFIGS[status].actions.some(action => action.action === 'refund');
}

export function canCapture(status: TransactionStatus): boolean {
  return STATUS_CONFIGS[status].actions.some(action => action.action === 'capture');
}

export function canCancel(status: TransactionStatus): boolean {
  return STATUS_CONFIGS[status].actions.some(action => action.action === 'cancel');
}

export function canRetry(status: TransactionStatus): boolean {
  return STATUS_CONFIGS[status].actions.some(action => action.action === 'retry');
}

export function requiresAction(status: TransactionStatus): boolean {
  return getStatusPriority(status) === 'high' || getStatusPriority(status) === 'critical';
}

export function getAvailableActions(status: TransactionStatus) {
  return STATUS_CONFIGS[status].actions;
}

export function getStatusColor(status: TransactionStatus) {
  return STATUS_CONFIGS[status].color;
}