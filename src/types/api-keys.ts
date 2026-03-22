export interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  expires_at?: string;
}

export interface CreateKeyRequest {
  name: string;
  description?: string;
  expires_at?: string;
}

export interface CreateKeyResponse extends ApiKey {
  key: string;
  message: string;
}
