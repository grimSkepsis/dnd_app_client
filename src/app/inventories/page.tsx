"use client";
import { useSuspenseQuery } from "@apollo/client";
import { columns } from "./columns";
import { PaginationState, SortingState, Updater } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import {
  InventoryWithItemsListingFragment,
  InventoryWithItemsListingQueryDocument,
  ItemsListingQueryDocument,
} from "./graphql";
import { useFragment } from "@/gql";
import { isEmpty, isNil } from "lodash";
import { DEFAULT_PAGINATION_STATE } from "@/hooks/pagination/types";
import { useState } from "react";
import AddInventoryItemsSheet from "@/components/inventories/add-inventory-items-sheet";

const DEFAULT_SORTING_STATE: SortingState = [{ id: "name", desc: false }];

export default function Page() {
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORTING_STATE);
  const { data, refetch } = useSuspenseQuery(
    InventoryWithItemsListingQueryDocument,
    {
      variables: {
        name: "Thorrun",
        pageIndex: 0,
        pageSize: 2,
        orderBy: DEFAULT_SORTING_STATE[0].id,
        orderDirection: DEFAULT_SORTING_STATE[0].desc ? "DESC" : "ASC",
        filter: {
          // excludedTraits: ["Toolkit"],
        },
      },

      context: {
        fetchOptions: {
          next: { revalidate: 5 },
        },
      },
    },
  );

  const { data: itemRespData, refetch: itemRefetch } = useSuspenseQuery(
    ItemsListingQueryDocument,
    {
      variables: {
        pageIndex: 0,
        pageSize: 10,
        orderBy: DEFAULT_SORTING_STATE[0].id,
        orderDirection: DEFAULT_SORTING_STATE[0].desc ? "DESC" : "ASC",
        filter: {
          // excludedTraits: ["Toolkit"],
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

  function onPaginationChange(state: Updater<PaginationState>) {
    console.log("onPaginationChange", state);
  }

  function onSortChange(state: Updater<SortingState>) {
    if (typeof state === "function") {
      let newSorting = state(sorting);

      if (isEmpty(newSorting)) newSorting = DEFAULT_SORTING_STATE;

      setSorting(newSorting);
      refetch({
        orderBy: isEmpty(newSorting) ? "name" : newSorting[0].id,
        orderDirection: isEmpty(newSorting)
          ? "desc"
          : newSorting[0].desc
            ? "DESC"
            : "ASC",
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
        <AddInventoryItemsSheet itemOptionsData={itemRespData} />
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
