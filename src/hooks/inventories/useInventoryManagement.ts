import {
  AdjustItemQuantityMutationDocument,
  InventoryWithItemsListingQueryDocument,
  ItemDetailsQueryDocument,
  ItemsListingQueryDocument,
  QuickCreateItemMutationDocument,
  SellItemsMutationDocument,
  UpdateItemMutationDocument,
  UpdateInventoryCurrencyMutationDocument,
  InventoryListingQueryDocument,
  TraitListingQueryDocument,
  TraitListingFragment,
} from "./graphql";
import type { InventoryWithItemsListingFragment } from "@/gql/graphql";
import { useLazyQuery, useMutation, useSuspenseQuery } from "@apollo/client";
import { SortingState, Updater } from "@tanstack/react-table";
import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import { isNil } from "lodash";
import { DEFAULT_PAGINATION_STATE } from "../pagination/types";
import { ItemQuantityAdjustmentDescription } from "./types";
import { InventoryItemQuantityAdjustmentParams } from "@/gql/graphql";
import { ItemFormProperties } from "@/components/inventories/item-details/types";
import { CurrencyData } from "@/components/inventories/currency/types";

export default function useInventoryManagement() {
  const DEFAULT_SORTING_STATE: SortingState = [{ id: "name", desc: false }];
  const [inventoryItemsSorting, setInventoryItemsSorting] = useState(
    DEFAULT_SORTING_STATE
  );

  const [adjustInventoryItemQuantity] = useMutation(
    AdjustItemQuantityMutationDocument
  );

  const [sellItems] = useMutation(SellItemsMutationDocument);

  const [quickCreateItem] = useMutation(QuickCreateItemMutationDocument);

  const [updateItem] = useMutation(UpdateItemMutationDocument);

  const [
    getDetailedItem,
    {
      loading: itemDetailsLoading,
      data: itemDetailsData,
      error: itemDetailsError,
      refetch: refetchItemDetails,
    },
  ] = useLazyQuery(ItemDetailsQueryDocument);

  const [updateInventoryCurrency] = useMutation(
    UpdateInventoryCurrencyMutationDocument
  );

  const { data: inventoryListingData, refetch: refetchInventoryListing } =
    useSuspenseQuery(InventoryListingQueryDocument);

  const { data: inventoryAndItemsData, refetch: refetchInventoryAndItemsData } =
    useSuspenseQuery(InventoryWithItemsListingQueryDocument, {
      variables: {
        //TODO - get session and default inventory working (or empty state?)
        id: "1812136d-427b-46cb-82b3-d8309b7f4607",
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

  const { data: traitListingData } = useSuspenseQuery(
    TraitListingQueryDocument
  );

  const traitFragmentData = traitListingData.items.getTraits;

  const inventoryFragmentData = inventoryListingData.inventory.getInventories.entities;

  const inventoryAndItemsFragmentData = 
    inventoryAndItemsData.inventoryWithItems.getInventoryWithItemsById;

  const inventoryItemsPaginationState = isNil(
    inventoryAndItemsFragmentData?.items
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
    items: InventoryItemQuantityAdjustmentParams[]
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
    items: ItemQuantityAdjustmentDescription[]
  ) {
    await onAdjustInventoryItemQuantity(
      inventoryId,
      items.map((item) => ({
        itemId: item.item.uuid,
        quantityChange: item.quantity,
      }))
    );
    await refetchInventoryAndItemsData();
  }

  async function onQuickCreateItem(name: string) {
    await quickCreateItem({
      variables: {
        name,
      },
    });
  }

  async function onUseItem(inventoryId: string, itemId: string) {
    onAdjustInventoryItemQuantity(inventoryId, [
      { itemId, quantityChange: -1 },
    ]);
  }

  async function onSellItem(inventoryId: string, itemId: string) {
    const res = await sellItems({
      variables: {
        inventoryId,
        items: [{ itemId, quantityChange: -1 }],
      },
    });
    if (res?.data?.inventoryItems.sellItems !== true) {
      throw new Error("Failed to sell item");
    } else {
      refetchInventoryAndItemsData();
    }
  }

  async function onViewItemDetails(id: string) {
    getDetailedItem({ variables: { id } });
  }

  async function onUpdateCurrency(inventoryId: string, currency: CurrencyData) {
    await updateInventoryCurrency({
      variables: {
        inventoryId,
        params: currency,
      },
    });
  }

  async function onUpdateItem(id: string, params: ItemFormProperties) {
    await updateItem({
      variables: {
        id,
        params,
      },
    });
    await Promise.all([refetchItemDetails(), refetchInventoryAndItemsData()]);
  }

  //TODO - break into own hook
  async function onSelectInventory(inventoryId: string) {
    refetchInventoryAndItemsData({ id: inventoryId, pageIndex: 0 });
  }

  const {
    name: inventoryName,
    uuid: inventoryId,
    ...currency
  } = inventoryAndItemsFragmentData?.inventory ?? { name: "", uuid: "", pp: 0, gp: 0, sp: 0, cp: 0 };

  return {
    inventoryItemsSorting,
    onInventoryItemsSortChange,
    inventoryName,
    inventoryId,
    onAddItems,
    onUseItem,
    inventoryItems,
    currency: currency ?? { pp: 0, gp: 0, sp: 0, cp: 0 },
    inventoryItemsPaginationState,
    refetchInventoryAndItemsData,
    itemOptionsData,
    refetchItemOptions,
    onAdjustInventoryItemQuantity,
    onQuickCreateItem,
    onViewItemDetails,
    itemDetailsLoading,
    itemDetailsData,
    onUpdateItem,
    onSellItem,
    onUpdateCurrency,
    //TODO - fetch traits properly
    traitOptions: traitFragmentData.map((trait) => ({
      value: trait.name,
      label: trait.name,
    })),
    inventoryOptions: inventoryFragmentData.map((inventory) => ({
      value: inventory.uuid,
      label: inventory.name,
    })),
    onSelectInventory,
    inventoryListingData,
  };
}
