import type { DigitalAsset } from "@shared/types/digital"

export const mockDigital: DigitalAsset[] = [
  {
    id: "dig_001",
    title: "The Ultimate Guide to Next.js",
    type: "ebook",
    status: "published",
    version: "2.1",
    fileSize: "5.2MB",
    uploadDate: "2024-03-15T00:00:00Z",
    lastModified: "2024-05-10T00:00:00Z",
    tags: ["nextjs", "react", "webdev"],
  },
  {
    id: "dig_002",
    title: "Pro Video Editor Suite",
    type: "software_license",
    status: "published",
    version: "4.0.1",
    uploadDate: "2024-01-20T00:00:00Z",
    lastModified: "2024-04-25T00:00:00Z",
    tags: ["video editing", "software"],
  },
  {
    id: "dig_003",
    title: "Introduction to Quantum Computing",
    type: "video_course",
    status: "review_pending",
    uploadDate: "2024-05-25T00:00:00Z",
    lastModified: "2024-05-28T00:00:00Z",
    tags: ["education", "quantum", "course"],
  },
  {
    id: "dig_004",
    title: "Sunset Over Mountains",
    type: "stock_photo",
    status: "archived",
    fileSize: "12MB",
    uploadDate: "2023-06-10T00:00:00Z",
    lastModified: "2023-12-01T00:00:00Z",
    tags: ["nature", "landscape", "photography"],
  },
]
