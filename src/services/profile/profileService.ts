import type { Profile } from '../../types';
import { mockProfile } from '../mockData';
import { delay } from '../utils';

export const profileService = {
  async getProfile(): Promise<Profile> { return delay(mockProfile); },
  async updateProfile(updates: Partial<Profile>): Promise<Profile> { Object.assign(mockProfile, updates); return delay(mockProfile); },
};
