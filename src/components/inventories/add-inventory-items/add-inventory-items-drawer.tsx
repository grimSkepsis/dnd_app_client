import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ItemListingFragment, ItemsListingQuery } from "@/gql/graphql";
import { useState } from "react";
import isNil from "lodash/isNil";

import isEmpty from "lodash/isEmpty";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { DialogProps } from "@radix-ui/react-dialog";
import {
  InventoryItemAdjustmentCallback,
  ItemQuantityAdjustmentDescription,
} from "@/hooks/inventories/types";
import { InventoryItemAdditionOption } from "./inventory-item-option";
import { InventoryItemOption } from "./inventory-item-option";
import { ItemSearch } from "./item-search";

type AddInventoryItemsDrawerProps = {
  itemOptionsData: ItemsListingQuery;
  inventoryName: string;
  inventoryId: string;
  onAddItems: InventoryItemAdjustmentCallback;
  onCreateItem: (name: string) => Promise<void>;
} & DialogProps;

/**
 * Drawer for browsing possible items to add to the inventory and providing a way to quickly create stand in items that have not been defined yet
 * @param param0
 * @returns
 */
export function AddInventoryItemsDrawer({
  itemOptionsData,
  onOpenChange: handleOpenChange,
  inventoryId,
  inventoryName,
  onAddItems,
  onCreateItem: handleCreateItem,
  ...dialogProps
}: AddInventoryItemsDrawerProps) {
  const [itemsToAdd, setItemsToAdd] = useState<
    Record<string, ItemQuantityAdjustmentDescription>
  >({});

  const [newItemName, setNewItemName] = useState<string>("");

  function onAddItemToTransaction(newItem: ItemListingFragment) {
    const previousQuantity = itemsToAdd[newItem.uuid]?.quantity ?? 0;
    setItemsToAdd({
      ...itemsToAdd,
      [newItem.uuid]: {
        item: newItem,
        quantity: previousQuantity + 1,
      },
    });
  }

  function onRemoveItemFromTransaction(
    descriptionToDecrement: ItemQuantityAdjustmentDescription
  ) {
    if (descriptionToDecrement.quantity === 1) {
      setItemsToAdd((prev) => {
        const { [descriptionToDecrement.item.uuid]: _, ...rest } = prev;
        return rest;
      });
    } else {
      setItemsToAdd((prev) => ({
        ...prev,
        [descriptionToDecrement.item.uuid]: {
          ...descriptionToDecrement,
          quantity: descriptionToDecrement.quantity - 1,
        },
      }));
    }
  }

  function calcTransationString() {
    return Object.values(itemsToAdd)
      .map((description) => {
        return `${description.item.name} x${description.quantity}`;
      })
      .join(", ");
  }

  async function onSubmitAddItems() {
    try {
      await onAddItems(inventoryId, Object.values(itemsToAdd));
      toast(`Items added ${calcTransationString()}`);
      setItemsToAdd({});
      onOpenChange(false);
    } catch (e) {
      toast(`There was an error adding your items`);
    }
  }

  function onOpenChange(isOpen: boolean) {
    setItemsToAdd({});
    handleOpenChange?.(isOpen);
  }

  async function onCreateItem() {
    try {
      await handleCreateItem(newItemName);
      toast(`Item created successfully!`);
    } catch (e) {
      toast(`There was an error creating the item`);
    }
    setNewItemName("");
  }

  return (
    <Sheet {...dialogProps} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select items to add to {inventoryName}</SheetTitle>
          <div>
            <ItemSearch
              itemOptionsData={itemOptionsData}
              onAddItemToTransaction={onAddItemToTransaction}
              itemsToAdd={itemsToAdd}
            />
            <h4>Adding...</h4>
            {Object.values(itemsToAdd).map((description) => (
              <InventoryItemAdditionOption
                description={description}
                key={description.item.uuid}
                onClick={onRemoveItemFromTransaction}
              />
            ))}
            <Button
              disabled={isEmpty(Object.values(itemsToAdd))}
              onClick={onSubmitAddItems}
            >
              Submit
            </Button>
            <Input
              type="text"
              placeholder="Enter new item name..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <Button
              disabled={isEmpty(newItemName)}
              onClick={() => void onCreateItem()}
            >
              Create
            </Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
