/**
 * Configuração pública do app. Expo substitui EXPO_PUBLIC_* na compilação.
 * Nunca inclua segredos de servidor nessas variáveis.
 */
const rawUseMocks = process.env.EXPO_PUBLIC_USE_MOCKS;
const rawBaseUrl = process.env.EXPO_PUBLIC_API_URL ?? '';
const rawTimeout = Number(process.env.EXPO_PUBLIC_API_TIMEOUT_MS ?? '12000');

export const env = {
  /** Padrão seguro: mantém o fluxo atual da demonstração até a API existir. */
  useMocks: rawUseMocks !== 'false',
  apiUrl: rawBaseUrl.trim().replace(/\/+$/, ''),
  healthPath: process.env.EXPO_PUBLIC_API_HEALTH_PATH ?? '/health',
  timeoutMs: Number.isFinite(rawTimeout) && rawTimeout > 0 ? rawTimeout : 12000,
} as const;

export function isApiConfigured(): boolean {
  return /^https?:\/\//i.test(env.apiUrl);
}
