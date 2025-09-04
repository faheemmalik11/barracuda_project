import { products, programs } from "@shared/components/merchant-creation/programs-config";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Checkbox } from "@shared/components/ui/checkbox";
import { Label } from "@shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select";
import { StepComponentProps } from "@shared/types/merchant";

export function ProgramProductStep({ formData, updateFormData }: StepComponentProps) {
  const selectedProgram = programs.find(p => p.id === formData.selectedProgram);
  const availableProducts = formData.selectedProgram 
    ? products[formData.selectedProgram as keyof typeof products] || []
    : [];
  const selectedProduct = availableProducts.find(p => p.id === formData.selectedProduct);

  const handleProgramChange = (programId: string) => {
    // Reset product and capabilities when program changes
    updateFormData({ 
      selectedProgram: programId,
      selectedProduct: undefined,
      capabilities: []
    });
  };

  const handleCapabilityToggle = (capability: string, checked: boolean) => {
    updateFormData({
      capabilities: checked
        ? [...formData.capabilities, capability]
        : formData.capabilities.filter(c => c !== capability)
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Select Program and Product</h1>
        <p className="mt-2 text-muted-foreground">
          Choose the program and product that best fits your merchant's needs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Selection */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Program</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select a program to see available products
              </p>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          {availableProducts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Product</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select a product for the {selectedProgram?.name} program
                </p>
              </CardHeader>
              <CardContent>
                <Select
                  value={formData.selectedProduct || ''}
                  onValueChange={(value) => updateFormData({ selectedProduct: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProducts.map(product => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Details */}
        <div className="space-y-6">
          {selectedProgram && (
            <Card>
              <CardHeader>
                <CardTitle>Program Capabilities</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select the capabilities you need for this merchant
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedProgram.capabilities.map(capability => (
                    <div key={capability} className="flex items-center space-x-3">
                      <Checkbox
                        id={`capability-${capability}`}
                        checked={formData.capabilities.includes(capability)}
                        onCheckedChange={(checked) => 
                          handleCapabilityToggle(capability, checked as boolean)
                        }
                      />
                      <Label htmlFor={`capability-${capability}`} className="font-normal">
                        {capability}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {selectedProduct && (
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">{selectedProduct.name}</h4>
                    <p className="text-muted-foreground">
                      {selectedProduct.description}
                    </p>
                  </div>
                  
                  {selectedProduct.features && selectedProduct.features.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Features:</h5>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {selectedProduct.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
