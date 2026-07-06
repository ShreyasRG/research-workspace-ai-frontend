import type { Notification, Profile } from '../types';
import { mockNotifications, mockProfile } from './mockData';
import { delay } from './utils';

export const profileService = {
  async getProfile(): Promise<Profile> {
    return delay(mockProfile);
  },

  async getNotifications(): Promise<Notification[]> {
    return delay(mockNotifications);
  },
};
