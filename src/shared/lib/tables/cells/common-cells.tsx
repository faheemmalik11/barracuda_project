import { memo, type ReactNode } from "react"
import { formatDate, formatCurrency } from "@shared/utils/formatters"
import { TruncatedCell } from "./TruncatedCell"
import { cn } from "@shared/lib/utils"

export const IdCell = memo(({ id }: { id: string | number }) => (
  <span className="font-mono text-sm">{id.toString()}</span>
))
IdCell.displayName = 'IdCell'

export const TextCell = memo(({
  value,
  maxWidth = 160,
  placeholder = "—",
  className
}: {
  value?: string | null
  maxWidth?: number
  placeholder?: string
  className?: string
}) => {
  const displayValue = value || placeholder
  return (
    <TruncatedCell
      maxWidth={maxWidth}
      className={cn("text-sm text-muted-foreground font-normal", className)}
    >
      {displayValue}
    </TruncatedCell>
  )
})
TextCell.displayName = 'TextCell'

export const DynamicDateCell = memo(({
  timestamp,
  className,
  placeholder = "—"
}: {
  timestamp?: string | number | Date | null
  className?: string
  placeholder?: ReactNode
}) => {
  if (!timestamp) {
    return <span className="text-sm text-muted-foreground">{placeholder}</span>
  }
  const date = typeof timestamp === 'number' ? new Date(timestamp) : timestamp
  const formattedDate = formatDate(date)
  return (
    <div
      className={cn("text-sm text-muted-foreground font-normal", className)}
      title={new Date(timestamp).toLocaleString()}
    >
      {formattedDate}
    </div>
  )
})
DynamicDateCell.displayName = 'DynamicDateCell'

export const CurrencyCell = memo(({
  amount,
  currency = 'USD',
  decimals,
  className = "",
  align = "left"
}: {
  amount: number
  currency?: string
  decimals?: number
  className?: string
  align?: "left" | "right"
}) => {
  const formattedAmount = formatCurrency(amount, currency, decimals)
  const [amountPart, currencyPart] = formattedAmount.split(' ')
  
  return (
    <div className={cn(
      "flex items-baseline gap-1",
      align === "right" ? "justify-end" : "justify-start",
      className
    )}>
      <span className="font-medium text-foreground">
        {amountPart}
      </span>
      {currencyPart && (
        <span className="text-xs text-muted-foreground">
          {currencyPart}
        </span>
      )}
    </div>
  )
})
CurrencyCell.displayName = 'CurrencyCell'

export const IconTextCell = memo(({
  icon,
  children,
  className = ""
}: {
  icon: ReactNode
  children: ReactNode
  className?: string
}) => (
  <div className={cn("flex items-center gap-1 group-hover:text-foreground", className)}>
    {icon}
    {children}
  </div>
))
IconTextCell.displayName = 'IconTextCell'
