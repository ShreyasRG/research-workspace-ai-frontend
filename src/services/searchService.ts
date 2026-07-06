import type { AISummary, SearchResult } from '../types';
import { mockResources, mockSummaries, mockWorkspaces } from './mockData';
import { delay } from './utils';

export const aiService = {
  async getSummaries(workspaceId?: string): Promise<AISummary[]> {
    const items = workspaceId
      ? mockSummaries.filter((s) => s.workspaceId === workspaceId)
      : mockSummaries;
    return delay(items);
  },

  async getSummary(id: string): Promise<AISummary | null> {
    const s = mockSummaries.find((x) => x.id === id) ?? null;
    return delay(s);
  },
};

export const searchService = {
  async searchResources(query: string, filters?: {
    type?: string[];
    workspaceId?: string;
    tag?: string;
  }): Promise<SearchResult[]> {
    const q = query.trim().toLowerCase();
    const results: SearchResult[] = [];

    for (const r of mockResources) {
      if (filters?.type?.length && !filters.type.includes(r.type)) continue;
      if (filters?.workspaceId && r.workspaceId !== filters.workspaceId) continue;
      if (filters?.tag && !r.tags.some((t) => t.label === filters.tag)) continue;
      if (!q) {
        results.push({
          id: r.id,
          type: r.type,
          title: r.title,
          description: r.description,
          workspaceName: mockWorkspaces.find((w) => w.id === r.workspaceId)?.title ?? '',
          url: r.sourceUrl,
          tags: r.tags,
          date: r.dateAdded,
        });
        continue;
      }
      const haystack = `${r.title} ${r.description} ${r.tags.map((t) => t.label).join(' ')} ${r.author}`.toLowerCase();
      if (haystack.includes(q)) {
        results.push({
          id: r.id,
          type: r.type,
          title: r.title,
          description: r.description,
          workspaceName: mockWorkspaces.find((w) => w.id === r.workspaceId)?.title ?? '',
          url: r.sourceUrl,
          tags: r.tags,
          date: r.dateAdded,
        });
      }
    }

    for (const s of mockSummaries) {
      if (filters?.type?.length && !filters.type.includes('summary')) continue;
      if (filters?.workspaceId && s.workspaceId !== filters.workspaceId) continue;
      if (!q) continue;
      const haystack = `${s.title} ${s.summary} ${s.tags.map((t) => t.label).join(' ')}`.toLowerCase();
      if (haystack.includes(q)) {
        results.push({
          id: s.id,
          type: 'summary',
          title: s.title,
          description: s.summary.slice(0, 160) + '…',
          workspaceName: s.workspaceName,
          tags: s.tags,
          date: s.generatedDate,
        });
      }
    }

    return delay(results);
  },
};
