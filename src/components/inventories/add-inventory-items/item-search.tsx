import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ItemListingFragment, ItemsListingQuery } from "@/gql/graphql";
import { InventoryItemOption } from "./inventory-item-option";
import { isNil } from "lodash";
import { ItemQuantityAdjustmentDescription } from "@/hooks/inventories/types";

type ItemSearchProps = {
  itemOptionsData: ItemsListingQuery;
  onAddItemToTransaction: (item: ItemListingFragment) => void;
  itemsToAdd: Record<string, ItemQuantityAdjustmentDescription>;
};

/**
 * Component for searching for items to add to an inventory
 * @param param0
 * @returns
 */
export function ItemSearch({
  itemOptionsData,
  onAddItemToTransaction,
  itemsToAdd,
}: ItemSearchProps) {
  return (
    <div className="flex flex-col gap-2">
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
    </div>
  );
}
