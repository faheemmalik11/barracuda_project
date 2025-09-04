import { useState } from "react"
import { MemberHeader, MemberTable } from "../index"
import EntityTableFilters from '@shared/components/filters/EntityTableFilters'
import { mockMembers } from "@shared/data/mockMembers"
import type { Member } from "../types/members.types"

export function MembersListPage() {
  const [filteredData, setFilteredData] = useState<Member[]>(mockMembers)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  const handleTableFiltersChange = (filters: Record<string, unknown>) => {
    console.log("Member Table filters changed:", filters)
    let newFilteredData = [...mockMembers]
    
    if (filters.memberStatus && filters.memberStatus !== "all") {
      newFilteredData = newFilteredData.filter((member) => member.status === filters.memberStatus)
    }
    
    if (filters.memberName && typeof filters.memberName === 'string') {
      newFilteredData = newFilteredData.filter((member) =>
        member.name.toLowerCase().includes((filters.memberName as string).toLowerCase()) ||
        member.email.toLowerCase().includes((filters.memberName as string).toLowerCase())
      )
    }
    
    setFilteredData(newFilteredData)
  }

  const handleViewMember = (member: Member) => {
    console.log("View member:", member)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <MemberHeader />

      <div className="space-y-4">
        <EntityTableFilters entity="members" onFiltersChange={handleTableFiltersChange} />
        <MemberTable
          members={filteredData}
          selectedMembers={selectedMembers}
          onSelectionChange={setSelectedMembers}
          onViewMember={handleViewMember}
        />
      </div>
    </div>
  )
}