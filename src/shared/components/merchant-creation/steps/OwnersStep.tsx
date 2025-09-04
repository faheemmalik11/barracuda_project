import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card';
import { Input } from '@shared/components/ui/input';
import { Label } from '@shared/components/ui/label';
import { StepComponentProps } from '@shared/types/merchant';

export function OwnersStep({ formData, updateFormData }: StepComponentProps) {
  const handleAddOwner = () => {
    const newOwner = {
      id: Date.now().toString(),
      name: '',
      ownership: 0
    };
    
    updateFormData({
      businessOwners: [...(formData.businessOwners || []), newOwner]
    });
  };

  const handleRemoveOwner = (id: string) => {
    updateFormData({
      businessOwners: (formData.businessOwners || []).filter(owner => owner.id !== id)
    });
  };

  const handleOwnerChange = (id: string, field: keyof typeof formData.businessOwners[0], value: string | number) => {
    updateFormData({
      businessOwners: (formData.businessOwners || []).map(owner => 
        owner.id === id ? { ...owner, [field]: value } : owner
      )
    });
  };

  const handleContinueWithNoOwners = () => {
    updateFormData({ businessOwners: [] });
  };

  const owners = formData.businessOwners || [];
  const totalOwnership = owners.reduce((sum, owner) => sum + (Number(owner.ownership) || 0), 0);

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Business Owners</CardTitle>
          <p className="text-sm text-muted-foreground">
            Due to regulatory guidelines, we're required to collect and verify information on anyone who has significant 
            ownership of your business. Please enter this information correctly, as we may verify this information with 
            that in your national beneficial owner registry and may need to report discrepancies to them.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Please add any individual who owns 25% or more of the company.
            </p>
            
            <Button 
              variant="outline" 
              onClick={handleAddOwner}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add business owner
            </Button>
          </div>

          {owners.length > 0 && (
            <div className="space-y-4">
              {owners.map((owner, index) => (
                <Card key={owner.id} className="p-6 border-border space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-foreground">Owner {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveOwner(owner.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`owner-name-${owner.id}`}>Full Legal Name</Label>
                      <Input
                        id={`owner-name-${owner.id}`}
                        value={owner.name}
                        onChange={(e) => handleOwnerChange(owner.id, 'name', e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`owner-ownership-${owner.id}`}>
                        Ownership Percentage
                      </Label>
                      <div className="relative">
                        <Input
                          id={`owner-ownership-${owner.id}`}
                          type="number"
                          min="0"
                          max="100"
                          value={owner.ownership}
                          onChange={(e) => handleOwnerChange(owner.id, 'ownership', Number(e.target.value))}
                          className="pr-16"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              {owners.length > 0 && (
                <div className="text-right text-sm text-muted-foreground">
                  Total Ownership: {totalOwnership}%
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Continue with no owners button */}
      {owners.length === 0 && (
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={handleContinueWithNoOwners}
            className="text-muted-foreground hover:text-foreground"
          >
            Continue with No Owners
          </Button>
        </div>
      )}
    </div>
  );
}
