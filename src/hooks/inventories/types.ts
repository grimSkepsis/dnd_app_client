import { ItemListingFragment } from "@/gql/graphql";

export type ItemQuantityAdjustmentDescription = {
  item: ItemListingFragment;
  quantity: number;
};

export type InventoryItemAdjustmentCallback = (
  inventoryId: string,
  items: ItemQuantityAdjustmentDescription[],
) => Promise<void>;
