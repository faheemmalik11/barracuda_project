import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Ecommerce } from '../types/ecommerce.types';

export function useEcommerceActions() {
  const navigate = useNavigate();

  const handleView = useCallback((ecommerce: Ecommerce) => {
    navigate(`/ecommerce/${ecommerce.id}`);
  }, [navigate]);

  const copyEcommerceId = useCallback((id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Ecommerce ID copied to clipboard');
  }, []);

  const handleConfigureHostedCheckout = useCallback(() => {
    navigate('/ecommerce/configure/hosted-checkout');
  }, [navigate]);

  const handleConfigureAPI = useCallback(() => {
    navigate('/ecommerce/configure/api');
  }, [navigate]);

  const handleConfigureDrops = useCallback(() => {
    navigate('/ecommerce/configure/drops');
  }, [navigate]);

  const handleConfigureElements = useCallback(() => {
    navigate('/ecommerce/configure/elements');
  }, [navigate]);

  const handleBatchExport = useCallback((selectedIds: string[]) => {
    console.log('Exporting ecommerce configurations:', selectedIds);
    toast.success(`Exported ${selectedIds.length} configurations`);
  }, []);

  const handleBatchActivate = useCallback((selectedIds: string[]) => {
    console.log('Activating ecommerce configurations:', selectedIds);
    toast.success(`Activated ${selectedIds.length} configurations`);
  }, []);

  const handleBatchDeactivate = useCallback((selectedIds: string[]) => {
    console.log('Deactivating ecommerce configurations:', selectedIds);
    toast.success(`Deactivated ${selectedIds.length} configurations`);
  }, []);

  return {
    handleView,
    copyEcommerceId,
    handleConfigureHostedCheckout,
    handleConfigureAPI,
    handleConfigureDrops,
    handleConfigureElements,
    handleBatchExport,
    handleBatchActivate,
    handleBatchDeactivate
  };
}
