export type ID = string;

export interface Tag {
  id: ID;
  label: string;
  color: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export type Theme = 'light' | 'dark' | 'system';
