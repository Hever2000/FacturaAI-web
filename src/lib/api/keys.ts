import client from './client';
import type { ApiKey, CreateKeyRequest, CreateKeyResponse } from '@/types/api-keys';

export const keysApi = {
  list: () => client.get<{ api_keys: ApiKey[]; total: number }>('/apikeys'),

  get: (id: string) => client.get<ApiKey>(`/apikeys/${id}`),

  create: (data: CreateKeyRequest) => client.post<CreateKeyResponse>('/apikeys', data),

  update: (id: string, data: Partial<CreateKeyRequest>) =>
    client.patch<ApiKey>(`/apikeys/${id}`, data),

  rotate: (id: string) => client.post<CreateKeyResponse>(`/apikeys/${id}/rotate`),

  delete: (id: string) => client.delete(`/apikeys/${id}`),
};
