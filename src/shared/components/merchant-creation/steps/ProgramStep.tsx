import { Card } from "@shared/components/ui/card";
import { Label } from "@shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select";
import { Checkbox } from "@shared/components/ui/checkbox";
import { StepComponentProps } from "@shared/types/merchant";
import { programs } from "@shared/components/merchant-creation/programs-config";
import { cn } from "@shared/lib/utils";

export function ProgramStep({ formData, updateFormData }: StepComponentProps) {
  const selectedProgram = programs.find(p => p.id === formData.selectedProgram);
  const selectedCapabilitiesCount = formData.capabilities?.length || 0;
  const totalCapabilities = selectedProgram?.capabilities.length || 0;

  const handleProgramChange = (programId: string) => {
    const program = programs.find(p => p.id === programId);
    updateFormData({ 
      selectedProgram: programId,
      selectedProduct: undefined,
      capabilities: program?.capabilities || []
    });
  };

  const handleCapabilityToggle = (capability: string, checked: boolean) => {
    updateFormData({
      capabilities: checked
        ? [...(formData.capabilities || []), capability]
        : (formData.capabilities || []).filter(c => c !== capability)
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Select Program</h2>
        <p className="text-muted-foreground">Choose the program that best fits your merchant's needs.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Program Selection */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="program" className="block text-sm font-medium mb-2">
                  Program
                </Label>
                <Select 
                  value={formData.selectedProgram || ''}
                  onValueChange={handleProgramChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map(program => (
                      <SelectItem key={program.id} value={program.id}>
                        {program.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedProgram && (
                <div className="space-y-2 pt-4 border-t border-border">
                  <h4 className="font-medium text-sm">Program Description</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedProgram.name} program details
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Capabilities */}
        <div className="space-y-6">
          <Card className={cn(
            "transition-all duration-200",
            !selectedProgram && "opacity-50"
          )}>
            <Card className="border-0 shadow-none">
              <div className="p-6">
                <h3 className="font-medium text-lg mb-1">Program Capabilities</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {selectedProgram 
                    ? "All capabilities are pre-selected. You can uncheck any you don't need."
                    : "Select a program to view available capabilities."
                  }
                </p>

                {selectedProgram ? (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {selectedProgram.capabilities.map(capability => {
                        const isChecked = (formData.capabilities || []).includes(capability);
                        return (
                          <div 
                            key={capability} 
                            className={cn(
                              "flex items-start space-x-3 p-3 rounded-lg transition-colors",
                              isChecked 
                                ? "bg-primary/5 border border-primary/20" 
                                : "bg-muted/30"
                            )}
                          >
                            <Checkbox
                              id={`cap-${capability}`}
                              checked={isChecked}
                              onCheckedChange={(checked) => 
                                handleCapabilityToggle(capability, checked as boolean)
                              }
                              className="mt-0.5"
                            />
                            <div className="flex-1">
                              <Label 
                                htmlFor={`cap-${capability}`} 
                                className="font-normal cursor-pointer block"
                              >
                                {capability}
                              </Label>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-4 mt-4 border-t border-border text-sm text-muted-foreground">
                      {selectedCapabilitiesCount} of {totalCapabilities} capabilities selected
                      {selectedCapabilitiesCount === 0 && (
                        <p className="text-destructive text-xs mt-1">
                          At least one capability must be selected
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-muted-foreground">
                    <p>No program selected</p>
                  </div>
                )}
              </div>
            </Card>
          </Card>
        </div>
      </div>
    </div>
  );
}
