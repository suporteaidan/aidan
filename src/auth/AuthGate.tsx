import { useEffect } from 'react';
import { router, useSegments } from 'expo-router';
import { env } from '@/config/env';
import { useAuth } from './AuthProvider';

const publicRoutes = new Set(['', 'index', 'login', 'register', 'google-account', 'forgot-password']);
/** UI-level redirect only; backend must authorize every protected API request. */
export function AuthGate() {
  const segments = useSegments();
  const { status } = useAuth();
  const route = String(segments[0] ?? '');
  useEffect(() => {
    if (env.useMocks || status === 'loading' || publicRoutes.has(route)) return;
    if (status !== 'authenticated') router.replace('/login');
  }, [route, status]);
  return null;
}
