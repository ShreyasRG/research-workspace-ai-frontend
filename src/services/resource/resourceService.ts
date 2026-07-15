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
} from "../../dto/resource";

import type { Resource, ResourceType, ScannedDocument } from "../../types";
import { toResource } from "./resourceMapper";
import { MOCK_SCAN_IMAGE, MOCK_SCAN_TITLE, MOCK_SCAN_DESCRIPTION, MOCK_SCAN_EXTRACTED_TEXT } from "../mockData";
import { delay } from "../utils";

type GetResourcesResponse = { resources: ResourcePageResponseDTO };
type GetResourceResponse = { resource: ResourceResponseDTO };
type CreateResourceResponse = { createResource: ResourceResponseDTO };
type UpdateResourceResponse = { updateResource: ResourceResponseDTO };
type DeleteResourceResponse = { deleteResource: boolean };

export const resourceService = {
  async getResources(workspaceId?: string): Promise<Resource[]> {
    const client = createGraphQLClient();
    const response = await client.request<GetResourcesResponse>(GET_RESOURCES, {
      workspaceId: workspaceId ?? null,
      pagination: { page: 0, size: 100 },
    });
    return response.resources.content.map(toResource);
  },

  async getResource(id: string): Promise<Resource | null> {
    const client = createGraphQLClient();
    const response = await client.request<GetResourceResponse>(GET_RESOURCE, { id });
    return response.resource ? toResource(response.resource) : null;
  },

  async addResource(input: {
    workspaceId: string;
    title: string;
    type: ResourceType;
    sourceUrl: string;
    description?: string;
    thumbnailUrl?: string;
  }): Promise<Resource> {
    const client = createGraphQLClient();
    const response = await client.request<CreateResourceResponse>(CREATE_RESOURCE, {
      input: {
        workspaceId: input.workspaceId,
        title: input.title,
        type: input.type,
        sourceUrl: input.sourceUrl || undefined,
        sourceName: input.sourceUrl ? safeHostname(input.sourceUrl) : undefined,
        description: input.description,
        thumbnailUrl: input.thumbnailUrl,
      },
    });
    return toResource(response.createResource);
  },

  async updateResource(input: {
    id: string;
    title?: string;
    description?: string;
    status?: string;
    tags?: string[];
  }): Promise<Resource> {
    const client = createGraphQLClient();
    const response = await client.request<UpdateResourceResponse>(UPDATE_RESOURCE, {
      input,
    });
    return toResource(response.updateResource);
  },

  async deleteResource(id: string): Promise<void> {
    const client = createGraphQLClient();
    await client.request<DeleteResourceResponse>(DELETE_RESOURCE, { id });
  },

  // NOT YET WIRED TO THE REAL BACKEND. The real scan-session flow
  // (createScanSession -> QR code -> phone upload -> poll -> 
  // finalizeScanResource) already exists on the backend, but wiring the
  // frontend for it is a separate, deferred step - this stays mocked for
  // now so the existing DocumentScannerModal UI keeps working as-is
  // until that follow-up pass.
  async simulateScan(): Promise<ScannedDocument> {
    return delay(
      {
        title: MOCK_SCAN_TITLE,
        description: MOCK_SCAN_DESCRIPTION,
        sourceUrl: `https://scan.handoff.local/doc-${Date.now()}`,
        thumbnailUrl: MOCK_SCAN_IMAGE,
        extractedText: MOCK_SCAN_EXTRACTED_TEXT,
      },
      1800
    );
  },
};

function safeHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}
