export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  monthly_limit: number;
  monthly_used: number;
  monthly_remaining: number;
  jobs_count?: number;
  jobs_this_month?: number;
}
