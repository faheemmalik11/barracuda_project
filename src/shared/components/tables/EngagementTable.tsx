import { Skeleton } from "@shared/components/ui/skeleton"

interface EngagementTableProps {
  status?: string
  loading?: boolean
}

export function EngagementTable({ status, loading = false }: EngagementTableProps) {
  if (loading) {
    return (
      <Skeleton.Table
        columns={6}
        rows={8}
        hasActions={true}
        hasSelection={true}
        showPagination={true}
      />
    )
  }

  return (
    <div className="flex items-center justify-center h-64 bg-muted/50 rounded-lg border-2 border-dashed border-border">
      <div className="text-center">
        <h3 className="text-lg font-medium text-foreground mb-2">Engagement Events Table</h3>
        <p className="text-muted-foreground">
          {status ? `Showing engagement events with status: ${status}` : 'Engagement analytics coming soon'}
        </p>
      </div>
    </div>
  )
}
