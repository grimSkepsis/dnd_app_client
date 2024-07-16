"use client";
import { Button } from "@/components/ui/button";
import { useSuspenseQuery } from "@apollo/client";
import { useState } from "react";
import { columns } from "./columns";
import { PaginationState, Updater } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import {
  InventoryWithItemsListingFragment,
  inventoryWithItemsListingQueryDocument,
} from "./graphql";
import { useFragment } from "@/gql";
import { isNil } from "lodash";
import { DEFAULT_PAGINATION_STATE } from "@/hooks/pagination/types";

export default function Page() {
  const [name, setName] = useState("Thorrun");
  const [otherData, setOtherData] = useState(null);

  const { data, refetch } = useSuspenseQuery(
    inventoryWithItemsListingQueryDocument,
    {
      variables: {
        name: "Thorrun",
        pageIndex: 0,
        pageSize: 2,
        orderBy: "level",
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
    },
  );

  const inventoryData = useFragment(
    InventoryWithItemsListingFragment,
    data.inventoryWithItems.getInventoryWithItemsByOwnerName,
  );

  const paginationState = isNil(inventoryData?.items)
    ? DEFAULT_PAGINATION_STATE
    : {
        pageIndex: inventoryData.items.pageIndex,
        pageSize: inventoryData.items.pageSize,
        totalEntities: inventoryData.items.totalEntities,
        totalPages: inventoryData.items.totalPages,
      };

  const inventoryItems = inventoryData?.items?.entities ?? [];

  const changeName = async () => {
    refetch({
      name: "Zeleus",
    });
  };

  function onPaginationChange(state: Updater<PaginationState>) {}

  function onNextPage() {
    refetch({
      pageIndex: paginationState.pageIndex + 1,
    });
  }

  function onPreviousPage() {
    refetch({
      pageIndex: paginationState.pageIndex - 1,
    });
  }

  function onPageSelection(pageIndex: number) {
    refetch({
      pageIndex,
    });
  }

  return (
    <main>
      <Button onClick={changeName}>change name</Button>
      {JSON.stringify(otherData)}
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={inventoryItems}
          onPaginationChange={onPaginationChange}
          paginationState={paginationState}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          onPageSelection={onPageSelection}
        />
      </div>
    </main>
  );
}
