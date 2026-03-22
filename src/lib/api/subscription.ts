import client from './client';
import type { Plan, Subscription, CheckoutResponse } from '@/types/subscription';

export const subscriptionApi = {
  plans: () => client.get<{ plans: Plan[] }>('/subscriptions/plans'),

  current: () => client.get<Subscription>('/subscriptions/current'),

  checkout: (tier: 'pro' | 'enterprise') =>
    client.post<CheckoutResponse>('/subscriptions/checkout', { tier }),

  pause: () => client.patch('/subscriptions/pause'),

  resume: () => client.patch('/subscriptions/resume'),

  cancel: () => client.delete('/subscriptions'),
};
