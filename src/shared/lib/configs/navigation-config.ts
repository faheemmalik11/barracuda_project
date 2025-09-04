import {
  Home,
  CreditCard,
  AlertTriangle,
  Users,
  Package,
  Wallet,
  Building,
  Shield,
  Receipt,
  RotateCcw,
  Users2,
  Store,
  ShoppingCart,
  Landmark,
  GitCompareArrows,
  MessageSquare,
} from "lucide-react"
import type { NavItem } from "@shared/types/navigation"

export const mainNavItems: NavItem[] = [
  { title: "Home", icon: Home, url: "/" },
  { title: "Balances", icon: Wallet, url: "/balances" },
  { title: "Payments", icon: CreditCard, url: "/payments" },
  // { title: "Orders", icon: ShoppingCart, url: "/orders" },
  { title: "Refunds", icon: RotateCcw, url: "/refunds" },
  { title: "Disputes", icon: AlertTriangle, url: "/disputes" },
  { title: "Customers", icon: Users, url: "/customers" },
  { title: "Products", icon: Package, url: "/products" },
]

export const servicesNavItems: NavItem[] = [
  {
    title: "Radar",
    icon: Shield,
    url: "/radar",
    pinnable: true,
    originalCategory: "Services",
  },
  {
    title: "Engagement",
    icon: MessageSquare,
    url: "/engagement",
    pinnable: true,
    originalCategory: "Services",
  },
  {
    title: "Sales Channel",
    icon: Store,
    url: "/sales-channel",
    children: [
      { title: "In-Stores", url: "/in-stores" },
      { title: "Ecommerce", url: "/ecommerce" },
      { title: "Payment Links", url: "/payment-links" },
      // { title: "Digital", url: "/digital" },
    ],
  },
  {
    title: "Billing",
    icon: Receipt,
    url: "/billing",
    children: [
      { title: "Overview", url: "/billing-overview" },
      { title: "Invoices", url: "/invoices" },
      { title: "Metering", url: "/metering" },
      { title: "Subscriptions", url: "/subscriptions" },
      { title: "Revenue Recognition", url: "/revenue-recognition" },
    ],
  },
]

export const businessToolsNavItems: NavItem[] = [
  {
    title: "Merchants",
    icon: Building,
    url: "/merchants",
    pinnable: true,
    originalCategory: "Business Tools",
  },
  {
    title: "Programs",
    icon: Users2,
    url: "/members",
    pinnable: true,
    originalCategory: "Business Tools",
  },
  {
    title: "Clearing",
    icon: Landmark,
    url: "/clearing",
    pinnable: true,
    originalCategory: "Business Tools",
  },
  {
    title: "Settlement",
    icon: Receipt,
    url: "/settlement",
    pinnable: true,
    originalCategory: "Business Tools",
  },
  {
    title: "Reconciliations",
    icon: GitCompareArrows,
    url: "/reconciliations",
    pinnable: true,
    originalCategory: "Business Tools",
  },
]

export const navigationConfig = {
  main: mainNavItems,
  services: servicesNavItems,
  businessTools: businessToolsNavItems,
  allPinnable: [...servicesNavItems, ...businessToolsNavItems].filter(
    item => item.pinnable
  ),
} 
