import type { AuthResponse, User } from '../types';
import { mockUser } from './mockData';
import { delay } from './utils';

const MOCK_TOKEN = 'mock-jwt-token';
const MOCK_REFRESH = 'mock-refresh-token';

export const authService = {
  async login(email: string, _password: string): Promise<AuthResponse> {
    const user: User = { ...mockUser, email: email || mockUser.email };
    return delay({ user, token: MOCK_TOKEN, refreshToken: MOCK_REFRESH });
  },

  async loginWithGoogle(): Promise<AuthResponse> {
    return delay({ user: mockUser, token: MOCK_TOKEN, refreshToken: MOCK_REFRESH });
  },

  async loginWithGithub(): Promise<AuthResponse> {
    return delay({ user: mockUser, token: MOCK_TOKEN, refreshToken: MOCK_REFRESH });
  },

  async loginAsDemo(): Promise<AuthResponse> {
    return delay({ user: mockUser, token: MOCK_TOKEN, refreshToken: MOCK_REFRESH });
  },

  async logout(): Promise<void> {
    return delay(undefined, 200);
  },

  async refreshToken(): Promise<{ token: string; refreshToken: string }> {
    return delay({ token: MOCK_TOKEN, refreshToken: MOCK_REFRESH }, 200);
  },

  async getCurrentUser(): Promise<User | null> {
    return delay(mockUser, 150);
  },
};
