import { config } from '../../config';

/**
 * HTTP client for REST API calls.
 *
 * Currently unused — services return mock data.
 * When the Spring Boot backend is ready, services will use this client
 * to make real HTTP requests through the NGINX API gateway.
 */

export interface RequestOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function getAuthHeaders(): Record<string, string> {
  try {
    const raw = localStorage.getItem('rw-auth');
    if (!raw) return {};
    const parsed = JSON.parse(raw) as { token: string };
    return { Authorization: `Bearer ${parsed.token}` };
  } catch {
    return {};
  }
}

async function request<T>(
  path: string,
  method: string,
  body?: unknown,
  options?: RequestOptions,
): Promise<T> {
  const url = `${config.apiUrl}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...options?.headers,
  };

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    signal: options?.signal,
  });

  if (!response.ok) {
    throw new ApiError(response.status, `Request failed: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const httpClient = {
  get: <T>(path: string, options?: RequestOptions) => request<T>(path, 'GET', undefined, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) => request<T>(path, 'POST', body, options),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) => request<T>(path, 'PUT', body, options),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) => request<T>(path, 'PATCH', body, options),
  delete: <T>(path: string, options?: RequestOptions) => request<T>(path, 'DELETE', undefined, options),
};
