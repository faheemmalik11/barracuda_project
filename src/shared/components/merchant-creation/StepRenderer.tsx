import { MerchantFormData } from "@shared/types/merchant";
// Import only the components that exist
import { ProgramStep } from "./steps/ProgramStep";
import { ProductStep } from "./steps/ProductStep";
import { CreationMethodStep } from "./steps/CreationMethodStep";
import { BusinessTypeStep } from "./steps/BusinessTypeStep";
import { BusinessDetailsStep } from "./steps/BusinessDetailsStep";
import { RepresentativeStep } from "./steps/RepresentativeStep";
import { ReviewStep } from "./steps/ReviewStep";
import { BankDetailsStep } from "./steps/BankDetailsStep";
import { OwnersStep } from "./steps/OwnersStep";
import { ExecutivesStep } from "./steps/ExecutivesStep";
import { PublicDetailsStep } from "./steps/PublicDetailsStep";

interface StepRendererProps {
  stepId: string;
  formData: MerchantFormData;
  updateFormData: (updates: Partial<MerchantFormData>) => void;
  navigateToStep: (stepIndex: number) => void;
  handleFieldBlur?: (field: string, value: string) => void;
  validation?: {
    hasFieldError: (field: string) => boolean;
    getFieldError: (field: string) => string;
  };
}

export function StepRenderer({ 
  stepId, 
  formData, 
  updateFormData, 
  navigateToStep,
  handleFieldBlur = () => {},
  validation = { hasFieldError: () => false, getFieldError: () => '' }
}: StepRendererProps) {
  switch (stepId) {
    case 'program':
      return <ProgramStep formData={formData} updateFormData={updateFormData} />;
    case 'product':
      return <ProductStep formData={formData} updateFormData={updateFormData} />;
    case 'creation-method':
      return <CreationMethodStep formData={formData} updateFormData={updateFormData} />;
    case 'business-type':
      return <BusinessTypeStep formData={formData} updateFormData={updateFormData} />;
    case 'business-details':
return <BusinessDetailsStep 
        formData={formData} 
        updateFormData={updateFormData} 
        handleFieldBlur={handleFieldBlur}
        validation={validation}
      />;
    case 'representative':
return <RepresentativeStep 
        formData={formData} 
        updateFormData={updateFormData} 
        handleFieldBlur={handleFieldBlur}
        validation={validation}
      />;
    case 'owners':
      return <OwnersStep 
        formData={formData} 
        updateFormData={updateFormData}
      />;
    case 'executives':
      return <ExecutivesStep 
        formData={formData} 
        updateFormData={updateFormData}
      />;
    case 'public-details':
      return <PublicDetailsStep 
        formData={formData} 
        updateFormData={updateFormData}
      />;
    case 'bank-account':
      return <BankDetailsStep formData={formData} updateFormData={updateFormData} />;
    case 'extras':
      return <div>Extras Step - Coming Soon</div>;
    case 'review':
      return <ReviewStep formData={formData} updateFormData={updateFormData} navigateToStep={navigateToStep} />;
    default:
      return null;
  }
}
