import type { Profile, ProfilePreferences } from '../types/profile';

export interface UpdatePreferencesRequestDTO {
  preferences: Partial<ProfilePreferences>;
}

export type ProfileResponseDTO = Profile;
