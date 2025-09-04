import { Button } from '@shared/components/ui/button'
import { Download, Settings, Plus } from 'lucide-react'

interface BillingHeaderProps {
  onExport?: () => void
  onSettings?: () => void
  onCreateInvoice?: () => void
}

export function BillingHeader({ onExport, onSettings, onCreateInvoice }: BillingHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Billing Overview</h1>
        <p className="text-muted-foreground">
          Track invoices, payments, and revenue
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        {onExport && (
          <Button variant="outline" size="sm" className="gap-2" onClick={onExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        )}
        
        {onSettings && (
          <Button variant="outline" size="sm" className="gap-2" onClick={onSettings}>
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        )}
        
        {onCreateInvoice && (
          <Button size="sm" className="gap-2" onClick={onCreateInvoice}>
            <Plus className="h-4 w-4" />
            Create Invoice
          </Button>
        )}
      </div>
    </div>
  )
}