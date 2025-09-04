import { Button } from '@shared/components/ui/button'
import { AppStatusBadge } from '@shared/components/ui/status-badge/AppStatusBadge'
import { Eye } from 'lucide-react'
import type { Invoice } from '../types/billing.types'
import { formatCurrency, formatDate } from '@shared/utils/formatters'
import { getStatusText } from '../utils/formatters'

interface InvoiceCardProps {
  invoice: Invoice
  onView?: (invoice: Invoice) => void
}

export function InvoiceCard({ invoice, onView }: InvoiceCardProps) {

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div>
        <h4 className="font-medium">{invoice.id}</h4>
        <p className="text-sm text-muted-foreground">{invoice.customerName}</p>
        {invoice.customerEmail && (
          <p className="text-xs text-muted-foreground">{invoice.customerEmail}</p>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="font-medium">{formatCurrency(invoice.amount, invoice.currency)}</div>
          <div className="text-xs text-muted-foreground">
            Due {formatDate(invoice.dueDate)}
          </div>
        </div>
        
        <AppStatusBadge 
          variant="generic" 
          text={getStatusText(invoice.status)}
          color={
            invoice.status === 'paid' ? 'success' :
            invoice.status === 'overdue' ? 'error' :
            invoice.status === 'cancelled' ? 'error' : 'neutral'
          }
        />
        
        {onView && (
          <Button variant="ghost" size="sm" onClick={() => onView(invoice)}>
            <Eye className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}