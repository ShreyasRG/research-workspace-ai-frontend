import type { AISummary } from '../../types';
import { mockSummaries } from '../mockData';
import { delay } from '../utils';

export const summaryService = {
  // Added underscore to silence the unused variable error
  async getSummaries(_workspaceId?: string | undefined): Promise<AISummary[]> { 
    return delay(mockSummaries); 
  },
  async getSummary(id: string): Promise<AISummary | null> { 
    return delay(mockSummaries.find((s) => s.id === id) ?? null); 
  },
};
