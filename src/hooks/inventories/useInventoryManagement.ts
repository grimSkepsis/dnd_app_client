import {
  InventoryWithItemsListingQueryDocument,
  ItemsListingQueryDocument,
} from "./graphql";
import { useSuspenseQuery } from "@apollo/client";
import { SortingState, Updater } from "@tanstack/react-table";
import { useState } from "react";
import isEmpty from "lodash/isEmpty";

export default function useInventoryManagement() {
  const DEFAULT_SORTING_STATE: SortingState = [{ id: "name", desc: false }];
  const [inventoryItemsSorting, setInventoryItemsSorting] = useState(
    DEFAULT_SORTING_STATE,
  );

  const { data: inventoryAndItemsData, refetch: refetchInventoryAndItemsData } =
    useSuspenseQuery(InventoryWithItemsListingQueryDocument, {
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
    });

  const { data: itemOptionsData, refetch: refetchItemOptions } =
    useSuspenseQuery(ItemsListingQueryDocument, {
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
    });

  function onInventoryItemsSortChange(state: Updater<SortingState>) {
    if (typeof state === "function") {
      let newInventoryItemsSorting = state(inventoryItemsSorting);

      if (isEmpty(newInventoryItemsSorting))
        newInventoryItemsSorting = DEFAULT_SORTING_STATE;

      setInventoryItemsSorting(newInventoryItemsSorting);
      refetchInventoryAndItemsData({
        orderBy: isEmpty(newInventoryItemsSorting)
          ? "name"
          : newInventoryItemsSorting[0].id,
        orderDirection: isEmpty(newInventoryItemsSorting)
          ? "desc"
          : newInventoryItemsSorting[0].desc
            ? "DESC"
            : "ASC",
      });
    }
  }

  return {
    inventoryItemsSorting,
    onInventoryItemsSortChange,
    inventoryAndItemsData,
    refetchInventoryAndItemsData,
    itemOptionsData,
    refetchItemOptions,
  };
}
