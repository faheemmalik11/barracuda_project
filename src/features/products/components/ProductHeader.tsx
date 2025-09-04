import { Button } from "@shared/components/ui"
import { Plus } from "lucide-react"

export function ProductHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">
          Manage your product catalog and inventory
        </p>
      </div>
      <Button size="sm" className="gap-2">
        <Plus className="h-4 w-4" />
        Add Product
      </Button>
    </div>
  )
}