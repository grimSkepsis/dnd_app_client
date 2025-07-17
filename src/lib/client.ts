// lib/client.js
import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            items: {
              // Allow different ItemQuery objects to coexist
              merge: false,
            },
          },
        },
        ItemQuery: {
          // Don't cache ItemQuery objects since they don't have stable IDs
          keyFields: false,
        },
      },
    }),
    link: new HttpLink({
      uri: "http://localhost:3002/graphql",
    }),
  });
});
