import { api, ApiListResponse } from './api';

export type ShowDTO = {
  _id: string;
  movie: any;
  theatre: any;
  screen: string;
  date: string;
  showTime: string;
  language: string;
  format: '2D' | '3D' | 'IMAX' | '4DX';
  pricing: { seatType: 'regular' | 'premium' | 'recliner'; price: number }[];
  totalSeats: number;
};

export type GetShowsQuery = {
  movieId?: string;
  theatreId?: string;
  city?: string;
  date?: string;
  language?: string;
  format?: string;
  page?: number;
  limit?: number;
};

export async function getShows(params: GetShowsQuery = {}) {
  const { data } = await api.get<ApiListResponse<{ shows: ShowDTO[] }>>('/shows', { params });
  return data;
}

export async function getShowById(id: string) {
  const { data } = await api.get<ShowDTO>(`/shows/${id}`);
  return data;
}

export async function getMovieTheatres(movieId: string, params: { city?: string; date?: string } = {}) {
  const { data } = await api.get<{ theatres: any[] }>(`/shows/movie/${movieId}/theatres`, { params });
  return data.theatres;
}


