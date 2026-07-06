import type { ID, Tag } from './common';

export type ResourceType = 'article' | 'video' | 'note';
export type ResourceStatus = 'unread' | 'reading' | 'completed' | 'archived';

export interface Resource {
  id: ID;
  workspaceId: ID;
  title: string;
  type: ResourceType;
  sourceUrl: string;
  sourceName: string;
  description: string;
  tags: Tag[];
  dateAdded: string;
  status: ResourceStatus;
  author: string;
  thumbnailUrl?: string;
  readTimeMinutes?: number;
  durationSeconds?: number;
}

export interface KeyTakeaway {
  id: ID;
  text: string;
}

export interface Quote {
  id: ID;
  text: string;
  page?: number;
}

export interface AISummary {
  id: ID;
  resourceId: ID;
  resourceTitle: string;
  workspaceId: ID;
  workspaceName: string;
  title: string;
  summary: string;
  keyTakeaways: KeyTakeaway[];
  importantQuotes: Quote[];
  suggestedQuestions: string[];
  generatedDate: string;
  tags: Tag[];
  model: string;
}
