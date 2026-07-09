import { createGraphQLClient } from "../../lib/graphql/createGraphQLClient";

import {
  GET_WORKSPACES,
  GET_WORKSPACE,
  CREATE_WORKSPACE,
  UPDATE_WORKSPACE,
} from "../../lib/graphql/workspace/workspace.graphql";

import type {
  WorkspacePageResponseDTO,
  WorkspaceResponseDTO,
  CreateWorkspaceRequestDTO,
  UpdateWorkspaceRequestDTO,
} from "../../dto/workspace";

import type { Workspace } from "../../types/workspace";
import { toWorkspace } from "./workspaceMapper";

const graphqlClient = createGraphQLClient();

type GetWorkspacesResponse = {
  workspaces: WorkspacePageResponseDTO;
};

type GetWorkspaceResponse = {
  workspace: WorkspaceResponseDTO;
};

type CreateWorkspaceResponse = {
  createWorkspace: WorkspaceResponseDTO;
};

type UpdateWorkspaceResponse = {
  updateWorkspace: WorkspaceResponseDTO;
};

export const workspaceService = {
  async getWorkspaces(): Promise<Workspace[]> {
    const response = await graphqlClient.request<GetWorkspacesResponse>(
      GET_WORKSPACES,
      {
        pagination: {
          page: 0,
          size: 20,
        },
      }
    );

    return response.workspaces.content.map(toWorkspace);
  },

  async getWorkspace(id: string): Promise<Workspace | null> {
    const response = await graphqlClient.request<GetWorkspaceResponse>(
      GET_WORKSPACE,
      { id }
    );

    return response.workspace ? toWorkspace(response.workspace) : null;
  },

  async createWorkspace(
    input: CreateWorkspaceRequestDTO
  ): Promise<Workspace> {
    const response = await graphqlClient.request<CreateWorkspaceResponse>(
      CREATE_WORKSPACE,
      {
        input,
      }
    );

    return toWorkspace(response.createWorkspace);
  },

async updateWorkspace(
    input: UpdateWorkspaceRequestDTO
  ): Promise<Workspace> {
    const response = await graphqlClient.request<UpdateWorkspaceResponse>(
      UPDATE_WORKSPACE,
      {
        input,
      }
    );

    return toWorkspace(response.updateWorkspace);
  },
};