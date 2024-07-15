"use client";

import { FragmentType } from "@/gql";
import { InventoryItem } from "@/models/inventory-items/type";
import { ColumnDef } from "@tanstack/react-table";
import { InventoryItemListingFragment } from "@/gql/graphql";
export const columns: ColumnDef<InventoryItemListingFragment>[] = [
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
