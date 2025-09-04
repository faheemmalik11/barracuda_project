import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Checkbox } from "@shared/components/ui/checkbox";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select";
import { StepComponentProps } from "@shared/types/merchant";

interface RepresentativeStepProps extends StepComponentProps {
  handleFieldBlur: (fieldName: string, value: string) => void;
  validation: {
    hasFieldError: (field: string) => boolean;
    getFieldError: (field: string) => string;
  };
}

export function RepresentativeStep({ 
  formData, 
  updateFormData, 
  handleFieldBlur, 
  validation 
}: RepresentativeStepProps) {
  const ownershipOptions = [
    '0-10%', '11-25%', '26-50%', '51-75%', '76-100%'
  ];

  const handlePhoneChange = (field: 'countryCode' | 'number', value: string) => {
    updateFormData({ 
      representativePhone: {
        ...(formData.representativePhone || {}),
        [field]: value
      } 
    });
  };

  const handleAddressChange = (field: string, value: string) => {
    updateFormData({ 
      homeAddress: { 
        ...(formData.homeAddress || {}), 
        [field]: value 
      } 
    });
  };

  const getFieldError = (fieldName: string) => {
    return validation?.getFieldError?.(fieldName) || '';
  };

  const handleFieldChange = (field: string, value: string | boolean) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Business Representative</h1>
        <p className="mt-2 text-muted-foreground">
          Information about the person authorized to represent this business.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="representativeFirstName">First Name *</Label>
              <Input
                id="representativeFirstName"
                value={formData.representativeFirstName || ''}
                onChange={(e) => handleFieldChange('representativeFirstName', e.target.value)}
                onBlur={(e) => handleFieldBlur('representativeFirstName', e.target.value)}
                className={validation?.hasFieldError?.('representativeFirstName') ? 'border-destructive' : ''}
                placeholder="Enter first name"
                autoComplete="given-name"
              />
              {validation?.hasFieldError?.('representativeFirstName') && (
                <p className="text-sm text-destructive">
                  {getFieldError('representativeFirstName')}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="representativeLastName">Last Name *</Label>
              <Input
                id="representativeLastName"
                value={formData.representativeLastName || ''}
                onChange={(e) => handleFieldChange('representativeLastName', e.target.value)}
                onBlur={(e) => handleFieldBlur('representativeLastName', e.target.value)}
                className={validation?.hasFieldError?.('representativeLastName') ? 'border-destructive' : ''}
                placeholder="Enter last name"
                autoComplete="family-name"
              />
              {validation?.hasFieldError?.('representativeLastName') && (
                <p className="text-sm text-destructive">
                  {getFieldError('representativeLastName')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="representativeEmail">Email Address *</Label>
              <Input
                id="representativeEmail"
                type="email"
                value={formData.representativeEmail || ''}
                onChange={(e) => handleFieldChange('representativeEmail', e.target.value)}
                onBlur={(e) => handleFieldBlur('representativeEmail', e.target.value)}
                className={validation?.hasFieldError?.('representativeEmail') ? 'border-destructive' : ''}
                placeholder="Enter email address"
                autoComplete="email"
              />
              {validation?.hasFieldError?.('representativeEmail') && (
                <p className="text-sm text-destructive">
                  {getFieldError('representativeEmail')}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle || ''}
                onChange={(e) => handleFieldChange('jobTitle', e.target.value)}
                onBlur={(e) => handleFieldBlur('jobTitle', e.target.value)}
                className={validation?.hasFieldError?.('jobTitle') ? 'border-destructive' : ''}
                placeholder="Enter job title"
                autoComplete="organization-title"
              />
              {validation?.hasFieldError?.('jobTitle') && (
                <p className="text-sm text-destructive">
                  {getFieldError('jobTitle')}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth || ''}
                onChange={(e) => handleFieldChange('dateOfBirth', e.target.value)}
                onBlur={(e) => handleFieldBlur('dateOfBirth', e.target.value)}
                className={validation?.hasFieldError?.('dateOfBirth') ? 'border-destructive' : ''}
                autoComplete="bday"
              />
              <p className="text-xs text-muted-foreground">Must be at least 18 years old</p>
              {validation?.hasFieldError?.('dateOfBirth') && (
                <p className="text-sm text-destructive">
                  {getFieldError('dateOfBirth')}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ownershipPercentage">Ownership Percentage *</Label>
              <Select
                value={formData.ownershipPercentage || ''}
                onValueChange={(value) => handleFieldChange('ownershipPercentage', value)}
              >
                <SelectTrigger className={validation?.hasFieldError?.('ownershipPercentage') ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select ownership percentage" />
                </SelectTrigger>
                <SelectContent>
                  {ownershipOptions.map(option => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validation?.hasFieldError?.('ownershipPercentage') && (
                <p className="text-sm text-destructive">
                  {getFieldError('ownershipPercentage')}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Phone Number *</Label>
            <div className="flex gap-2">
              <Select
                value={formData.representativePhone?.countryCode || '+1'}
                onValueChange={(value) => handlePhoneChange('countryCode', value)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+1">+1 (US/CA)</SelectItem>
                  <SelectItem value="+44">+44 (UK)</SelectItem>
                  <SelectItem value="+49">+49 (DE)</SelectItem>
                  <SelectItem value="+33">+33 (FR)</SelectItem>
                  <SelectItem value="+81">+81 (JP)</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="tel"
                value={formData.representativePhone?.number || ''}
                onChange={(e) => handlePhoneChange('number', e.target.value)}
                onBlur={() => handleFieldBlur('representativePhone', formData.representativePhone?.number || '')}
                className={`flex-1 ${validation?.hasFieldError?.('representativePhone') ? 'border-destructive' : ''}`}
                placeholder="(123) 456-7890"
              />
            </div>
            {validation?.hasFieldError?.('representativePhone') && (
              <p className="text-sm text-destructive">
                {getFieldError('representativePhone')}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Home Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="street">Street Address *</Label>
              <Input
                id="street"
                value={formData.homeAddress?.street || ''}
                onChange={(e) => handleAddressChange('street1', e.target.value)}
                onBlur={() => handleFieldBlur('homeAddress.street1', formData.homeAddress?.street || '')}
                className={validation?.hasFieldError?.('homeAddress.street1') ? 'border-destructive' : ''}
                placeholder="123 Main St"
              />
              {validation?.hasFieldError?.('homeAddress.street1') && (
                <p className="text-sm text-destructive">
                  {getFieldError('homeAddress.street1')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.homeAddress?.city || ''}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                onBlur={() => handleFieldBlur('homeAddress.city', formData.homeAddress?.city || '')}
                className={validation?.hasFieldError?.('homeAddress.city') ? 'border-destructive' : ''}
                placeholder="New York"
              />
              {validation?.hasFieldError?.('homeAddress.city') && (
                <p className="text-sm text-destructive">
                  {getFieldError('homeAddress.city')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                value={formData.homeAddress?.state || ''}
                onChange={(e) => handleAddressChange('state', e.target.value)}
                onBlur={() => handleFieldBlur('homeAddress.state', formData.homeAddress?.state || '')}
                placeholder="NY"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code *</Label>
              <Input
                id="postalCode"
                value={formData.homeAddress?.postalCode || ''}
                onChange={(e) => handleAddressChange('postcode', e.target.value)}
                onBlur={() => handleFieldBlur('homeAddress.postcode', formData.homeAddress?.postalCode || '')}
                className={validation?.hasFieldError?.('homeAddress.postcode') ? 'border-destructive' : ''}
                placeholder="10001"
              />
              {validation?.hasFieldError?.('homeAddress.postcode') && (
                <p className="text-sm text-destructive">
                  {getFieldError('homeAddress.postcode')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select
                value={formData.homeAddress?.country || ''}
                onValueChange={(value) => handleAddressChange('country', value)}
              >
                <SelectTrigger className={validation?.hasFieldError?.('homeAddress.country') ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="GB">United Kingdom</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                  <SelectItem value="DE">Germany</SelectItem>
                  <SelectItem value="FR">France</SelectItem>
                  <SelectItem value="JP">Japan</SelectItem>
                </SelectContent>
              </Select>
              {validation?.hasFieldError?.('homeAddress.country') && (
                <p className="text-sm text-destructive">
                  {getFieldError('homeAddress.country')}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ownership & Control</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="owns25Percent"
                checked={formData.owns25Percent || false}
                onCheckedChange={(checked) => handleFieldChange('owns25Percent', checked === true)}
                className="mt-1"
              />
              <div className="space-y-1">
                <Label htmlFor="owns25Percent" className="text-sm font-normal">
                  This person owns 25% or more of the business
                </Label>
                <p className="text-xs text-muted-foreground">
                  Required for compliance with financial regulations
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox
                id="hasManagementControl"
                checked={formData.hasManagementControl || false}
                onCheckedChange={(checked) => handleFieldChange('hasManagementControl', checked === true)}
                className="mt-1"
              />
              <div className="space-y-1">
                <Label htmlFor="hasManagementControl" className="text-sm font-normal">
                  This person has significant management control over the business
                </Label>
                <p className="text-xs text-muted-foreground">
                  Such as CEO, CFO, or other executive role
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
