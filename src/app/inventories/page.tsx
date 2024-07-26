"use client";
import { columns } from "./columns";
import { PaginationState, Updater } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import AddInventoryItemsSheet from "@/components/inventories/add-inventory-items-sheet";
import { Button } from "@/components/ui/button";
import useInventoryManagement from "@/hooks/inventories/useInventoryManagement";

export default function Page() {
  const [isAddItemsOpen, setIsAddItemsOpen] = useState(false);

  const {
    refetchInventoryAndItemsData,
    itemOptionsData,
    onInventoryItemsSortChange,
    inventoryItemsSorting,
    inventoryItemsPaginationState,
    inventoryItems,
    inventoryId,
    inventoryName,
    onAdjustInventoryItemQuantity,
  } = useInventoryManagement();

  function onPaginationChange(state: Updater<PaginationState>) {
    console.log("onPaginationChange", state);
  }

  function onNextPage() {
    refetchInventoryAndItemsData({
      pageIndex: inventoryItemsPaginationState.pageIndex + 1,
    });
  }

  function onPreviousPage() {
    refetchInventoryAndItemsData({
      pageIndex: inventoryItemsPaginationState.pageIndex - 1,
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
          inventoryId={inventoryId}
          inventoryName={inventoryName}
          onAddItems={onAdjustInventoryItemQuantity}
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
          paginationState={inventoryItemsPaginationState}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          onPageSelection={onPageSelection}
        />
      </div>
    </main>
  );
}
