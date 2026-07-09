
export interface CreateWorkspaceRequestDTO {
  name: string;
  description?: string;
}

export interface WorkspaceResponseDTO {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspacePageResponseDTO {
  content: WorkspaceResponseDTO[];
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface UpdateWorkspaceRequestDTO {
  id: string;
  name: string;
  description: string;
}