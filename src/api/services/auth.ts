import { tokenStore } from '@/auth/tokenStore';
import { apiRequest } from '../client';
import { apiRoutes } from '../routes';
import type { LoginRequest, LoginResponse, RegisterRequest, User, VerifyCodeRequest } from '../contracts';

/** Integração real será ativada após alinhamento dos contratos com a API. */
export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiRequest<LoginResponse>(apiRoutes.login, {
      method: 'POST', body: credentials, authenticated: false,
    });
    await tokenStore.set(response.accessToken);
    return response;
  },
  register(data: RegisterRequest): Promise<unknown> {
    return apiRequest(apiRoutes.register, {
      method: 'POST', body: data, authenticated: false,
    });
  },
  verifyCode(data: VerifyCodeRequest): Promise<unknown> {
    return apiRequest(apiRoutes.verifyCode, {
      method: 'POST', body: data, authenticated: false,
    });
  },
  me(): Promise<User> {
    return apiRequest<User>(apiRoutes.me);
  },
  async logout(): Promise<void> {
    await tokenStore.clear();
  },
};
