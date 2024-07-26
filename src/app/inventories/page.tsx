"use client";
import { columns } from "./columns";
import { PaginationState, Updater } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { useFragment } from "@/gql";
import { isNil } from "lodash";
import { DEFAULT_PAGINATION_STATE } from "@/hooks/pagination/types";
import { useState } from "react";
import AddInventoryItemsSheet from "@/components/inventories/add-inventory-items-sheet";
import { Button } from "@/components/ui/button";
import useInventoryManagement from "@/hooks/inventories/useInventoryManagement";
import { InventoryWithItemsListingFragment } from "@/hooks/inventories/graphql";

export default function Page() {
  const [isAddItemsOpen, setIsAddItemsOpen] = useState(false);

  const {
    inventoryAndItemsData,
    refetchInventoryAndItemsData,
    itemOptionsData,
    onInventoryItemsSortChange,
    inventoryItemsSorting,
  } = useInventoryManagement();

  const inventoryData = useFragment(
    InventoryWithItemsListingFragment,
    inventoryAndItemsData.inventoryWithItems.getInventoryWithItemsByOwnerName,
  );

  const paginationState = isNil(inventoryData?.items)
    ? DEFAULT_PAGINATION_STATE
    : {
        pageIndex: inventoryData.items.pageIndex,
        pageSize: inventoryData.items.pageSize,
        totalEntities: inventoryData.items.totalEntities,
        totalPages: inventoryData.items.totalPages,
      };

  const inventoryItems = inventoryData?.items?.entities ?? [];

  function onPaginationChange(state: Updater<PaginationState>) {
    console.log("onPaginationChange", state);
  }

  function onNextPage() {
    refetchInventoryAndItemsData({
      pageIndex: paginationState.pageIndex + 1,
    });
  }

  function onPreviousPage() {
    refetchInventoryAndItemsData({
      pageIndex: paginationState.pageIndex - 1,
    });
  }

  function onPageSelection(pageIndex: number) {
    refetchInventoryAndItemsData({
      pageIndex,
    });
  }

  return (
    <main>
      <div className="container mx-auto py-10">
        <Button onClick={() => setIsAddItemsOpen(true)}>Add Items</Button>
        <AddInventoryItemsSheet
          itemOptionsData={itemOptionsData}
          open={isAddItemsOpen}
          onOpenChange={() => setIsAddItemsOpen(false)}
        />
        <DataTable
          columns={columns}
          data={inventoryItems}
          sortingState={inventoryItemsSorting}
          onPaginationChange={onPaginationChange}
          onSortingChange={onInventoryItemsSortChange}
          paginationState={paginationState}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          onPageSelection={onPageSelection}
        />
      </div>
    </main>
  );
}
