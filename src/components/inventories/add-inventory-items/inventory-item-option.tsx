import { FragmentType, useFragment } from "@/gql";
import { ItemListingFragment } from "@/gql/graphql";
import { ItemListingFragmentDocument } from "@/hooks/inventories/graphql";
import { ItemQuantityAdjustmentDescription } from "@/hooks/inventories/types";

type InventoryItemOptionProps = {
  data: FragmentType<typeof ItemListingFragmentDocument>;
  onClick: (item: ItemListingFragment) => void;
  isInTransationList?: boolean;
};

export function InventoryItemOption({
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

type InventoryItemAdditionOptionProps = {
  description: ItemQuantityAdjustmentDescription;
  onClick: (description: ItemQuantityAdjustmentDescription) => void;
};

export function InventoryItemAdditionOption({
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
