import { cva, type VariantProps } from "class-variance-authority"

// Enhanced status badge variants with better design system integration
export const statusVariants = cva(
  "inline-flex items-center justify-center px-1.5 py-0.5 font-medium rounded-md transition-all duration-200 border focus:outline-none",
  {
    variants: {
      variant: {
        success: [
          "bg-green-50 text-green-700 border-green-200",
          "dark:bg-green-950/50 dark:text-green-400 dark:border-green-900/50",
          "hover:bg-green-100 dark:hover:bg-green-900/30",
        ],
        error: [
          "bg-red-50 text-red-700 border-red-200",
          "dark:bg-red-950/50 dark:text-red-400 dark:border-red-900/50",
          "hover:bg-red-100 dark:hover:bg-red-900/30",
        ],
        warning: [
          "bg-yellow-50 text-yellow-700 border-yellow-200",
          "dark:bg-yellow-950/50 dark:text-yellow-400 dark:border-yellow-900/50",
          "hover:bg-yellow-100 dark:hover:bg-yellow-900/30",
        ],
        info: [
          "bg-blue-50 text-blue-700 border-blue-200",
          "dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-900/50",
          "hover:bg-blue-100 dark:hover:bg-blue-900/30",
        ],
        neutral: [
          "bg-gray-50 text-gray-700 border-gray-200",
          "dark:bg-gray-950/50 dark:text-gray-400 dark:border-gray-900/50",
          "hover:bg-gray-100 dark:hover:bg-gray-900/30",
        ],
        pending: [
          "bg-orange-50 text-orange-700 border-orange-200",
          "dark:bg-orange-950/50 dark:text-orange-400 dark:border-orange-900/50",
          "hover:bg-orange-100 dark:hover:bg-orange-900/30",
        ],
      },
      size: {
        sm: "text-xs px-1 py-0.5 min-w-[1rem]",
        default: "text-xs",
        lg: "text-sm px-2 py-1 min-w-[1.5rem]",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "default",
    },
  },
)

// Status badge configuration type
export interface StatusBadgeConfig {
  text: string
  variant: VariantProps<typeof statusVariants>["variant"]
  tooltip: string
  actionable?: boolean
}

// Base status badge component with enhanced accessibility and error handling
export interface StatusBadgeProps extends VariantProps<typeof statusVariants> {
  status: string
  statusConfig: Record<string, StatusConfig>
  defaultStatus?: string
  onClick?: (status: string) => void
  "data-testid"?: string
} 
