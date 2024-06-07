import { InventoryItem } from "../inventory-items/type";
import { Inventory } from "../inventory/types";
import { PaginatedResponse } from "../pagination/types";

export type InventoryWithItems = {
  inventory: Inventory;
  items: PaginatedResponse<InventoryItem>;
};
