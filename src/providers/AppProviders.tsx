import React, { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { DataValidationProvider } from '@shared/components/DataValidationProvider'
import { TooltipProvider } from '@shared/components/ui/tooltip'
import { ThemeProvider } from './theme-provider'

interface AppProvidersProps {
  children: ReactNode
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <DataValidationProvider enabledByDefault={false}>
          {children}
          <Toaster position="top-right" />
        </DataValidationProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default AppProviders