import type { ID } from './common';
import type { User } from './auth';
import type { Theme } from './common';

export interface Profile {
  user: User;
  totalWorkspaces: number;
  savedResources: number;
  aiSummariesGenerated: number;
  preferences: ProfilePreferences;
}

export interface ProfilePreferences {
  emailNotifications: boolean;
  weeklyDigest: boolean;
  autoGenerateSummaries: boolean;
  defaultSummaryModel: string;
  theme: Theme;
}

export type NotificationType = 'summary_ready' | 'resource_added' | 'member_joined' | 'mention';

export interface Notification {
  id: ID;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
