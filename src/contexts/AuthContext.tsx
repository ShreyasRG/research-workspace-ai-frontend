import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { User } from '../types';
import { authService } from '../services';
import { STORAGE_KEYS } from '../constants';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  loginAsDemo: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface StoredAuth {
  user: User;
  token: string;
}

function loadStoredAuth(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.auth);
    return raw ? (JSON.parse(raw) as StoredAuth) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = loadStoredAuth();
    if (stored) {
      setUser(stored.user);
      setToken(stored.token);
    }
    setIsLoading(false);
  }, []);

  const persist = useCallback((u: User, t: string) => {
    localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify({ user: u, token: t }));
    setUser(u);
    setToken(t);
  }, []);

  const clear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.auth);
    setUser(null);
    setToken(null);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authService.login(email, password);
    persist(res.user, res.token);
  }, [persist]);

  const loginWithGoogle = useCallback(async () => {
    const res = await authService.loginWithGoogle();
    persist(res.user, res.token);
  }, [persist]);

  const loginWithGithub = useCallback(async () => {
    const res = await authService.loginWithGithub();
    persist(res.user, res.token);
  }, [persist]);

  const loginAsDemo = useCallback(async () => {
    const res = await authService.loginAsDemo();
    persist(res.user, res.token);
  }, [persist]);

  const logout = useCallback(async () => {
    await authService.logout();
    clear();
  }, [clear]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: !!user && !!token,
      isLoading,
      login,
      loginWithGoogle,
      loginWithGithub,
      loginAsDemo,
      logout,
    }),
    [user, token, isLoading, login, loginWithGoogle, loginWithGithub, loginAsDemo, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
