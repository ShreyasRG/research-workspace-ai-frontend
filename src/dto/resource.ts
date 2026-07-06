import type { Resource, ResourceType } from '../types/resource';

export interface AddResourceRequestDTO {
  workspaceId: string;
  title: string;
  type: ResourceType;
  sourceUrl: string;
}

export type ResourceResponseDTO = Resource;
