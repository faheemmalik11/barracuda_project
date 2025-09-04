import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select";
import { Textarea } from "@shared/components/ui/textarea";
import { StepComponentProps } from "@shared/types/merchant";
import React from "react";

interface BusinessDetailsStepProps extends StepComponentProps {
  handleFieldBlur?: (fieldName: string, value: string) => void;
  validation?: {
    hasFieldError: (field: string) => boolean;
    getFieldError: (field: string) => string | undefined;
  };
}

export function BusinessDetailsStep({ 
  formData, 
  updateFormData, 
  handleFieldBlur = () => {},
  validation = {
    hasFieldError: () => false,
    getFieldError: () => undefined
  }
}: BusinessDetailsStepProps) {
  const industries = [
    'Technology',
    'Retail',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Food & Beverage',
    'Professional Services',
    'Entertainment',
    'Transportation',
    'Real Estate',
    'Other'
  ];

  const handleAddressChange = (field: keyof NonNullable<typeof formData.businessAddress>, value: string) => {
    updateFormData({
      businessAddress: {
        ...(formData.businessAddress || {}),
        [field]: value
      }
    });
  };

  const handlePhoneChange = (field: keyof NonNullable<typeof formData.businessPhone>, value: string) => {
    updateFormData({
      businessPhone: {
        ...(formData.businessPhone || {}),
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Details</CardTitle>
          <p className="text-sm text-muted-foreground">
            Provide your business information and contact details.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="legalBusinessName">Legal Business Name *</Label>
            <Input
              id="legalBusinessName"
              value={formData.legalBusinessName || ''}
              onChange={(e) => updateFormData({ legalBusinessName: e.target.value })}
              onBlur={(e) => handleFieldBlur('legalBusinessName', e.target.value)}
              className={validation.hasFieldError('legalBusinessName') ? 'border-destructive' : ''}
              placeholder="Enter your legal business name"
            />
            {validation.hasFieldError('legalBusinessName') && (
              <p className="text-sm text-destructive">
                {validation.getFieldError('legalBusinessName')}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="uniqueId">Unique Business ID *</Label>
            <Input
              id="uniqueId"
              value={formData.uniqueId || ''}
              onChange={(e) => updateFormData({ uniqueId: e.target.value })}
              onBlur={(e) => handleFieldBlur('uniqueId', e.target.value)}
              className={validation.hasFieldError('uniqueId') ? 'border-destructive' : ''}
              placeholder="Tax ID, Registration Number, etc."
            />
            <p className="text-sm text-muted-foreground">
              Your tax ID, registration number, or other unique identifier
            </p>
            {validation.hasFieldError('uniqueId') && (
              <p className="text-sm text-destructive">
                {validation.getFieldError('uniqueId')}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tradingName">Trading Name</Label>
            <Input
              id="tradingName"
              value={formData.tradingName || ''}
              onChange={(e) => updateFormData({ tradingName: e.target.value })}
              onBlur={(e) => handleFieldBlur('tradingName', e.target.value)}
              className={validation.hasFieldError('tradingName') ? 'border-destructive' : ''}
              placeholder="Enter trading name (if different from legal name)"
            />
            <p className="text-sm text-muted-foreground">
              The name your business operates under, if different from legal name
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry *</Label>
            <Select
              value={formData.industry || ''}
              onValueChange={(value) => updateFormData({ industry: value })}
            >
              <SelectTrigger className={validation.hasFieldError('industry') ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {validation.hasFieldError('industry') && (
              <p className="text-sm text-destructive">
                {validation.getFieldError('industry')}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={formData.website || ''}
              onChange={(e) => updateFormData({ website: e.target.value })}
              onBlur={(e) => handleFieldBlur('website', e.target.value)}
              className={validation.hasFieldError('website') ? 'border-destructive' : ''}
              placeholder="https://yourwebsite.com"
            />
            <p className="text-sm text-muted-foreground">Your business website (optional)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productDescription">
              Product/Service Description *
            </Label>
            <Textarea
              id="productDescription"
              value={formData.productDescription || ''}
              onChange={(e) => updateFormData({ productDescription: e.target.value })}
              onBlur={(e) => handleFieldBlur('productDescription', e.target.value)}
              className={`min-h-24 ${
                validation.hasFieldError('productDescription') ? 'border-destructive' : ''
              }`}
              placeholder="Describe what your business does, the products or services you offer..."
            />
            {validation.hasFieldError('productDescription') ? (
              <p className="text-sm text-destructive">
                {validation.getFieldError('productDescription')}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Provide a clear description of your business activities (minimum 10 characters)
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="street">Street Address *</Label>
              <Input
                id="street"
                value={formData.businessAddress?.street1 || ''}
                onChange={(e) => handleAddressChange('street1', e.target.value)}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleFieldBlur('businessAddress.street1', e.target.value)}
                className={validation?.hasFieldError?.('businessAddress.street1') ? 'border-destructive' : ''}
                placeholder="123 Business Ave"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.businessAddress?.city || ''}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleFieldBlur('businessAddress.city', e.target.value)}
                className={validation?.hasFieldError?.('businessAddress.city') ? 'border-destructive' : ''}
                placeholder="New York"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                value={formData.businessAddress?.state || ''}
                onChange={(e) => handleAddressChange('state', e.target.value)}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleFieldBlur('businessAddress.state', e.target.value)}
                placeholder="NY"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code *</Label>
              <Input
                id="postalCode"
                value={formData.businessAddress?.postcode || ''}
                onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleFieldBlur('businessAddress.zipCode', e.target.value)}
                className={validation?.hasFieldError?.('businessAddress.zipCode') ? 'border-destructive' : ''}
                placeholder="10001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                value={formData.businessAddress?.country || ''}
                onChange={(e) => handleAddressChange('country', e.target.value)}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleFieldBlur('businessAddress.country', e.target.value)}
                className={validation?.hasFieldError?.('businessAddress.country') ? 'border-destructive' : ''}
                placeholder="United States"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="businessPhone">Business Phone *</Label>
              <div className="flex gap-2">
                <Select
                  value={formData.businessPhone?.countryCode || ''}
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
                  id="businessPhone"
                  type="tel"
                  value={formData.businessPhone?.number || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePhoneChange('number', e.target.value)}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleFieldBlur('businessPhone.number', e.target.value)}
                  className={validation?.hasFieldError?.('businessPhone.number') ? 'border-destructive' : ''}
                  placeholder="(123) 456-7890"
                />
              </div>
              {validation.hasFieldError('businessPhone.number') && (
                <p className="text-sm text-destructive">
                  {validation.getFieldError('businessPhone.number')}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
