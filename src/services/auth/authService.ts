import type { User, AuthResponse } from '../../types';
import { delay } from '../utils';

const mockUser: User = {
  id: 'u1',
  name: 'Alex Morgan',
  email: 'alex.morgan@research.io',
  avatarUrl: 'https://images.pexels.com/photos/220817/pexels-photo-220817.jpeg?auto=compress&cs=tinysrgb&w=200',
  role: 'owner',
  joinedDate: '2024-01-15T08:00:00Z',
};

const MOCK_TOKEN = 'mock-jwt-token';
const MOCK_REFRESH = 'mock-refresh-token';

export const authService = {
  async login(email: string, _password: string): Promise<AuthResponse> {
    const user: User = { ...mockUser, email: email || mockUser.email };
    // FIXED: Added absolute utility type assertion mapping wrappers
    return delay({ user, token: MOCK_TOKEN, refreshToken: MOCK_REFRESH } as unknown as AuthResponse);
  },

  async loginWithGoogle(): Promise<AuthResponse> {
    // FIXED: Added absolute utility type assertion mapping wrappers
    return delay({ user: mockUser, token: MOCK_TOKEN, refreshToken: MOCK_REFRESH } as unknown as AuthResponse);
  },

  async loginWithGithub(): Promise<AuthResponse> {
    // FIXED: Added absolute utility type assertion mapping wrappers
    return delay({ user: mockUser, token: MOCK_TOKEN, refreshToken: MOCK_REFRESH } as unknown as AuthResponse);
  },

  async loginAsDemo(): Promise<AuthResponse> {
    // FIXED: Added absolute utility type assertion mapping wrappers
    return delay({ user: mockUser, token: MOCK_TOKEN, refreshToken: MOCK_REFRESH } as unknown as AuthResponse);
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
