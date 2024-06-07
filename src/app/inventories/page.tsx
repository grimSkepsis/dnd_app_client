"use client";
import { Button } from "@/components/ui/button";
import { useSuspenseQuery } from "@apollo/client";

import { gql } from "@apollo/client";
import { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { InventoryWithItems } from "@/models/inventory-with-items/types";
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

  const {
    data: {
      inventoryWithItems: { getInventoryWithItemsByOwnerName: inventoryData },
    },
    fetchMore,
    refetch,
  } = useSuspenseQuery(query, {
    variables: {
      name: "Thorrun",
      page: 1,
      pageSize: 10,
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
      <Button onClick={changeName}>change name</Button>
      {JSON.stringify(otherData)}
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={inventoryData?.items.entities ?? []}
        />
      </div>
    </main>
  );
}
