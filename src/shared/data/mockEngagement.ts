import type { EngagementEvent } from "@shared/types/engagement"

export const mockEngagement: EngagementEvent[] = [
  {
    id: "eng_001",
    userId: "user_123",
    eventType: "login",
    eventTimestamp: "2024-05-30T10:00:00Z",
    platform: "web",
    details: { ipAddress: "192.168.1.100" },
  },
  {
    id: "eng_002",
    userId: "user_456",
    eventType: "page_view",
    eventTimestamp: "2024-05-30T10:05:00Z",
    platform: "mobile_ios",
    details: { pageUrl: "/dashboard" },
  },
  {
    id: "eng_003",
    userId: "user_123",
    eventType: "feature_use",
    eventTimestamp: "2024-05-30T10:15:00Z",
    platform: "web",
    details: { featureName: "create_report", reportId: "rep_abc" },
    sessionDuration: 1200,
  },
  {
    id: "eng_004",
    userId: "user_789",
    eventType: "content_download",
    eventTimestamp: "2024-05-29T14:30:00Z",
    platform: "web",
    details: { contentId: "ebook_001", format: "pdf" },
  },
  {
    id: "eng_005",
    userId: "user_456",
    eventType: "support_ticket",
    eventTimestamp: "2024-05-30T11:00:00Z",
    platform: "mobile_ios",
    details: { ticketId: "sup_777", subject: "Login issue" },
  },
]
