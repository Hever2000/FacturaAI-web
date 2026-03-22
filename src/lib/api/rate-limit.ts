import client from './client';
import type { RateLimitStatus } from '@/types';

export const rateLimitApi = {
  status: () => client.get<RateLimitStatus>('/rate-limit/status'),
};
