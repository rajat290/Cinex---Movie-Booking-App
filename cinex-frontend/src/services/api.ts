import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  // Ensure Content-Type is set for all requests
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json'
  }
  
  return config
})

// Handle errors with better error messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    
    // Return a more descriptive error
    if (error.response?.data?.message) {
      return Promise.reject(new Error(error.response.data.message))
    }
    
    return Promise.reject(error)
  }
)
