import type { ID } from './common';

export type UserRole = 'owner' | 'member' | 'viewer';

export interface User {
  id: ID;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  joinedDate: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface StoredAuth {
  user: User;
  token: string;
}
