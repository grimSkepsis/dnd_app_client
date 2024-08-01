import {
  AdjustItemQuantityMutationDocument,
  InventoryWithItemsListingFragment,
  InventoryWithItemsListingQueryDocument,
  ItemsListingQueryDocument,
} from "./graphql";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { SortingState, Updater } from "@tanstack/react-table";
import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import { useFragment } from "@/gql";
import { isNil } from "lodash";
import { DEFAULT_PAGINATION_STATE } from "../pagination/types";
import { ItemQuantityAdjustmentDescription } from "./types";
import { InventoryItemQuantityAdjustmentParams } from "@/gql/graphql";

export default function useInventoryManagement() {
  const DEFAULT_SORTING_STATE: SortingState = [{ id: "name", desc: false }];
  const [inventoryItemsSorting, setInventoryItemsSorting] = useState(
    DEFAULT_SORTING_STATE,
  );

  const [adjustInventoryItemQuantity] = useMutation(
    AdjustItemQuantityMutationDocument,
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

  const inventoryAndItemsFragmentData = useFragment(
    InventoryWithItemsListingFragment,
    inventoryAndItemsData.inventoryWithItems.getInventoryWithItemsByOwnerName,
  );

  const inventoryItemsPaginationState = isNil(
    inventoryAndItemsFragmentData?.items,
  )
    ? DEFAULT_PAGINATION_STATE
    : {
        pageIndex: inventoryAndItemsFragmentData.items.pageIndex,
        pageSize: inventoryAndItemsFragmentData.items.pageSize,
        totalEntities: inventoryAndItemsFragmentData.items.totalEntities,
        totalPages: inventoryAndItemsFragmentData.items.totalPages,
      };

  const inventoryItems = inventoryAndItemsFragmentData?.items?.entities ?? [];

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

  async function onAdjustInventoryItemQuantity(
    inventoryId: string,
    items: InventoryItemQuantityAdjustmentParams[],
  ) {
    const res = await adjustInventoryItemQuantity({
      variables: {
        inventoryId,
        items,
      },
    });
    if (res?.data?.inventoryItems.addOrRemoveItemsFromInventory !== true) {
      throw new Error("Failed to adjust inventory item quantity");
    } else {
      refetchInventoryAndItemsData();
    }
  }

  async function onAddItems(
    inventoryId: string,
    items: ItemQuantityAdjustmentDescription[],
  ) {
    await onAdjustInventoryItemQuantity(
      inventoryId,
      items.map((item) => ({
        itemId: item.item.uuid,
        quantityChange: item.quantity,
      })),
    );
  }

  async function onUseItem(inventoryId: string, itemId: string) {
    onAdjustInventoryItemQuantity(inventoryId, [
      { itemId, quantityChange: -1 },
    ]);
  }

  return {
    inventoryItemsSorting,
    onInventoryItemsSortChange,
    // inventoryAndItemsData,
    inventoryName:
      inventoryAndItemsFragmentData?.inventory?.name ?? "No Inventory Found",
    inventoryId: inventoryAndItemsFragmentData?.inventory?.uuid ?? "",
    onAddItems,
    onUseItem,
    inventoryItems,
    inventoryItemsPaginationState,
    refetchInventoryAndItemsData,
    itemOptionsData,
    refetchItemOptions,
    onAdjustInventoryItemQuantity,
  };
}
