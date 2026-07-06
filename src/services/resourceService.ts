import type { Resource } from '../types';
import { mockResources } from './mockData';
import { delay } from './utils';

export const resourceService = {
  async getResources(workspaceId?: string): Promise<Resource[]> {
    const items = workspaceId
      ? mockResources.filter((r) => r.workspaceId === workspaceId)
      : mockResources;
    return delay(items);
  },

  async getResource(id: string): Promise<Resource | null> {
    const r = mockResources.find((x) => x.id === id) ?? null;
    return delay(r);
  },

  async addResource(input: {
    workspaceId: string;
    title: string;
    type: Resource['type'];
    sourceUrl: string;
  }): Promise<Resource> {
    const newResource: Resource = {
      id: `r${Date.now()}`,
      workspaceId: input.workspaceId,
      title: input.title,
      type: input.type,
      sourceUrl: input.sourceUrl,
      sourceName: input.sourceUrl ? new URL(input.sourceUrl).hostname : 'Local note',
      description: '',
      tags: [],
      dateAdded: new Date().toISOString(),
      status: 'unread',
      author: 'Alex Morgan',
    };
    return delay(newResource);
  },

  async deleteResource(_id: string): Promise<void> {
    return delay(undefined);
  },
};
