/**
 * Adaptador temporário para token de acesso (somente memória).
 * A integração da API deverá substituir isso por expo-secure-store no
 * Android/iOS e usar estratégia explícita para sessões no Web.
 * Nunca persistir tokens de sessão em AsyncStorage sem análise de segurança.
 */
let accessToken: string | null = null;

export const tokenStore = {
  async get(): Promise<string | null> {
    return accessToken;
  },
  async set(token: string): Promise<void> {
    accessToken = token;
  },
  async clear(): Promise<void> {
    accessToken = null;
  },
};
