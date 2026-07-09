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

      console.log("Bootstrap started");
      const storedToken = localStorage.getItem("access_token");
      console.log("Stored token:", storedToken);

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await authApi.me();
        console.log("Current user:", currentUser);

        setUser(currentUser);
        console.log("User state updated");

        setToken(storedToken);
        console.log("Token state updated");
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
      logout,
    }),
    [
      user,
      token,
      isLoading,
      loginWithGoogle,
      loginWithGithub,
      logout,
    ]
  );

  console.log("########## AUTH CONTEXT ##########");

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