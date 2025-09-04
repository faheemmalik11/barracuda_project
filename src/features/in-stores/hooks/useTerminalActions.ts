import { useState } from 'react';
import { toast } from 'sonner';
import { TerminalService } from '../services/terminal.service';

export const useTerminalActions = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleView = (terminal: any) => {
    console.log('View terminal:', terminal);
  };

  const handleActivate = async (terminal: any) => {
    setIsLoading(true);
    try {
      await TerminalService.updateTerminalStatus(terminal.id, 'active');
      toast.success(`Terminal ${terminal.serialNumber} activated successfully`);
    } catch (error) {
      toast.error('Failed to activate terminal');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeactivate = async (terminal: any) => {
    setIsLoading(true);
    try {
      await TerminalService.updateTerminalStatus(terminal.id, 'inactive');
      toast.success(`Terminal ${terminal.serialNumber} deactivated successfully`);
    } catch (error) {
      toast.error('Failed to deactivate terminal');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = async (terminal: any) => {
    setIsLoading(true);
    try {
      await TerminalService.restartTerminal(terminal.id);
      toast.success(`Terminal ${terminal.serialNumber} restarted successfully`);
    } catch (error) {
      toast.error('Failed to restart terminal');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfigure = async (terminal: any) => {
    setIsLoading(true);
    try {
      await TerminalService.configureTerminal(terminal.id, {});
      toast.success(`Terminal ${terminal.serialNumber} configured successfully`);
    } catch (error) {
      toast.error('Failed to configure terminal');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBatchAction = async (action: string, terminalIds: string[]) => {
    setIsLoading(true);
    try {
      // Simulate batch operation
      await Promise.all(
        terminalIds.map(id => {
          switch (action) {
            case 'activate':
              return TerminalService.updateTerminalStatus(id, 'active');
            case 'deactivate':
              return TerminalService.updateTerminalStatus(id, 'inactive');
            case 'restart':
              return TerminalService.restartTerminal(id);
            default:
              return Promise.resolve();
          }
        })
      );
      toast.success(`${action} completed for ${terminalIds.length} terminals`);
    } catch (error) {
      toast.error(`Failed to ${action} terminals`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleView,
    handleActivate,
    handleDeactivate,
    handleRestart,
    handleConfigure,
    handleBatchAction,
  };
};
