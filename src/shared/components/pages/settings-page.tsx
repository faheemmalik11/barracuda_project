import type React from "react"

import {
  User,
  Mail,
  Code,
  Building,
  Shield,
  CreditCard,
  FileText,
  Eye,
  Star,
  Receipt,
  Banknote,
  Calculator,
  Link,
  Radar,
  Monitor,
  Landmark,
  TrendingUp,
  Plus,
  Fingerprint,
  BarChart3,
  MessageSquare,
  Keyboard,
} from "lucide-react"
import { Card, CardContent } from "@shared/components/ui/card"
import { Button } from "@shared/components/ui/button"

interface SettingItem {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  href?: string
  color?: string
}

interface SettingSection {
  title: string
  items: SettingItem[]
}

const settingSections: SettingSection[] = [
  {
    title: "Personal settings",
    items: [
      {
        icon: User,
        title: "Personal details",
        description: "Personal details, password, communication preferences, and your active sessions.",
        color: "text-primary",
      },
      {
        icon: Mail,
        title: "Communication preferences",
        description: "Customize the emails, SMS, and push notifications you receive.",
        color: "text-primary",
      },
      {
        icon: Code,
        title: "Developers",
        description: "Workbench, developer tools, and more.",
        color: "text-primary",
      },
    ],
  },
  {
    title: "Account settings",
    items: [
      {
        icon: Building,
        title: "Business",
        description: "Account details, account health, public info, payouts, legal entity, custom domains, and more.",
        color: "text-primary",
      },
      {
        icon: Shield,
        title: "Team and security",
        description: "Team members, roles, account security, authorized apps, and shared resources.",
        color: "text-primary",
      },
      {
        icon: CreditCard,
        title: "Your plans",
        description: "Manage how you pay for Stripe services.",
        color: "text-primary",
      },
      {
        icon: FileText,
        title: "Compliance and documents",
        description: "PCI compliance, documents, and legacy exports.",
        color: "text-primary",
      },
      {
        icon: Eye,
        title: "Product previews",
        description: "Try out new features.",
        color: "text-primary",
      },
      {
        icon: Star,
        title: "Perks",
        description: "Discounts on tools to run your startup.",
        color: "text-primary",
      },
    ],
  },
  {
    title: "Product settings",
    items: [
      {
        icon: Receipt,
        title: "Billing",
        description: "Subscriptions, invoices, quotes, and customer portal.",
        color: "text-primary",
      },
      {
        icon: Banknote,
        title: "Payments",
        description: "Checkout, payment methods, currency conversion, and more.",
        color: "text-primary",
      },
      {
        icon: Calculator,
        title: "Tax",
        description: "Origin address, preset tax code, default tax behavior, and tax integrations.",
        color: "text-primary",
      },
      {
        icon: Link,
        title: "Connect",
        description: "Manage your platform and connected accounts.",
        color: "text-primary",
      },
      {
        icon: Radar,
        title: "Radar",
        description: "Manage fraud protection and customization capabilities for your account.",
        color: "text-primary",
      },
      {
        icon: Monitor,
        title: "Terminal",
        description: "Tax identification numbers for hardware orders and invoices.",
        color: "text-primary",
      },
      {
        icon: Landmark,
        title: "Financial Connections",
        description: "Appearance, featured institutions, optimizations, and usage details.",
        color: "text-primary",
      },
      {
        icon: TrendingUp,
        title: "Revenue Recognition",
        description: "Revenue, amortization, and accounting period.",
        color: "text-primary",
      },
      {
        icon: Plus,
        title: "Discover more features",
        description: "Boost revenue, manage finances, and more.",
        color: "text-primary",
      },
      {
        icon: Fingerprint,
        title: "Identity",
        description: "Synthetic identity protection and native mobile SDK.",
        color: "text-primary",
      },
      {
        icon: BarChart3,
        title: "Sigma",
        description: "Manage your Sigma features.",
        color: "text-primary",
      },
    ],
  },
]

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-8">
        {settingSections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">{section.title}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <Card
                  key={item.title}
                  className="cursor-pointer transition-all hover:shadow-md border-gray-200 hover:border-gray-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <item.icon className={`h-5 w-5 ${item.color || "text-gray-600"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-primary hover:text-primary/80">{item.title}</h3>
                        <p className="mt-1 text-sm text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Links */}
      <div className="pt-8 border-t border-gray-200">
        <div className="flex items-center space-x-6 text-sm">
          <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80">
            <MessageSquare className="h-4 w-4 mr-2" />
            Share feedback
          </Button>
          <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80">
            <Keyboard className="h-4 w-4 mr-2" />
            Keyboard shortcuts
          </Button>
        </div>
      </div>
    </div>
  )
}
