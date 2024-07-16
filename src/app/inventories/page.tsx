"use client";
import { useSuspenseQuery } from "@apollo/client";
import { columns } from "./columns";
import { PaginationState, SortingState, Updater } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import {
  InventoryWithItemsListingFragment,
  inventoryWithItemsListingQueryDocument,
} from "./graphql";
import { useFragment } from "@/gql";
import { isNil } from "lodash";
import { DEFAULT_PAGINATION_STATE } from "@/hooks/pagination/types";
import { useState } from "react";

export default function Page() {
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
  const [sorting, setSorting] = useState<SortingState>([]);

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

  function onPaginationChange(state: Updater<PaginationState>) {
    console.log("onPaginationChange", state);
  }

  function onSortChange(state: Updater<SortingState>) {
    if (typeof state === "function") {
      const newSorting = state(sorting);
      console.log(newSorting);
      setSorting(newSorting);
      refetch({
        orderBy: newSorting[0].id,
        orderDirection: newSorting[0].desc ? "DESC" : "ASC",
      });
    }
  }

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
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={inventoryItems}
          sortingState={sorting}
          onPaginationChange={onPaginationChange}
          onSortingChange={onSortChange}
          paginationState={paginationState}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          onPageSelection={onPageSelection}
        />
      </div>
    </main>
  );
}
