import type { TableAction, BulkAction } from "@shared/types/data-table"
import type { Product } from "@shared/types/products"
import { Edit, Copy, Trash2, Download } from "lucide-react"

type ProductActionHandlers = {
  onEdit?: (product: Product) => void
  onDuplicate?: (product: Product) => void
  onDelete?: (productIds: string[]) => void
  onExport?: (productIds: string[]) => void
}

export const getProductBulkActions = (handlers: ProductActionHandlers = {}): BulkAction[] => [
  {
    key: "delete",
    label: "Delete Selected",
    icon: <Trash2 className="h-4 w-4" />,
    onClick: (ids) => handlers.onDelete?.(ids),
    variant: "destructive",
  },
  {
    key: "export",
    label: "Export Selected",
    icon: <Download className="h-4 w-4" />,
    onClick: (ids) => handlers.onExport?.(ids),
  },
]

export const getProductRowActions = (handlers: ProductActionHandlers = {}): TableAction<Product>[] => [
  {
    key: "edit",
    label: "Edit Product",
    icon: <Edit className="h-4 w-4" />,
    onClick: (product) => handlers.onEdit?.(product),
  },
]

export const getProductHoverActions = (handlers: ProductActionHandlers = {}): TableAction<Product>[] => [
  {
    key: "edit",
    label: "Quick Edit",
    icon: <Edit className="h-4 w-4" />,
    onClick: (product) => handlers.onEdit?.(product),
  },
  {
    key: "duplicate",
    label: "Duplicate",
    icon: <Copy className="h-4 w-4" />,
    onClick: (product) => handlers.onDuplicate?.(product),
  },
]
