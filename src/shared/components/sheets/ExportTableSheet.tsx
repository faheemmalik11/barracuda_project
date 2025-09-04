import { useState, useMemo, useEffect, useCallback } from "react"
import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"
import { Label } from "@shared/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@shared/components/ui/sheet"
import { Checkbox } from "@shared/components/ui/checkbox"
import { Separator } from "@shared/components/ui/separator"
import { Badge } from "@shared/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { StepProgress } from "@shared/components/ui/StepProgress"
import { Download, FileSpreadsheet, FileText, Calendar, Settings, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@shared/lib/utils"
import type { ExportFormat, ExportConfig, ExportTableSheetProps } from "@shared/types/sheets"

const EXPORT_FORMATS: ExportFormat[] = [
  {
    id: "csv",
    label: "CSV",
    description: "Universal format compatible with all spreadsheet applications",
    icon: FileText,
    extension: ".csv",
    features: ["Lightweight", "Universal compatibility", "Fast processing"]
  },
  {
    id: "xlsx",
    label: "Excel",
    description: "Rich formatting with advanced features for Microsoft Excel",
    icon: FileSpreadsheet,
    extension: ".xlsx",
    features: ["Rich formatting", "Formulas support", "Charts & graphs"]
  },
]

const EXPORT_STEPS = [
  { id: 1, title: "Format", description: "Choose export format" },
  { id: 2, title: "Columns", description: "Select data columns" },
  { id: 3, title: "Options", description: "Configure settings" },
]

export default function ExportTableSheet({
  open,
  onOpenChange,
  tableName = "table",
  totalRecords = 0,
  availableColumns = [],
  onExport,
}: ExportTableSheetProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [exportFormat, setExportFormat] = useState("csv")
  const [dateRange, setDateRange] = useState<[string, string]>(["", ""])
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [includeFilters, setIncludeFilters] = useState(true)
  const [fileName, setFileName] = useState("")

  const requiredColumns = useMemo(() => 
    availableColumns.filter(col => col.required).map(col => col.id), 
    [availableColumns]
  )

  const selectedFormat = EXPORT_FORMATS.find(f => f.id === exportFormat)
  const allColumnsSelected = selectedColumns.length === availableColumns.length
  
  const validationState = {
    canProceed: selectedColumns.length > 0,
    hasFileName: fileName.trim().length > 0,
    canExport: selectedColumns.length > 0 && fileName.trim().length > 0
  }

  // Update filename when tableName changes
  useEffect(() => {
    if (tableName) {
      const timestamp = new Date().toISOString().split('T')[0]
      setFileName(`${tableName}_export_${timestamp}`)
    }
  }, [tableName])

  // Initialize selected columns with required ones
  useEffect(() => {
    if (availableColumns.length > 0) {
      const required = availableColumns.filter(col => col.required).map(col => col.id)
      setSelectedColumns(required)
    }
  }, [availableColumns])

  const handleColumnSelect = useCallback((columnId: string, checked: boolean) => {
    if (requiredColumns.includes(columnId)) return
    
    setSelectedColumns(prev => 
      checked 
        ? [...prev, columnId]
        : prev.filter(id => id !== columnId)
    )
  }, [requiredColumns])

  const handleSelectAllColumns = useCallback(() => {
    setSelectedColumns(allColumnsSelected ? requiredColumns : availableColumns.map(col => col.id))
  }, [allColumnsSelected, requiredColumns, availableColumns])

  const handleExport = useCallback(() => {
    const config: ExportConfig = {
      format: exportFormat,
      dateRange,
      columns: selectedColumns,
      includeFilters,
      fileName,
    }
    
    onExport?.(config)
    onOpenChange(false)
    setCurrentStep(1)
  }, [exportFormat, dateRange, selectedColumns, includeFilters, fileName, onExport, onOpenChange])

  const handleClose = useCallback(() => {
    onOpenChange(false)
    setCurrentStep(1)
  }, [onOpenChange])


  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="w-[700px] sm:max-w-[700px] overflow-hidden flex flex-col p-0">
        {/* Header */}
        <div className="px-6 py-6 border-b bg-card">
          <div className="flex items-center gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <Download className="h-7 w-7 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-2xl font-semibold mb-1">
                Export {tableName}
              </SheetTitle>
              <SheetDescription className="text-base">
                Download your data in your preferred format with customizable options
              </SheetDescription>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mt-8">
            <StepProgress steps={EXPORT_STEPS} currentStep={currentStep} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-8">
            {/* Step 1: Format Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-lg font-semibold mb-2">Choose your export format</h3>
                  <p className="text-muted-foreground">
                    Select the format that best suits your needs
                  </p>
                </div>

                <div className="grid gap-4">
                  {EXPORT_FORMATS.map((format) => {
                    const Icon = format.icon
                    const isSelected = exportFormat === format.id
                    
                    return (
                      <Card
                        key={format.id}
                        className={cn(
                          "cursor-pointer transition-all border-2",
                          isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        )}
                        onClick={() => setExportFormat(format.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={cn(
                              "flex h-12 w-12 items-center justify-center rounded-xl",
                              isSelected 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-secondary text-secondary-foreground"
                            )}>
                              <Icon className="h-6 w-6" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-lg">{format.label}</h4>
                                <Badge variant="secondary" className="font-mono text-xs">
                                  {format.extension}
                                </Badge>
                                {isSelected && (
                                  <CheckCircle2 className="h-5 w-5 text-primary" />
                                )}
                              </div>
                              
                              <p className="text-muted-foreground mb-3">
                                {format.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-2">
                                {format.features.map((feature) => (
                                  <Badge key={feature} variant="outline" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Column Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-lg font-semibold mb-2">Select columns to export</h3>
                  <p className="text-muted-foreground">
                    Choose which data columns to include in your export
                  </p>
                </div>

                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Available columns</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSelectAllColumns}
                        className="text-sm"
                      >
                        {allColumnsSelected ? "Deselect all" : "Select all"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {availableColumns.length === 0 ? (
                      <div className="text-center py-8">
                        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h4 className="font-medium mb-2">No columns available</h4>
                        <p className="text-sm text-muted-foreground">
                          Column data needs to be provided to enable column selection
                        </p>
                      </div>
                    ) : (
                      <div className="grid gap-3 max-h-80 overflow-y-auto">
                        {availableColumns.map((column) => {
                          const selected = selectedColumns.includes(column.id)
                          const required = requiredColumns.includes(column.id)
                          
                          return (
                            <div
                              key={column.id}
                              className={cn(
                                "flex items-center justify-between p-4 rounded-lg border",
                                selected 
                                  ? "bg-primary/10 border-primary/20" 
                                  : "bg-card border-border hover:bg-accent"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <Checkbox
                                  checked={selected}
                                  onCheckedChange={(checked) => 
                                    handleColumnSelect(column.id, checked === true)
                                  }
                                  disabled={required}
                                />
                                <div>
                                  <div className="font-medium text-sm">
                                    {column.label}
                                  </div>
                                  {required && (
                                    <Badge variant="secondary" className="mt-1 text-xs">
                                      Required
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              {selected && (
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Export Options */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-lg font-semibold mb-2">Configure export options</h3>
                  <p className="text-muted-foreground">
                    Customize your export with additional settings
                  </p>
                </div>

                <div className="grid gap-6">
                  {/* Date Range */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Calendar className="h-4 w-4" />
                        Date Range
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Filter your data by date range (optional)
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">From date</Label>
                          <Input
                            type="date"
                            value={dateRange[0]}
                            onChange={(e) => setDateRange([e.target.value, dateRange[1]])}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">To date</Label>
                          <Input
                            type="date"
                            value={dateRange[1]}
                            onChange={(e) => setDateRange([dateRange[0], e.target.value])}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Options */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Settings className="h-4 w-4" />
                        Additional Options
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                          <Label className="font-medium">Apply current filters</Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Export only the data that matches your current table filters
                          </p>
                        </div>
                        <Checkbox
                          checked={includeFilters}
                          onCheckedChange={(checked) => setIncludeFilters(checked === true)}
                        />
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <Label className="font-medium">File name</Label>
                        <div className="flex">
                          <Input
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            placeholder="Enter file name"
                            className="rounded-r-none"
                          />
                          <div className="flex items-center px-4 bg-muted border border-l-0 rounded-r-md">
                            <span className="text-sm text-muted-foreground font-mono">
                              {selectedFormat?.extension}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Export Summary */}
                  <Card className="bg-primary/10 border-primary/20">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-4">Export Summary</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-1">
                            {totalRecords.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Total Records
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-1">
                            {selectedColumns.length}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Selected Columns
                          </div>
                        </div>
                        <div className="text-center">
                          <Badge variant="outline" className="text-sm font-semibold px-3 py-1">
                            {selectedFormat?.label}
                          </Badge>
                          <div className="text-sm text-muted-foreground mt-1">
                            Export Format
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-6 border-t bg-card">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? handleClose : () => setCurrentStep(currentStep - 1)}
            >
              {currentStep === 1 ? "Cancel" : "Back"}
            </Button>

            <div className="flex items-center gap-3">
              {currentStep < 3 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={currentStep === 2 && !validationState.canProceed}
                  className="min-w-24"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleExport}
                  disabled={!validationState.canExport}
                  className="min-w-24"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              )}
            </div>
          </div>

          {/* Error message */}
          {currentStep === 2 && !validationState.canProceed && (
            <p className="text-sm text-destructive mt-3 text-center">
              Please select at least one column to continue
            </p>
          )}
          
          {currentStep === 3 && !validationState.hasFileName && (
            <p className="text-sm text-destructive mt-3 text-center">
              Please enter a file name to export
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}