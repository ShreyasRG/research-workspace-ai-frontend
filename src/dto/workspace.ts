import type { Workspace } from '../types/workspace';

export interface CreateWorkspaceRequestDTO {
  title: string;
  description: string;
}

export type WorkspaceResponseDTO = Workspace;
