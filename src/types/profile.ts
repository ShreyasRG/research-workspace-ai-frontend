import type { ID } from './common';

export interface ProfilePreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
  productUpdates: boolean;
}

export interface Profile {
  id: ID; name: string; email: string; avatarUrl: string; bio: string;
  location: string; website: string; twitter: string; github: string; interests: string[];
  notificationPreferences: ProfilePreferences;
  readingGoals: { weeklyTarget: number; currentWeek: number; streak: number; };
  stats: { resourcesRead: number; summariesGenerated: number; workspacesCreated: number; totalReadingTimeMinutes: number; };
}
