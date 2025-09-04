import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { BillingHeader, BillingMetricCard, InvoiceCard } from '../components'
import { useBilling, useBillingActions } from '../hooks'

export function BillingOverviewPage() {
  const { overview, loading, error } = useBilling()
  const { handleExport, handleSettings, handleCreateInvoice, handleViewInvoice } = useBillingActions()

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Billing Overview</h1>
          <p className="text-muted-foreground">Loading billing data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Billing Overview</h1>
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    )
  }

  if (!overview) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Billing Overview</h1>
          <p className="text-muted-foreground">No billing data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <BillingHeader
        onExport={handleExport}
        onSettings={handleSettings}
        onCreateInvoice={handleCreateInvoice}
      />

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        {overview.metrics.map((metric) => (
          <BillingMetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Recent Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          {overview.recentInvoices.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No recent invoices found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {overview.recentInvoices.map((invoice) => (
                <InvoiceCard
                  key={invoice.id}
                  invoice={invoice}
                  onView={handleViewInvoice}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}