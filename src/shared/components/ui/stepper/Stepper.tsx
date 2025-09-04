"use client"
import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { Button } from "@shared/components/ui/button"
import { cn } from "@shared/lib/utils"
import { X, Minus } from "lucide-react"
import { StepperNavigation, type StepConfig } from "@shared/components/ui/stepper"

export interface StepperProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  steps: StepConfig[]
  currentStep: number
  onStepChange: (stepIndex: number) => void
  canNavigateToStep?: (stepIndex: number) => boolean
  onMinimize?: () => void
  onMaximize?: () => void
  showAutoSave?: boolean
  autoSaveStatus?: "saving" | "saved" | "error"
  renderStepContent?: (stepId: string, substepId: string | null) => React.ReactNode
}

type ModalState = "full" | "minimized" | "partial"

export function Stepper({
  isOpen,
  onClose,
  title,
  subtitle,
  steps,
  currentStep,
  onStepChange,
  canNavigateToStep = () => true,
  onMinimize,
  onMaximize,
  showAutoSave = false,
  autoSaveStatus = "saved",
  renderStepContent,
}: StepperProps) {
  const [modalState, setModalState] = useState<ModalState>("full")
  const [currentSubstep, setCurrentSubstep] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.ctrlKey && e.key === "m") {
        e.preventDefault()
        handleMinimize()
      } else if (e.key === "F11") {
        e.preventDefault()
        handleMaximize()
      }
    },
    [onClose],
  )

  const handleMinimize = useCallback(() => {
    setModalState("minimized")
    onMinimize?.()
  }, [onMinimize])

  const handleMaximize = useCallback(() => {
    setModalState(modalState === "full" ? "partial" : "full")
    onMaximize?.()
  }, [modalState, onMaximize])

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      setTimeout(() => {
        modalRef.current?.focus()
      }, 100)
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, handleKeyDown])

  useEffect(() => {
    const step = steps[currentStep]
    if (step?.substeps && step.substeps.length > 0 && !currentSubstep) {
      setCurrentSubstep(step.substeps[0].id)
    }
  }, [currentStep, currentSubstep, steps])

  const handleStepClick = useCallback(
    (stepIndex: number) => {
      if (stepIndex <= currentStep || canNavigateToStep(stepIndex)) {
        onStepChange(stepIndex)
        const step = steps[stepIndex]
        if (step.substeps && step.substeps.length > 0) {
          setCurrentSubstep(step.substeps[0].id)
        } else {
          setCurrentSubstep(null)
        }
      }
    },
    [currentStep, canNavigateToStep, onStepChange, steps],
  )

  const handleSubstepClick = useCallback((substepId: string) => {
    setCurrentSubstep(substepId)
  }, [])

  const stepContent = useMemo(() => {
    if (!currentSubstep && !renderStepContent) {
      return (
        <div className="p-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-medium text-foreground mb-2">
              {steps[currentStep]?.title || "Select a section"}
            </h2>
            <p className="text-muted-foreground">Please select a section from the left sidebar to continue.</p>
          </div>
        </div>
      )
    }

    if (renderStepContent) {
      return renderStepContent(steps[currentStep]?.id || '', currentSubstep)
    }

    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-medium text-foreground mb-2">
            Welcome to the Setup
          </h2>
          <p className="text-muted-foreground">
            Use the navigation on the left to begin configuring your settings.
          </p>
        </div>
      </div>
    )
  }, [currentSubstep, steps, currentStep, renderStepContent])

  if (!isOpen) return null

  if (modalState === "minimized") {
    return (
      <div
        className="fixed bottom-4 right-4 z-50 bg-primary text-primary-foreground rounded-lg px-4 py-2 shadow-lg cursor-pointer transition-all duration-300 hover:scale-105"
        onClick={() => setModalState("full")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setModalState("full")}
        aria-label={`Restore ${title} modal`}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={modalState === "partial" ? onClose : undefined}
      />

      <div
        ref={modalRef}
        className={cn(
          "relative bg-white shadow-2xl transition-all duration-300 ease-in-out animate-in slide-in-from-bottom-4 fade-in-0 flex flex-col",
          modalState === "full" && "w-full h-full",
          modalState === "partial" && "w-[95%] h-[85%] rounded-lg",
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        aria-describedby={subtitle ? "modal-subtitle" : undefined}
      >
        <div className="flex items-center justify-between w-full px-4 py-3 border-b border-border bg-background flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onClose} className="p-1 h-8 w-8" aria-label="Close modal">
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMinimize}
              className="p-1 h-8 w-8"
              aria-label="Minimize modal"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <h1 id="modal-title" className="text-lg font-medium text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p id="modal-subtitle" className="text-sm text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
          {showAutoSave && (
            <div className="flex items-center gap-2" role="status" aria-live="polite">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  autoSaveStatus === "saving" && "bg-warning animate-pulse",
                  autoSaveStatus === "saved" && "bg-success",
                  autoSaveStatus === "error" && "bg-destructive",
                )}
                aria-hidden="true"
              />
              <span className="text-sm text-muted-foreground">
                {autoSaveStatus === "saving" && "Saving..."}
                {autoSaveStatus === "saved" && "Saved"}
                {autoSaveStatus === "error" && "Error saving"}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-80 flex-shrink-0">
            <StepperNavigation
              steps={steps}
              currentStep={currentStep}
              currentSubstep={currentSubstep}
              onStepClick={handleStepClick}
              onSubstepClick={handleSubstepClick}
              canNavigateToStep={canNavigateToStep}
            />
          </div>
          <div className="flex-1 overflow-y-auto bg-white">{stepContent}</div>
        </div>
      </div>
    </div>
  )
}
