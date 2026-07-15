import { gql } from "graphql-request";

const RESOURCE_FIELDS = gql`
  id
  workspaceId
  title
  type
  sourceUrl
  sourceName
  description
  author
  status
  thumbnailUrl
  readTimeMinutes
  durationSeconds
  tags
  createdAt
  updatedAt
`;

export const GET_RESOURCES = gql`
  query GetResources($workspaceId: ID, $pagination: PaginationInput!) {
    resources(workspaceId: $workspaceId, pagination: $pagination) {
      content {
        ${RESOURCE_FIELDS}
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

export const GET_RESOURCE = gql`
  query GetResource($id: ID!) {
    resource(id: $id) {
      ${RESOURCE_FIELDS}
    }
  }
`;

export const CREATE_RESOURCE = gql`
  mutation CreateResource($input: CreateResourceInput!) {
    createResource(input: $input) {
      ${RESOURCE_FIELDS}
    }
  }
`;

export const UPDATE_RESOURCE = gql`
  mutation UpdateResource($input: UpdateResourceInput!) {
    updateResource(input: $input) {
      ${RESOURCE_FIELDS}
    }
  }
`;

export const DELETE_RESOURCE = gql`
  mutation DeleteResource($id: ID!) {
    deleteResource(id: $id)
  }
`;
