export interface WorkspaceMemberDTO {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
}

export interface CreateWorkspaceRequestDTO {
  name: string;
  description?: string;
}

export interface WorkspaceResponseDTO {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  ownerId: string;
  ownerName: string;
  members: WorkspaceMemberDTO[];
  resourceCount: number;
  summaryCount: number;
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