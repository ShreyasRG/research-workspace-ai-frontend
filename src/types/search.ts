import type { ID, Tag } from './common';
import type { ResourceType } from './resource';

export type SearchResultType = ResourceType | 'summary' | 'workspace';

export interface SearchResult {
  id: ID;
  type: SearchResultType;
  title: string;
  description: string;
  workspaceName: string;
  url?: string;
  tags: Tag[];
  date: string;
}

export interface SearchFilters {
  type?: string[];
  workspaceId?: string;
  tag?: string;
}
