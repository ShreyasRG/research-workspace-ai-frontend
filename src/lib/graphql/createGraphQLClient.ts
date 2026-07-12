import { GraphQLClient } from "graphql-request";

export function createGraphQLClient() {
  const client = new GraphQLClient(import.meta.env.VITE_GRAPHQL_URL, {
    headers: () => {
      const token = localStorage.getItem("access_token");
      const headers: Record<string, string> = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      return headers;
    },
  });

  return client;
}