import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Order } from '../types/order.types';

export function useOrderActions() {
  const navigate = useNavigate();

  const handleView = useCallback((order: Order) => {
    navigate(`/in-stores/orders/${order.id}`);
  }, [navigate]);

  const copyOrderId = useCallback((id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Order ID copied to clipboard');
  }, []);

  const handleCancelOrder = useCallback((id?: string) => {
    if (id) {
      console.log('Cancelling order:', id);
      toast.success('Order cancelled');
    } else {
      console.log('Cancel Order action');
      toast.success('Order cancellation initiated');
    }
  }, []);

  const handleReturnOrder = useCallback((id?: string) => {
    if (id) {
      console.log('Returning order:', id);
      toast.success('Order return initiated');
    } else {
      console.log('Return Order action');
      toast.success('Order return process started');
    }
  }, []);

  const handleOrderTerminal = useCallback(() => {
    navigate('/in-stores/order');
  }, [navigate]);

  const handleBatchExport = useCallback((selectedIds: string[]) => {
    console.log('Exporting orders:', selectedIds);
    toast.success(`Exported ${selectedIds.length} orders`);
  }, []);

  const handleBatchCancel = useCallback((selectedIds: string[]) => {
    console.log('Cancelling orders:', selectedIds);
    toast.success(`Cancelled ${selectedIds.length} orders`);
  }, []);

  const handleBatchReturn = useCallback((selectedIds: string[]) => {
    console.log('Returning orders:', selectedIds);
    toast.success(`Initiated return for ${selectedIds.length} orders`);
  }, []);

  const handleBatchFulfill = useCallback((selectedIds: string[]) => {
    console.log('Fulfilling orders:', selectedIds);
    toast.success(`Fulfilled ${selectedIds.length} orders`);
  }, []);

  return {
    handleView,
    copyOrderId,
    handleCancelOrder,
    handleReturnOrder,
    handleOrderTerminal,
    handleBatchExport,
    handleBatchCancel,
    handleBatchReturn,
    handleBatchFulfill
  };
}
