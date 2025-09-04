export interface Digital {
  id: string
  name: string
  type: string
  status: DigitalStatus
  createdAt: string
  updatedAt: string
}

export type DigitalStatus = 'active' | 'inactive' | 'archived'

export type DigitalAsset = Digital