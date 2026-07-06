import type { AuthResponse } from '../types/auth';

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface SocialLoginRequestDTO {
  provider: 'google' | 'github';
  accessToken: string;
}

export interface RefreshTokenRequestDTO {
  refreshToken: string;
}

export type AuthResponseDTO = AuthResponse;
