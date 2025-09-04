import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/components/ui/card"
import { AppStatusBadge } from '@shared/components/ui/status-badge/AppStatusBadge'
import { Progress } from "@shared/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared/components/ui/table"
import { BarChart3, Eye, Users, DollarSign, TrendingUp, Globe, ExternalLink } from "lucide-react"
import type { PaymentLink, CountryStats, ReferrerStats, ActivityLog } from "../types/analytics.types"
import { format } from "date-fns"
import { formatCurrency, formatPercentage, calculateConversionRate } from "../utils"

interface PaymentLinkAnalyticsProps {
  link: PaymentLink
  countryStats?: CountryStats[]
  referrerStats?: ReferrerStats[]
  recentActivity?: ActivityLog[]
}

export function PaymentLinkAnalytics({ 
  link, 
  countryStats = [], 
  referrerStats = [], 
  recentActivity = [] 
}: PaymentLinkAnalyticsProps) {
  const conversionRate = calculateConversionRate(link.conversions, link.views)

  return (
    <div className="space-y-6">
      {/* Link Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            {link.name}
          </CardTitle>
          <CardDescription>
            Created {format(link.created, "MMMM d, yyyy")} • Last used{" "}
            {link.lastUsed ? format(link.lastUsed, "MMMM d, yyyy") : "Never"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <AppStatusBadge 
              variant="generic" 
              text={link.type}
              color="neutral"
            />
            <AppStatusBadge 
              variant="generic" 
              text={link.status}
              color={link.status === "active" ? "success" : "neutral"}
            />
          </div>
          <div className="text-sm text-gray-600">{link.url}</div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{link.views.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{link.conversions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Successful payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(conversionRate)}</div>
            <p className="text-xs text-muted-foreground">Views to payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(link.totalRevenue, 'USD', 2)}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Countries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Top Countries
          </CardTitle>
          <CardDescription>
            Where your customers are located
          </CardDescription>
        </CardHeader>
        <CardContent>
          {countryStats.length > 0 ? (
            <div className="space-y-3">
              {countryStats.map((country) => (
                <div className="flex items-center justify-between" key={country.country}>
                  <div className="flex items-center gap-3 flex-1">
                    <span className="w-20 text-sm font-medium">{country.country}</span>
                    <Progress value={country.percentage} className="flex-1 max-w-24" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {country.count} ({formatPercentage(country.percentage)})
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No country data available</p>
          )}
        </CardContent>
      </Card>

      {/* Top Referrers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Top Referrers
          </CardTitle>
          <CardDescription>
            Where your traffic is coming from
          </CardDescription>
        </CardHeader>
        <CardContent>
          {referrerStats.length > 0 ? (
            <div className="space-y-3">
              {referrerStats.map((referrer) => (
                <div className="flex items-center justify-between" key={referrer.referrer}>
                  <div className="flex items-center gap-3 flex-1">
                    <span className="w-20 text-sm font-medium">{referrer.referrer}</span>
                    <Progress value={referrer.percentage} className="flex-1 max-w-24" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {referrer.count} ({formatPercentage(referrer.percentage)})
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No referrer data available</p>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest interactions with your payment link
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentActivity.length > 0 ? (
            <div className="rounded-md border">
              <div className="overflow-x-auto w-full">
                <Table className="whitespace-nowrap">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Country</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentActivity.map((activity, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-sm">{format(activity.date, "MMM d, h:mm a")}</TableCell>
                        <TableCell>
                          <AppStatusBadge 
                            variant="generic" 
                            text={activity.action}
                            color={
                              activity.action.includes("completed") ? "success" :
                              activity.action.includes("failed") ? "error" : "neutral"
                            }
                          />
                        </TableCell>
                        <TableCell>{activity.amount ? formatCurrency(activity.amount, 'USD', 2) : "-"}</TableCell>
                        <TableCell>{activity.country}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No recent activity</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}