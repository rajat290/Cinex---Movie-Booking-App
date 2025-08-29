import { create } from 'zustand'
import { authService } from '../services/authService'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  initialize: async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const userData = await authService.getProfile()
        set({ user: userData, isAuthenticated: true })
      }
    } catch (error) {
      localStorage.removeItem('token')
      console.error('Auth initialization failed:', error)
    } finally {
      set({ loading: false })
    }
  },

  login: async (email: string, password: string) => {
    try {
      const { user, token } = await authService.login(email, password)
      localStorage.setItem('token', token)
      set({ user, isAuthenticated: true })
    } catch (error) {
      throw new Error('Login failed')
    }
  },

  register: async (userData: any) => {
    try {
      const { user, token } = await authService.register(userData)
      localStorage.setItem('token', token)
      set({ user, isAuthenticated: true })
    } catch (error) {
      throw new Error('Registration failed')
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, isAuthenticated: false })
  },
}))