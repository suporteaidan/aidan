import { env, isApiConfigured } from '@/config/env';
import { tokenStore } from '@/auth/tokenStore';
import { ApiError } from './errors';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  authenticated?: boolean;
  timeoutMs?: number;
};

/**
 * HTTP centralizado: timeout, JSON, bearer token e normalização de erros.
 * Rotas e envelopes da API ainda precisam ser confirmados com o backend.
 */
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (env.useMocks) {
    throw new ApiError('Modo mock ativo. Endpoint real não foi chamado.', null, 'MOCK_MODE');
  }
  if (!isApiConfigured()) {
    throw new ApiError('Configure EXPO_PUBLIC_API_URL no seu .env.', null, 'API_NOT_CONFIGURED');
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs ?? env.timeoutMs);
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${env.apiUrl}${normalizedPath}`;

  try {
    const token = options.authenticated === false ? null : await tokenStore.get();
    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...(options.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(url, {
      method: options.method ?? 'GET',
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: controller.signal,
    });

    const contentType = response.headers.get('content-type') ?? '';
    const payload: unknown = response.status === 204
      ? null
      : contentType.includes('application/json')
        ? await response.json()
        : await response.text();

    if (!response.ok) {
      const message = typeof payload === 'object' && payload !== null && 'message' in payload && typeof payload.message === 'string'
        ? payload.message
        : `Erro na API: HTTP ${response.status}`;
      throw new ApiError(message, response.status, 'HTTP_ERROR', payload);
    }
    return payload as T;
  } catch (error: unknown) {
    if (error instanceof ApiError) throw error;
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('Tempo limite de conexão com a API.', null, 'TIMEOUT');
    }
    throw new ApiError('Não foi possível conectar à API.', null, 'NETWORK_ERROR', error);
  } finally {
    clearTimeout(timer);
  }
}
