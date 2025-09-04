import { cn } from "@shared/lib/utils"
import { Check } from "lucide-react"

export interface SubstepConfig {
  id: string
  title: string
  isOptional?: boolean
}

export interface StepConfig {
  id: string
  title: string
  substeps?: SubstepConfig[]
  isCompleted?: boolean
  isOptional?: boolean
}

interface StepperNavigationProps {
  steps: StepConfig[]
  currentStep: number
  currentSubstep: string | null
  onStepClick: (stepIndex: number) => void
  onSubstepClick: (substepId: string) => void
  canNavigateToStep: (stepIndex: number) => boolean
}

export function StepperNavigation({
  steps,
  currentStep,
  currentSubstep,
  onStepClick,
  onSubstepClick,
  canNavigateToStep,
}: StepperNavigationProps) {
  return (
    <div className="h-full bg-muted/30 overflow-y-auto">
      <div className="p-4">
        <nav aria-label="Stepper navigation">
          <ol className="relative">
            {/* Background stripe behind steps only */}
            <div className="absolute -left-1 -top-1 w-7 bg-gray-200 rounded-full" style={{height: 'calc(100% + 8px)'}}></div>
            {steps.map((step, stepIndex) => {
              const isActive = stepIndex === currentStep
              const isCompleted = step.isCompleted || stepIndex < currentStep
              const canNavigate = stepIndex <= currentStep || canNavigateToStep(stepIndex)

              return (
                <li key={step.id} className="relative pb-3 last:pb-0">
                  <div
                    className={cn(
                      "relative flex items-center gap-3 cursor-pointer group focus:outline-none",
                      !canNavigate && "opacity-50 cursor-not-allowed",
                    )}
                    onClick={() => canNavigate && onStepClick(stepIndex)}
                    role="button"
                    tabIndex={canNavigate ? 0 : -1}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && canNavigate) {
                        e.preventDefault()
                        onStepClick(stepIndex)
                      }
                    }}
                    aria-current={isActive ? "step" : undefined}
                    aria-label={`Step ${stepIndex + 1}: ${step.title}${step.isOptional ? " (optional)" : ""}`}
                  >
                    {/* Step number circle */}
                    <div
                      className={cn(
                        "relative z-10 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-medium transition-colors border-2",
                        isCompleted && "bg-success text-success-foreground border-success",
                        isActive && !isCompleted && "bg-primary text-primary-foreground border-primary",
                        !isActive && !isCompleted && "bg-gray-600 border-gray-600 text-white",
                      )}
                    >
                      {isCompleted ? <Check className="w-3 h-3" /> : stepIndex + 1}
                    </div>
                    
                    {/* Step content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold truncate text-foreground opacity-80">
                          {step.title}
                        </h3>
                        {step.isOptional && (
                          <span className="text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                            Optional
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Substeps - Show only when step is active */}
                  {step.substeps && step.substeps.length > 0 && isActive && (
                    <div className="mt-2 space-y-1" role="group" aria-label={`${step.title} substeps`}>
                      {step.substeps.map((substep) => {
                        const isSubstepActive = currentSubstep === substep.id

                        return (
                          <div
                            key={substep.id}
                            className="relative flex items-center gap-3 cursor-pointer py-1 text-sm transition-colors focus:outline-none hover:text-primary"
                            onClick={() => onSubstepClick(substep.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                onSubstepClick(substep.id)
                              }
                            }}
                            aria-current={isSubstepActive ? "step" : undefined}
                            aria-label={`Substep: ${substep.title}${substep.isOptional ? " (optional)" : ""}`}
                          >
                            {/* Substep dot aligned with step number */}
                            <div className="w-5 flex justify-center">
                              <div
                                className={cn(
                                  "w-1.5 h-1.5 rounded-full transition-colors",
                                  isSubstepActive && "bg-primary",
                                  !isSubstepActive && "bg-gray-500",
                                )}
                              />
                            </div>
                            
                            {/* Substep text - indented */}
                            <div className="flex-1 flex items-center gap-2 ml-4">
                              <span 
                                className={cn(
                                  "truncate",
                                  isSubstepActive && "text-primary font-medium",
                                  !isSubstepActive && "text-gray-500",
                                )}
                              >
                                {substep.title}
                              </span>
                              {substep.isOptional && (
                                <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                  Optional
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
    </div>
  )
}
