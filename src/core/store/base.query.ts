// src/core/store/base.query.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/v1';

interface BaseQueryArgs {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
}

interface BaseQueryError {
  status: number;
  data: {
    message?: string;
    error?: string;
  };
}

export const customBaseCheck = async (): Promise<boolean> => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  return true;
}

export const customBaseQuery = async <T = unknown>(
  args: BaseQueryArgs
): Promise<{ data: T }> => {
  const { url, method = 'get', body, params, headers = {} } = args;

  // Get token from Zustand store or localStorage
  const token = localStorage.getItem('token');
  
  // Build URL with query params
  const queryString = params
    ? '?' + new URLSearchParams(
        Object.entries(params)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => [key, String(value)])
      ).toString()
    : '';

  const fullUrl = `${API_BASE_URL}${url}${queryString}`;

  const isFormData = body instanceof FormData;

  const defaultHeaders: Record<string, string> = {
    ...(isFormData ?{}:{'Content-Type': 'application/json'}),
    ...headers,
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method: method.toUpperCase(),
    headers: defaultHeaders,
  };

  if (body && method !== 'get') {
    config.body = isFormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(fullUrl, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: response.statusText,
      }));

      const error: BaseQueryError = {
        status: response.status,
        data: errorData,
      };

      throw error;
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error) {
      throw error;
    }
    throw {
      status: 500,
      data: { message: 'Network error or unknown error occurred' },
    };
  }
};