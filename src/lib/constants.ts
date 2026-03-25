export const API_BASE_URL = '/api/proxy';

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'facturaai_access_token',
  REFRESH_TOKEN: 'facturaai_refresh_token',
  USER: 'facturaai_user',
} as const;

export const PLANS = {
  FREE: 'free',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
} as const;
