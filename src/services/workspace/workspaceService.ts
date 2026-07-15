import { createGraphQLClient } from "../../lib/graphql/createGraphQLClient";

import {
  GET_WORKSPACES,
  GET_WORKSPACE,
  CREATE_WORKSPACE,
  UPDATE_WORKSPACE,
  DELETE_WORKSPACE,
} from "../../lib/graphql/workspace/workspace.graphql";

import type {
  WorkspacePageResponseDTO,
  WorkspaceResponseDTO,
} from "../../dto/workspace";

import type { Workspace } from "../../types/workspace";
import { toWorkspace } from "./workspaceMapper";

type GetWorkspacesResponse = { workspaces: WorkspacePageResponseDTO };
type GetWorkspaceResponse = { workspace: WorkspaceResponseDTO };
type CreateWorkspaceResponse = { createWorkspace: WorkspaceResponseDTO };
type UpdateWorkspaceResponse = { updateWorkspace: WorkspaceResponseDTO };
type DeleteWorkspaceResponse = { deleteWorkspace: boolean };

export const workspaceService = {
  async getWorkspaces(): Promise<Workspace[]> {
    const client = createGraphQLClient();
    const response = await client.request<GetWorkspacesResponse>(GET_WORKSPACES, {
      pagination: { page: 0, size: 20 },
    });
    return response.workspaces.content.map(toWorkspace);
  },

  async getWorkspace(id: string): Promise<Workspace | null> {
    const client = createGraphQLClient();
    const response = await client.request<GetWorkspaceResponse>(GET_WORKSPACE, { id });
    return response.workspace ? toWorkspace(response.workspace) : null;
  },

  // NOTE: `color` and `icon` are accepted here for compatibility with the
  // existing mutation hook signature, but are NOT sent to the backend -
  // the backend auto-assigns a color/icon deterministically at creation
  // time (see CreateWorkspaceService.java). If the new UI's create-
  // workspace modal lets the user pick a color/icon, that choice is
  // currently silently ignored. Flagging this - worth revisiting once
  // we look at that specific modal component.
  async createWorkspace(input: {
    title: string;
    description: string;
    color?: string;
    icon?: string;
  }): Promise<Workspace> {
    const client = createGraphQLClient();
    const response = await client.request<CreateWorkspaceResponse>(CREATE_WORKSPACE, {
      input: {
        name: input.title,
        description: input.description,
      },
    });
    return toWorkspace(response.createWorkspace);
  },

  async updateWorkspace(input: {
    id: string;
    title: string;
    description: string;
  }): Promise<Workspace> {
    const client = createGraphQLClient();
    const response = await client.request<UpdateWorkspaceResponse>(UPDATE_WORKSPACE, {
      input: {
        id: input.id,
        name: input.title,
        description: input.description,
      },
    });
    return toWorkspace(response.updateWorkspace);
  },

  async deleteWorkspace(id: string): Promise<boolean> {
    const client = createGraphQLClient();
    const response = await client.request<DeleteWorkspaceResponse>(DELETE_WORKSPACE, {
      workspaceId: id,
    });
    return response.deleteWorkspace;
  },
};
