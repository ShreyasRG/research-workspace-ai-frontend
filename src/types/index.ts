export type ID = string;

export interface User {
  id: ID;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'owner' | 'member' | 'viewer';
  joinedDate: string;
}

export type ResourceType = 'article' | 'video' | 'note';
export type ResourceStatus = 'unread' | 'reading' | 'completed' | 'archived';

export interface Tag {
  id: ID;
  label: string;
  color: string;
}

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

export interface WorkspaceMember {
  id: ID;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'owner' | 'member' | 'viewer';
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

export interface Profile {
  user: User;
  totalWorkspaces: number;
  savedResources: number;
  aiSummariesGenerated: number;
  preferences: {
    emailNotifications: boolean;
    weeklyDigest: boolean;
    autoGenerateSummaries: boolean;
    defaultSummaryModel: string;
    theme: 'light' | 'dark' | 'system';
  };
}

export interface Notification {
  id: ID;
  type: 'summary_ready' | 'resource_added' | 'member_joined' | 'mention';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface SearchResult {
  id: ID;
  type: ResourceType | 'summary' | 'workspace';
  title: string;
  description: string;
  workspaceName: string;
  url?: string;
  tags: Tag[];
  date: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
