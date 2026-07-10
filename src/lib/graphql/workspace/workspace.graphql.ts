import { gql } from "graphql-request";

export const GET_WORKSPACES = gql`
  query GetWorkspaces($pagination: PaginationInput!) {
    workspaces(pagination: $pagination) {
      content {
        id
        name
        description
        createdAt
        updatedAt
      }
      pageInfo {
        page
        size
        totalElements
        totalPages
        hasNext
        hasPrevious
      }
    }
  }
`;

export const GET_WORKSPACE = gql`
  query GetWorkspace($id: ID!) {
    workspace(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_WORKSPACE = gql`
  mutation CreateWorkspace($input: CreateWorkspaceInput!) {
    createWorkspace(input: $input) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_WORKSPACE = gql`
  mutation UpdateWorkspace($input: UpdateWorkspaceInput!) {
   updateWorkspace(input: $input) {
        id
        name
        description
        createdAt
        updatedAt
    }
  }
`;

export const DELETE_WORKSPACE = gql`
  mutation DeleteWorkspace($workspaceId: ID!) {
    deleteWorkspace(workspaceId: $workspaceId)
  }
`;