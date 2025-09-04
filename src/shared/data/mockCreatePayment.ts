export interface MockCustomer {
  id: string
  name: string
  email: string
}

export interface MockPaymentMethod {
  id: string
  customerId: string
  type: string
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
}

export interface Currency {
  code: string
  name: string
  symbol: string
}

export interface PaymentFormData {
  flow: "manual" | "invoice" | "payment-link" | "subscription" | "qr-nfc" | "button"
  amount: number
  currency: string
  customer: {
    type: "existing" | "new"
    id?: string
    name?: string
    email?: string
  }
  description: string
  paymentMethod: {
    type: "existing" | "new"
    existingMethodId?: string
    cardNumber?: string
    expiryMonth?: string
    expiryYear?: string
    cvv?: string
    cardholderName?: string
  }
  options: {
    captureLater: boolean
    addBillingDetails: boolean
    sendReceipt: boolean
  }
  invoice?: {
    dueDate?: Date
    terms?: string
    notes?: string
  }
  paymentLink?: {
    expiresAt?: Date
    successUrl?: string
    cancelUrl?: string
    collectShipping?: boolean
  }
  subscription?: {
    interval: "day" | "week" | "month" | "year"
    intervalCount: number
    trialDays?: number
  }
  qrNfc?: {
    type: "qr" | "nfc"
    label?: string
  }
  button?: {
    buttonText?: string
    theme?: "light" | "dark"
    size?: "small" | "medium" | "large"
  }
}

export const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
] as const

export const mockCustomers: MockCustomer[] = []
export const mockPaymentMethods: MockPaymentMethod[] = []

export const generateMonthOptions = () => 
  Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, '0')
    return { value: month, label: month }
  })

export const generateYearOptions = () => 
  Array.from({ length: 10 }, (_, i) => {
    const year = (new Date().getFullYear() + i).toString()
    return { value: year, label: year }
  })

export const getInitialFormData = (): PaymentFormData => ({
  flow: "manual",
  amount: 0,
  currency: "USD",
  customer: {
    type: "new",
  },
  description: "",
  paymentMethod: {
    type: "new",
  },
  options: {
    captureLater: false,
    addBillingDetails: false,
    sendReceipt: false,
  },
  subscription: {
    interval: "month",
    intervalCount: 1,
    trialDays: 0,
  },
  qrNfc: {
    type: "qr",
    label: "",
  },
  button: {
    buttonText: "Pay Now",
    theme: "light",
    size: "medium",
  },
})

export const PAYMENT_FLOWS = [
  {
    value: "manual" as const,
    label: "Manual Payment",
    description: "Direct payment processing with card details",
    icon: "DollarSign" as const
  },
  {
    value: "invoice" as const,
    label: "Invoice",
    description: "Send invoice to customer for payment",
    icon: "FileText" as const
  },
  {
    value: "payment-link" as const,
    label: "Payment Link",
    description: "Create shareable payment link",
    icon: "Link" as const
  },
  {
    value: "subscription" as const,
    label: "Subscription",
    description: "Recurring subscription billing",
    icon: "RefreshCw" as const
  },
  {
    value: "qr-nfc" as const,
    label: "QR/NFC Tag",
    description: "Generate QR code or NFC tag for payment",
    icon: "QrCode" as const
  },
  {
    value: "button" as const,
    label: "Payment Button",
    description: "Embeddable payment button widget",
    icon: "MousePointer" as const
  }
] as const

export const getActionText = (flow: PaymentFormData["flow"], qrNfcType?: "qr" | "nfc") => {
  switch (flow) {
    case "manual":
      return "Create Payment"
    case "invoice":
      return "Send Invoice"
    case "payment-link":
      return "Generate Link"
    case "subscription":
      return "Create Subscription"
    case "qr-nfc":
      return qrNfcType === "qr" ? "Generate QR Code" : "Create NFC Tag"
    case "button":
      return "Generate Button"
    default:
      return "Create Payment"
  }
}

export const getFlowDescription = (flow: PaymentFormData["flow"]) => {
  switch (flow) {
    case "manual":
      return "Create a new payment for your customer"
    case "invoice":
      return "Send an invoice to your customer"
    case "payment-link":
      return "Generate a shareable payment link"
    case "subscription":
      return "Set up recurring billing for your customer"
    case "qr-nfc":
      return "Generate QR code or NFC tag for contactless payment"
    case "button":
      return "Create an embeddable payment button"
    default:
      return "Create a new payment for your customer"
  }
}

export const validateForm = (formData: PaymentFormData): boolean => {
  if (!formData.amount || formData.amount <= 0) return false

  if (formData.customer.type === "existing") {
    if (!formData.customer.id) return false
  } else {
    if (!formData.customer.name || !formData.customer.email) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.customer.email)) return false
  }

  if (formData.flow === "manual") {
    if (formData.paymentMethod.type === "existing") {
      if (!formData.paymentMethod.existingMethodId) return false
    } else {
      const { cardNumber, expiryMonth, expiryYear, cvv } = formData.paymentMethod
      if (!cardNumber || !expiryMonth || !expiryYear || !cvv) return false
    }
  }

  return true
} 