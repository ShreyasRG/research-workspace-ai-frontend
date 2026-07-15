import type { Notification } from '../../types';
import { mockNotifications } from '../mockData';
import { delay } from '../utils';

export const notificationService = {
  async getNotifications(): Promise<Notification[]> { return delay(mockNotifications); },
};
