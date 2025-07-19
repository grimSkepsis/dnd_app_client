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
import { Button } from "../ui/button";
import { toast } from "sonner";
import { DialogProps } from "@radix-ui/react-dialog";
import {
  InventoryItemAdjustmentCallback,
  ItemQuantityAdjustmentDescription,
} from "@/hooks/inventories/types";

type InventoryItemOptionProps = {
  data: ItemListingFragment;
  onClick: (item: ItemListingFragment) => void;
  isInTransationList?: boolean;
};

function InventoryItemOption({
  data,
  onClick,
  isInTransationList,
}: InventoryItemOptionProps) {
  const item = data;
  return (
    <div
      className={[
        "text-sm hover:bg-sky-700 cursor-pointer p-1 rounded-md",
        isInTransationList ? "text-muted-foreground" : "",
      ].join(" ")}
      onClick={() => onClick(item)}
    >
      {item.name}
    </div>
  );
}

type InventoryItemAdditionOptionProps = {
  description: ItemQuantityAdjustmentDescription;
  onClick: (description: ItemQuantityAdjustmentDescription) => void;
};
function InventoryItemAdditionOption({
  description,
  onClick,
}: InventoryItemAdditionOptionProps) {
  return (
    <div
      className="text-sm hover:bg-sky-700 cursor-pointer p-1 rounded-md"
      onClick={() => onClick(description)}
    >
      {description.item.name}{" "}
      {description.quantity > 1 ? `(${description.quantity})` : ""}
    </div>
  );
}

type AddInventoryItemsSheetProps = {
  itemOptionsData: ItemsListingQuery;
  inventoryName: string;
  inventoryId: string;
  onAddItems: InventoryItemAdjustmentCallback;
  onCreateItem: (name: string) => Promise<void>;
} & DialogProps;

export default function AddInventoryItemsSheet({
  itemOptionsData,
  onOpenChange: handleOpenChange,
  inventoryId,
  inventoryName,
  onAddItems,
  onCreateItem: handleCreateItem,
  ...dialogProps
}: AddInventoryItemsSheetProps) {
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
            <Input type="text" placeholder="Search..." />
            {/*TODO - get pagination working + infinite scroll*/}
            <ScrollArea className="h-48  rounded-md border">
              <div className="p-4">
                {itemOptionsData?.items?.getItems?.entities.map((itemData) => {
                  const castItem = itemData as ItemListingFragment;
                  return (
                    <InventoryItemOption
                      data={itemData}
                      key={castItem.uuid}
                      onClick={onAddItemToTransaction}
                      isInTransationList={!isNil(itemsToAdd[castItem.uuid])}
                    />
                  );
                })}
              </div>
            </ScrollArea>
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
