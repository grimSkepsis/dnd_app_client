"use client";

import { FragmentType, useFragment } from "@/gql";
import {} from "@/models/inventory-items/type";
import { Column, ColumnDef, SortDirection } from "@tanstack/react-table";
import { InventoryItemListingFragmentDocument } from "./graphql";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { isNil } from "lodash";

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

type HeaderRendererProps = {
  column: Column<any>;
  title: string;
};

function HeaderRenderer({
  column: { clearSorting, toggleSorting, getIsSorted },
  title,
}: HeaderRendererProps) {
  return (
    <Button
      variant="ghost"
      onClick={() =>
        isNil(calcSortState(getIsSorted()))
          ? clearSorting()
          : toggleSorting(calcSortState(getIsSorted()))
      }
    >
      {title}
      {calcSortingIcon(getIsSorted())}
    </Button>
  );
}

function calcSortingIcon(sortDir: SortDirection | false) {
  if (sortDir === "asc") {
    return <ArrowDown className="ml-2 h-4 w-4" />;
  } else if (sortDir === "desc") {
    return <ArrowUp className="ml-2 h-4 w-4" />;
  } else {
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  }
}

function calcSortState(sortDir: SortDirection | false) {
  if (sortDir === "asc") {
    return true;
  } else if (sortDir === "desc") {
    return undefined;
  } else {
    return false;
  }
}

export const columns: ColumnDef<
  FragmentType<typeof InventoryItemListingFragmentDocument>
>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <HeaderRenderer title="Name" column={column} />,
  },
  {
    accessorKey: "level",
    header: ({ column }) => <HeaderRenderer title="Level" column={column} />,
  },
  {
    accessorKey: "bulk",
    header: ({ column }) => <HeaderRenderer title="Bulk" column={column} />,
  },
  {
    accessorKey: "value",
    header: ({ column }) => <HeaderRenderer title="Value" column={column} />,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <HeaderRenderer title="Quantity" column={column} />,
  },
];
