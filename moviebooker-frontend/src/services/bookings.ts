import { api, ApiListResponse } from './api';

export type BookingDTO = {
  _id: string;
  bookingId: string;
  user: string;
  show: string;
  movie: any;
  theatre: any;
  seats: Array<{
    seatNumber: string;
    seatType: 'regular' | 'premium' | 'recliner';
    price: number;
  }>;
  totalAmount: number;
  convenienceFee: number;
  tax: number;
  finalAmount: number;
  showDate: string;
  showTime: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
};

export type CreateBookingRequest = {
  showId: string;
  seats: Array<{
    seatNumber: string;
    seatType: 'regular' | 'premium' | 'recliner';
  }>;
};

export type CreateBookingResponse = {
  message: string;
  booking: BookingDTO;
  paymentRequired: boolean;
};

export async function createBooking(bookingData: CreateBookingRequest): Promise<CreateBookingResponse> {
  const { data } = await api.post<CreateBookingResponse>('/bookings', bookingData);
  return data;
}

export async function getBookings(params: { page?: number; limit?: number; status?: string } = {}): Promise<ApiListResponse<{ bookings: BookingDTO[] }>> {
  const { data } = await api.get<ApiListResponse<{ bookings: BookingDTO[] }>>('/bookings', { params });
  return data;
}

export async function cancelBooking(bookingId: string, reason?: string): Promise<{ message: string; refundAmount: number }> {
  const { data } = await api.put(`/bookings/${bookingId}/cancel`, { reason });
  return data;
}
