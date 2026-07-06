import type { AISummary } from '../../types';
import { mockSummaries } from '../mockData';
import { delay } from '../utils';

export const summaryService = {
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
