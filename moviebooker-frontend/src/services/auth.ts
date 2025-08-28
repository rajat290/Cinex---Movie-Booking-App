import { api } from './api';

export type UserDTO = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

export type AuthResponse = {
  token: string;
  user: UserDTO;
};

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', credentials);
  localStorage.setItem('token', data.token);
  return data;
}

export async function register(userData: RegisterRequest): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/register', userData);
  localStorage.setItem('token', data.token);
  return data;
}

export async function getProfile(): Promise<UserDTO> {
  const { data } = await api.get<UserDTO>('/auth/me');
  return data;
}

export function logout(): void {
  localStorage.removeItem('token');
}

export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
