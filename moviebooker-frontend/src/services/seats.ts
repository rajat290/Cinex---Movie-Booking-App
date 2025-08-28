import { api } from './api';

export type SeatDTO = {
  seatNumber: string;
  seatType: 'regular' | 'premium' | 'recliner';
  status: 'available' | 'booked' | 'blocked';
  price: number;
};

export type GetSeatsResponse = {
  seats: SeatDTO[];
  totalSeats: number;
  availableSeats: number;
  bookedSeats: number;
  blockedSeats: number;
};

export type BlockSeatsRequest = {
  seats: string[];
  timeoutMinutes?: number;
};

export type BlockSeatsResponse = {
  message: string;
  blockedSeats: string[];
  expiresAt: string;
};

export type ReleaseSeatsRequest = {
  seats: string[];
};

export async function getSeats(showId: string): Promise<GetSeatsResponse> {
  const { data } = await api.get<GetSeatsResponse>(`/seats/${showId}/seats`);
  return data;
}

export async function blockSeats(showId: string, blockData: BlockSeatsRequest): Promise<BlockSeatsResponse> {
  const { data } = await api.post<BlockSeatsResponse>(`/seats/${showId}/block-seats`, blockData);
  return data;
}

export async function releaseSeats(showId: string, releaseData: ReleaseSeatsRequest): Promise<{ message: string }> {
  const { data } = await api.post<{ message: string }>(`/seats/${showId}/release-seats`, releaseData);
  return data;
}
