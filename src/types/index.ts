export * from './auth';
export * from './jobs';
export * from './api-keys';
export * from './subscription';

export interface RateLimitStatus {
  tier: string;
  requests_this_minute: number;
  limit_per_minute: number;
  resets_in_seconds: number;
  monthly_usage: number;
  monthly_limit: number;
  monthly_remaining: number;
}

export interface ApiError {
  detail: string;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}
