import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { FragmentType, useFragment } from "@/gql";
import { ItemListingFragmentDocument } from "@/app/inventories/graphql";
import {
  ItemListingFragment,
  ItemsListingQuery,
  PaginatedItemResponse,
} from "@/gql/graphql";
import { useState } from "react";
import isNil from "lodash/isNil";

import isEmpty from "lodash/isEmpty";
import { Button } from "../ui/button";
import { toast } from "sonner";

type InventoryItemOptionProps = {
  data: FragmentType<typeof ItemListingFragmentDocument>;
  onClick: (item: ItemListingFragment) => void;
  isInTransationList?: boolean;
};

function InventoryItemOption({
  data,
  onClick,
  isInTransationList,
}: InventoryItemOptionProps) {
  const item = useFragment(ItemListingFragmentDocument, data);
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

type ItemAdditionDescription = {
  item: ItemListingFragment;
  quantity: number;
};
type InventoryItemAdditionOptionProps = {
  description: ItemAdditionDescription;
  onClick: (description: ItemAdditionDescription) => void;
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
  // itemOptionsData: FragmentType<typeof ItemListingFragmentDocument>[];
  itemOptionsData: ItemsListingQuery;
};

export default function AddInventoryItemsSheet({
  itemOptionsData,
}: AddInventoryItemsSheetProps) {
  const [itemsToAdd, setItemsToAdd] = useState<
    Record<string, ItemAdditionDescription>
  >({});

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
    descriptionToDecrement: ItemAdditionDescription,
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

  function onSubmitAddItems() {
    toast(`Items added ${calcTransationString()}`);
    setItemsToAdd({});
  }

  return (
    <Sheet>
      <SheetTrigger>Add items</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select items to add</SheetTitle>
          <SheetDescription>
            <Input type="text" placeholder="Search..." />
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
            <SheetClose>
              <Button
                disabled={isEmpty(Object.values(itemsToAdd))}
                onClick={onSubmitAddItems}
              >
                Submit
              </Button>
            </SheetClose>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
