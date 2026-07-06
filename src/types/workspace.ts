import type { ID } from './common';
import type { UserRole } from './auth';

export interface WorkspaceMember {
  id: ID;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
}

export interface Workspace {
  id: ID;
  title: string;
  description: string;
  createdAt: string;
  owner: string;
  ownerId: ID;
  members: WorkspaceMember[];
  color: string;
  icon: string;
  resourceCount: number;
  summaryCount: number;
}
