import apiClient from './client';
import type { ApiKey, CreateKeyRequest, CreateKeyResponse } from '@/types/api-keys';

export const keysApi = {
  list: () => apiClient.get<{ api_keys: ApiKey[]; total: number }>('/apikeys'),

  get: (id: string) => apiClient.get<ApiKey>(`/apikeys/${id}`),

  create: (data: CreateKeyRequest) => apiClient.post<CreateKeyResponse>('/apikeys', data),

  update: (id: string, data: Partial<CreateKeyRequest>) =>
    apiClient.patch<ApiKey>(`/apikeys/${id}`, data),

  rotate: (id: string) => apiClient.post<CreateKeyResponse>(`/apikeys/${id}/rotate`),

  delete: (id: string) => apiClient.delete(`/apikeys/${id}`),
};
