import { api, ApiListResponse } from './api';

export type MovieDTO = {
  _id: string;
  title: string;
  description: string;
  genre: string[];
  language: string[];
  duration: number;
  rating: 'U' | 'UA' | 'A' | 'S';
  imdbRating?: number;
  releaseDate: string;
  endDate?: string;
  poster: string;
  backdrop?: string;
  trailer?: string;
  cast: { name: string; role: string; image?: string }[];
  crew: { name: string; role: string; image?: string }[];
  formats: ('2D' | '3D' | 'IMAX' | '4DX')[];
  status: 'upcoming' | 'running' | 'ended';
};

export type GetMoviesQuery = {
  city?: string;
  language?: string; // comma-separated on server
  genre?: string; // comma-separated on server
  format?: string; // comma-separated on server
  status?: 'upcoming' | 'running' | 'ended' | 'all';
  page?: number;
  limit?: number;
  search?: string;
};

export async function getMovies(params: GetMoviesQuery = {}) {
  const { data } = await api.get<ApiListResponse<{ movies: MovieDTO[] }>>('/movies', { params });
  return data;
}

export async function getMovieById(id: string) {
  const { data } = await api.get<MovieDTO>(`/movies/${id}`);
  return data;
}

export async function getGenres() {
  const { data } = await api.get<{ genres: string[] }>('/movies/genres/list');
  return data.genres;
}

export async function getLanguages() {
  const { data } = await api.get<{ languages: string[] }>('/movies/languages/list');
  return data.languages;
}


