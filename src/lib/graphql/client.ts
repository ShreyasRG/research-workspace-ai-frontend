import { config } from '../../config';

/**
 * GraphQL client for querying the backend.
 *
 * Currently unused — services return mock data.
 * When the Spring Boot + GraphQL backend is ready, services will use this
 * client to execute queries and mutations against the GraphQL endpoint.
 */

export interface GraphQLRequest<TVariables = unknown> {
  query: string;
  variables?: TVariables;
}

export interface GraphQLResponse<TData = unknown> {
  data?: TData;
  errors?: GraphQLerror[];
}

export interface GraphQLerror {
  message: string;
  locations?: { line: number; column: number }[];
  path?: (string | number)[];
}

function getAuthHeaders(): Record<string, string> {
  try {
    const raw = localStorage.getItem('rw-auth');
    if (!raw) return {};
    const parsed = JSON.parse(raw) as { token: string };
    return { Authorization: `Bearer ${parsed.token}` };
  } catch {
    return {};
  }
}

export async function graphqlRequest<TData, TVariables = unknown>(
  request: GraphQLRequest<TVariables>,
  signal?: AbortSignal,
): Promise<TData> {
  const response = await fetch(config.graphqlUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(request),
    signal,
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const result = (await response.json()) as GraphQLResponse<TData>;

  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0].message);
  }

  if (!result.data) {
    throw new Error('GraphQL response contained no data');
  }

  return result.data;
}

export const graphqlClient = {
  request: graphqlRequest,
};
