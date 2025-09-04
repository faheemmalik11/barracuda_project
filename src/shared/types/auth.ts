export interface User {
  id: string
  email: string
  name: string
  role: string
  permissions: string[]
  fullName: string
  phoneNumber?: string
  isPhoneVerified: boolean
  has2FA: boolean
  hasPasskey: boolean
  createdAt?: string
  lastLoginAt?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
}

export type AuthMode = 'register' | 'login'