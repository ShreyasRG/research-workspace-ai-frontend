import { graphqlClient } from "../../lib/graphql/graphqlClient";
import {
  GET_WORKSPACES,
  GET_WORKSPACE,
  CREATE_WORKSPACE,
} from "../../lib/graphql/workspace/workspace.graphql";

import type {
  WorkspacePageResponseDTO,
  WorkspaceResponseDTO,
  CreateWorkspaceRequestDTO,
} from "../../dto/workspace";

import type { Workspace } from "../../types/workspace";
import { toWorkspace } from "./workspaceMapper";

type GetWorkspacesResponse = {
  workspaces: WorkspacePageResponseDTO;
};

type GetWorkspaceResponse = {
  workspace: WorkspaceResponseDTO;
};

type CreateWorkspaceResponse = {
  createWorkspace: WorkspaceResponseDTO;
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
};