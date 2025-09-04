import {
  ArrowLeftRight,
  ArrowUpDown,
  CreditCard,
  ExternalLink,
  FileText,
  MoreHorizontal,
  Plus,
  Repeat,
  Send,
  Settings,
  Workflow,
  Zap,
} from "lucide-react"

import { Button } from "@shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Typography } from "@shared/components/ui/typography"

export default function BalancesPage() {
  const balanceCategories = [
    {
      name: "Pending",
      total: "$93,457.64",
      currencies: [
        { code: "USD", amount: "$36,077.55" },
        { code: "GBP", amount: "£23,653.14" },
        { code: "EUR", amount: "€18,431.02" },
        { code: "USDC", amount: "5,119.73" },
      ],
      bgColor: "bg-warning/5 border-warning/20",
      textColor: "text-warning",
    },
    {
      name: "Operations",
      total: "$418,649.57",
      currencies: [
        { code: "USD", amount: "$270,258.60" },
        { code: "GBP", amount: "£25,625.51" },
        { code: "EUR", amount: "€76,178.93" },
        { code: "USDC", amount: "28,214.42" },
      ],
      bgColor: "bg-primary/5 border-primary/20",
      textColor: "text-primary",
    },
    {
      name: "Marketing",
      total: "$49,625.00",
      currencies: [{ code: "GBP", amount: "£37,357.70" }],
      bgColor: "bg-success/5 border-success/20",
      textColor: "text-success",
    },
  ]

  const activities = [
    {
      amount: "£37,357.70",
      description: "Operations → Marketing",
      time: "Today",
      icon: <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />,
    },
    {
      amount: "$9,900.00",
      description: "Pending → Operations",
      time: "Today",
      icon: <Zap className="h-4 w-4 text-muted-foreground" />,
    },
    {
      amount: "£1,000.00",
      description: "Operations → yuki.t@email.com",
      time: "Today",
      icon: <Send className="h-4 w-4 text-muted-foreground" />,
    },
    {
      amount: "€20,105.38",
      description: "Operations → Operations",
      time: "Today",
      icon: <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />,
    },
    {
      amount: "£15,405.77",
      description: "Operations → Marketing",
      time: "Today",
      icon: <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  const cards = [
    {
      name: "Marcus Chen",
      number: "••••2797",
      spent: "£0.00",
      limit: "£50,000.00",
      icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
    },
    {
      name: "Marketing",
      number: "••••2183",
      spent: "$0.00",
      limit: "$50,000.00",
      icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
    },
    {
      name: "Aisha Johnson",
      number: "••••3724",
      spent: "$10,395.10",
      limit: "$50,000.00",
      icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
    },
    {
      name: "Operations",
      number: "••••4534",
      spent: "$37,873.02",
      limit: "$100,000.00",
      icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  const workflows = [
    {
      name: "Minimum balance",
      description: "Ran 3 hours ago",
      icon: <Workflow className="h-4 w-4 text-primary" />,
    },
    {
      name: "Weekly payroll",
      description: "Ran yesterday",
      icon: <Workflow className="h-4 w-4 text-success" />,
    },
    {
      name: "Xero",
      description: "Ran 5 minutes ago",
      icon: <Workflow className="h-4 w-4 text-purple-600" />,
    },
  ]

  return (
    <div className="container mx-auto p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <Typography variant="h1">
            Balances <span className="text-muted-foreground">$561,732.21</span>
          </Typography>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <ArrowLeftRight className="h-4 w-4 mr-2" />
            Transfer
          </Button>
          <Button variant="outline" size="sm">
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add funds
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Request
          </Button>
          <Button variant="outline" size="sm">
            <CreditCard className="h-4 w-4 mr-2" />
            New card
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Borrow
          </Button>
          <Button variant="outline" size="sm">
            <Repeat className="h-4 w-4 mr-2" />
            New workflow
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Balance Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {balanceCategories.map((category) => (
          <Card key={category.name} className={`${category.bgColor} relative border`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{category.name}</CardTitle>
              <div className={`text-2xl font-bold ${category.textColor}`}>{category.total}</div>
            </CardHeader>
            <CardContent className="space-y-2">
              {category.currencies.map((currency) => (
                <div key={currency.code} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{currency.code}</span>
                  <span className="font-medium text-foreground">{currency.amount}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2">
                {[
                  { icon: Zap, label: "Quick action" },
                  { icon: ArrowUpDown, label: "Sort" },
                  { icon: Send, label: "Send" },
                  { icon: MoreHorizontal, label: "More options" },
                ].map(({ icon: Icon, label }) => (
                  <Button
                    key={label}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-muted-foreground hover:bg-muted/50"
                    aria-label={label}
                  >
                    <Icon className="h-3 w-3" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add Category Card */}
        <Card className="border-dashed border-2 border-border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
          <CardContent className="flex items-center justify-center h-full min-h-[200px]">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <Typography variant="h3" as={CardTitle}>
              Activity
            </Typography>
            <Button variant="ghost" size="sm">
              <ExternalLink className="h-4 w-4 mr-1" />
              View all
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <Typography variant="small" className="text-muted-foreground font-medium">
              Today
            </Typography>
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground">{activity.amount}</div>
                  <div className="text-sm text-muted-foreground truncate">{activity.description}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <Typography variant="h3" as={CardTitle}>
              Cards
            </Typography>
            <Button variant="ghost" size="sm">
              <ExternalLink className="h-4 w-4 mr-1" />
              View all
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {cards.map((card, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0">{card.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground">
                    {card.name} {card.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {card.spent} of {card.limit} limit
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Create new card
            </Button>
          </CardContent>
        </Card>

        {/* Workflows */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <Typography variant="h3" as={CardTitle}>
              Workflows
            </Typography>
            <Button variant="ghost" size="sm">
              <ExternalLink className="h-4 w-4 mr-1" />
              View all
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {workflows.map((workflow, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0">{workflow.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground">{workflow.name}</div>
                  <div className="text-sm text-muted-foreground">{workflow.description}</div>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" />
              New workflow
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
