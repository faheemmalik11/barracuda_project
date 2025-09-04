import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Label } from "@shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select";
import { StepComponentProps } from "@shared/types/merchant";

export function BusinessTypeStep({ formData, updateFormData }: StepComponentProps) {
  const businessLocations = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'eu', label: 'European Union' },
  ];

  const businessTypes = [
    { value: 'individual', label: 'Individual' },
    { value: 'company', label: 'Company' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'non-profit', label: 'Non-profit' },
    { value: 'llc', label: 'LLC' },
    { value: 'corporation', label: 'Corporation' },
  ];

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Let's start with some basics</CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose your location and business type to get started.
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="businessLocation" className="text-foreground">
            Business Location
          </Label>
          <Select
            value={formData.businessLocation || ''}
            onValueChange={(value) => updateFormData({ businessLocation: value })}
          >
            <SelectTrigger id="businessLocation" className="mt-1">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {businessLocations.map((location) => (
                <SelectItem key={location.value} value={location.value}>
                  {location.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessType" className="text-foreground">
            Business Type
          </Label>
          <Select
            value={formData.businessType || ''}
            onValueChange={(value) => updateFormData({ businessType: value })}
          >
            <SelectTrigger id="businessType" className="mt-1">
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
