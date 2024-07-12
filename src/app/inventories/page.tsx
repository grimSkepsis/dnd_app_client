"use client";
import { Button } from "@/components/ui/button";
import { useSuspenseQuery } from "@apollo/client";
import { useState } from "react";
import { columns } from "./columns";
import { PaginationState, Updater } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { DEFAULT_INVENTORY_DATA } from "./constants";
import { inventoryWithItemsQueryDocument } from "./graphql";

export default function Page() {
  const [name, setName] = useState("Thorrun");
  const [otherData, setOtherData] = useState(null);

  const {
    data: {
      inventoryWithItems: {
        getInventoryWithItemsByOwnerName: fetchedInventoryData,
      },
    },
    refetch,
  } = useSuspenseQuery(inventoryWithItemsQueryDocument, {
    variables: {
      name: "Thorrun",
      pageIndex: 0,
      pageSize: 1,
      orderBy: "bulk",
      orderDirection: "ASC",
      filter: {
        excludedTraits: ["Toolkit"],
      },
    },

    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });

  const inventoryData = fetchedInventoryData ?? DEFAULT_INVENTORY_DATA;

  const changeName = async () => {
    // setName("Zeleus");
    refetch({
      name: "Zeleus",
    });
    //
    // setOtherData(res);
  };

  function onPaginationChange(state: Updater<PaginationState>) {}

  function onNextPage() {
    refetch({
      pageIndex: inventoryData?.items.pageIndex + 1,
    });
  }

  function onPreviousPage() {
    refetch({
      pageIndex: inventoryData?.items.pageIndex - 1,
    });
  }

  function onPageSelection(pageIndex: number) {
    refetch({
      pageIndex,
    });
  }

  return (
    <main>
      <Button onClick={changeName}>change name</Button>
      {JSON.stringify(otherData)}
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={inventoryData.items.entities ?? []}
          onPaginationChange={onPaginationChange}
          paginationState={{
            pageIndex: inventoryData?.items.pageIndex,
            pageSize: inventoryData?.items.pageSize,
            totalEntities: inventoryData?.items.totalEntities,
            totalPages: inventoryData?.items.totalPages,
          }}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          onPageSelection={onPageSelection}
        />
      </div>
    </main>
  );
}
