import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@shared/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        success: "border-transparent bg-green-200 text-green-800 hover:bg-green-300",
        warning: "border-transparent bg-orange-200 text-orange-800 hover:bg-orange-300",
        danger: "border-transparent bg-rose-200 text-red-800 hover:bg-rose-300",
        secondary: "border-transparent bg-green-200 text-green-800 hover:bg-green-300",
        outline: "border-transparent bg-orange-200 text-orange-800 hover:bg-orange-300",
        destructive: "border-transparent bg-rose-200 text-red-800 hover:bg-rose-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn(badgeVariants({ variant }), className)} 
        {...props} 
      />
    )
  }
)

Badge.displayName = "Badge"

export { Badge }
// eslint-disable-next-line react-refresh/only-export-components
export { badgeVariants }
