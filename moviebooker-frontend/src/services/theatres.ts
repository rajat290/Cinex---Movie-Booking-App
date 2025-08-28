import { api, ApiListResponse } from './api';

export type TheatreDTO = {
  _id: string;
  name: string;
  address: { street: string; area: string; city: string; state: string; pincode: string };
  amenities: string[];
};

export async function getTheatres(params: { city?: string; page?: number; limit?: number; longitude?: number; latitude?: number; maxDistance?: number } = {}) {
  const { data } = await api.get<ApiListResponse<{ theatres: TheatreDTO[] }>>('/theatres', { params });
  return data;
}

export async function getTheatreById(id: string) {
  const { data } = await api.get<TheatreDTO>(`/theatres/${id}`);
  return data;
}


