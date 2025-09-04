import { cn } from "@shared/lib/utils"

interface ToggleOption {
  value: string
  label: string
}

interface ToggleButtonGroupProps {
  value: string
  options: ToggleOption[]
  onChange: (value: string) => void
  disabled?: boolean
  'aria-label'?: string
}

export const ToggleButtonGroup = ({ 
  value, 
  options, 
  onChange, 
  disabled = false,
  'aria-label': ariaLabel
}: ToggleButtonGroupProps) => (
  <div 
    className="inline-flex gap-1 p-1 bg-muted rounded-lg"
    role="tablist"
    aria-label={ariaLabel}
  >
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        role="tab"
        disabled={disabled}
        onClick={() => onChange(option.value)}
        aria-selected={value === option.value}
        aria-controls={`panel-${option.value}`}
        className={cn(
          "px-4 py-2 text-sm rounded-md transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          value === option.value
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {option.label}
      </button>
    ))}
  </div>
) 