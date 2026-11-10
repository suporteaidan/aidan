import { apiRequest } from '../client';
import { apiRoutes } from '../routes';
import type { LoginRequest, RegisterRequest, TokenResponse, User } from '../contracts';

/** Actual FastAPI contracts: OAuth2 password form login, JSON registration. */
export const authApi = {
  login(credentials: LoginRequest): Promise<TokenResponse> {
    const body = `username=${encodeURIComponent(credentials.email.trim())}&password=${encodeURIComponent(credentials.password)}`;
    return apiRequest<TokenResponse>(apiRoutes.login, {
      method: 'POST', body, authenticated: false,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },
  register(data: RegisterRequest): Promise<User> {
    return apiRequest<User>(apiRoutes.register, { method: 'POST', body: data, authenticated: false });
  },
};
