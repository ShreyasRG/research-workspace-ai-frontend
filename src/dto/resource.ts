export interface AddResourceRequestDTO {
  title: string;
  type: string;
  sourceUrl?: string;
  description?: string;
}

export interface ResourceResponseDTO {
  id: string;
  workspaceId: string;
  title: string;
  type: string;
  sourceUrl?: string;
  sourceName?: string;
  description?: string;
  author?: string;
  status: string;
  thumbnailUrl?: string;
  readTimeMinutes?: number;
  durationSeconds?: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ResourcePageResponseDTO {
  content: ResourceResponseDTO[];
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface CreateResourceRequestDTO {
  workspaceId: string;
  title: string;
  type: string;
  sourceUrl?: string;
  sourceName?: string;
  description?: string;
  thumbnailUrl?: string;
}

export interface UpdateResourceRequestDTO {
  id: string;
  title?: string;
  description?: string;
  status?: string;
  tags?: string[];
}
