import { create } from 'zustand'
import { authService } from '../services/authService'
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  preferences?: {
    languages: string[]
    genres: string[]
    notifications: {
      email: boolean
      sms: boolean
    }
  }
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  success: string | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (userData: any) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  initialize: () => Promise<void>
  clearError: () => void
  clearSuccess: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  success: null,

  initialize: async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const userData = await authService.getProfile()
        set({ user: userData, isAuthenticated: true, success: 'Auto-login successful' })
      }
    } catch (error) {
      localStorage.removeItem('token')
      set({ error: 'Session expired. Please login again.' })
    } finally {
      set({ loading: false })
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null, success: null })
      const { user, token } = await authService.login(email, password)
      localStorage.setItem('token', token)
      set({ 
        user, 
        isAuthenticated: true, 
        success: 'Login successful! Redirecting...',
        loading: false 
      })
      
      // Return success to allow component to handle navigation
      return { success: true }
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.'
      set({ 
        error: errorMessage,
        loading: false 
      })
      return { success: false, error: errorMessage }
    }
  },

  register: async (userData: any) => {
    try {
      set({ loading: true, error: null, success: null })
      const { user, token } = await authService.register(userData)
      localStorage.setItem('token', token)
      set({ 
        user, 
        isAuthenticated: true, 
        success: 'Registration successful! Redirecting to home...',
        loading: false 
      })
      
      // Return success to allow component to handle navigation
      return { success: true }
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.'
      set({ 
        error: errorMessage,
        loading: false 
      })
      return { success: false, error: errorMessage }
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ 
      user: null, 
      isAuthenticated: false, 
      success: 'Logged out successfully' 
    })
    window.location.href = '/login'
  },

  clearError: () => set({ error: null }),
  clearSuccess: () => set({ success: null }),
}))