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
import { config } from "../config";
import { queryClient } from "../lib/queryClient";
import { createGraphQLClient } from "../lib/graphql/createGraphQLClient";

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

const ME_QUERY = `
  query Me {
    me {
      id
      email
      displayName
      avatarUrl
      createdAt
    }
  }
`;

type MeResponse = {
  me: {
    id: string;
    email: string;
    displayName: string;
    avatarUrl: string;
    createdAt: string;
  };
};

function toUser(dto: MeResponse["me"]): User {
  return {
    id: dto.id,
    name: dto.displayName,
    email: dto.email,
    avatarUrl: dto.avatarUrl,
    // The backend doesn't have a per-account "role" concept yet - only
    // per-workspace membership roles. Defaulting to 'owner' here since
    // every workspace this user has is one they own (no real
    // collaboration/invite feature exists yet either).
    role: "owner",
    joinedDate: dto.createdAt,
  };
}

async function fetchCurrentUser(): Promise<User> {
  const client = createGraphQLClient();
  const response = await client.request<MeResponse>(ME_QUERY);
  return toUser(response.me);
}

export function AuthProvider({ children }: { children: ReactNode }) {
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
        const currentUser = await fetchCurrentUser();
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
    window.location.href = `${config.apiUrl}/oauth2/authorization/google`;
  }, []);

  const loginWithGithub = useCallback(async () => {
    window.location.href = `${config.apiUrl}/oauth2/authorization/github`;
  }, []);

  // Completes login from OAuthCallback WITHOUT any full page
  // reload/navigation. On iOS WebKit (Safari and Chrome, which share the
  // same engine on iOS), an additional hard navigation immediately after
  // returning from a cross-site redirect (Google -> here) can be treated
  // as a tracking "bounce," which may clear localStorage for this origin
  // right after we write the token. Updating context state directly
  // sidesteps that entirely.
  const completeOAuthLogin = useCallback(async (newToken: string) => {
    localStorage.setItem("access_token", newToken);
    setToken(newToken);

    try {
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);

      // Wipe any cached query data from a previous session on this tab,
      // so a newly logged-in user never briefly sees a previous user's
      // cached data on this browser/tab.
      queryClient.clear();
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
    queryClient.clear();
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
    [user, token, isLoading, loginWithGoogle, loginWithGithub, completeOAuthLogin, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
