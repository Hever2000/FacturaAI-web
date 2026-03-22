export interface Plan {
  id: string;
  name: string;
  price: number;
  monthly_limit: number;
  per_minute_limit: number;
  features: string[];
}

export interface Subscription {
  tier: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'paused' | 'cancelled';
  external_id?: string;
  expires_at?: string;
  monthly_limit: number;
  monthly_used: number;
  monthly_remaining: number;
}

export interface CheckoutResponse {
  preapproval_id: string;
  init_point: string;
  sandbox_init_point: string;
}
