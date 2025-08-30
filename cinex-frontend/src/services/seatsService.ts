import { api } from './api'

export interface Seat {
  seatNumber: string
  seatType: string
  price: number
  status: 'available' | 'booked' | 'blocked'
  row: string
  number: number
}

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