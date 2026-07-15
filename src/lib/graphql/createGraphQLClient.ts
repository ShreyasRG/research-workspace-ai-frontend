import { GraphQLClient } from "graphql-request";
import { config } from "../../config";

// headers as a function is evaluated fresh before every single request,
// not once at client construction time. This matters because some
// services create their client once at module load time and reuse that
// same instance - if the token were read once here, that client would
// permanently use whatever token existed at that moment (often none,
// since module imports run before login completes).
export function createGraphQLClient() {
  return new GraphQLClient(config.graphqlUrl, {
    headers: () => {
      const token = localStorage.getItem("access_token");
      const headers: Record<string, string> = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      return headers;
    },
  });
}
