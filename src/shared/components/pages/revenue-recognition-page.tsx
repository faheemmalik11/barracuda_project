import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Button } from "@shared/components/ui/button"
import { Badge } from "@shared/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  BarChart3,
  Settings,
  Plus,
  Download,
  FileText,
} from "lucide-react"

export default function RevenueRecognitionPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Revenue Recognition</h1>
          <p className="text-muted-foreground mt-1">Manage revenue recognition rules and track deferred revenue</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Rule
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recognized Revenue</p>
                <p className="text-2xl font-bold text-foreground">$842,150</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-success mr-1" />
                  <span className="text-sm text-success">+8.2% from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Deferred Revenue</p>
                <p className="text-2xl font-bold text-foreground">$156,320</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="h-4 w-4 text-primary mr-1" />
                  <span className="text-sm text-primary">-3.1% from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recognition Rate</p>
                <p className="text-2xl font-bold text-foreground">84.3%</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-success mr-1" />
                  <span className="text-sm text-success">+2.1% from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming Recognition</p>
                <p className="text-2xl font-bold text-foreground">$78,450</p>
                <div className="flex items-center mt-2">
                  <Calendar className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600 dark:text-orange-400">Next 30 days</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Timeline Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Recognition Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[
              { month: "Jan", recognized: 120, deferred: 30 },
              { month: "Feb", recognized: 135, deferred: 25 },
              { month: "Mar", recognized: 150, deferred: 35 },
              { month: "Apr", recognized: 142, deferred: 28 },
              { month: "May", recognized: 168, deferred: 32 },
              { month: "Jun", recognized: 185, deferred: 40 },
            ].map((data, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                <div className="flex flex-col items-center space-y-1 w-full">
                  <div
                    className="bg-success w-full rounded-t"
                    style={{ height: `${(data.recognized / 200) * 200}px` }}
                  />
                  <div className="bg-primary/60 w-full" style={{ height: `${(data.deferred / 200) * 100}px` }} />
                </div>
                <span className="text-xs text-muted-foreground">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-success rounded mr-2" />
              <span className="text-sm text-muted-foreground">Recognized Revenue</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary/60 rounded mr-2" />
              <span className="text-sm text-muted-foreground">Deferred Revenue</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recognition Rules */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recognition Rules</CardTitle>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Manage Rules
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Subscription Revenue", type: "Monthly", status: "Active", impact: "$45,200" },
              { name: "One-time Services", type: "Immediate", status: "Active", impact: "$12,800" },
              { name: "Annual Contracts", type: "Yearly", status: "Active", impact: "$78,500" },
              { name: "Setup Fees", type: "Immediate", status: "Inactive", impact: "$3,200" },
            ].map((rule, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{rule.name}</h4>
                  <Badge variant={rule.status === "Active" ? "default" : "secondary"}>{rule.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Recognition: {rule.type}</p>
                <p className="text-sm font-medium text-foreground">Monthly Impact: {rule.impact}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Recognition Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: "TXN-001",
                customer: "Acme Corp",
                amount: "$2,400",
                recognized: "$800",
                deferred: "$1,600",
                date: "2024-01-15",
                status: "Partial",
              },
              {
                id: "TXN-002",
                customer: "TechStart Inc",
                amount: "$1,200",
                recognized: "$1,200",
                deferred: "$0",
                date: "2024-01-14",
                status: "Complete",
              },
              {
                id: "TXN-003",
                customer: "Global Solutions",
                amount: "$5,000",
                recognized: "$1,250",
                deferred: "$3,750",
                date: "2024-01-13",
                status: "Partial",
              },
              {
                id: "TXN-004",
                customer: "Innovation Labs",
                amount: "$800",
                recognized: "$800",
                deferred: "$0",
                date: "2024-01-12",
                status: "Complete",
              },
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium text-foreground">{transaction.id}</p>
                    <p className="text-sm text-muted-foreground">{transaction.customer}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{transaction.amount}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-success">{transaction.recognized}</p>
                    <p className="text-xs text-muted-foreground">Recognized</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">{transaction.deferred}</p>
                    <p className="text-xs text-muted-foreground">Deferred</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground">{transaction.date}</p>
                    <Badge variant={transaction.status === "Complete" ? "default" : "secondary"} className="text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
