import apiClient from './client';
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types/auth';

export const authApi = {
  login: (data: LoginRequest) => apiClient.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterRequest) => apiClient.post<AuthResponse>('/auth/register', data),

  refresh: (refreshToken: string) =>
    apiClient.post<AuthResponse>('/auth/refresh', { refresh_token: refreshToken }),

  me: () => apiClient.get<User>('/auth/me'),
};
