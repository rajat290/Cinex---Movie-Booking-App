import { api } from './api'

export const movieService = {
  getMovies: async (params?: any) => {
    const response = await api.get('/movies', { params })
    return response.data
  },

  getMovie: async (id: string) => {
    const response = await api.get(`/movies/${id}`)
    return response.data
  },

  searchMovies: async (query: string) => {
    const response = await api.get(`/movies/search?q=${query}`)
    return response.data
  }
}