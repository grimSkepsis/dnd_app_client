"use client";
import { Button } from "@/components/ui/button";
import { useSuspenseQuery } from "@apollo/client";

import { gql } from "@apollo/client";
import { useState } from "react";
import { columns } from "./columns";
import { InventoryWithItems } from "@/models/inventory-with-items/types";
import { PaginationState, Updater } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
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
            level
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

  function onPaginationChange(state: Updater<PaginationState>) {}

  function onNextPage() {
    refetch({
      page: inventoryData?.items.page + 1,
    });
  }

  function onPreviousPage() {
    refetch({
      page: inventoryData?.items.page - 1,
    });
  }

  return (
    <main>
      <Button onClick={changeName}>change name</Button>
      {JSON.stringify(otherData)}
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={inventoryData?.items.entities ?? []}
          onPaginationChange={onPaginationChange}
          paginationState={{
            pageIndex: inventoryData?.items.page - 1,
            pageSize: inventoryData?.items.pageSize,
            totalEntities: inventoryData?.items.totalEntities,
          }}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      </div>
    </main>
  );
}
