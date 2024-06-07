"use client";
import { useSuspenseQuery } from "@apollo/client";

import { gql } from "@apollo/client";
import { useState } from "react";
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

export default function Page() {
  const [name, setName] = useState("Thorrun");
  const [otherData, setOtherData] = useState(null);
  const { data, fetchMore, refetch } = useSuspenseQuery(query, {
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
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });
  const changeName = async () => {
    // setName("Zeleus");
    refetch({
      name: "Zeleus",
    });
    //
    // setOtherData(res);
  };

  return (
    <main>
      {JSON.stringify(data)}
      <button onClick={changeName}>change name</button>
      {JSON.stringify(otherData)}
    </main>
  );
}
