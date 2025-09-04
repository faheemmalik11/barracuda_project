import type { Member } from "@shared/types/members"

export const mockMembers: Member[] = [
  {
    id: "mem_1",
    name: "First National Bank",
    type: "bank",
    status: "active",
    email: "contact@fnb.com",
    phone: "+1 (555) 123-4567",
    dateJoined: "2023-01-15",
    transactionVolume: 1250000,
    revenueGenerated: 75000,
    complianceStatus: "verified",
    lastActive: "2023-06-01",
    address: {
      street: "123 Financial Ave",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    points: 0,
    joined: function (): import("react").ReactNode {
      throw new Error("Function not implemented.")
    },
    program: undefined,
    tier: undefined
  },
  {
    id: "mem_2",
    name: "Global Payments Inc.",
    type: "organization",
    status: "active",
    email: "info@globalpay.com",
    phone: "+1 (555) 234-5678",
    dateJoined: "2022-11-03",
    transactionVolume: 3450000,
    revenueGenerated: 120000,
    complianceStatus: "verified",
    lastActive: "2023-06-02",
    address: {
      street: "456 Commerce Blvd",
      city: "Atlanta",
      state: "GA",
      zip: "30301",
      country: "USA",
    },
    points: 0,
    joined: function (): import("react").ReactNode {
      throw new Error("Function not implemented.")
    },
    program: undefined,
    tier: undefined
  },
  {
    id: "mem_3",
    name: "TechPay Platform",
    type: "platform",
    status: "active",
    email: "support@techpay.io",
    phone: "+1 (555) 345-6789",
    dateJoined: "2023-02-22",
    transactionVolume: 890000,
    revenueGenerated: 45000,
    complianceStatus: "verified",
    lastActive: "2023-06-01",
    address: {
      street: "789 Tech Park",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "USA",
    },
    points: 0,
    joined: function (): import("react").ReactNode {
      throw new Error("Function not implemented.")
    },
    program: undefined,
    tier: undefined
  },
  {
    id: "mem_4",
    name: "Community Credit Union",
    type: "bank",
    status: "active",
    email: "service@communitycredit.org",
    phone: "+1 (555) 456-7890",
    dateJoined: "2022-09-10",
    transactionVolume: 750000,
    revenueGenerated: 32000,
    complianceStatus: "verified",
    lastActive: "2023-05-30",
    address: {
      street: "101 Union Street",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "USA",
    },
    points: 0,
    joined: function (): import("react").ReactNode {
      throw new Error("Function not implemented.")
    },
    program: undefined,
    tier: undefined
  },
  {
    id: "mem_5",
    name: "PayEase Solutions",
    type: "organization",
    status: "pending",
    email: "onboarding@payease.com",
    phone: "+1 (555) 567-8901",
    dateJoined: "2023-05-20",
    transactionVolume: 0,
    revenueGenerated: 0,
    complianceStatus: "in_review",
    lastActive: "2023-05-20",
    address: {
      street: "202 Payment Lane",
      city: "Boston",
      state: "MA",
      zip: "02110",
      country: "USA",
    },
    points: 0,
    joined: function (): import("react").ReactNode {
      throw new Error("Function not implemented.")
    },
    program: undefined,
    tier: undefined
  },
  {
    id: "mem_6",
    name: "FinTech Gateway",
    type: "platform",
    status: "inactive",
    email: "admin@fintechgateway.com",
    phone: "+1 (555) 678-9012",
    dateJoined: "2022-07-15",
    transactionVolume: 1200000,
    revenueGenerated: 60000,
    complianceStatus: "verified",
    lastActive: "2023-04-15",
    address: {
      street: "303 Innovation Way",
      city: "Austin",
      state: "TX",
      zip: "78701",
      country: "USA",
    },
    points: 0,
    joined: function (): import("react").ReactNode {
      throw new Error("Function not implemented.")
    },
    program: undefined,
    tier: undefined
  },
  {
    id: "mem_7",
    name: "Secure Trust Bank",
    type: "bank",
    status: "suspended",
    email: "compliance@securetrust.com",
    phone: "+1 (555) 789-0123",
    dateJoined: "2022-05-03",
    transactionVolume: 2100000,
    revenueGenerated: 95000,
    complianceStatus: "unverified",
    lastActive: "2023-03-10",
    address: {
      street: "404 Security Blvd",
      city: "Miami",
      state: "FL",
      zip: "33101",
      country: "USA",
    },
    points: 0,
    joined: function (): import("react").ReactNode {
      throw new Error("Function not implemented.")
    },
    program: undefined,
    tier: undefined
  },
  {
    id: "mem_8",
    name: "Merchant Services Group",
    type: "organization",
    status: "active",
    email: "partners@merchantservices.com",
    phone: "+1 (555) 890-1234",
    dateJoined: "2023-03-12",
    transactionVolume: 1800000,
    revenueGenerated: 82000,
    complianceStatus: "verified",
    lastActive: "2023-06-02",
    address: {
      street: "505 Commerce Center",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "USA",
    },
    points: 0,
    joined: function (): import("react").ReactNode {
      throw new Error("Function not implemented.")
    },
    program: undefined,
    tier: undefined
  },
  {
    id: "mem_9",
    name: "Digital Payments Network",
    type: "platform",
    status: "active",
    email: "info@digitalpayments.net",
    phone: "+1 (555) 901-2345",
    dateJoined: "2022-12-01",
    transactionVolume: 2750000,
    revenueGenerated: 110000,
    complianceStatus: "verified",
    lastActive: "2023-06-01",
    address: {
      street: "606 Digital Drive",
      city: "Denver",
      state: "CO",
      zip: "80202",
      country: "USA",
    },
    points: 0,
    joined: function (): import("react").ReactNode {
      throw new Error("Function not implemented.")
    },
    program: undefined,
    tier: undefined
  },
  {
    id: "mem_10",
    name: "Regional Savings Bank",
    type: "bank",
    status: "active",
    email: "business@regionalsavings.com",
    phone: "+1 (555) 012-3456",
    dateJoined: "2023-04-05",
    transactionVolume: 950000,
    revenueGenerated: 41000,
    complianceStatus: "verified",
    lastActive: "2023-05-28",
    address: {
      street: "707 Main Street",
      city: "Dallas",
      state: "TX",
      zip: "75201",
      country: "USA",
    },
    points: 0,
    joined: function (): import("react").ReactNode {
      throw new Error("Function not implemented.")
    },
    program: undefined,
    tier: undefined
  },
]

export const getMembersByStatus = (status: string) => {
  if (status === "all") {
    return mockMembers
  }
  return mockMembers.filter((member) => member.status === status)
}

export const getMembersByType = (type: string) => {
  if (type === "all") {
    return mockMembers
  }
  return mockMembers.filter((member) => member.type === type)
}
