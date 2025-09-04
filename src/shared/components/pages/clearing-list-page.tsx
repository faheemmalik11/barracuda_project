import { Typography } from "@shared/components/ui/typography"

export default function ClearingListPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Typography variant="h1">Clearing</Typography>
      <div className="bg-white rounded-lg border p-6">
        <div className="text-center py-8">
          <div className="flex flex-col">
            <h3 className="text-lg font-medium text-foreground mb-2">Payment Clearing</h3>
            <p className="text-muted-foreground">
              Payment clearing and processing functionality will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
