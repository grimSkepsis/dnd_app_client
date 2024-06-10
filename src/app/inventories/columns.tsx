"use client";

import { InventoryItem } from "@/models/inventory-items/type";
import { ColumnDef } from "@tanstack/react-table";
export const columns: ColumnDef<InventoryItem>[] = [
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
