import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ItemListingFragment, ItemsListingQuery } from "@/gql/graphql";
import { InventoryItemOption } from "./inventory-item-option";
import { debounce, isNil } from "lodash";
import { ItemQuantityAdjustmentDescription } from "@/hooks/inventories/types";
import useInventoryManagement from "@/hooks/inventories/useInventoryManagement";

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
  const { onLoadMoreItemOptions } = useInventoryManagement();
  console.log("items to choose from: ", itemOptionsData);
  function onReachBottom() {
    console.log("reached bottom");
    onLoadMoreItemOptions();
  }
  return (
    <div className="flex flex-col gap-2">
      <Input type="text" placeholder="Search..." />
      {/*TODO - get pagination working + infinite scroll*/}
      <ScrollArea
        className="h-24 rounded-md border"
        onReachBottom={debounce(onReachBottom, 1000)}
        bottomOffset={5}
      >
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
