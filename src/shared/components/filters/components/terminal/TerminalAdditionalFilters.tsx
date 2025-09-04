

import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select"
import { Search, Download, Settings2 } from "lucide-react"

interface TerminalAdditionalFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function TerminalAdditionalFilters({ searchQuery, onSearchChange }: TerminalAdditionalFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-muted rounded-lg">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search terminals..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-64"
        />
      </div>

      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          <SelectItem value="store-1">Store 1</SelectItem>
          <SelectItem value="store-2">Store 2</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Device Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="verifone">Verifone</SelectItem>
          <SelectItem value="ingenico">Ingenico</SelectItem>
        </SelectContent>
      </Select>

      <div className="ml-auto flex gap-2">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button variant="outline" size="sm">
          <Settings2 className="h-4 w-4 mr-2" />
          Columns
        </Button>
      </div>
    </div>
  )
}
