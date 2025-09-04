import { Switch } from '@shared/components/ui/switch';
import { Label } from '@shared/components/ui/label';
import { StepComponentProps } from '@shared/types/merchant';
import { FormSection } from '@shared/components/merchant-creation/shared/FormSection';
import { FormField } from '@shared/components/merchant-creation/shared/FormField';
import { FieldGroup } from '@shared/components/merchant-creation/shared/FieldGroup';

export function PublicDetailsStep({ formData, updateFormData }: StepComponentProps) {
  // Validation for statement descriptor
  const isStatementDescriptorValid = (formData?.statementDescriptor?.length || 0) >= 5 && (formData?.statementDescriptor?.length || 0) <= 22;
  const statementDescriptorError = formData?.statementDescriptor && !isStatementDescriptorValid 
    ? 'Statement descriptor must be between 5 and 22 characters.'
    : undefined;

  return (
    <FormSection
      title="Add public details for customers"
      subtitle="This information will be visible to customers on payment statements and receipts."
    >
      <FieldGroup maxWidth="2xl" spacing="normal">
        <FormField
          id="statementDescriptor"
          label="Statement descriptor"
          value={formData.statementDescriptor || ''}
          onChange={(value) => updateFormData({ statementDescriptor: value })}
          placeholder="MYCOMPANY"
          helpText="This appears on customer bank statements. Use your business name or recognizable abbreviation. Examples: ACME CORP, COFFEE SHOP, CONSULTING."
          error={statementDescriptorError}
          maxLength={22}
          required
        />

        <FormField
          id="shortenedDescriptor"
          label="Shortened descriptor"
          value={formData.shortenedDescriptor || ''}
          onChange={(value) => updateFormData({ shortenedDescriptor: value })}
          placeholder="MYCO"
          helpText="Optional shortened version for mobile receipts and smaller displays."
          maxLength={10}
        >
          <span className="text-muted-foreground"> Optional</span>
        </FormField>

        <FormField
          id="supportPhone"
          label="Customer support phone number"
          type="tel"
          value={formData.supportPhone || ''}
          onChange={(value) => updateFormData({ supportPhone: value })}
          placeholder="+1 (555) 123-4567"
          helpText="Phone number customers can use for support inquiries."
        />

        <div className="flex items-start space-x-3 py-3">
          <div className="pt-1">
            <Switch
              id="showPhoneOnReceipts"
              checked={formData.showPhoneOnReceipts || false}
              onCheckedChange={(checked) => updateFormData({ showPhoneOnReceipts: checked })}
            />
          </div>
          <div>
            <Label htmlFor="showPhoneOnReceipts" className="text-foreground cursor-pointer">
              Show phone number on receipts and invoices
            </Label>
            <p className="text-muted-foreground mt-1">
              When enabled, your support phone number will be displayed on customer receipts and invoices.
            </p>
          </div>
        </div>
      </FieldGroup>
    </FormSection>
  );
}
