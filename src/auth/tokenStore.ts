import { Platform } from 'react-native';

/** Session is encrypted at rest on iOS/Android by Expo SecureStore.
 * Web deliberately keeps the token in memory only (no localStorage).
 */
export type StoredSession = { accessToken: string; email: string; name?: string };
const STORAGE_KEY = 'aidan.auth.session.v1';
let webSession: StoredSession | null = null;
let memorySession: StoredSession | null = null;
let loaded = false;
const listeners = new Set<() => void>();

const emitChange = () => listeners.forEach(listener => listener());

function tokenExpiresSoon(accessToken: string): boolean {
  try {
    const payload = accessToken.split('.')[1];
    if (!payload) return true;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    let bits = 0;
    let buffer = 0;
    let json = '';
    for (const char of normalized.replace(/=+$/, '')) {
      const digit = alphabet.indexOf(char);
      if (digit < 0) return true;
      buffer = (buffer << 6) | digit;
      bits += 6;
      if (bits >= 8) {
        bits -= 8;
        json += String.fromCharCode((buffer >>> bits) & 255);
      }
    }
    const { exp } = JSON.parse(json) as { exp?: number };
    return typeof exp !== 'number' || exp * 1000 <= Date.now() + 30_000;
  } catch {
    return true;
  }
}

async function getNativeStore() {
  return import('expo-secure-store');
}

async function read(): Promise<StoredSession | null> {
  if (loaded) return memorySession;
  if (Platform.OS === 'web') {
    loaded = true;
    memorySession = webSession;
    return webSession;
  }
  const SecureStore = await getNativeStore();
  const raw = await SecureStore.getItemAsync(STORAGE_KEY);
  loaded = true;
  if (!raw) return null;
  try {
    const session = JSON.parse(raw) as StoredSession;
    if (!session || !session.accessToken || !session.email) return null;
    memorySession = session;
    return session;
  } catch {
    await SecureStore.deleteItemAsync(STORAGE_KEY);
    return null;
  }
}

export const tokenStore = {
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  async getSession(): Promise<StoredSession | null> {
    const session = await read();
    if (session && tokenExpiresSoon(session.accessToken)) {
      await this.clear();
      return null;
    }
    return session;
  },
  async get(): Promise<string | null> {
    return (await this.getSession())?.accessToken ?? null;
  },
  async saveSession(session: StoredSession): Promise<void> {
    if (Platform.OS === 'web') webSession = session;
    else {
      const SecureStore = await getNativeStore();
      await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(session));
    }
    memorySession = session;
    loaded = true;
    emitChange();
  },
  async clear(): Promise<void> {
    if (Platform.OS === 'web') webSession = null;
    else {
      const SecureStore = await getNativeStore();
      await SecureStore.deleteItemAsync(STORAGE_KEY);
    }
    memorySession = null;
    loaded = true;
    emitChange();
  },
};
