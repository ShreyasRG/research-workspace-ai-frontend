import { gql } from "graphql-request";

const WORKSPACE_FIELDS = gql`
  id
  name
  description
  color
  icon
  ownerId
  ownerName
  members {
    id
    name
    email
    avatarUrl
    role
  }
  resourceCount
  summaryCount
  createdAt
  updatedAt
`;

export const GET_WORKSPACES = gql`
  query GetWorkspaces($pagination: PaginationInput!) {
    workspaces(pagination: $pagination) {
      content {
        ${WORKSPACE_FIELDS}
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
      ${WORKSPACE_FIELDS}
    }
  }
`;

export const CREATE_WORKSPACE = gql`
  mutation CreateWorkspace($input: CreateWorkspaceInput!) {
    createWorkspace(input: $input) {
      ${WORKSPACE_FIELDS}
    }
  }
`;

export const UPDATE_WORKSPACE = gql`
  mutation UpdateWorkspace($input: UpdateWorkspaceInput!) {
    updateWorkspace(input: $input) {
      ${WORKSPACE_FIELDS}
    }
  }
`;

export const DELETE_WORKSPACE = gql`
  mutation DeleteWorkspace($workspaceId: ID!) {
    deleteWorkspace(workspaceId: $workspaceId)
  }
`;