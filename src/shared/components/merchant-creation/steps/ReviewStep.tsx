import { AlertCircle, Edit2, ChevronRight } from 'lucide-react';
import { Button } from '@shared/components/ui/button';
import { Card } from '@shared/components/ui/card';
import { Badge } from '@shared/components/ui/badge';
import { StepComponentProps } from '@shared/types/merchant';
import { programs, products } from '@shared/components/merchant-creation/programs-config';

interface ReviewStepProps extends StepComponentProps {
  navigateToStep: (stepIndex: number) => void;
}

export function ReviewStep({ formData, navigateToStep }: ReviewStepProps) {
  // Helper function to check if a field is missing or empty
  const isEmpty = (value?: string): boolean => {
    if (value === null || value === undefined || value === '') return true;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') {
      return Object.values(value).every(v => isEmpty(v as string));
    }
    return false;
  };

  // Get program and product names
  const selectedProgram = programs.find(p => p.id === formData.selectedProgram);
  const selectedProduct = formData.selectedProgram && 
    products[formData.selectedProgram as keyof typeof products]?.find(
      p => p.id === formData.selectedProduct
    ) || null;

  // Format phone number for display
  const formatPhone = (phone: { countryCode?: string; number?: string } | undefined) => {
    if (!phone?.number) return '';
    return phone.countryCode ? `+${phone.countryCode} ${phone.number}` : phone.number;
  };

  // Define review sections with their corresponding step indices
  const reviewSections = [
    {
      title: 'Program & Product Selection',
      stepIndex: 0,
      fields: [
        { label: 'Program', value: selectedProgram?.name, required: true },
        { label: 'Product', value: selectedProduct?.name, required: true },
        { 
          label: 'Capabilities', 
          value: Array.isArray(formData.capabilities) ? formData.capabilities.join(', ') : '', 
          required: true 
        },
        { 
          label: 'Creation Method', 
          value: formData.creationMethod === 'manual' ? 'Manual Entry' : 
                formData.creationMethod === 'link' ? 'Customer Link' : 'Application', 
          required: true 
        },
        { 
          label: 'Customer Email', 
          value: formData.customerEmail, 
          required: formData.creationMethod === 'link' 
        },
      ]
    },
    {
      title: 'Business Information',
      stepIndex: 1,
      fields: [
        { label: 'Business Location', value: formData.businessLocation, required: true },
        { label: 'Business Type', value: formData.businessType, required: true },
        { label: 'Legal Business Name', value: formData.legalBusinessName, required: true },
        { label: 'Unique ID', value: formData.uniqueId, required: true },
        { label: 'Trading Name', value: formData.tradingName, required: false },
        { label: 'Industry', value: formData.industry, required: true },
        { label: 'Website', value: formData.website, required: false },
        { label: 'Product Description', value: formData.productDescription, required: true },
      ]
    },
    {
      title: 'Business Address',
      stepIndex: 2,
      fields: [
        { label: 'Country', value: formData.businessAddress?.country, required: true },
        { label: 'Street Address', value: formData.businessAddress?.street1, required: true },
        { label: 'City', value: formData.businessAddress?.city, required: true },
        { 
          label: 'State/Region', 
          value: formData.businessAddress?.state || formData.businessAddress?.county, 
          required: true 
        },
        { 
          label: 'ZIP/Postal Code', 
          value: formData.businessAddress?.zipCode || formData.businessAddress?.postcode, 
          required: true 
        },
      ]
    },
    {
      title: 'Business Representative',
      stepIndex: 3,
      fields: [
        { label: 'First Name', value: formData.representativeFirstName, required: true },
        { label: 'Last Name', value: formData.representativeLastName, required: true },
        { label: 'Email', value: formData.representativeEmail, required: true },
        { label: 'Job Title', value: formData.jobTitle, required: true },
        { label: 'Date of Birth', value: formData.dateOfBirth, required: true },
        { label: 'Phone', value: formatPhone(formData.representativePhone), required: true },
        { 
          label: 'Ownership Percentage', 
          value: formData.ownershipPercentage ? `${formData.ownershipPercentage}%` : '', 
          required: true 
        },
      ]
    },
    {
      title: 'Business Owners & Executives',
      stepIndex: 4,
      fields: [
        { 
          label: 'Business Owners', 
          value: formData.businessOwners?.length ? 
            `${formData.businessOwners.length} owner(s) added` : '', 
          required: false 
        },
        { 
          label: 'Business Executives', 
          value: formData.businessExecutives?.length ? 
            `${formData.businessExecutives.length} executive(s) added` : '', 
          required: false 
        },
      ]
    },
    {
      title: 'Public Details',
      stepIndex: 5,
      fields: [
        { label: 'Statement Descriptor', value: formData.statementDescriptor, required: true },
        { label: 'Shortened Descriptor', value: formData.shortenedDescriptor, required: true },
        { label: 'Support Phone', value: formData.supportPhone, required: true },
        { 
          label: 'Show Phone on Receipts', 
          value: formData.showPhoneOnReceipts ? 'Yes' : 'No', 
          required: false 
        },
      ]
    },
    {
      title: 'Bank Details',
      stepIndex: 6,
      fields: [
        { label: 'Currency', value: formData.currency, required: true },
        { 
          label: 'IBAN', 
          value: formData.iban ? `•••• ${formData.iban.slice(-4)}` : '', 
          required: true 
        },
      ]
    },
  ];

  // Count missing required fields
  const missingFields = reviewSections.reduce((total, section) => {
    return total + section.fields.filter(field => field.required && isEmpty(field.value)).length;
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Review & Submit</h1>
        <p className="mt-2 text-muted-foreground">
          Review your merchant application details before submitting. You can edit any section by clicking the edit button.
        </p>
      </div>

      {/* Summary Status */}
      <Card className="border-border shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Application Status</h3>
              <p className="text-muted-foreground mt-1">
                {missingFields === 0 
                  ? 'All required information has been provided.' 
                  : `${missingFields} required field${missingFields === 1 ? '' : 's'} need${
                      missingFields === 1 ? 's' : ''
                    } to be completed.`
                }
              </p>
            </div>
            {missingFields > 0 ? (
              <Badge variant="destructive" className="flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>Incomplete</span>
              </Badge>
            ) : (
              <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50">
                <span>Ready to Submit</span>
              </Badge>
            )}
          </div>
        </div>
      </Card>

      {/* Review Sections */}
      <div className="space-y-4">
        {reviewSections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="border-border shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">{section.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToStep(section.stepIndex)}
                  className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  Edit
                </Button>
              </div>
              
              <div className="space-y-3">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="flex justify-between items-start">
                    <span className="text-muted-foreground flex items-center space-x-1">
                      <span>{field.label}</span>
                      {field.required && (
                        <span className="text-destructive">*</span>
                      )}
                    </span>
                    <div className="text-right max-w-xs">
                      {isEmpty(field.value) ? (
                        <div className="flex items-center space-x-1 justify-end">
                          {field.required && (
                            <AlertCircle className="w-3 h-3 text-destructive" />
                          )}
                          <span className={field.required ? 'text-destructive' : 'text-muted-foreground'}>
                            {field.required ? 'Required' : 'Not provided'}
                          </span>
                        </div>
                      ) : (
                        <span className="break-words">{field.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Additional Notes */}
      <Card className="border-border shadow-sm">
        <div className="p-6">
          <h3 className="font-medium mb-3">Before You Submit</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start space-x-2">
              <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Ensure all required information is accurate and up-to-date</span>
            </li>
            <li className="flex items-start space-x-2">
              <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Your application will be reviewed within 1-2 business days</span>
            </li>
            <li className="flex items-start space-x-2">
              <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>You'll receive email updates about your application status</span>
            </li>
            <li className="flex items-start space-x-2">
              <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Additional documentation may be requested during review</span>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
