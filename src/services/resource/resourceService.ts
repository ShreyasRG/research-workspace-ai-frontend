import { createGraphQLClient } from "../../lib/graphql/createGraphQLClient";

import {
  GET_RESOURCES,
  GET_RESOURCE,
  CREATE_RESOURCE,
  UPDATE_RESOURCE,
  DELETE_RESOURCE,
} from "../../lib/graphql/resource/resource.graphql";

import type {
  ResourcePageResponseDTO,
  ResourceResponseDTO,
  CreateResourceRequestDTO,
  UpdateResourceRequestDTO,
} from "../../dto/resource";

import type { Resource, ResourceType } from "../../types";
import { toResource } from "./resourceMapper";

type GetResourcesResponse = {
  resources: ResourcePageResponseDTO;
};

type GetResourceResponse = {
  resource: ResourceResponseDTO;
};

type CreateResourceResponse = {
  createResource: ResourceResponseDTO;
};

type UpdateResourceResponse = {
  updateResource: ResourceResponseDTO;
};

type DeleteResourceResponse = {
  deleteResource: boolean;
};

export const resourceService = {
  async getResources(workspaceId?: string): Promise<Resource[]> {
    const client = createGraphQLClient();

    const response = await client.request<GetResourcesResponse>(
      GET_RESOURCES,
      {
        workspaceId: workspaceId ?? null,
        pagination: {
          page: 0,
          size: 100,
        },
      }
    );

    return response.resources.content.map(toResource);
  },

  async getResource(id: string): Promise<Resource | null> {
    const client = createGraphQLClient();

    const response = await client.request<GetResourceResponse>(
      GET_RESOURCE,
      { id }
    );

    return response.resource ? toResource(response.resource) : null;
  },

  async addResource(input: {
    workspaceId: string;
    title: string;
    type: ResourceType;
    sourceUrl: string;
  }): Promise<Resource> {
    const client = createGraphQLClient();

    const requestInput: CreateResourceRequestDTO = {
      workspaceId: input.workspaceId,
      title: input.title,
      type: input.type,
      sourceUrl: input.sourceUrl || undefined,
      sourceName: input.sourceUrl
        ? new URL(input.sourceUrl).hostname
        : undefined,
    };

    const response = await client.request<CreateResourceResponse>(
      CREATE_RESOURCE,
      { input: requestInput }
    );

    return toResource(response.createResource);
  },

  async updateResource(
    input: UpdateResourceRequestDTO
  ): Promise<Resource> {
    const client = createGraphQLClient();

    const response = await client.request<UpdateResourceResponse>(
      UPDATE_RESOURCE,
      { input }
    );

    return toResource(response.updateResource);
  },

  async deleteResource(id: string): Promise<void> {
    const client = createGraphQLClient();

    await client.request<DeleteResourceResponse>(DELETE_RESOURCE, { id });
  },
};
