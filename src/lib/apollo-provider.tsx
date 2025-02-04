"use client";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

function makeClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:3002/graphql",
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloProvider client={makeClient()}>{children}</ApolloProvider>;
}
