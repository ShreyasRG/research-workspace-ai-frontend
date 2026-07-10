import { GraphQLClient } from "graphql-request";

export function createGraphQLClient() {

  const client = new GraphQLClient(import.meta.env.VITE_GRAPHQL_URL, {
   headers: () => {
      const token = localStorage.getItem("access_token");
      return token ? { Authorization: `Bearer ${token}` } : {};
    },
  });

  return client;
}