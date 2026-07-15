import type { SearchResult, SearchFilters } from '../../types';
import { mockResources, mockSummaries, mockWorkspaces } from '../mockData';
import { delay } from '../utils';

export const searchService = {
  async searchResources(query: string, filters?: SearchFilters): Promise<SearchResult[]> {
    const q = query.trim().toLowerCase();
    const results: SearchResult[] = [];

    for (const r of mockResources) {
      if (filters?.type?.length && !filters.type.includes(r.type)) continue;
      if (filters?.workspaceId && r.workspaceId !== filters.workspaceId) continue;
      if (filters?.tag && !r.tags.some((t) => t.name === filters.tag)) continue;
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
      const haystack = `${r.title} ${r.description} ${r.tags.map((t) => t.name).join(' ')} ${r.author}`.toLowerCase();
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
      const haystack = `${s.title} ${s.summary} ${s.tags.map((t) => t.name).join(' ')}`.toLowerCase();
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
