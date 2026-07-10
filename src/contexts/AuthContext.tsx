import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { User } from "../types";
import { authApi } from "../services/auth/authApi";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  completeOAuthLogin: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const apiBaseUrl = import.meta.env.VITE_GRAPHQL_URL.replace("/graphql", "");

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      const storedToken = localStorage.getItem("access_token");

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await authApi.me();
        setUser(currentUser);
        setToken(storedToken);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("access_token");
        setUser(null);
        setToken(null);
      }

      setIsLoading(false);
    }

    bootstrap();
  }, []);

  const loginWithGoogle = useCallback(async () => {
    window.location.href =
      `${apiBaseUrl}/oauth2/authorization/google`;
  }, []);

  const loginWithGithub = useCallback(async () => {
    window.location.href =
      `${apiBaseUrl}/oauth2/authorization/github`;
  }, []);

  // Completes login from OAuthCallback WITHOUT any full page
  // reload/navigation. This deliberately avoids window.location.href/
  // replace/reload after the Google -> backend -> frontend redirect
  // chain: an extra hard navigation immediately following a cross-site
  // round trip can be treated by WebKit (Safari/Chrome on iOS share the
  // same engine) as a tracking "bounce," which can clear localStorage
  // for this origin right after we write the token. Updating context
  // state directly sidesteps that entirely - no second navigation for
  // WebKit to flag.
  const completeOAuthLogin = useCallback(async (newToken: string) => {
    localStorage.setItem("access_token", newToken);
    setToken(newToken);

    try {
      const currentUser = await authApi.me();
      setUser(currentUser);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("access_token");
      setUser(null);
      setToken(null);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem("access_token");

    setUser(null);

    setToken(null);

    window.location.href = "/login";
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!user && !!token,
      isLoading,
      loginWithGoogle,
      loginWithGithub,
      completeOAuthLogin,
      logout,
    }),
    [
      user,
      token,
      isLoading,
      loginWithGoogle,
      loginWithGithub,
      completeOAuthLogin,
      logout,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}