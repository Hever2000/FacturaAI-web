import client from './client';
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types/auth';

export const authApi = {
  login: (data: LoginRequest) => client.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterRequest) => client.post<AuthResponse>('/auth/register', data),

  refresh: (refreshToken: string) =>
    client.post<AuthResponse>('/auth/refresh', { refresh_token: refreshToken }),

  me: () => client.get<User>('/auth/me'),
};
