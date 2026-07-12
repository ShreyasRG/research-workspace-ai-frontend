import { gql } from "graphql-request";

export const GET_RESOURCES = gql`
  query GetResources($workspaceId: ID, $pagination: PaginationInput!) {
    resources(workspaceId: $workspaceId, pagination: $pagination) {
      content {
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
    }
  }
`;

export const CREATE_RESOURCE = gql`
  mutation CreateResource($input: CreateResourceInput!) {
    createResource(input: $input) {
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
    }
  }
`;

export const UPDATE_RESOURCE = gql`
  mutation UpdateResource($input: UpdateResourceInput!) {
    updateResource(input: $input) {
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
    }
  }
`;

export const DELETE_RESOURCE = gql`
  mutation DeleteResource($id: ID!) {
    deleteResource(id: $id)
  }
`;
