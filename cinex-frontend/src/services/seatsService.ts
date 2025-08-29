import { api } from './api'

export const seatsService = {
  getSeatLayout: async (showId: string) => {
    const response = await api.get(`/seats/${showId}/seats`)
    return response.data
  },

  blockSeats: async (showId: string, seats: string[]) => {
    const response = await api.post(`/seats/${showId}/block-seats`, { seats })
    return response.data
  },

  releaseSeats: async (showId: string, seats: string[]) => {
    const response = await api.post(`/seats/${showId}/release-seats`, { seats })
    return response.data
  }
}