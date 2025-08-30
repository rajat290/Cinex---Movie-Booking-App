import { api } from './api'

export interface Show {
  _id: string
  movie: string
  theatre: string
  screen: string
  date: string
  showTime: string
  language: string
  format: string
  pricing: Array<{ seatType: string; price: number }>
  availableSeats: string[]
  bookedSeats: string[]
  totalSeats: number
  status: string
}

export const showService = {
  getTheatresForMovie: async (movieId: string, params?: any) => {
    const response = await api.get(`/shows/movie/${movieId}/theatres`, { params })
    return response.data
  },

  getShow: async (showId: string): Promise<Show> => {
    const response = await api.get(`/shows/${showId}`)
    return response.data
  },

  getShows: async (params?: any) => {
    const response = await api.get('/shows', { params })
    return response.data
  }
}