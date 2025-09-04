import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Label } from "@shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@shared/components/ui/alert";
import { Info, AlertCircle } from "lucide-react";
import { StepComponentProps } from "@shared/types/merchant";
import { programs, products, getProgramById } from "@shared/components/merchant-creation/programs-config";
import { useState } from "react";

export function ProductStep({ formData, updateFormData }: StepComponentProps) {
  const [error, setError] = useState<string | null>(null);
  
  // Get available products based on selected program
  const availableProducts = formData.selectedProgram 
    ? products[formData.selectedProgram as keyof typeof products] || []
    : [];
    
  const selectedProduct = availableProducts.find(p => p.id === formData.selectedProduct);
  const selectedProgram = getProgramById(formData.selectedProgram || '');

  const handleProgramChange = (programId: string) => {
    setError(null);
    updateFormData({ 
      selectedProgram: programId,
      selectedProduct: undefined, // Reset product when program changes
      capabilities: [] // Reset capabilities when program changes
    });
  };

  const handleProductSelect = (productId: string) => {
    setError(null);
    updateFormData({ 
      selectedProduct: productId,
      // Update capabilities when product is selected
      capabilities: selectedProgram?.capabilities || []
    });
  };

  // Show error if no programs are available
  if (programs.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertTitle>No Programs Available</AlertTitle>
        <AlertDescription>
          There are no programs available at the moment. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Select Product</h1>
        <p className="mt-2 text-muted-foreground">
          {formData.selectedProgram 
            ? "Choose the product that best fits your merchant's needs." 
            : "Please select a program to see available products."
          }
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Selection */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Program & Product</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select a program and then choose a product
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="program-select">Program</Label>
                <Select
                  value={formData.selectedProgram || ''}
                  onValueChange={handleProgramChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map((program) => (
                      <SelectItem key={program.id} value={program.id}>
                        {program.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!formData.selectedProgram && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Select a program to see available products
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-select">Product</Label>
                <Select
                  value={formData.selectedProduct || ''}
                  onValueChange={handleProductSelect}
                  disabled={!formData.selectedProgram || availableProducts.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue 
                      placeholder={
                        availableProducts.length > 0 
                          ? "Select a product" 
                          : formData.selectedProgram 
                            ? "No products available" 
                            : "Select a program first"
                      } 
                    />
                  </SelectTrigger>
                  {availableProducts.length > 0 && (
                    <SelectContent>
                      {availableProducts.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  )}
                </Select>
                {formData.selectedProgram && availableProducts.length === 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    No products available for the selected program
                  </p>
                )}
              </div>

              <div className="pt-2">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Need help choosing?</AlertTitle>
                  <AlertDescription className="mt-1">
                    Contact our sales team for assistance in selecting the right product for your business needs.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Details */}
        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <p className="text-sm text-muted-foreground">
                {selectedProduct 
                  ? "Review the selected product details" 
                  : formData.selectedProgram
                    ? "Select a product to view details"
                    : "Select a program to see available products"
                }
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedProduct && selectedProgram ? (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{selectedProduct.name}</h3>
                    <p className="text-muted-foreground">
                      {selectedProduct.description}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Included Features</h4>
                    <ul className="space-y-2">
                      {selectedProgram.capabilities.map((capability) => (
                        <li key={capability} className="flex items-start">
                          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary mr-2 mt-0.5 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                          </span>
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Ready to proceed</AlertTitle>
                      <AlertDescription className="mt-1">
                        This product includes everything you need to get started. Click 'Next' to continue.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground text-center p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package-search h-12 w-12 text-muted-foreground/50 mb-4">
                    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
                    <path d="m7.5 4.27 9 5.15" />
                    <path d="M3.29 7 12 12l8.71-5" />
                    <path d="M12 22V12" />
                    <circle cx="18.5" cy="15.5" r="2.5" />
                    <path d="M20.3 17.7 22 19.3" />
                  </svg>
                  <h3 className="font-medium text-lg">
                    {formData.selectedProgram 
                      ? "Select a product" 
                      : "Select a program"}
                  </h3>
                  <p className="text-sm mt-1 max-w-xs">
                    {formData.selectedProgram
                      ? "Choose a product to see its details and features."
                      : "Select a program to see available products."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
