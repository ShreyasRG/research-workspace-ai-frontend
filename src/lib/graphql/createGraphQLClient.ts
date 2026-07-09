import { GraphQLClient } from "graphql-request";

export function createGraphQLClient() {
    
  const client = new GraphQLClient(
    import.meta.env.VITE_GRAPHQL_URL
);

  const token = localStorage.getItem("access_token");

  if (token) {
    client.setHeader(
      "Authorization",
      `Bearer ${token}`
    );
  }

  return client;
}