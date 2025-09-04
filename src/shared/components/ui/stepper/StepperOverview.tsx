import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Button } from "@shared/components/ui/button"
import { ArrowRight, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface OverviewItem {
  title: string
  description: string
  status: "pending" | "in-progress" | "completed" | "error"
  action?: string
}

interface StepperOverviewProps {
  title?: string
  description?: string
  items?: OverviewItem[]
  onItemAction?: (itemIndex: number) => void
  showProgress?: boolean
  completedCount?: number
  totalCount?: number
}

export function StepperOverview({
  title = "Getting Started",
  description = "Complete the following steps to set up your configuration.",
  items = [],
  onItemAction,
  showProgress = true,
  completedCount = 0,
  totalCount = 0,
}: StepperOverviewProps) {
  const getStatusIcon = (status: OverviewItem["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-500" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
    }
  }

  const getStatusColor = (status: OverviewItem["status"]) => {
    switch (status) {
      case "completed":
        return "border-green-200 bg-green-50"
      case "in-progress":
        return "border-blue-200 bg-blue-50"
      case "error":
        return "border-red-200 bg-red-50"
      default:
        return "border-gray-200 bg-white"
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
          
          {showProgress && totalCount > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{completedCount} of {totalCount} completed</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="grid gap-4">
            {items.map((item, index) => (
              <Card key={index} className={getStatusColor(item.status)}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(item.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    {item.action && onItemAction && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onItemAction(index)}
                        className="flex-shrink-0"
                      >
                        {item.action}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {items.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Welcome to the Setup</CardTitle>
              <CardDescription>
                Use the navigation on the left to begin configuring your settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Select a step from the sidebar to get started with the configuration process.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
