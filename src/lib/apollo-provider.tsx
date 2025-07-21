"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/client-integration-nextjs";
import {
  ItemListingFragmentDoc,
  ItemDetailsFragmentDoc,
  InventoryItemListingFragmentDoc,
  InventoryWithItemsListingFragmentDoc,
  TraitListingFragmentDoc,
} from "@/gql/graphql";

const fragmentRegistry = createFragmentRegistry(
  ItemListingFragmentDoc,
  ItemDetailsFragmentDoc,
  InventoryItemListingFragmentDoc,
  InventoryWithItemsListingFragmentDoc,
  TraitListingFragmentDoc,
);

function makeClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:3002/graphql",
  });

  return new ApolloClient({
    cache: new InMemoryCache({
      fragments: fragmentRegistry,
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
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
