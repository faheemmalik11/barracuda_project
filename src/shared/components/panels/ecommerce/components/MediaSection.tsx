import React from 'react'
import { CollapsibleSection } from '@shared/components/ui'
import { Badge } from '@shared/components/ui/badge'
import { Button } from '@shared/components/ui/button'
import { Image, Video, FileText, Download } from 'lucide-react'

interface MediaSectionProps {
  ecommerceData?: any
  isExpanded?: boolean
  onToggle?: () => void
  isDetailView?: boolean
}

export function MediaSection({ ecommerceData, isExpanded, onToggle, isDetailView }: MediaSectionProps) {
  const mockMedia = [
    {
      id: '1',
      type: 'image',
      name: 'product-hero.jpg',
      url: 'https://example.com/media/product-hero.jpg',
      size: '2.4 MB',
      dimensions: '1920x1080',
      icon: <Image className="h-4 w-4" />
    },
    {
      id: '2',
      type: 'video',
      name: 'demo-video.mp4',
      url: 'https://example.com/media/demo-video.mp4',
      size: '15.2 MB',
      duration: '2:34',
      icon: <Video className="h-4 w-4" />
    },
    {
      id: '3',
      type: 'document',
      name: 'terms-of-service.pdf',
      url: 'https://example.com/media/terms-of-service.pdf',
      size: '245 KB',
      pages: '12 pages',
      icon: <FileText className="h-4 w-4" />
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-green-100 text-green-800'
      case 'video': return 'bg-blue-100 text-blue-800'
      case 'document': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <CollapsibleSection
      title="Media Assets"
      isExpanded={isExpanded}
      onToggle={onToggle}
      isDetailView={isDetailView}
    >
      <div className="space-y-3">
        {mockMedia.map((media) => (
          <div key={media.id} className="flex items-center space-x-3 p-3 border rounded-lg">
            <div className="p-2 bg-muted rounded">
              {media.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{media.name}</h4>
                <Badge className={getTypeColor(media.type)}>
                  {media.type}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                <span>{media.size}</span>
                {media.dimensions && <span>{media.dimensions}</span>}
                {media.duration && <span>{media.duration}</span>}
                {media.pages && <span>{media.pages}</span>}
              </div>
            </div>
            <Button size="sm" variant="ghost">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  )
}
