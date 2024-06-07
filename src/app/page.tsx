import Image from "next/image";
import { getClient } from "@/lib/client";

import { gql } from "@apollo/client";
export const revalidate = 5;

const query = gql`
  query test(
    $name: String!
    $page: Int!
    $pageSize: Int!
    $orderBy: String!
    $orderDirection: String!
    $filter: InventoryItemQueryFilter!
  ) {
    inventoryWithItems {
      getInventoryWithItemsByOwnerName(
        nameTerm: $name
        page: $page
        pageSize: $pageSize
        orderBy: $orderBy
        orderDirection: $orderDirection
        filter: $filter
      ) {
        inventory {
          uuid
          name
          cp
          sp
          gp
          pp
          cp
        }
        items {
          entities {
            name
            value
            quantity
            traits
            description
            bulk
          }
          page
          pageSize
          totalEntities
          totalPages
        }
      }
    }
  }
`;

export default async function Home() {
  const { data } = await getClient().query({
    query,
    variables: {
      name: "Thorrun",
      page: 1,
      pageSize: 1,
      orderBy: "bulk",
      orderDirection: "ASC",
      filter: {
        excludedTraits: ["Toolkit"],
      },
    },
  });
  return (
    <main>
      test text
      {JSON.stringify(data)}
    </main>
  );
}
