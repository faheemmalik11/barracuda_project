import { CollapsibleSection } from '@shared/components/ui/CollapsibleSection'
import { Card, CardContent } from '@shared/components/ui/card'
import { Button } from '@shared/components/ui/button'
import { Image, Upload, X } from 'lucide-react'
import type { PaymentLink } from '@shared/types/payment-links'

interface PaymentLinkMediaSectionProps {
  paymentLink: PaymentLink
}

export function PaymentLinkMediaSection({ 
  paymentLink
}: PaymentLinkMediaSectionProps) {
  return (
    <CollapsibleSection
      title="Media"
      isDetailView={false}
    >
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {paymentLink.productImages && paymentLink.productImages.length > 0 ? (
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Product Images</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {paymentLink.productImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={image} 
                        alt={`Product image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  No images uploaded
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add product images to make your payment link more appealing
                </p>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Images
                </Button>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Supported formats: JPG, PNG, GIF (max 5MB each)
              </div>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Add More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </CollapsibleSection>
  )
}
