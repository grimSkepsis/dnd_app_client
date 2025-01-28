import { FragmentType, useFragment } from "@/gql";
import { ItemListingFragment } from "@/gql/graphql";
import { ItemListingFragmentDocument } from "@/hooks/inventories/graphql";
import { ItemQuantityAdjustmentDescription } from "@/hooks/inventories/types";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);
  const item = useFragment(ItemListingFragmentDocument, data);
  return (
    <div
      className={[
        "text-sm hover:bg-sky-700 cursor-pointer rounded-md flex items-center justify-between p-1",
        isInTransationList ? "text-muted-foreground" : "",
      ].join(" ")}
      onClick={() => onClick(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {item.name}
      {isHovered && <span className="text-xs text-muted-foreground">+1</span>}
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
