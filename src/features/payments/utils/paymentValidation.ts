import { z } from 'zod'
import { emailSchema } from '@shared/utils/validation'

const cardNumberSchema = z
  .string()
  .min(1, 'Card number is required')
  .transform(val => val.replace(/\s/g, ''))
  .refine(val => /^\d{13,19}$/.test(val), 'Invalid card number')

const cvvSchema = z
  .string()
  .min(1, 'CVV is required')
  .regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')

const expiryMonthSchema = z
  .number()
  .min(1, 'Expiry month is required')
  .max(12, 'Invalid month')

const expiryYearSchema = z
  .number()
  .min(new Date().getFullYear(), 'Card is expired')
  .max(new Date().getFullYear() + 20, 'Invalid year')

const amountSchema = z
  .number()
  .positive('Amount must be greater than 0')
  .finite('Amount must be a valid number')

const currencySchema = z
  .string()
  .length(3, 'Currency must be a 3-letter code')
  .regex(/^[A-Z]{3}$/, 'Invalid currency code')

const newCustomerSchema = z.object({
  type: z.literal('new'),
  name: z.string().min(1, 'Name is required').trim(),
  email: emailSchema,
  phone: z.string().optional(),
})

const existingCustomerSchema = z.object({
  type: z.literal('existing'),
  id: z.string().min(1, 'Customer ID is required'),
})

const customerSchema = z.discriminatedUnion('type', [
  newCustomerSchema,
  existingCustomerSchema,
])

const newPaymentMethodSchema = z.object({
  type: z.literal('new'),
  cardNumber: cardNumberSchema,
  expiryMonth: expiryMonthSchema,
  expiryYear: expiryYearSchema,
  cvv: cvvSchema,
  cardholderName: z.string().optional(),
})

const existingPaymentMethodSchema = z.object({
  type: z.literal('existing'),
  existingMethodId: z.string().min(1, 'Payment method ID is required'),
})

const paymentMethodSchema = z.discriminatedUnion('type', [
  newPaymentMethodSchema,
  existingPaymentMethodSchema,
])

const manualPaymentFormSchema = z.object({
  amount: amountSchema,
  currency: currencySchema.default('USD'),
  description: z.string().optional(),
  customer: customerSchema,
  flow: z.literal('manual'),
  paymentMethod: paymentMethodSchema,
  savePaymentMethod: z.boolean().default(false),
  metadata: z.record(z.string()).optional(),
})

const linkPaymentFormSchema = z.object({
  amount: amountSchema,
  currency: currencySchema.default('USD'),
  description: z.string().optional(),
  customer: customerSchema,
  flow: z.literal('link'),
  linkExpiryDays: z.number().min(1).max(365).default(7),
  metadata: z.record(z.string()).optional(),
})

export const paymentFormSchema = z.discriminatedUnion('flow', [
  manualPaymentFormSchema,
  linkPaymentFormSchema,
])

export type PaymentFormData = z.infer<typeof paymentFormSchema>
export type ManualPaymentFormData = z.infer<typeof manualPaymentFormSchema>
export type LinkPaymentFormData = z.infer<typeof linkPaymentFormSchema>

export const validatePaymentForm = (formData: unknown) => paymentFormSchema.safeParse(formData)

export const validateForm = (formData: unknown): boolean => validatePaymentForm(formData).success