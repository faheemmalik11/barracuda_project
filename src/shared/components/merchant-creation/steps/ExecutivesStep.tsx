import { Button } from '@shared/components/ui/button';
import { Plus, User } from 'lucide-react';
import { StepComponentProps } from '@shared/types/merchant';
import { FormSection } from '@shared/components/merchant-creation/shared/FormSection';

export function ExecutivesStep({ formData, updateFormData }: StepComponentProps) {
  const handleAddExecutive = () => {
    // Create a placeholder executive that matches the BusinessExecutive type
    const newExecutive = {
      id: Date.now().toString(),
      name: '',
      title: 'Executive',
      email: '',
      // Add any additional fields that might be required by the BusinessExecutive type
      ...(formData.businessExecutives?.[0] || {}) // Preserve any existing fields from other executives
    };
    
    updateFormData({
      businessExecutives: [...(formData.businessExecutives || []), newExecutive]
    });
  };

  const handleContinueWithoutExecutives = () => {
    // Clear any existing executives and continue
    updateFormData({ businessExecutives: [] });
  };

  return (
    <div className="space-y-6">
      <FormSection
        title="Business executives"
        subtitle="We may need to verify the identity of executives or others who have significant responsibility for the business."
      >
        <div className="max-w-2xl space-y-6">
          {(!formData.businessExecutives || formData.businessExecutives.length === 0) ? (
            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={handleAddExecutive}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add executive</span>
              </Button>
              
              <p className="text-muted-foreground">
                You can add executives now or continue and add them later if needed for verification.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.businessExecutives.map((executive, index) => (
                <div key={executive.id || index} className="border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h4 className="text-foreground">
                        {executive.name || `Executive ${index + 1}`}
                      </h4>
                      <p className="text-muted-foreground">
                        {executive.title || 'Title not specified'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                variant="outline"
                onClick={handleAddExecutive}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add another executive</span>
              </Button>
            </div>
          )}
        </div>
      </FormSection>

      {/* Continue without executives button - positioned above main continue button */}
      {(!formData.businessExecutives || formData.businessExecutives.length === 0) && (
        <div className="max-w-2xl">
          <Button
            variant="ghost"
            onClick={handleContinueWithoutExecutives}
            className="text-muted-foreground hover:text-foreground px-[14px] py-[1px]"
          >
            Continue without adding executives
          </Button>
        </div>
      )}
    </div>
  );
}
