import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Terminal } from '../types/terminals.types';

export function useTerminalActions() {
  const navigate = useNavigate();

  const handleView = useCallback((terminal: Terminal) => {
    navigate(`/in-stores/terminals/${terminal.id}`);
  }, [navigate]);

  const handleRestartTerminal = useCallback((terminal: Terminal) => {
    console.log('Restarting terminal:', terminal.id);
    toast.success(`Terminal ${terminal.label} is restarting`);
  }, []);

  const handleConfigureTerminal = useCallback((terminal: Terminal) => {
    navigate(`/in-stores/terminals/${terminal.id}/configure`);
  }, [navigate]);

  const handleUpdateStatus = useCallback((terminal: Terminal, status: string) => {
    console.log('Updating terminal status:', terminal.id, status);
    toast.success(`Terminal ${terminal.label} status updated to ${status}`);
  }, []);

  const handleBatchExport = useCallback((selectedIds: string[]) => {
    console.log('Exporting terminals:', selectedIds);
    toast.success(`Exported ${selectedIds.length} terminals`);
  }, []);

  const handleBatchRestart = useCallback((selectedIds: string[]) => {
    console.log('Restarting terminals:', selectedIds);
    toast.success(`Restarted ${selectedIds.length} terminals`);
  }, []);

  const handleBatchConfigure = useCallback((selectedIds: string[]) => {
    console.log('Configuring terminals:', selectedIds);
    toast.success(`Configured ${selectedIds.length} terminals`);
  }, []);

  const handleBatchUpdateStatus = useCallback((selectedIds: string[], status: string) => {
    console.log('Updating terminal status:', selectedIds, status);
    toast.success(`Updated status for ${selectedIds.length} terminals to ${status}`);
  }, []);

  return {
    handleView,
    handleRestartTerminal,
    handleConfigureTerminal,
    handleUpdateStatus,
    handleBatchExport,
    handleBatchRestart,
    handleBatchConfigure,
    handleBatchUpdateStatus
  };
}
