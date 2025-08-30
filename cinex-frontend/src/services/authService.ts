import { api } from './api'
import type { User } from '../stores/authStore'

interface AuthResponse {
  user: User
  token: string
  message?: string
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  register: async (userData: any): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/me')
    return response.data.user
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put('/users/profile', userData)
    return response.data.user
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await api.post('/users/change-password', { currentPassword, newPassword })
  }
}