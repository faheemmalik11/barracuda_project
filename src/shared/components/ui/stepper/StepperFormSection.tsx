import { cn } from "@shared/lib/utils"

interface StepperFormSectionProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl"
}

export function StepperFormSection({
  title,
  subtitle,
  children,
  className,
  maxWidth = "2xl",
}: StepperFormSectionProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
  }

  return (
    <div className={cn("p-8", className)}>
      <div className={cn(maxWidthClasses[maxWidth], "mx-auto")}>
        <h2 className="text-2xl font-medium text-foreground mb-2">{title}</h2>
        {subtitle && (
          <p className="text-muted-foreground mb-6">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  )
}