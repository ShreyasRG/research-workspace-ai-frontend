import type { Workspace } from "../types/workspace";

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