import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '@/lib/constants';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get token from localStorage or cookies
function getToken(): string | null {
  if (typeof window === 'undefined') return null;

  // Try localStorage first (for backward compatibility)
  const localToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  if (localToken) return localToken;

  // Try cookies
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find((c) => c.trim().startsWith(`${STORAGE_KEYS.ACCESS_TOKEN}=`));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
}

client.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request ID for tracing
    config.headers['X-Request-ID'] = crypto.randomUUID();

    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        // Use separate axios instance to avoid interceptor loop
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const { access_token, refresh_token } = response.data;

        // Store tokens securely
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return client(originalRequest);
      } catch (refreshError) {
        // Clear all auth data
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);

        if (typeof window !== 'undefined') {
          window.location.href = '/login?expired=true';
        }

        return Promise.reject(refreshError);
      }
    }

    // Handle rate limit (429)
    if (error.response?.status === 429) {
      const retryAfter = error.response?.headers?.['retry-after'];
      throw new Error(`rate_limited:${retryAfter || '60'}`);
    }

    // Handle server errors (5xx)
    if (error.response?.status >= 500) {
      throw new Error('error_server');
    }

    return Promise.reject(error);
  }
);

export default client;
