export type MerchantStatus = 'active' | 'inactive' | 'pending' | 'suspended' | 'blocked'
export type MerchantType = 'individual' | 'business' | 'enterprise'
export type MerchantRiskLevel = 'low' | 'medium' | 'high'
export type ApplicationStatus = 'pending' | 'approved' | 'rejected'
export type CreationMethod = 'application' | 'manual' | 'link'

export interface Merchant {
  id: string
  name: string
  email: string
  status: MerchantStatus
  type: MerchantType
  created: Date
  lastActivity?: Date
  country: string
  industry: string
  monthlyVolume: number
  riskLevel: MerchantRiskLevel
  verified: boolean
  flags?: string[]
  [key: string]: unknown
}

export interface Address {
  street?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
}

export interface PhoneNumber {
  countryCode?: string
  number?: string
  fullNumber?: string
}

export interface BankAccount {
  currency?: string
  iban?: string
  confirmIban?: string
}

export interface MerchantApplication {
  id: string
  businessName: string
  applicantEmail: string
  submittedDate: string
  status: ApplicationStatus
}

export interface BusinessOwner {
  id: string
  name: string
  ownership: number
}

export interface BusinessAddress {
  street1?: string
  street2?: string
  city?: string
  state?: string
  county?: string
  zipCode?: string
  postcode?: string
  country?: string
}

export interface MerchantBusinessInfo {
  legalBusinessName?: string
  tradingName?: string
  uniqueId?: string
  industry?: string
  website?: string
  productDescription?: string
  businessType?: string
  businessLocation?: string
  businessAddress?: BusinessAddress
}

export interface BusinessExecutive {
  id: string
  name: string
  title: string
  email: string
}

export interface MerchantContactInfo {
  representativeFirstName?: string
  representativeLastName?: string
  representativeEmail?: string
  representativePhone?: PhoneNumber
  businessPhone?: PhoneNumber
  jobTitle?: string
  dateOfBirth?: string
  homeAddress?: Address
  ownershipPercentage?: string
  owns25Percent?: boolean
  hasManagementControl?: boolean
  customerEmail?: string
  businessExecutives?: BusinessExecutive[]
  businessOwners: BusinessOwner[]
}

export interface MerchantBankingInfo {
  currency?: string
  iban?: string
  bankAccount?: BankAccount
}

export interface MerchantSettings {
  statementDescriptor?: string
  shortenedDescriptor?: string
  supportPhone?: string
  showPhoneOnReceipts?: boolean
  selectedProgram?: string
  selectedProduct?: string
  programId?: string
  productId?: string
  capabilities: string[]
  creationMethod?: CreationMethod
  selectedApplicationId?: string
}

export interface MerchantFormData {
  businessInfo: MerchantBusinessInfo
  contactInfo: MerchantContactInfo
  bankingInfo: MerchantBankingInfo
  settings: MerchantSettings
}

export interface StepComponentProps {
  formData: MerchantFormData
  updateFormData: (updates: Partial<MerchantFormData>) => void
  onNext?: () => void
  onBack?: () => void
}
