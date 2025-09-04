export interface Engagement {
  id: string
  userId: string
  eventType: "login" | "page_view" | "feature_use" | "content_download" | "support_ticket"
  eventTimestamp: string
  platform: "web" | "mobile_ios" | "mobile_android" | "api"
  details?: Record<string, unknown>
  sessionDuration?: number
  type: string
}

export type EngagementEventTypeFilter = "all" | Engagement["eventType"]

export const engagementEventTypeOptions = [
  { value: "all", label: "All Events" },
  { value: "login", label: "Logins" },
  { value: "page_view", label: "Page Views" },
  { value: "feature_use", label: "Feature Uses" },
  { value: "content_download", label: "Content Downloads" },
  { value: "support_ticket", label: "Support Tickets" },
]
