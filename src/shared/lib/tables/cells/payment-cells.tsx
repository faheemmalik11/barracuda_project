import { memo } from "react"
import type { Payment } from "@shared/types/payment.types"
import { AppStatusBadge } from "@shared/components/ui/status-badge/AppStatusBadge"
import { getCardBrandDisplay } from "@shared/utils/cell"
import { TruncatedCell } from "./TruncatedCell"
import { TextCell, DynamicDateCell, CurrencyCell } from "./common-cells"

export const AmountCell = memo(({ payment }: { payment: Payment }) => {
  const amount = payment.amounts?.original?.amount ?? payment.amount ?? 0
  const decimal = payment.amounts?.original?.decimal
  const currency = payment.amounts?.original?.currency ?? payment.currency ?? 'USD'
  
  return (
    <CurrencyCell
      amount={amount}
      currency={currency}
      decimals={decimal}
      align="right"
      className="text-sm min-w-[68px]"
    />
  )
})
AmountCell.displayName = 'AmountCell'

export const StatusCell = memo(({ payment }: { payment: Payment }) => {
  const status = payment.status ?? payment.state ?? "unknown"
  return <AppStatusBadge entityType="payment" status={status} />
})
StatusCell.displayName = 'StatusCell'

export const PaymentMethodCell = memo(({ payment }: { payment: Payment }) => {
  const paymentMethodRaw = payment.paymentMethod
  const paymentMethod = typeof paymentMethodRaw === 'string' 
    ? paymentMethodRaw 
    : paymentMethodRaw?.displayString || "Unknown"
  const isCard = paymentMethod.includes('•••')
  
  return (
    <div className="flex items-center gap-1.5">
      {isCard && (
        <div className="w-6 h-4 bg-primary rounded-sm flex items-center justify-center">
          <span className="text-primary-foreground text-[10px] font-bold">
            {getCardBrandDisplay(paymentMethod)}
          </span>
        </div>
      )}
      <TruncatedCell maxWidth={160} className="text-sm text-muted-foreground">
        {paymentMethod}
      </TruncatedCell>
    </div>
  )
})
PaymentMethodCell.displayName = 'PaymentMethodCell'

export const DescriptionCell = memo(({ payment }: { payment: Payment }) => (
  <TextCell 
    value={payment.description || payment.transactionRef || payment.id?.toString()}
    maxWidth={160} 
  />
))
DescriptionCell.displayName = 'DescriptionCell'

export const CustomerCell = memo(({ payment }: { payment: Payment }) => (
  <TextCell
    value={payment.customer?.email || 
              payment.customer?.name || 
              payment.account?.name}
    maxWidth={180} 
  />
))
CustomerCell.displayName = 'CustomerCell'

export const DateCell = memo(({ payment }: { payment: Payment }) => {
  const timestamp = payment.created || payment.timestamps?.initiated
  return <DynamicDateCell timestamp={timestamp} />
})
DateCell.displayName = 'DateCell'

// Status-specific cells
export const RefundReasonCell = memo(({ payment }: { payment: Payment }) => <TextCell value={payment.refunds?.[0]?.reason} />)
RefundReasonCell.displayName = 'RefundReasonCell'

export const RequestedCell = memo(({ payment }: { payment: Payment }) => <DynamicDateCell timestamp={payment.timestamps?.refunded} />)
RequestedCell.displayName = 'RequestedCell'

export const RefundedByCell = memo(() => <TextCell value={undefined} />)
RefundedByCell.displayName = 'RefundedByCell'

export const StageCell = memo(({ payment }: { payment: Payment }) => <TextCell value={payment.disputes?.[0]?.status} />)
StageCell.displayName = 'StageCell'

export const DisputeReasonCell = memo(({ payment }: { payment: Payment }) => <TextCell value={payment.disputes?.[0]?.reason} />)
DisputeReasonCell.displayName = 'DisputeReasonCell'

export const WinLikelihoodCell = memo(() => <TextCell value={undefined} />)
WinLikelihoodCell.displayName = 'WinLikelihoodCell'

export const EvidenceDueByCell = memo(({ payment }: { payment: Payment }) => <DynamicDateCell timestamp={payment.disputes?.[0]?.evidenceDueBy} />)
EvidenceDueByCell.displayName = 'EvidenceDueByCell'

export const EvidenceSubmittedByCell = memo(() => <TextCell value={undefined} />)
EvidenceSubmittedByCell.displayName = 'EvidenceSubmittedByCell'

export const DisputedOnCell = memo(({ payment }: { payment: Payment }) => <DynamicDateCell timestamp={payment.timestamps?.disputed} />)
DisputedOnCell.displayName = 'DisputedOnCell'

export const FailureReasonCell = memo(({ payment }: { payment: Payment }) => <TextCell value={payment.declineReason} />)
FailureReasonCell.displayName = 'FailureReasonCell'

export const FailedCell = memo(({ payment }: { payment: Payment }) => <DynamicDateCell timestamp={payment.timestamps?.failed} />)
FailedCell.displayName = 'FailedCell'

export const CaptureByCell = memo(({ payment }: { payment: Payment }) => <DynamicDateCell timestamp={payment.timestamps?.expires} />)
CaptureByCell.displayName = 'CaptureByCell'