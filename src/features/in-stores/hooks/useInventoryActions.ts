import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Inventory } from '../types/inventory.types';

export function useInventoryActions() {
  const navigate = useNavigate();

  const handleView = useCallback((inventory: Inventory) => {
    navigate(`/in-stores/inventory/${inventory.id}`);
  }, [navigate]);

  const copyInventoryId = useCallback((id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Inventory ID copied to clipboard');
  }, []);

  const handleActivateTerminal = useCallback((id?: string) => {
    if (id) {
      console.log('Activating terminal:', id);
      toast.success('Terminal activated');
    } else {
      console.log('Activate Terminal action');
      toast.success('Terminal activation initiated');
    }
  }, []);

  const handleReturnTerminal = useCallback((id?: string) => {
    if (id) {
      console.log('Returning terminal:', id);
      toast.success('Terminal return initiated');
    } else {
      console.log('Return Terminal action');
      toast.success('Terminal return process started');
    }
  }, []);

  const handleOrderTerminal = useCallback(() => {
    navigate('/in-stores/order');
  }, [navigate]);

  const handleBatchExport = useCallback((selectedIds: string[]) => {
    console.log('Exporting inventory items:', selectedIds);
    toast.success(`Exported ${selectedIds.length} inventory items`);
  }, []);

  const handleBatchActivate = useCallback((selectedIds: string[]) => {
    console.log('Activating inventory items:', selectedIds);
    toast.success(`Activated ${selectedIds.length} terminals`);
  }, []);

  const handleBatchDeactivate = useCallback((selectedIds: string[]) => {
    console.log('Deactivating inventory items:', selectedIds);
    toast.success(`Deactivated ${selectedIds.length} terminals`);
  }, []);

  const handleBatchReturn = useCallback((selectedIds: string[]) => {
    console.log('Returning inventory items:', selectedIds);
    toast.success(`Initiated return for ${selectedIds.length} terminals`);
  }, []);

  return {
    handleView,
    copyInventoryId,
    handleActivateTerminal,
    handleReturnTerminal,
    handleOrderTerminal,
    handleBatchExport,
    handleBatchActivate,
    handleBatchDeactivate,
    handleBatchReturn
  };
}
