import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { authApi } from '@/api/services/auth';
import type { LoginRequest, RegisterRequest, User } from '@/api/contracts';
import { tokenStore, type StoredSession } from './tokenStore';

type AuthContextValue = {
  status: 'loading' | 'guest' | 'authenticated';
  session: StoredSession | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<User>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthContextValue['status']>('loading');
  const [session, setSession] = useState<StoredSession | null>(null);

  useEffect(() => {
    let mounted = true;
    const refresh = async () => {
      try {
        const restored = await tokenStore.getSession();
        if (mounted) {
          setSession(restored);
          setStatus(restored ? 'authenticated' : 'guest');
        }
      } catch {
        if (mounted) {
          setSession(null);
          setStatus('guest');
        }
      }
    };
    void refresh();
    const unsubscribe = tokenStore.subscribe(() => { void refresh(); });
    return () => { mounted = false; unsubscribe(); };
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    const response = await authApi.login(credentials);
    const next = { accessToken: response.access_token, email: credentials.email };
    await tokenStore.saveSession(next);
    setSession(next);
    setStatus('authenticated');
  }, []);

  const register = useCallback((data: RegisterRequest) => authApi.register(data), []);
  const logout = useCallback(async () => {
    await tokenStore.clear();
    setSession(null);
    setStatus('guest');
  }, []);

  const value = useMemo<AuthContextValue>(() => ({ status, session, login, register, logout }), [status, session, login, register, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used within AuthProvider');
  return value;
}
