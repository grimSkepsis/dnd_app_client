"use client";
import { getInventoryColumns } from "./columns";
import { PaginationState, Updater } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import AddInventoryItemsSheet from "@/components/inventories/add-inventory-items-sheet";
import { Button } from "@/components/ui/button";
import useInventoryManagement from "@/hooks/inventories/useInventoryManagement";
import partial from "lodash/partial";
import ItemDetailsSheet from "@/components/inventories/item-details-sheet";

export default function Page() {
  const [isAddItemsOpen, setIsAddItemsOpen] = useState(false);
  const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);

  const {
    refetchInventoryAndItemsData,
    itemOptionsData,
    onInventoryItemsSortChange,
    inventoryItemsSorting,
    inventoryItemsPaginationState,
    inventoryItems,
    inventoryId,
    inventoryName,
    onAddItems,
    onUseItem,
    onQuickCreateItem,
    onViewItemDetails: handleViewItemDetails,
    itemDetailsData,
    itemDetailsLoading,
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

  function onViewItemDetails(itemId: string) {
    setIsItemDetailsOpen(true);
    handleViewItemDetails(itemId);
  }

  return (
    <main>
      <div className="container mx-auto py-10">
        <Button onClick={() => setIsAddItemsOpen(true)}>Add Items</Button>
        <AddInventoryItemsSheet
          onCreateItem={onQuickCreateItem}
          inventoryId={inventoryId}
          inventoryName={inventoryName}
          onAddItems={onAddItems}
          itemOptionsData={itemOptionsData}
          open={isAddItemsOpen}
          onOpenChange={() => setIsAddItemsOpen(false)}
        />
        <ItemDetailsSheet
          open={isItemDetailsOpen}
          onOpenChange={() => setIsItemDetailsOpen(false)}
          data={itemDetailsData}
          isLoading={itemDetailsLoading}
        />
        <DataTable
          columns={getInventoryColumns(partial(onUseItem, inventoryId))}
          data={inventoryItems}
          onRowClick={(row) => void onViewItemDetails(row.uuid)}
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
