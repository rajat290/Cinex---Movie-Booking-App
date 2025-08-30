import { createContext, useState, useEffect, type ReactNode } from 'react'
import { authService } from '../services/authService'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  city: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const userData = await authService.getProfile()
        setUser(userData)
      } catch (error) {
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }

  const login = async (email: string, password: string) => {
    const { user: userData, token } = await authService.login(email, password)
    localStorage.setItem('token', token)
    setUser(userData)
  }

  const register = async (userData: any) => {
    const { user: newUser, token } = await authService.register(userData)
    localStorage.setItem('token', token)
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
