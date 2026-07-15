import type { ID } from './common';

export interface WorkspaceMember {
  id: ID; name: string; email: string; avatarUrl: string; role: 'owner' | 'member' | 'viewer';
}

export interface Workspace {
  id: ID; title: string; description: string; createdAt: string;
  owner: string; ownerId: ID; color: string; icon: string;
  resourceCount: number; summaryCount: number; members: WorkspaceMember[];
}
