"use client";

import { FragmentType, useFragment } from "@/gql";
import { Column, ColumnDef, SortDirection } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { isNil } from "lodash";
import { InventoryItemListingFragment } from "@/gql/graphql";
import { InventoryItemListingFragmentDocument } from "@/hooks/inventories/graphql";
import { useState } from "react";
import { toast } from "sonner";
import { Tag } from "@/components/ui/tag";

type HeaderRendererProps = {
  column: Column<FragmentType<typeof InventoryItemListingFragmentDocument>>;
  title: string;
  sorterOverride?: string;
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

// Helper component to unwrap fragment data in cells
function InventoryItemCell({
  fragmentData,
  children,
}: {
  fragmentData: FragmentType<typeof InventoryItemListingFragmentDocument>;
  children: (data: InventoryItemListingFragment) => React.ReactNode;
}) {
  const data = useFragment(InventoryItemListingFragmentDocument, fragmentData);
  return <>{children(data)}</>;
}

export function getInventoryColumns(
  onUseItem: (itemId: string) => Promise<void>,
  onSellItem: (itemId: string) => Promise<void>
): ColumnDef<FragmentType<typeof InventoryItemListingFragmentDocument>>[] {
  return [
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
      cell: ({ row }) => {
        return (
          <InventoryItemCell fragmentData={row.original}>
            {(data) => <div>{data.displayBulk ?? "???"}</div>}
          </InventoryItemCell>
        );
      },
    },
    {
      accessorKey: "value",
      header: ({ column }) => <HeaderRenderer title="Value" column={column} />,
      cell: ({ row }) => {
        return (
          <InventoryItemCell fragmentData={row.original}>
            {(data) => <div>{data.displayValue ?? "???"}</div>}
          </InventoryItemCell>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => (
        <HeaderRenderer title="Quantity" column={column} />
      ),
    },
    {
      accessorKey: "traits",
      header: "Traits",
      cell: ({ row }) => {
        return (
          <InventoryItemCell fragmentData={row.original}>
            {(data) => (
              <div>
                {data.traits?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {data.traits.map((t) => (
                      <Tag key={t} label={t} />
                    ))}
                  </div>
                ) : (
                  "???"
                )}
              </div>
            )}
          </InventoryItemCell>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <InventoryItemCell fragmentData={row.original}>
            {(data) => (
              <InventoryItemActionRenderer
                item={data}
                onUseItem={onUseItem}
                onSellItem={onSellItem}
              />
            )}
          </InventoryItemCell>
        );
      },
    },
  ];
}

type InventoryItemActionRendererProps = {
  item: InventoryItemListingFragment;
  onUseItem: (itemId: string) => Promise<void>;

  onSellItem: (itemId: string) => Promise<void>;
};
function InventoryItemActionRenderer({
  item: { isConsumable, uuid, name },
  onUseItem: handleUseItem,
  onSellItem: handleSellItem,
}: InventoryItemActionRendererProps) {
  const [isUsing, setIsUsing] = useState(false);
  const [isSelling, setIsSelling] = useState(false);

  async function onUseItem(e: React.MouseEvent) {
    e.stopPropagation();
    try {
      setIsUsing(true);
      await handleUseItem(uuid);
      toast.success(`${name} successfully used.`);
    } catch (e) {
      console.error(e);
      toast.error(
        `There was an issue using ${name}. Please refresh and try again.`
      );
    }
    setIsUsing(false);
  }

  async function onSellItem(e: React.MouseEvent) {
    e.stopPropagation();
    try {
      setIsSelling(true);
      await handleSellItem(uuid);
      toast.success(`${name} successfully sold.`);
    } catch (e) {
      console.error(e);
      toast.error(
        `There was an issue selling ${name}. Please refresh and try again.`
      );
    }
    setIsUsing(false);
  }

  const actionsDisabled = isUsing || isSelling;

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        disabled={actionsDisabled}
        onClick={(e) => void onSellItem(e)}
      >
        Sell
      </Button>
      {isConsumable && (
        <Button
          variant="outline"
          disabled={actionsDisabled}
          onClick={(e) => void onUseItem(e)}
        >
          Use
        </Button>
      )}
    </div>
  );
}
