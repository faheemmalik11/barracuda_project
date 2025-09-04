import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Badge } from "@shared/components/ui/badge"
import { Progress } from "@shared/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, Users, CreditCard, AlertTriangle } from "lucide-react"

// Types
interface StatCard {
  title: string
  value: string
  change: {
    value: string
    trend: 'up' | 'down'
  }
  icon: typeof DollarSign
}

interface PaymentMethod {
  name: string
  percentage: number
}

interface ActivityItem {
  type: 'payment' | 'refund'
  amount: string
  customer: string
  status: 'succeeded' | 'processed' | 'failed'
}

// Constants
const STAT_CARDS: StatCard[] = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: { value: "+20.1% from last month", trend: "up" },
    icon: DollarSign,
  },
  {
    title: "Transactions",
    value: "+2,350",
    change: { value: "+180.1% from last month", trend: "up" },
    icon: CreditCard,
  },
  {
    title: "Active Customers",
    value: "+12,234",
    change: { value: "+19% from last month", trend: "up" },
    icon: Users,
  },
  {
    title: "Failed Payments",
    value: "573",
    change: { value: "-2% from last month", trend: "down" },
    icon: AlertTriangle,
  },
]

const PAYMENT_METHODS: PaymentMethod[] = [
  { name: "Credit Card", percentage: 68 },
  { name: "PayPal", percentage: 24 },
  { name: "Bank Transfer", percentage: 8 },
]

const RECENT_ACTIVITY: ActivityItem[] = [
  { type: "payment", amount: "$1,234.56", customer: "John Doe", status: "succeeded" },
  { type: "refund", amount: "$89.99", customer: "Jane Smith", status: "processed" },
  { type: "payment", amount: "$567.89", customer: "Bob Johnson", status: "failed" },
  { type: "payment", amount: "$2,345.67", customer: "Alice Brown", status: "succeeded" },
]

/**
 * StatCardComponent - Displays a statistics card with title, value, and trend
 */
const StatCardComponent = ({ card }: { card: StatCard }) => {
  const Icon = card.icon
  const TrendIcon = card.change.trend === "up" ? TrendingUp : TrendingDown
  const trendColorClass = card.change.trend === "up" ? "text-accent-foreground" : "text-destructive"

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{card.value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          <TrendIcon className={`h-3 w-3 mr-1 ${trendColorClass}`} />
          {card.change.value}
        </p>
      </CardContent>
    </Card>
  )
}

/**
 * ActivityItem - Displays a single activity item
 */
const ActivityItemComponent = ({ item }: { item: ActivityItem }) => (
  <div className="flex items-center justify-between p-3 border rounded-lg">
    <div className="flex items-center space-x-3">
      <div className="w-2 h-2 rounded-full bg-primary"></div>
      <div>
        <p className="text-sm font-medium">
          {item.type === "payment" ? "Payment" : "Refund"} {item.amount}
        </p>
        <p className="text-xs text-muted-foreground">{item.customer}</p>
      </div>
    </div>
    <Badge
      variant={
        item.status === "succeeded" || item.status === "processed"
          ? "default"
          : item.status === "failed"
            ? "destructive"
            : "secondary"
      }
    >
      {item.status}
    </Badge>
  </div>
)

/**
 * HomePage Component
 * 
 * Displays a dashboard with key metrics, payment methods distribution,
 * and recent activity.
 */
export function HomePage() {
  // TODO: Add real data fetching logic and loading states when implementing API integration
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your payments.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STAT_CARDS.map((card, index) => (
          <StatCardComponent key={index} card={card} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Chart placeholder - Revenue trends over time
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {PAYMENT_METHODS.map((method, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{method.name}</span>
                    <span className="text-sm font-medium">{method.percentage}%</span>
                  </div>
                  <Progress value={method.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {RECENT_ACTIVITY.map((activity, index) => (
              <ActivityItemComponent key={index} item={activity} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
