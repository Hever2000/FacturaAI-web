import apiClient from './client';
import type { Plan, Subscription, CheckoutResponse } from '@/types/subscription';

export const subscriptionApi = {
  plans: () => apiClient.get<{ plans: Plan[] }>('/subscriptions/plans'),

  current: () => apiClient.get<Subscription>('/subscriptions/current'),

  checkout: (tier: 'pro' | 'enterprise') =>
    apiClient.post<CheckoutResponse>('/subscriptions/checkout', { tier }),

  pause: () => apiClient.patch('/subscriptions/pause'),

  resume: () => apiClient.patch('/subscriptions/resume'),

  cancel: () => apiClient.delete('/subscriptions'),
};
