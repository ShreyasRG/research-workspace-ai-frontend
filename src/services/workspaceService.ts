import type { Workspace } from '../types';
import { mockWorkspaces } from './mockData';
import { delay } from './utils';

export const workspaceService = {
  async getWorkspaces(): Promise<Workspace[]> {
    return delay(mockWorkspaces);
  },

  async getWorkspace(id: string): Promise<Workspace | null> {
    const ws = mockWorkspaces.find((w) => w.id === id) ?? null;
    return delay(ws);
  },

  async createWorkspace(input: {
    title: string;
    description: string;
  }): Promise<Workspace> {
    const newWs: Workspace = {
      id: `ws${Date.now()}`,
      title: input.title,
      description: input.description,
      createdAt: new Date().toISOString(),
      owner: 'Alex Morgan',
      ownerId: 'u1',
      members: [
        {
          id: 'u1',
          name: 'Alex Morgan',
          email: 'alex.morgan@research.io',
          avatarUrl: 'https://images.pexels.com/photos/220817/pexels-photo-220817.jpeg?auto=compress&cs=tinysrgb&w=200',
          role: 'owner',
        },
      ],
      color: 'from-primary-500 to-accent-500',
      icon: 'FolderKanban',
      resourceCount: 0,
      summaryCount: 0,
    };
    return delay(newWs);
  },
};
