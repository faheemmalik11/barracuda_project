import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Badge } from '@shared/components/ui/badge'
import { User, MapPin, Building, Calendar } from 'lucide-react'

interface ProfileInfo {
  name: string
  location: string
  store: string
  installDate: string
  assignedTo?: string
  department?: string
  notes?: string
  tags?: string[]
}

interface ProfileSectionProps {
  profile: ProfileInfo
  title?: string
}

export function ProfileSection({ profile, title = "Profile Information" }: ProfileSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <p className="text-sm font-medium">{profile.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Store</label>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{profile.store}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Location</label>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{profile.location}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Install Date</label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{new Date(profile.installDate).toLocaleDateString()}</p>
              </div>
            </div>
            {profile.assignedTo && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Assigned To</label>
                <p className="text-sm">{profile.assignedTo}</p>
              </div>
            )}
            {profile.department && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Department</label>
                <p className="text-sm">{profile.department}</p>
              </div>
            )}
          </div>

          {profile.tags && profile.tags.length > 0 && (
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Tags</label>
              <div className="flex flex-wrap gap-2">
                {profile.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {profile.notes && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Notes</label>
              <p className="text-sm mt-1 p-3 bg-muted rounded-md">{profile.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
