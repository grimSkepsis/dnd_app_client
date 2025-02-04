// lib/client.js
import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";

export function getClient() {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            items: {
              merge: (existing, incoming) => {
                console.log("existing: ", existing);
                console.log("incoming: ", incoming);
                return incoming;
              },
            },
          },
        },
      },
    }),
    link: new HttpLink({
      uri: "http://localhost:3002/graphql",
    }),
  });
}
