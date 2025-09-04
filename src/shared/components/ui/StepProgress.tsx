import { CheckCircle2 } from "lucide-react"
import { cn } from "@shared/lib/utils"
import type { StepProgressProps } from "@shared/types/sheets"

export function StepProgress({ steps, currentStep, completedIcon = <CheckCircle2 className="h-4 w-4" /> }: StepProgressProps) {
  return (
    <div className="flex items-center px-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center flex-1">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
              currentStep >= step.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            )}>
              {currentStep > step.id ? completedIcon : step.id}
            </div>
            <div className="hidden sm:block">
              <div className={cn(
                "text-sm font-medium",
                currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {step.description}
              </div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={cn(
              "flex-1 h-px mx-4",
              currentStep > step.id ? "bg-primary" : "bg-border"
            )} />
          )}
        </div>
      ))}
    </div>
  )
}