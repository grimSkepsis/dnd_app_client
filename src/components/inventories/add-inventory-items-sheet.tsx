import {
  Sheet,
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

function InventoryItemOption({
  data,
}: {
  data: FragmentType<typeof ItemListingFragmentDocument>;
}) {
  const item = useFragment(ItemListingFragmentDocument, data);
  return (
    <div className="text-sm hover:bg-sky-700 cursor-pointer p-1 rounded-md">
      {item.name}
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
  return (
    <Sheet>
      <SheetTrigger>Add items</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            <Input type="text" placeholder="Search..." />
            <ScrollArea className="h-48  rounded-md border">
              <div className="p-4">
                {itemOptionsData?.items?.getItems?.entities.map((itemData) => {
                  return (
                    <InventoryItemOption
                      data={itemData}
                      key={(itemData as ItemListingFragment).uuid}
                    />
                  );
                })}
              </div>
            </ScrollArea>
            <h4>Adding...</h4>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
