import type { ID } from "./common";

export type AuthProvider = "LOCAL" | "GOOGLE" | "GITHUB";

export interface User {
  id: ID;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  provider: AuthProvider;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
}