import { createGraphQLClient } from "../../lib/graphql/createGraphQLClient";
import type { User } from "../../types";

const ME_QUERY = `
query Me {
  me {
    id
    email
    displayName
    avatarUrl
    provider
    enabled
    createdAt
    updatedAt
  }
}
`;

type MeQueryResponse = {
  me: User;
};

export const authApi = {
  async me(): Promise<User> {
    const client = createGraphQLClient();
    const response = await client.request<MeQueryResponse>(ME_QUERY);
    return response.me;
  },
};