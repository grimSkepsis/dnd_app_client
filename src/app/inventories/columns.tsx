"use client";

import { FragmentType, useFragment } from "@/gql";
import {} from "@/models/inventory-items/type";
import { ColumnDef } from "@tanstack/react-table";
import { InventoryItemListingFragmentDocument } from "./graphql";

// function CellRenderer({
//   row,
//   getter,
// }: {
//   row: FragmentType<typeof InventoryItemListingFragmentDocument>;
//   getter: (item: InventoryItemListingFragment) => string | number;
// }) {
//   const itemData = useFragment(InventoryItemListingFragmentDocument, row);
//   console.log("ITEM DATA", itemData);
//   return <div>{getter(itemData)}</div>;
// }

export const columns: ColumnDef<
  FragmentType<typeof InventoryItemListingFragmentDocument>
>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "bulk",
    header: "Bulk",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
];
