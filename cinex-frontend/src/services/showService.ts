import { api } from './api'

export const showService = {
  getTheatresForMovie: async (movieId: string, params?: any) => {
    const response = await api.get(`/shows/movie/${movieId}/theatres`, { params })
    return response.data
  },

  getShow: async (showId: string) => {
    const response = await api.get(`/shows/${showId}`)
    return response.data
  },

  getShows: async (params?: any) => {
    const response = await api.get('/shows', { params })
    return response.data
  }
}