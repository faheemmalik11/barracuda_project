import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select";
import { Search } from 'lucide-react';
import { StepComponentProps } from "@shared/types/merchant";

// Mock data for filed applications (oldest first)
const filedApplications = [
  {
    id: 'app-001',
    businessName: 'Acme Corp',
    applicantEmail: 'john@acmecorp.com',
    submittedDate: '2024-01-15',
    status: 'pending' as const
  },
  {
    id: 'app-002',
    businessName: 'TechStart Solutions',
    applicantEmail: 'sarah@techstart.com',
    submittedDate: '2024-01-18',
    status: 'pending' as const
  },
  {
    id: 'app-003',
    businessName: 'Global Logistics Inc',
    applicantEmail: 'mike@globallogistics.com',
    submittedDate: '2024-01-20',
    status: 'pending' as const
  },
  {
    id: 'app-004',
    businessName: 'Creative Design Studio',
    applicantEmail: 'anna@creativedesign.com',
    submittedDate: '2024-01-22',
    status: 'pending' as const
  },
  {
    id: 'app-005',
    businessName: 'Local Bakery Co',
    applicantEmail: 'owner@localbakery.com',
    submittedDate: '2024-01-25',
    status: 'pending' as const
  }
];

const creationMethodOptions = [
  {
    value: 'application',
    label: 'Select from applications',
    description: 'Choose from existing filed applications'
  },
  {
    value: 'manual',
    label: 'Create manually',
    description: 'Fill out all merchant information yourself'
  }
] as const;

export function CreationMethodStep({ formData, updateFormData }: StepComponentProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState('');

  // Filter applications based on search term
  const filteredApplications = filedApplications.filter(app =>
    app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.applicantEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreationMethodChange = (value: 'manual' | 'application') => {
    updateFormData({ 
      creationMethod: value,
      ...(value !== 'application' && { selectedApplicationId: undefined })
    });
  };

  const handleApplicationSelect = (applicationId: string) => {
    setSelectedApplication(applicationId);
    console.log(selectedApplication);
    updateFormData({ selectedApplicationId: applicationId });
  };

//   const selectedMethod = creationMethodOptions.find(option => option.value === formData.creationMethod);
  const selectedApp = filedApplications.find(app => app.id === formData.selectedApplicationId);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Method</h1>
        <p className="mt-2 text-muted-foreground">Choose how you want to create the merchant account.</p>
      </div>

      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Creation Method</CardTitle>
          <p className="text-sm text-muted-foreground">
            Select how you'd like to create this merchant account
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Creation Method</Label>
            <Select 
              value={formData.creationMethod || ''}
              onValueChange={handleCreationMethodChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select creation method" />
              </SelectTrigger>
              <SelectContent>
                {creationMethodOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex flex-col">
                      <span>{option.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {option.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.creationMethod === 'application' && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
              <Label className="text-foreground">Select Application</Label>
              
              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by business name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Applications dropdown */}
              <Select 
                value={formData.selectedApplicationId || ''}
                onValueChange={handleApplicationSelect}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose an application" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {filteredApplications.length > 0 ? (
                    filteredApplications.map((app) => (
                      <SelectItem key={app.id} value={app.id}>
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{app.businessName}</span>
                          <span className="text-sm text-muted-foreground">
                            {app.applicantEmail} • Submitted {new Date(app.submittedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <div className="py-2 px-3 text-sm text-muted-foreground">
                      No applications found
                    </div>
                  )}
                </SelectContent>
              </Select>

              {selectedApp && (
                <div className="mt-4 p-4 bg-background border border-border rounded-lg space-y-2">
                  <h4 className="font-medium text-foreground">{selectedApp.businessName}</h4>
                  <p className="text-sm text-muted-foreground">
                    Contact: {selectedApp.applicantEmail}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Submitted: {new Date(selectedApp.submittedDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Status: <span className="capitalize">{selectedApp.status}</span>
                  </p>
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Applications are listed with the oldest submissions first.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
