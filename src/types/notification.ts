import type { ID } from './common';
export interface Notification { id: ID; type: string; title: string; message: string; timestamp: string; read: boolean; actionUrl?: string; }
