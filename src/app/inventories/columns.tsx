"use client";

import { FragmentType, useFragment } from "@/gql";
import {} from "@/models/inventory-items/type";
import { ColumnDef, SortDirection } from "@tanstack/react-table";
import { InventoryItemListingFragmentDocument } from "./graphql";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

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

function calcSortingIcon(sortDir: SortDirection | false) {
  if (sortDir === "asc") {
    return <ArrowUp className="ml-2 h-4 w-4" />;
  } else if (sortDir === "desc") {
    return <ArrowDown className="ml-2 h-4 w-4" />;
  } else {
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  }
}

export const columns: ColumnDef<
  FragmentType<typeof InventoryItemListingFragmentDocument>
>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          {calcSortingIcon(column.getIsSorted())}
        </Button>
      );
    },
  },
  {
    accessorKey: "level",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Level
          {calcSortingIcon(column.getIsSorted())}
        </Button>
      );
    },
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
