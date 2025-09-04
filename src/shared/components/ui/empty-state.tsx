import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { LucideIcon } from 'lucide-react'

import { cn } from "@shared/lib/utils"
import { Card, CardContent } from '@shared/components/ui/card'

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      size: {
        sm: "p-6 space-y-3",
        default: "p-12 space-y-4",
        lg: "p-16 space-y-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon: LucideIcon
  title: string
  description: string
  children?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, size, icon: Icon, title, description, children, ...props }, ref) => {
    return (
      <Card ref={ref}>
        <CardContent className="p-0">
          <div className={cn(emptyStateVariants({ size }), className)} {...props}>
            <div className="flex flex-col items-center space-y-4">
              <Icon className={cn(
                "text-muted-foreground",
                size === "sm" ? "h-8 w-8" : 
                size === "lg" ? "h-16 w-16" : "h-12 w-12"
              )} />
              <div className="space-y-2">
                <h3 className={cn(
                  "font-semibold",
                  size === "sm" ? "text-base" : 
                  size === "lg" ? "text-xl" : "text-lg"
                )}>{title}</h3>
                <p className={cn(
                  "text-muted-foreground",
                  size === "sm" ? "text-xs" : 
                  size === "lg" ? "text-base" : "text-sm"
                )}>{description}</p>
              </div>
              {children && (
                <div className="flex flex-col sm:flex-row gap-2">
                  {children}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
)

EmptyState.displayName = "EmptyState"

export { EmptyState, emptyStateVariants } 
