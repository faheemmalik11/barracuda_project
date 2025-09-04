import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { Card } from "@shared/components/ui/card"
import { Button } from "@shared/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@shared/components/ui/dialog";
import { steps, getStepByIndex } from "@shared/components/merchant-creation/steps-config";
import { StepRenderer } from "@shared/components/merchant-creation/StepRenderer";
import { MerchantFormData } from "@shared/types/merchant";
import { Z_INDEX_CLASSES } from "@shared/lib/z-index";

// Types
type SubmissionState = {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
};

type FormDataHook = {
  formData: unknown;
  draftSaving: {
    saveDraft: () => Promise<void>;
    clearDraft: () => void;
  };
  submission: {
    submissionState: SubmissionState;
    handleSubmit: (
      data: unknown,
      onSuccess: (merchantId: string) => void,
      onError: (error: Error) => void
    ) => Promise<boolean>;
  };
  getMissingFieldsCount: () => number;
};

type NavigationItem = 
  | {
      type: 'section';
      id: string;
      title: string;
      icon: React.ComponentType<{ className?: string }>;
      steps: Array<{
        id: string;
        title: string;
        stepIndex: number;
      }>;
    }
  | {
      type: 'step';
      id: string;
      title: string;
      stepIndex: number;
      icon?: React.ComponentType<{ className?: string }>;
    };

// Navigation Helpers
function isSection(item: NavigationItem): item is Extract<NavigationItem, { type: 'section' }> {
  return item.type === 'section';
}

// Components
interface HeaderProps {
  formDataHook: FormDataHook;
  onBack: () => void;
}

function Header({ formDataHook, onBack }: HeaderProps) {
  const { draftSaving, submission } = formDataHook;

  const handleSaveDraft = async () => {
    await draftSaving.saveDraft();
  };

  const handleSaveAndAddAnother = async () => {
    await draftSaving.saveDraft();
  };

  return (
    <div className={`sticky top-0 ${Z_INDEX_CLASSES.HEADER} h-16 bg-background border-b border-border flex items-center justify-between px-8`}>
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <h1 className="text-xl">PayFlow</h1>
        <span className="text-muted-foreground">Merchant Creation</span>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button 
          variant="outline" 
          onClick={handleSaveDraft}
          disabled={submission.submissionState.isSubmitting}
        >
          Save Draft
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleSaveAndAddAnother}
          disabled={submission.submissionState.isSubmitting}
        >
          Save and Add Another
        </Button>
      </div>
    </div>
  );
}

interface NavigationProps {
  navigationStructure: NavigationItem[];
  currentStep: number;
  navigateToStep: (stepIndex: number) => void;
}

function Navigation({ navigationStructure, currentStep, navigateToStep }: NavigationProps) {
  const renderNavigationItem = (item: NavigationItem) => {
    if (isSection(item)) {
      const hasActiveStep = item.steps.some(step => step.stepIndex === currentStep);
      const hasCompletedSteps = item.steps.some(step => step.stepIndex < currentStep);
      const allStepsCompleted = item.steps.every(step => step.stepIndex < currentStep);
      
      return (
        <div key={item.id} className="space-y-0.5">
          <div className={`flex items-center p-1.5 rounded-lg transition-colors text-xs ${
            hasActiveStep ? 'bg-sidebar-accent/30' : hasCompletedSteps ? 'text-sidebar-foreground' : 'text-muted-foreground'
          }`}>
            <div className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 transition-colors ${
              allStepsCompleted 
                ? 'bg-primary text-primary-foreground' 
                : hasActiveStep || hasCompletedSteps 
                  ? 'bg-sidebar-accent-foreground text-sidebar-accent' 
                  : 'bg-muted text-muted-foreground'
            }`}>
              {allStepsCompleted ? (
                <Check className="w-3 h-3" />
              ) : (
                <item.icon className="w-3 h-3" />
              )}
            </div>
            <span className="text-sm font-medium">{item.title}</span>
          </div>
          
          <div className="ml-6 space-y-1">
            {item.steps.map((step) => {
              const isActive = step.stepIndex === currentStep;
              const isCompleted = step.stepIndex < currentStep;
              
              return (
                <div 
                  key={step.id} 
                  onClick={() => navigateToStep(step.stepIndex)}
                  className={`flex items-center p-2 pl-4 rounded-lg transition-colors cursor-pointer ${
                    isActive 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : isCompleted 
                        ? 'text-sidebar-foreground hover:bg-sidebar-accent/30' 
                        : 'text-muted-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <div className={`flex items-center justify-center w-5 h-5 rounded-full mr-3 transition-colors ${
                    isCompleted 
                      ? 'bg-primary text-primary-foreground' 
                      : isActive 
                        ? 'bg-sidebar-accent-foreground text-sidebar-accent' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-2.5 h-2.5" />
                    ) : (
                      <span className="text-xs font-medium">{step.stepIndex + 1}</span>
                    )}
                  </div>
                  <span className="text-sm">{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      const isActive = item.stepIndex === currentStep;
      const isCompleted = item.stepIndex < currentStep;
      
      return (
        <div 
          key={item.id} 
          onClick={() => navigateToStep(item.stepIndex)}
          className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${
            isActive 
              ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
              : isCompleted 
                ? 'text-sidebar-foreground hover:bg-sidebar-accent/30' 
                : 'text-muted-foreground hover:bg-sidebar-accent/50'
          }`}
        >
          <div className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 transition-colors ${
            isCompleted 
              ? 'bg-primary text-primary-foreground' 
              : isActive 
                ? 'bg-sidebar-accent-foreground text-sidebar-accent' 
                : 'bg-muted text-muted-foreground'
          }`}>
            {isCompleted ? (
              <Check className="w-3 h-3" />
            ) : (
              <span className="text-xs font-medium">{item.stepIndex + 1}</span>
            )}
          </div>
          <span className="text-sm font-medium">{item.title}</span>
        </div>
      );
    }
  };

  return (
    <div className="space-y-1">
      {navigationStructure.map((item) => renderNavigationItem(item))}
    </div>
  );
}

interface SidebarProps {
  navigationStructure: NavigationItem[];
  currentStep: number;
  navigateToStep: (stepIndex: number) => void;
}

function Sidebar({ navigationStructure, currentStep, navigateToStep }: SidebarProps) {
  return (
    <div className="w-56 bg-sidebar min-h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="sticky top-0 p-4">
        <div className="mb-4">
          {/* Reserved space for additional sidebar content */}
        </div>
        <Navigation 
          navigationStructure={navigationStructure}
          currentStep={currentStep}
          navigateToStep={navigateToStep}
        />
      </div>
    </div>
  );
}

interface MainContentProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  formDataHook: FormDataHook;
  onSubmit: () => Promise<boolean>;
}

function MainContent({ 
  children, 
  currentStep, 
  totalSteps, 
  nextStep,
  formDataHook,
  onSubmit
}: MainContentProps) {
  const [showSubmissionDialog, setShowSubmissionDialog] = useState(false);
  
  const handleSubmit = async () => {
    const success = await onSubmit();
    if (success) {
      setTimeout(() => {
        setShowSubmissionDialog(false);
      }, 3000);
    }
  };

  const handleSubmitClick = () => {
    setShowSubmissionDialog(true);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto bg-muted/20">
      <div className="flex-1 p-8">
        <Card className="border-border shadow-sm">
          <div className="p-8">
            {children}
            
            <div className="mt-8 pt-4 border-t border-border flex justify-end">
              {currentStep === totalSteps - 1 ? (
                <Button
                  onClick={handleSubmitClick}
                  disabled={formDataHook.submission.submissionState.isSubmitting}
                  className="px-8 py-2 text-base font-medium"
                >
                  {formDataHook.submission.submissionState.isSubmitting ? 'Creating...' : 'Create Merchant'}
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  variant="default"
                  className="px-8 py-2 text-base font-medium"
                >
                  Continue
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>

      <Dialog open={showSubmissionDialog} onOpenChange={setShowSubmissionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Merchant</DialogTitle>
            <DialogDescription>
              {formDataHook.getMissingFieldsCount() > 0 
                ? `You have ${formDataHook.getMissingFieldsCount()} required fields to fill.`
                : 'Are you sure you want to submit this merchant?'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowSubmissionDialog(false)}
              disabled={formDataHook.submission.submissionState.isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={formDataHook.submission.submissionState.isSubmitting || formDataHook.getMissingFieldsCount() > 0}
            >
              {formDataHook.submission.submissionState.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Main Component
export default function CreateMerchantPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Initialize form data with default values
  const [formData, setFormData] = useState<MerchantFormData>({
    capabilities: [],
    businessOwners: [],
    businessExecutives: [],
    homeAddress: {},
    representativePhone: {},
    businessPhone: {},
    bankAccount: {}
  });

  // Mock form data hook - replace with your actual implementation
  const formDataHook: FormDataHook = {
    formData,
    draftSaving: {
      saveDraft: async () => {},
      clearDraft: () => {}
    },
    submission: {
      submissionState: {
        isSubmitting: false,
        isSuccess: false,
        error: null
      },
      handleSubmit: async () => true
    },
    getMissingFieldsCount: () => 0
  };

  // Convert steps to navigation structure
  const navigationStructure: NavigationItem[] = [
    {
      type: 'section',
      id: 'application',
      title: 'Application',
      icon: steps[0].icon,
      steps: steps.slice(0, 3).map((step, index) => ({
        id: step.id,
        title: step.title,
        stepIndex: index
      }))
    },
    {
      type: 'section',
      id: 'business-info',
      title: 'Business Information',
      icon: steps[3].icon,
      steps: steps.slice(3, 6).map((step, index) => ({
        id: step.id,
        title: step.title,
        stepIndex: index + 3
      }))
    },
    {
      type: 'section',
      id: 'team',
      title: 'Team',
      icon: steps[6].icon,
      steps: steps.slice(6, 8).map((step, index) => ({
        id: step.id,
        title: step.title,
        stepIndex: index + 6
      }))
    },
    ...steps.slice(8).map((step, index) => ({
      type: 'step' as const,
      id: step.id,
      title: step.title,
      stepIndex: index + 8,
      icon: step.icon
    }))
  ];

  const totalSteps = steps.length;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const navigateToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleSubmit = async (): Promise<boolean> => {
    // Implement your submission logic here
    return true;
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <Header formDataHook={formDataHook} onBack={prevStep} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          navigationStructure={navigationStructure} 
          currentStep={currentStep}
          navigateToStep={navigateToStep}
        />
        
        <MainContent
          currentStep={currentStep}
          totalSteps={totalSteps}
          nextStep={nextStep}
          prevStep={prevStep}
          formDataHook={formDataHook}
          onSubmit={handleSubmit}
        >
          <div className="w-full max-w-5xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">
              {getStepByIndex(currentStep)?.title || 'Step'}
            </h2>
            
            <div className="space-y-6">
              <StepRenderer 
                stepId={steps[currentStep]?.id} 
                formData={formData}
                updateFormData={(updates: Partial<MerchantFormData>) => setFormData(prev => ({ ...prev, ...updates }))}
                navigateToStep={navigateToStep}
                handleFieldBlur={(field: string, value: string) => {
                  // Handle field blur if needed
                  console.log(`Field ${field} blurred with value:`, value);
                }}
                validation={{
                  hasFieldError: () => false, // Implement validation logic
                  getFieldError: () => '' // Implement error message logic
                }}
              />
            </div>
          </div>
        </MainContent>
      </div>
    </div>
  );
}
